import mongoose, { Schema } from "mongoose";

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: Schema.Types.ObjectId,
        ref: "Conversation",
        required: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

const Message = mongoose.model('Message', MessageSchema);
export { Message };