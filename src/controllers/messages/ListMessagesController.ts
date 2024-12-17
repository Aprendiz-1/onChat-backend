import { Request, Response } from "express";
import { ListMessagesService } from "../../services/messages/ListMessagesService";

class ListMessagesController {
    async handle(req: Request, res: Response): Promise<any> {
        try {
            const conversationId = req.query.conversationId as string;

            const listMessages = new ListMessagesService();
            const messages = await listMessages.execute(conversationId);

            return res.status(200).json(messages);
        } catch(error) {
            return res.status(500).send(`Erro de servidor: ${error}`);
        }
    }
}

export { ListMessagesController };