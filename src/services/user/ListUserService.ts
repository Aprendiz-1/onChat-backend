import { User } from "../../models/User";

class ListUserService {
    async execute() {
        const users = await User.find();
        return users;
    }
}

export { ListUserService };