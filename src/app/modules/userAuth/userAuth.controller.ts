import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserAuthService } from "./userAuth.service";
import { UserAuth } from "./userAuth.model";
import { Express } from 'express-serve-static-core';

const signup = catchAsync(async (req, res) => {
  const user = await UserAuthService.signupService(req.body, req.file as Express.Multer.File);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User registered successfully",
    data: user,
  });
});

const login = catchAsync(async (req, res) => {
  console.log(req.body)
  const userData = await UserAuthService.loginService(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: userData,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Refresh token is required");
  }

  const user = await UserAuthService.findUserByRefreshToken(refreshToken);
  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, "Invalid refresh token");
  }

  // Verify the refresh token
  const verifiedToken = jwt.verify(
    refreshToken,
    config.jwt_refresh_secret as string
  );

  const jwtPayload = {
    userId: user.id,       
    phone: user.phone,
    name: user.name,        
    email: user.email,    
    role: user.role,      
    address: user?.address, 
    img: user?.img,  
  };

  // Generate new access token
  const newAccessToken = UserAuthService.createAccessToken(jwtPayload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Access token refreshed successfully",
    accessToken: newAccessToken,
    data: null, 
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserAuthService.getAllUsersService();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users fetched successfully",
    data: users,
  });
});

const updateUserRole = catchAsync(async (req, res) => {


  const { userId, role } = req.body;

  const updatedUser = await UserAuthService.updateUserRoleService(
    userId,
    role
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User role updated successfully",
    data: updatedUser,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const userId = req.user.userId; // Get user ID from authenticated user context
  const updatedData = req.body;
  const file = req.file as Express.Multer.File; // Image file uploaded

  const updatedUser = await UserAuthService.updateUserProfile(userId, updatedData, file);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Profile updated successfully",
    data: updatedUser,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const user = await UserAuth.findByIdAndDelete(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User deleted successfully",
    data: user,
  });
});

export const userAuthControllers = {
  signup,
  login,
  refreshToken,
  getAllUsers,
  updateUserRole,
  updateProfile,
  deleteUser,
};
