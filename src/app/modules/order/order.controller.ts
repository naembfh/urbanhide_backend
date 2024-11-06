import catchAsync from "../../utils/catchAsync";
import { orderService } from "./order.service";

const createOrder = catchAsync(async (req, res) => {
  const { shippingDetails, cartItems, totalAmount, email } = req.body;

  if (!shippingDetails || !cartItems || !totalAmount || !email) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const order = await orderService.createOrder({
    shippingDetails,
    cartItems,
    totalAmount,
    email,
  });

  res.status(201).json({ message: "Order created successfully", order });
});

const getOrderHistory = catchAsync(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(400).json({ error: "User is required" });
  }

  const orders = await orderService.getOrderHistory(user);

  res.status(200).json(orders);
});

const updateOrderStatus = catchAsync(async (req, res) => {
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
});

const createCheckoutSession = catchAsync(async (req, res) => {
  const { cartItems, shippingDetails, email } = req.body;

  const session = await orderService.createStripeSession({
    cartItems,
    shippingDetails,
    email,
  });

  res.status(200).json({ id: session.id });
});

export const orderControllers = {
  createOrder,
  getOrderHistory,
  updateOrderStatus,
  createCheckoutSession,
};
