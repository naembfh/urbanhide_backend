"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multerConfig_1 = __importDefault(require("../../config/multerConfig"));
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router.post('/create', multerConfig_1.default.single('image'), category_controller_1.categoryControllers.addCategory);
router.get('/all', category_controller_1.categoryControllers.getAllCategories);
router.put('/edit/:categoryId', multerConfig_1.default.single('image'), category_controller_1.categoryControllers.updateCategory);
router.delete('/delete/:categoryId', category_controller_1.categoryControllers.deleteCategory);
exports.categoryRoutes = router;
