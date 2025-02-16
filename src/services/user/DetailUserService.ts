import { User } from "../../models/User";

class DetailUserService {
    async execute(user_id: string) {
        const user = await User.findById(user_id).select('-password');
        return user;
    }
}

export { DetailUserService };