import { Message } from "../../models/Message";

class ListMessagesService {
  async execute(conversationId: string) {
    const messages = await Message.find({ conversationId }).sort({
      timestamp: 1,
    });
    return messages;
  }
}

export { ListMessagesService };
