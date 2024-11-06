// /routes/order.routes.js
import express from "express";
import { orderControllers } from "./order.controller";


const router = express.Router();

router.post("/", orderControllers.createOrder); // Create a new order
router.get("/history", orderControllers.getOrderHistory); // Fetch order history
router.patch("/:orderId/status", orderControllers.updateOrderStatus); // Update order status
router.post("/create-checkout-session", orderControllers.createCheckoutSession); // Create Stripe session

export const orderRoutes = router;
