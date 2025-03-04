import mongoose from "mongoose";
import { User } from "../../models/User";
import { Conversation } from "../../models/Conversation";

class ListUserService {
    async execute(user_id: mongoose.Types.ObjectId) {
         const conversations = await Conversation.find({ participants: user_id }).select("participants");

         const usersInConversation = new Set(
            conversations.flatMap(conversation => conversation.participants.map(id => id.toString()))
         );
 
         const users = await User.find({ 
            _id: { $ne: user_id, $nin: Array.from(usersInConversation) } 
         }).select("-password").limit(15);
 
         return users;
    }
}

export { ListUserService };