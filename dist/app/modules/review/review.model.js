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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const product_model_1 = require("../product/product.model");
// Define the schema
const reviewSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });
// Middleware to update the product rating after a review is created or updated
reviewSchema.post("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const review = this;
        // Calculate average rating for the product
        const reviews = yield exports.Review.find({ productId: review.productId });
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;
        // Update the product with the new average rating
        yield product_model_1.Product.findByIdAndUpdate(review.productId, { rating: averageRating });
    });
});
exports.Review = (0, mongoose_1.model)("Review", reviewSchema);
