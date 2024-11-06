import { Types } from "mongoose";
import { TReview } from "./review.interface";
import { Review } from "./review.model";

// Create a review
const createReview = async (
  userId: Types.ObjectId,
  reviewData: Partial<TReview>
) => {
  const newReview = await Review.create({
    user: userId,
    productId: reviewData.productId, // Add productId
    comment: reviewData.comment,
    rating: reviewData.rating,
  });

  return newReview;
};

// Show reviews (optionally filter by user or rating)
const showReviews = async (productId?: Types.ObjectId) => {
  const query = productId ? { productId } : {};

  const reviews = await Review.find(query)
    .populate({
      path: "user",
      select: "_id name email img",
    })
    .exec();

  const formattedReviews = reviews.map((review) => ({
    _id: review._id,
    username: (review.user as any)?.name || "Anonymous",
    email: (review.user as any)?.email || "N/A",
    img: (review.user as any)?.img || "/default-avatar.png",
    rating: review.rating,
    comment: review.comment,
    createdAt: review.createdAt,
  }));

  return formattedReviews;
};


export const ReviewService = {
  createReview,
  showReviews,
};
