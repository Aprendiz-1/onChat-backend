import mongoose from "mongoose";
import { Conversation } from "../../models/Conversation";

class ListConversationsService {
    async execute(user_id: mongoose.Types.ObjectId) {
        const conversations = await Conversation.find({
            participants: { $in: [user_id]},
        }).populate('participants', 'name avatar status');

        return conversations;
    }
}

export { ListConversationsService };