import { Router } from "express";
import  orderController  from "../controllers/order-controller.js";
import { adminOnly } from "../middlewares/index.js";

const orderRouter = Router();

//사용자
orderRouter.get("/orders", orderController.getOrderAll);
orderRouter.get("/orders/:productId", orderController.getOrderOne);
orderRouter.patch("/orders/:productId", orderController.updateOrder);
orderRouter.delete("/orders/:productId", orderController.deleteOrder);

//관리자

orderRouter.get("/admin/orders/", adminOnly, orderController.getAdminAllOrders);
orderRouter.patch("/admin/orders/", adminOnly, orderController.updateAdminAllOrders);



export default orderRouter


