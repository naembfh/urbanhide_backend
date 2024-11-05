import express from "express";
import auth from "../../middlewares/auth";

import { ReviewController } from "./review.controller";

const router = express.Router();

// Route to create a review (protected route)
router.post("/create", auth(["ADMIN", "USER"]), ReviewController.createReview);

// Route to show reviews (can be public or restricted by role)
router.get("/show/:productId", ReviewController.showReviews);

export const ReviewRoutes = router;
