import { Request, Response } from "express";
import { ConversationProps } from "./CreateConversationController";
import { GetConversationService } from "../../services/conversation/GetConversationService";
import mongoose from "mongoose";

class GetConversationController {
    async handle(req: Request, res: Response): Promise<any> {
        try {
            const { participants } = req.body as ConversationProps;
            const convertedParticipants = participants.map((item) => new mongoose.Types.ObjectId(item));
            
            const getConversation = new GetConversationService();
            const conversation = await getConversation.execute({ participants: convertedParticipants });
    
            return res.status(200).json(conversation);
        } catch(error) {
            return res.status(500).send(`Erro de servidor: ${500}`);
        }
    }
}

export { GetConversationController };