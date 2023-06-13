import { Router } from "express";
import { nationController } from "../controllers/nation-controller.js";
import { adminOnly } from "../middlewares/index.js"
import { loginRequired } from "../middlewares/index.js"

const nationRouter = Router();

nationRouter.post("/nation", loginRequired, adminOnly, nationController.createNation);
nationRouter.get("/nation", nationController.getNationList);
nationRouter.get("/nation/:nationId", loginRequired, adminOnly, nationController.getNationById);
nationRouter.put("/nation/:nationId", loginRequired, adminOnly, nationController.updateNation);
nationRouter.delete("/nation/:nationId", loginRequired, adminOnly, nationController.deleteNation);

export default nationRouter;