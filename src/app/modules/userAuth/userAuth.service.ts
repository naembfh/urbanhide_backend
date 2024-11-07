import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TLoginUser, TUserAuth, UserRole } from "./userAuth.interface";
import { UserAuth } from "./userAuth.model";
import { Express } from 'express-serve-static-core';
import cloudinary from "../../config/cloudinaryConfig";

const signupService = async (payload: TUserAuth, file?: Express.Multer.File) => {
  let imageUrl = '';

  // Upload image if a file is provided
  if (file) {
    const result = await cloudinary.uploader.upload(file.path);
    imageUrl = result.secure_url;
  }

  // const newUser = await UserAuth.create(payload);
  const newUser = new UserAuth({ ...payload, img: imageUrl });
  await newUser.save();
  return newUser;
};

const loginService = async (payload: TLoginUser) => {
  console.log('userservc')
  
  const user = await UserAuth.IsUserExistsByEmail(payload.email);
  console.log(user)
  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This user is not found or email is invalid!"
    );
  }

  if (!(await UserAuth.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password does not match");
  }

  const jwtPayload = {
    userId: user.id,        
    phone: user.phone,
    name: user.name,        
    email: user.email,      
    role: user.role,        
    address: user?.address,  
    img: user?.img,  
  };

  const accessToken = createAccessToken(jwtPayload);
  const refreshToken = createRefreshToken(jwtPayload);

  // Save refresh token in the database
  user.refreshToken = refreshToken;
  await user.save();

  console.log(user)

  return {
    user,
    accessToken,
    refreshToken,
  };
};

const createAccessToken = (payload: any) => {
  return jwt.sign(payload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });
};

const createRefreshToken = (payload: any) => {
  return jwt.sign(payload, config.jwt_refresh_secret as string, {
    expiresIn: config.jwt_refresh_expires_in,
  });
};

const findUserByRefreshToken = async (refreshToken: string) => {
  return await UserAuth.findOne({ refreshToken });
};

const getAllUsersService = async () => {
  const users = await UserAuth.find({});
  return users;
};

const updateUserRoleService = async (userId: string, newRole: UserRole) => {
  const user = await UserAuth.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  user.role = newRole;
  await user.save();
  return user;
};

const updateUserProfile = async (
  userId: string,
  updatedData: Partial<TUserAuth>,
  file?: Express.Multer.File
) => {
  const user = await UserAuth.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Handle image upload if a new file is provided
  if (file) {
    const result = await cloudinary.uploader.upload(file.path);
    user.img = result.secure_url;
  }


  // Update other user fields
  user.name = updatedData.name || user.name;
  user.email = updatedData.email || user.email;
  user.phone = updatedData.phone || user.phone;
  user.address = updatedData.address || user.address;

  await user.save();

  return user;
};


export const UserAuthService = {
  signupService,
  loginService,
  createAccessToken,
  createRefreshToken,
  findUserByRefreshToken,
  getAllUsersService,
  updateUserRoleService,
  updateUserProfile,
};
