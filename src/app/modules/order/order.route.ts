// /routes/order.routes.js
import express from "express";
import { orderControllers } from "./order.controller";
import auth from "../../middlewares/auth";


const router = express.Router();

router.post("/", orderControllers.createOrder); // Create a new order
router.get("/history", auth(["ADMIN", "USER"]), orderControllers.getOrderHistory); // Fetch order history
router.patch("/:orderId/status", orderControllers.updateOrderStatus); // Update order status
router.post("/create-checkout-session", orderControllers.createCheckoutSession); // Create Stripe session

export const orderRoutes = router;
