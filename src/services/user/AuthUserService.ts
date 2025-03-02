import { compare } from "bcryptjs";
import { UserProps } from "../../controllers/user/CreateUserController";
import { User } from "../../models/User";
import { sign } from "jsonwebtoken";

class AuthUserService {
    async execute({email, password}: Omit<UserProps, "name">) {
        const findUser = await User.findOne({email: email});

        if(!findUser) {
            throw new Error('Usuário não encontrado!');
        }

        const passwordMatch = await compare(password, findUser.password);

        if(!passwordMatch) {
            throw new Error('Senha incorreta!');
        }

        const token = sign(
            {
                id: findUser._id,
                email: findUser.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d',
            }
        );

        return {
            _id: findUser._id,
            email: findUser.email,
            name: findUser.name,
            token,
        }
    }
}

export { AuthUserService };
