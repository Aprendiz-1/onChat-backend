import { Request, Response } from "express";
import { SearchConversationService } from "../../services/conversation/SearchConversationService";
import { CompleteUserProps } from "../user/DetailUserController";
import mongoose from "mongoose";

class SearchConversationController {
    async handle(req: Request, res: Response): Promise<any> {
        try {
            const get_user = req?.user as CompleteUserProps;
            const user_id = new mongoose.Types.ObjectId(get_user._id);
            const search_param = req.query.name as string;

            const searchConversation = new SearchConversationService();
            const conversation = await searchConversation.execute({user_id, search_param});

            return res.status(200).json(conversation);
        } catch(error) {
            return res.status(500).send(`Erro de servidor: ${error}`);
        }
    }
}

export { SearchConversationController };