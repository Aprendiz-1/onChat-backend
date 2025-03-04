import mongoose from "mongoose";
import { Conversation } from "../../models/Conversation";
import { User } from "../../models/User";

type SearchConversationProps = {
    user_id: mongoose.Types.ObjectId;
    search_param: string;
}

class SearchConversationService {
    async execute({user_id, search_param}: SearchConversationProps) {
        const users = await User .find({
            name: { $regex: search_param, $options: "i" },
        });

        const userIds = users.map(user => user._id);

        const conversations = await Conversation.find({
            participants: { $all: [user_id, ...userIds] },
        }).populate("participants", "name avatar status");

        console.log(conversations);
        return conversations;
    }
}

export { SearchConversationService };