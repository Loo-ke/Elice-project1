import { Router } from "express";
import  orderController  from "../controllers/order-controller.js";
import { adminOnly, loginRequired } from "../middlewares/index.js";

const orderRouter = Router();

//사용자
orderRouter.post("/orders", loginRequired, orderController.createOrder);
orderRouter.get("/orders", loginRequired, orderController.getOrderAll);
orderRouter.get("/orders/:orderId", loginRequired, orderController.getOrderOne);
orderRouter.patch("/orders/:orderId", loginRequired, orderController.updateOrder);
orderRouter.delete("/orders/:orderId", loginRequired, orderController.deleteOrder);

//관리자

orderRouter.get("/admin/orders/", adminOnly, orderController.getAdminAllOrders);
orderRouter.patch("/admin/orders/:orderId", adminOnly, orderController.updateAdminAllOrders);
orderRouter.delete("/admin/orders/:orderId", adminOnly, orderController.deleteAdminOrders);


export {orderRouter}


