import express from "express";
import auth from "../../middlewares/auth";
import { userAuthControllers } from "./userAuth.controller";

const router = express.Router();

router.post("/signup", userAuthControllers.signup);
router.post("/login", userAuthControllers.login);
router.post("/refresh-token", userAuthControllers.refreshToken); // Add refresh token route
router.get("/all-users", auth(["ADMIN"]), userAuthControllers.getAllUsers);
router.patch(
  "/update-role",
  auth(["ADMIN"]),
  userAuthControllers.updateUserRole
);

router.patch(
  "/update-profile",
  auth(["USER", "ADMIN"]),
  userAuthControllers.updateProfile
);

export const UserAuthRoutes = router;
