import OrderModel from "../db/models/order-model.js";

export const orderService = {
//모든 주문 조회
  async getOrdersByUserId(userId) {
    const orderModel = new OrderModel();
    const orders = await orderModel.findAllByUserId(userId);
    return orders;
  },
//단일 주문 검색
  async getOrderOne(orderId) {
    const orderModel = new OrderModel();
    const order = await orderModel.findById(orderId);

    if (!order) {
      throw new Error("해당 id의 주문은 없습니다. 다시 한 번 확인해 주세요.");
    }
    return order;
  },
//주문정보 업데이트
  async updateOrder(orderId, toUpdate) {
    const orderModel = new OrderModel();
    const updatedOrder = await orderModel.updateOrder(orderId, toUpdate, {
      new: true,
    });

    return updatedOrder;
  },
//주문 삭제
  async deleteOrder(orderId) {
    const orderModel = new OrderModel();
    const  deletedCount  = await orderModel.deleteOrder({ _id: orderId });
    return deletedCount;
  },

  //관리자 모든 주문 조회
  async getAdminAllOrders() {
    const orderModel = new OrderModel();
    const getAdminOrders = await orderModel.findAllOrders();
    return getAdminOrders;
  },
  async updateOrderStatus(orderId, status) {
    const orderModel = new OrderModel();
    const updatedOrder = await orderModel.updateOrderStatus(orderId, status);
    return updatedOrder;
    },
    async deleteOrderById(orderId) {
      const orderModel = new OrderModel();
      await orderModel.deleteById(orderId);
    }
  
}
