import { Request, Response } from "express";
import { SearchUserService } from "../../services/user/SearchUserService";

class SearchUserController {
    async handle(req: Request, res: Response): Promise<any> {
        try {
            const search_param = req.query.name as string;

            const searchUser = new SearchUserService();
            const user = await searchUser.execute(search_param);

            return res.status(200).json(user);
        } catch(error) {
            return res.status(500).send(`Erro de servidor: ${error}`);
        }
    }
}

export { SearchUserController };