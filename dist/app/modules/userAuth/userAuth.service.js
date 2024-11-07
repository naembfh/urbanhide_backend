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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const userAuth_model_1 = require("./userAuth.model");
const cloudinaryConfig_1 = __importDefault(require("../../config/cloudinaryConfig"));
const signupService = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    let imageUrl = '';
    // Upload image if a file is provided
    if (file) {
        const result = yield cloudinaryConfig_1.default.uploader.upload(file.path);
        imageUrl = result.secure_url;
    }
    // const newUser = await UserAuth.create(payload);
    const newUser = new userAuth_model_1.UserAuth(Object.assign(Object.assign({}, payload), { img: imageUrl }));
    yield newUser.save();
    return newUser;
});
const loginService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('userservc');
    const user = yield userAuth_model_1.UserAuth.IsUserExistsByEmail(payload.email);
    console.log(user);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found or email is invalid!");
    }
    if (!(yield userAuth_model_1.UserAuth.isPasswordMatched(payload.password, user.password))) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password does not match");
    }
    const jwtPayload = {
        userId: user.id,
        phone: user.phone,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user === null || user === void 0 ? void 0 : user.address,
        img: user === null || user === void 0 ? void 0 : user.img,
    };
    const accessToken = createAccessToken(jwtPayload);
    const refreshToken = createRefreshToken(jwtPayload);
    // Save refresh token in the database
    user.refreshToken = refreshToken;
    yield user.save();
    console.log(user);
    return {
        user,
        accessToken,
        refreshToken,
    };
});
const createAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expires_in,
    });
};
const createRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.default.jwt_refresh_secret, {
        expiresIn: config_1.default.jwt_refresh_expires_in,
    });
};
const findUserByRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userAuth_model_1.UserAuth.findOne({ refreshToken });
});
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userAuth_model_1.UserAuth.find({});
    return users;
});
const updateUserRoleService = (userId, newRole) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userAuth_model_1.UserAuth.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    user.role = newRole;
    yield user.save();
    return user;
});
const updateUserProfile = (userId, updatedData, file) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userAuth_model_1.UserAuth.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    // Handle image upload if a new file is provided
    if (file) {
        const result = yield cloudinaryConfig_1.default.uploader.upload(file.path);
        user.img = result.secure_url;
    }
    // Update other user fields
    user.name = updatedData.name || user.name;
    user.email = updatedData.email || user.email;
    user.phone = updatedData.phone || user.phone;
    user.address = updatedData.address || user.address;
    yield user.save();
    return user;
});
exports.UserAuthService = {
    signupService,
    loginService,
    createAccessToken,
    createRefreshToken,
    findUserByRefreshToken,
    getAllUsersService,
    updateUserRoleService,
    updateUserProfile,
};
