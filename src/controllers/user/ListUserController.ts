import { Request, Response } from "express";
import { ListUserService } from "../../services/user/ListUserService";
import { CompleteUserProps } from "./DetailUserController";
import mongoose from "mongoose";

class ListUserController {
    async handle(req: Request, res: Response): Promise<any> {
        try {
            const get_user = req?.user as CompleteUserProps;
            const user_id = new mongoose.Types.ObjectId(get_user._id);

            const listUser = new ListUserService();
            const users = await listUser.execute(user_id);

            return res.status(200).json(users);
        } catch(error) {
            return res.status(500).send(`Erro de servidor: ${error}`);
        }
    }
}

export { ListUserController };