import { Router } from "express";
import { handlelogin, handlelogout } from "../controllers/auth-controller.js";

// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴

const authRouter = Router();

authRouter.post("/login", handlelogin);
authRouter.post("/logout", handlelogout);

export { authRouter };
