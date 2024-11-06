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
exports.orderService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../config"));
const order_model_1 = require("./order.model");
const stripe = new stripe_1.default(config_1.default.stripe_secret_key); // Ensure the key is a string
const createOrder = (_a) => __awaiter(void 0, [_a], void 0, function* ({ shippingDetails, cartItems, totalAmount, email }) {
    const order = new order_model_1.Order({
        shippingDetails,
        items: cartItems,
        total: totalAmount,
        email,
    });
    yield order.save();
    return order;
});
const getOrderHistory = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.role === "ADMIN") {
        return yield order_model_1.Order.find().sort({ date: -1 });
    }
    return yield order_model_1.Order.find({ email: user.email }).sort({ date: -1 });
});
const updateOrderStatus = (orderId, status) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.Order.findByIdAndUpdate(orderId, { status }, { new: true });
});
const createStripeSession = (_b) => __awaiter(void 0, [_b], void 0, function* ({ cartItems, shippingDetails, email, }) {
    const lineItems = cartItems.map((item) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: item.name,
                images: [item.imageUrl],
            },
            unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
    }));
    const session = yield stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        line_items: lineItems,
        mode: "payment",
        metadata: {
            orderId: `${new Date().getTime()}`,
        },
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
    return session;
});
exports.orderService = {
    createOrder,
    getOrderHistory,
    updateOrderStatus,
    createStripeSession,
};
