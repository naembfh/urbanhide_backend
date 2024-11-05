"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multerConfig_1 = __importDefault(require("../../config/multerConfig"));
const product_controller_1 = require("./product.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create', (0, auth_1.default)(["ADMIN"]), multerConfig_1.default.array('images', 5), product_controller_1.productControllers.addProduct);
router.get('/all', product_controller_1.productControllers.getAllProducts);
router.put('/edit/:productId', (0, auth_1.default)(["ADMIN"]), multerConfig_1.default.array('images', 5), product_controller_1.productControllers.updateProduct);
router.delete('/delete/:productId', (0, auth_1.default)(["ADMIN"]), product_controller_1.productControllers.deleteProduct);
exports.ProductRoutes = router;
