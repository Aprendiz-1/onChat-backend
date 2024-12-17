import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { connectDatabase } from "./database/mongoconfig";
import { router } from "./routes";
import { Message } from "./models/Message";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

connectDatabase();
app.use(router);

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("send_message", async (data) => {
    const { conversationId, text, sender } = data;

    const newMessage = await Message.create({
        conversationId,
        sender,
        text,
    });

    io.to(conversationId).emit('receive_message', newMessage);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(4000, () => console.log("Server online!"));
