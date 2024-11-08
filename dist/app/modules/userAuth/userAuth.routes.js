"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const userAuth_controller_1 = require("./userAuth.controller");
const multerConfig_1 = __importDefault(require("../../config/multerConfig"));
const router = express_1.default.Router();
router.post("/signup", multerConfig_1.default.single('image'), userAuth_controller_1.userAuthControllers.signup);
router.post("/login", userAuth_controller_1.userAuthControllers.login);
router.post("/refresh-token", userAuth_controller_1.userAuthControllers.refreshToken); // Add refresh token route
router.get("/all-users", (0, auth_1.default)(["ADMIN"]), userAuth_controller_1.userAuthControllers.getAllUsers);
router.patch("/update-role", (0, auth_1.default)(["ADMIN"]), userAuth_controller_1.userAuthControllers.updateUserRole);
router.patch("/update-profile", multerConfig_1.default.single('image'), (0, auth_1.default)(["USER", "ADMIN"]), userAuth_controller_1.userAuthControllers.updateProfile);
router.delete("/:userId", (0, auth_1.default)(["ADMIN"]), userAuth_controller_1.userAuthControllers.deleteUser);
exports.UserAuthRoutes = router;
