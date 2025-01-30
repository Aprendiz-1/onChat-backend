import { User } from "../../models/User";

class DetailUserService {
    async execute(user_id: string) {
        const user = await User.findById(user_id);
        return user;
    }
}

export { DetailUserService };