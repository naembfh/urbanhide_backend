import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { UserAuth } from "../modules/userAuth/userAuth.model";
import catchAsync from "../utils/catchAsync";

const USER_ROLE = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;

type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE]; // 'USER' | 'ADMIN'

interface JwtPayload {
  userId: string;
  role: TUserRole; // Updated to uppercase 'USER' | 'ADMIN'
  email: string;
}

const auth = (requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log('auth')
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token)

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, email } = decoded;

    // Check if user exists
    const user = await UserAuth.IsUserExistsByEmail(email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
    }

    // Ensure user has the required role
    if (!requiredRoles.includes(role)) {
      throw new AppError(httpStatus.FORBIDDEN, "You have no access to this route");
    }

    req.user = decoded;
    next();
  });
};

export default auth;
