import { Request, Response } from "express";
import { CreateConversationService } from "../../services/conversation/CreateConversationService";

export type ConversationProps = {
    participants: String[];
}

class CreateConversationController {
    async handle(req: Request, res: Response): Promise<any> {
        try {
            const { participants } = req.body as ConversationProps;

            const createConversation = new CreateConversationService();
            const conversation = await createConversation.execute({participants});
    
            return res.status(200).json(conversation);
        } catch(error) {
            return res.status(500).send(`Erro de servidor: ${error}`);
        }
    }
}

export { CreateConversationController };