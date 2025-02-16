import mongoose from "mongoose";
import { ConversationProps } from "../../controllers/conversation/CreateConversationController";
import { Conversation } from "../../models/Conversation";

class CreateConversationService {
    async execute({participants}: ConversationProps) { 
        const conversationExists = await Conversation.findOne({ 
            participants: {$all: participants}
        }).populate('participants', 'name avatar status');

        if(conversationExists) {
            return conversationExists;
        }

        const newConversation = (await Conversation.create({ participants })).populate('participants', 'name avatar status');    
        return newConversation;
    }
}

export { CreateConversationService };