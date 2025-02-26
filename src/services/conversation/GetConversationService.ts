import { ConversationProps } from "../../controllers/conversation/CreateConversationController";
import { Conversation } from "../../models/Conversation";

class GetConversationService {
    async execute({participants}: ConversationProps) {
        const conversation = await Conversation.findOne({
            participants: {$all: participants}
        }).populate('participants', 'name avatar status');

        if(!conversation) {
            throw new Error('Informações inválidas!');
        }

        return conversation;
    }
}

export { GetConversationService };