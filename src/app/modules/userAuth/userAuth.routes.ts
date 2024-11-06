import express from "express";
import auth from "../../middlewares/auth";
import { userAuthControllers } from "./userAuth.controller";
import upload from "../../config/multerConfig";

const router = express.Router();

router.post("/signup", upload.single('image'), userAuthControllers.signup);
router.post("/login", userAuthControllers.login);
router.post("/refresh-token", userAuthControllers.refreshToken); // Add refresh token route
router.get("/all-users", auth(["ADMIN"]), userAuthControllers.getAllUsers);
router.patch(
  "/update-role",
  auth(["ADMIN"]),
  userAuthControllers.updateUserRole
);

router.patch(
  "/update-profile", upload.single('image'),
  auth(["USER", "ADMIN"]),
  userAuthControllers.updateProfile
);

router.delete("/:userId", auth(["ADMIN"]), userAuthControllers.deleteUser);

export const UserAuthRoutes = router;
