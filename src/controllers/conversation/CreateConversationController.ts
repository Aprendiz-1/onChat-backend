import { Request, Response } from "express";
import { CreateConversationService } from "../../services/conversation/CreateConversationService";
import mongoose from "mongoose";

export type ConversationProps = {
    participants: mongoose.Types.ObjectId[];
}

class CreateConversationController {
    async handle(req: Request, res: Response): Promise<any> {
        try {
            const { participants } = req.body as ConversationProps;
            const convertedParticipants = participants.map(item => new mongoose.Types.ObjectId(item));

            const createConversation = new CreateConversationService();
            const conversation = await createConversation.execute({participants: convertedParticipants});
    
            return res.status(200).json(conversation);
        } catch(error) {
            return res.status(500).send(`Erro de servidor: ${error}`);
        }
    }
}

export { CreateConversationController };