import { Request, Response } from "express";
import { ListUserService } from "../../services/user/ListUserService";

class ListUserController {
    async handle(req: Request, res: Response): Promise<any> {
        try {
            const listUser = new ListUserService();
            const users = await listUser.execute();

            return res.status(200).json(users);
        } catch(error) {
            return res.status(500).send(`Erro de servidor: ${error}`);
        }
    }
}

export { ListUserController };