import mongoose from "mongoose";
import { User } from "../../models/User";

type EditUserProps = {
    user_id: mongoose.Types.ObjectId;
    name: string;
    nickname: string;
    email: string;    
}

class EditUserService {
    async execute({user_id, name, nickname, email}: EditUserProps) {
        const updatedUser: Omit<EditUserProps, 'user_id'> = {
            name: name || undefined,
            nickname: nickname || undefined,
            email: email || undefined,
        };

        if(name) updatedUser.name = name;
        if(nickname) updatedUser.nickname = nickname;
        if(email) updatedUser.email = email;

        const user = await User.findByIdAndUpdate(user_id, updatedUser).select('-password');

        return user;
    }
}

export { EditUserService };