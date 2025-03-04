import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    nickname: {
        type: String,
    },
    status: {
        type: String,
        default: 'offline',
    }
});

const User = mongoose.model("User", UserSchema);
export { User };