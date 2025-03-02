import { Conversation } from "../../models/Conversation";
import { ConvertedConversationProps } from "./CreateConversationService";

class GetConversationService {
    async execute({participants}: ConvertedConversationProps) {
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