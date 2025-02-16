import { User } from "../../models/User";

class ListUserService {
    async execute() {
        const users = await User.find().select('-password');
        return users;
    }
}

export { ListUserService };