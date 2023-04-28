import { Router } from "express";
import  userController  from "../controllers/user-controller.js";
import { adminOnly, loginRequired } from "../middlewares/index.js";

// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴

const userRouter = Router();

userRouter.post("/signup", userController.createUser);
userRouter.get("/mypage/:userId", loginRequired, userController.getUser);
userRouter.patch("/mypage/:userId", loginRequired, userController.updateUser);
userRouter.delete("/mypage/:userId", loginRequired, userController.deleteUser);

//관리자
userRouter.get("/admin/members", adminOnly, userController.getAdminUser);
userRouter.patch("/admin/members/:userId", adminOnly, userController.updateAdminUser);

export { userRouter };

