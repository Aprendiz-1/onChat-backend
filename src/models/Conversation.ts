import mongoose, { Schema } from "mongoose";

const ConversationSchema = new mongoose.Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
});;

const Conversation = mongoose.model('Conversation', ConversationSchema);
export { Conversation };