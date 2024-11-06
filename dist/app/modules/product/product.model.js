"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', required: true },
    gender: { type: String, enum: ['Men', 'Women', 'Unisex'] },
    rating: { type: Number, default: 0 },
    images: [{ type: String }],
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            return ret;
        },
    },
    toObject: {
        transform: function (doc, ret) {
            delete ret.__v;
            return ret;
        },
    },
});
exports.Product = (0, mongoose_1.model)('Product', productSchema);
