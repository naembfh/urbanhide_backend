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
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const userAuth_model_1 = require("../modules/userAuth/userAuth.model");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const USER_ROLE = {
    USER: "USER",
    ADMIN: "ADMIN",
};
const auth = (requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        console.log('auth');
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        console.log(token);
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized!");
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        const { role, email } = decoded;
        // Check if user exists
        const user = yield userAuth_model_1.UserAuth.IsUserExistsByEmail(email);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
        }
        // Ensure user has the required role
        if (!requiredRoles.includes(role)) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "You have no access to this route");
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
