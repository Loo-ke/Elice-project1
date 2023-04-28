import { request } from "express";
import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema.js";

const Order = model("Order", OrderSchema);

export default class OrderModel {
  async create(orderInfo){
    const newOrder = new Order(orderInfo);
    const order = await newOrder.save();
    
  return order;

  }
  
  async findAllByUserId(userId) {
    const orders = await Order.find({ userId });
    return orders;
  }
  async findById(orderId) {
    const order = await Order.findById(orderId);
    return order;
  }
  async updateOrder(orderId, update) {
    const filter = { _id: orderId };
    const option = { new: true };
    const updatedOrder = await Order.findOneAndUpdate(filter, update, option);
    return updatedOrder;
  }

  async deleteOrder(orderId) {
    const deletedOrder = await Order.deleteOne({ _id: orderId });
    return deletedOrder;
  }
  async findAllOrders() {
    const orders = await Order.find();
    return orders;
  }
  async updateOrderStatus(orderId, status) {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    return updatedOrder;
    }
    async deleteById(orderId) {
      await Order.findByIdAndDelete(orderId);
    }
}
