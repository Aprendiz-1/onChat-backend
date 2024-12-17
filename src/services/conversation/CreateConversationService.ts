import { ConversationProps } from "../../controllers/conversation/CreateConversationController";
import { Conversation } from "../../models/Conversation";

class CreateConversationService {
    async execute({participants}: ConversationProps) {
        const conversationExists = await Conversation.findOne({ participants: {$all: participants}});

        if(conversationExists) {
            return conversationExists;
        }

        const newConversation = await Conversation.create({ participants });    
        return newConversation;
    }
}

export { CreateConversationService };