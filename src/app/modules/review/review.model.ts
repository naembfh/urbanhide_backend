import { Schema, model } from "mongoose";
import { TReview } from "./review.interface";
import { Product } from "../product/product.model";


// Define the schema
const reviewSchema = new Schema<TReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Middleware to update the product rating after a review is created or updated
reviewSchema.post("save", async function () {
  const review = this;
  
  // Calculate average rating for the product
  const reviews = await Review.find({ productId: review.productId });
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  // Update the product with the new average rating
  await Product.findByIdAndUpdate(review.productId, { rating: averageRating });
});

export const Review = model<TReview>("Review", reviewSchema);
