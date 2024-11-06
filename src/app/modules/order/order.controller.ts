// /controllers/order.controller.js

import { orderService } from "./order.service";


const createOrder = async (req, res) => {
  try {
    const { items, total, email, shippingDetails } = req.body;

    if (!items || !total || !email || !shippingDetails) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const orderData = { items, total, email, shippingDetails };
    const order = await orderService.createOrder(orderData);
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

const getOrderHistory = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const orders = await orderService.getOrderHistory(email);
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch order history" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!["Pending", "Shipped", "Received", "Cancelled"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updatedOrder = await orderService.updateOrderStatus(orderId, status);

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update order status" });
  }
};

const createCheckoutSession = async (req, res) => {
  const { cartItems, shippingDetails, email } = req.body;

  try {
    const session = await orderService.createStripeSession(cartItems, shippingDetails, email);
    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create Stripe session" });
  }
};

export const orderControllers = {
  createOrder,
  getOrderHistory,
  updateOrderStatus,
  createCheckoutSession,
};
