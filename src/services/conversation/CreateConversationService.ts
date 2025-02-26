import { ConversationProps } from "../../controllers/conversation/CreateConversationController";
import { Conversation } from "../../models/Conversation";

class CreateConversationService {
  async execute({ participants }: ConversationProps) {
    const newConversation = (
      await Conversation.create({ participants })
    ).populate("participants", "name avatar status");

    return newConversation;
  }
}

export { CreateConversationService };
