import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
    participants: [String],
});

const Conversation = mongoose.model('Conversation', ConversationSchema);
export { Conversation };