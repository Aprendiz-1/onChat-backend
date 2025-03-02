import mongoose from "mongoose";
import { Conversation } from "../../models/Conversation";

export type ConvertedConversationProps = {
  participants: mongoose.Types.ObjectId[];
}

class CreateConversationService {
  async execute({ participants }: ConvertedConversationProps) {
    const newConversation = (
      await Conversation.create({ participants })
    ).populate("participants", "name avatar status");

    return newConversation;
  }
}

export { CreateConversationService };
