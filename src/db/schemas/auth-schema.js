import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const AuthSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

AuthSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export const Auth = mongoose.model("Auth", AuthSchema, 'users');

 //users에 있는 사용자 db 참조.