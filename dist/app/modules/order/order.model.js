"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderItemSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    imageUrl: { type: String, required: true },
});
const shippingDetailsSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
});
const orderSchema = new mongoose_1.default.Schema({
    items: [orderItemSchema],
    total: { type: Number, required: true },
    status: {
        type: String,
        enum: ["Pending", "Shipped", "Received", "Cancelled"],
        default: "Pending",
    },
    email: { type: String, required: true },
    shippingDetails: shippingDetailsSchema,
    date: { type: Date, default: Date.now },
}, { timestamps: true });
exports.Order = mongoose_1.default.model("Order", orderSchema);
