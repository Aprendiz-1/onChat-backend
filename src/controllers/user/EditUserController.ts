import { Request, Response } from "express";
import { EditUserService } from "../../services/user/EditUserService";
import { CompleteUserProps } from "./DetailUserController";

class EditUserController {
    async handle(req: Request, res: Response): Promise<any> {
        try {
            const get_user = req?.user as CompleteUserProps;
            const user_id = get_user._id;
            const { name, nickname, email } = req.body;

            const editUserService = new EditUserService();
            const user = await editUserService.execute({user_id, name, nickname, email});

            return res.status(200).json(user);
        } catch(error) {
            return res.status(500).send(`Erro de servidor: ${error}`);
        }
    }
}

export { EditUserController };