import mongoose, { Schema } from "mongoose";

const ConversationSchema = new mongoose.Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    lastMessage: {
        sender: { type: Schema.Types.ObjectId, ref: "User" },
        text: String,
        createdAt: Date,
    }
});

const Conversation = mongoose.model('Conversation', ConversationSchema);
export { Conversation };