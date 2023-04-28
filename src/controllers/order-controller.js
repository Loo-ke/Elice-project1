import { orderService } from "../services/order-service.js";

export default {

  async getOrderAll(req, res, next) {
    const userId = req.userId;
    try {
      const orders = await orderService.getOrdersByUserId(userId);
      res.status(200).json({
        success: true,
        data: orders
      });
    } catch (error) {
      next(error);
    }
  },
  async getOrderOne(req, res, next) {
    try {
      const orderId = req.params.orderId;
      const orderData = await orderService.getOrderOne(orderId);

      res.status(200).json(orderData);
    } catch (error) {
      next(error);
    }
  },
  async updateOrder(req, res, next) {
    try {
      // req (request) 에서 데이터 가져오기
      const orderId = req.params.orderId;
      const { address, request, status } = req.body;

      // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
      // 보내주었다면, 업데이트용 객체에 삽입함.
      const toUpdate = {};

      if (address) toUpdate.address = address;
      if (request) toUpdate.request = request;
      if (status) toUpdate.status = status;

      // 제품 정보를 업데이트함.
      const updatedOrder = await orderService.updateOrder(orderId, toUpdate);

      res.status(200).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  },
  async deleteOrder(req, res, next) {
    try {
      const orderId = req.params.orderId;
      const deletedCount = await orderService.deleteOrder(orderId);

      res.status(200).json(deletedCount);
    } catch (error) {
      next(error);
    }

  },
  async getAdminAllOrders(req, res, next) {
    try {
      // 모든 주문 내역을 조회하여 반환
      const orders = await orderService.getAdminAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  },
  async updateAdminAllOrders(req,res,next){
    try {
      const { orderId, status } = req.body;

// 주문 내역 업데이트 (배송준비중, 배송중, 배송완료)
  const updatedOrder = await orderService.updateOrderStatus(orderId, status);
  res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
    }},
  async deleteAdminOrders(req, res, next) {
    try {
      const orderId = req.params.id;
      await orderService.deleteOrderById(orderId);
      res.status(200).json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
      next(error);
    }
  },

    adminOnly: [
      '/admin/members',
      '/admin/members/:userId'
    ],
    isAdmin(req, res, next) {
      if (req.user && req.user.isAdmin) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    }
}
  


