import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import mongoose from "mongoose";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { connectDatabase } from "./database/mongoconfig";
import { router } from "./routes";
import { Message } from "./models/Message";
import { User } from "./models/User";
import { Conversation } from "./models/Conversation";
import { ExtractJwt, Strategy } from "passport-jwt";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

passport.use(new Strategy(opts, async (jwtPayload, done) => {
  let user_id = jwtPayload.id as string;

  const user = await User.findById(user_id, '--password');

  if(user) {
      return done(null, user);
  } else {
      return done(null, false);
  }
}));

app.use(passport.initialize());

connectDatabase();
app.use(router);

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

type MessageProps = {
  conversationId: string;
  text: string;
  sender: string;
}

io.on("connection", async (socket) => {
  console.log("User connected");
  const { token: user_id } = socket.handshake.auth;

  if(user_id) {
    await User.findByIdAndUpdate(user_id, {status: 'online'});
  }

  socket.on("send_message", async (data) => {
    const { conversationId, text, sender }: MessageProps = data;
    const convertedConversationId = new mongoose.Types.ObjectId(conversationId);
    const convertedUserId = new mongoose.Types.ObjectId(sender);

    const newMessage = await Message.create({
        conversationId: convertedConversationId,
        sender: convertedUserId,
        text,
    });

    await Conversation.findByIdAndUpdate(convertedConversationId, {
      lastMessage: {
        sender: convertedUserId,
        text,
        createdAt: new Date(),
      }
    });

    io.to(conversationId).emit('receive_message', newMessage);
  });

  socket.on("disconnect", async () => {
    if(user_id) {
      await User.findByIdAndUpdate(user_id, {status: 'offline'});
    }
  });
});

server.listen(4000, () => console.log("Server online!"));
