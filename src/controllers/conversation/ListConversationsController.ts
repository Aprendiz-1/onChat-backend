import { Request, Response } from "express";
import { ListConversationsService } from "../../services/conversation/ListConversationsService";
import { CompleteUserProps } from "../user/DetailUserController";
import mongoose from "mongoose";

class ListConversationsController {
    async handle(req: Request, res: Response): Promise<any> {
        try {
            const get_user = req?.user as CompleteUserProps;
            const user_id = new mongoose.Types.ObjectId(get_user._id);

            const listConversations = new ListConversationsService();
            const conversations = await listConversations.execute(user_id);

            return res.status(200).json(conversations);
        } catch(error) {
            return res.status(500).send(`Erro de servidor: ${error}`);
        }
    }
}

export { ListConversationsController };