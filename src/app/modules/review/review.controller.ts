import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ReviewService } from "./review.service";
import { Types } from "mongoose";

// Handle creating a review
const createReview = catchAsync(async (req, res) => {
  console.log('review')
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const reviewData = req.body;

  const newReview = await ReviewService.createReview(user.userId, reviewData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Review created successfully",
    data: newReview,
  });
});

// Handle showing reviews
const showReviews = catchAsync(async (req, res) => {
  const { productId } = req.params;
  console.log(productId)

  // Convert productId to ObjectId if it exists and is a string
  const productObjectId = productId && typeof productId === "string" ? new Types.ObjectId(productId) : undefined;

  const reviews = await ReviewService.showReviews(productObjectId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Reviews retrieved successfully",
    data: reviews,
  });
});


export const ReviewController = {
  createReview,
  showReviews,
};
