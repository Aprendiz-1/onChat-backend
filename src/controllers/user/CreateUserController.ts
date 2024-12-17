import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

export type UserProps = {
    name: string;
    email: string;
    password: string;
}

class CreateUserController {
    async handle(req: Request, res: Response): Promise<any> {
        try {
            const {name, email, password} = req.body as UserProps;

            const createUser = new CreateUserService();
            const user = await createUser.execute({name, email, password});
    
            return res.status(200).send('Usuário cadastrado com sucesso!');
        } catch(error) {
            return res.status(500).send(`Server error: ${error}`);
        }
    }
}

export { CreateUserController };