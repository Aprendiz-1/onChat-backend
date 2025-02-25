import { Request, Response } from "express";
import { UserProps } from "./CreateUserController";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController {
    async handle(req: Request, res: Response): Promise<any> {
        try {
            const {email, password} = req.body as Omit<UserProps, "name">;

            const authUser = new AuthUserService();
            const user = await authUser.execute({email, password});

            return res.status(200).json(user);
        } catch(error) {
            return res.status(500).send(`Erro de servidor: ${error}`);
        }
    }
}

export { AuthUserController };