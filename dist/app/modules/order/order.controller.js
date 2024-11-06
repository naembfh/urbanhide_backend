"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const order_service_1 = require("./order.service");
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shippingDetails, cartItems, totalAmount, email } = req.body;
    if (!shippingDetails || !cartItems || !totalAmount || !email) {
        return res.status(400).json({ message: "Missing required fields." });
    }
    const order = yield order_service_1.orderService.createOrder({
        shippingDetails,
        cartItems,
        totalAmount,
        email,
    });
    res.status(201).json({ message: "Order created successfully", order });
}));
const getOrderHistory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return res.status(400).json({ error: "User is required" });
    }
    const orders = yield order_service_1.orderService.getOrderHistory(user);
    res.status(200).json(orders);
}));
const updateOrderStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const { status } = req.body;
    if (!["Pending", "Shipped", "Received", "Cancelled"].includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
    }
    const updatedOrder = yield order_service_1.orderService.updateOrderStatus(orderId, status);
    if (!updatedOrder) {
        return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(updatedOrder);
}));
const createCheckoutSession = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartItems, shippingDetails, email } = req.body;
    const session = yield order_service_1.orderService.createStripeSession({
        cartItems,
        shippingDetails,
        email,
    });
    res.status(200).json({ id: session.id });
}));
exports.orderControllers = {
    createOrder,
    getOrderHistory,
    updateOrderStatus,
    createCheckoutSession,
};
