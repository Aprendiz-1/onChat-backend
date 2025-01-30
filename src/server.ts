import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { connectDatabase } from "./database/mongoconfig";
import { router } from "./routes";
import { Message } from "./models/Message";
import { User } from "./models/User";
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

io.on("connection", async (socket) => {
  console.log("User connected");
  const { token: user_id } = socket.handshake.auth;

  if(user_id) {
    await User.findByIdAndUpdate(user_id, {status: 'online'});
  }

  console.log("User online!");

  socket.on("send_message", async (data) => {
    const { conversationId, text, sender } = data;

    const newMessage = await Message.create({
        conversationId,
        sender,
        text,
    });

    io.to(conversationId).emit('receive_message', newMessage);
  });

  socket.on("disconnect", async () => {
    console.log("User disconnected");
    if(user_id) {
      await User.findByIdAndUpdate(user_id, {status: 'offline'});
    }
  });
});

server.listen(4000, () => console.log("Server online!"));
