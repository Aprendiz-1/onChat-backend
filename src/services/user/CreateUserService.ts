import { UserProps } from "../../controllers/user/CreateUserController";
import { User } from "../../models/User";
import { hash } from 'bcryptjs';

class CreateUserService {
    async execute({name, email, password}: UserProps) {
        const userExists = await User.findOne({email: email});

        if(userExists) {
            throw new Error('Usuário já cadastrado!');
        }

        const passwordHash = await hash(password, 8);

        await User.create({
            name: name,
            email: email,
            password: passwordHash,
        });

        return null;
    }
}

export { CreateUserService };
