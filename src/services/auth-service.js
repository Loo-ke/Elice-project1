import jwt from "jsonwebtoken";
import { Auth } from "../db/models/auth-model.js";

const secretKey = process.env.JWT_SECRET_KEY || "secret-key";

export const authService = {
  async login(userId, password) {  
    const user = await Auth.findOne({ userId: userId });
    if (!user) {
      throw new Error("없는 아이디입니다.");
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new Error(
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }

    const tokenPayload = { userId: user.userId, isAdmin: user.isAdmin };

        
    const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "1h" });

    return { token, userId:user.userId, isAdmin:user.isAdmin };
  },

  async logout(token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      const userId = decoded.userId;
    } catch (err) {
      throw new Error("유효하지 않은 토큰입니다.");
    }
  },

};
