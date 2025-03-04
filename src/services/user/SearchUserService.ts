import { User } from "../../models/User";

class SearchUserService {
    async execute(search_param: string) {
        const user = await User.find({name: { $regex: search_param, $options: "i"}}).select('-password');
        return user;
    }
}

export { SearchUserService };