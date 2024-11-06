"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
// /routes/order.routes.js
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post("/", order_controller_1.orderControllers.createOrder); // Create a new order
router.get("/history", (0, auth_1.default)(["ADMIN", "USER"]), order_controller_1.orderControllers.getOrderHistory); // Fetch order history
router.patch("/:orderId/status", order_controller_1.orderControllers.updateOrderStatus); // Update order status
router.post("/create-checkout-session", order_controller_1.orderControllers.createCheckoutSession); // Create Stripe session
exports.orderRoutes = router;
