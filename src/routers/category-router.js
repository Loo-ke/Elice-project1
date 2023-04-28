import { Router } from "express";
import { adminOnly } from "../middlewares/index.js"
import { loginRequired } from "../middlewares/index.js"

import { categoryController } from "../controllers/category-controller.js";
// import { bodyEmptyChecker } from "../middlewares";

const categoryRouter = Router();

categoryRouter.post("/category",loginRequired, adminOnly, categoryController.createCategory);
categoryRouter.get("/category", categoryController.getCategoryList);
// categoryRouter.get("category/search", categoryController.getCategoryByName);
categoryRouter.get("/category/:categoryId", categoryController.getCategoryById);
categoryRouter.put("/category/:categoryId", loginRequired, adminOnly,categoryController.updateCategory);
categoryRouter.delete("/category/:categoryId",loginRequired, adminOnly, categoryController.deleteCategory);

export { categoryRouter };
