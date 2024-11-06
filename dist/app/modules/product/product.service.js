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
exports.productServices = void 0;
const cloudinaryConfig_1 = __importDefault(require("../../config/cloudinaryConfig"));
const product_model_1 = require("./product.model");
// Service to create a new product with image uploads
const addProductService = (data, files) => __awaiter(void 0, void 0, void 0, function* () {
    const imageUrls = [];
    console.log('hello product serv');
    for (const file of files) {
        const result = yield cloudinaryConfig_1.default.uploader.upload(file.path);
        console.log('Cloudinary upload result:', result);
        imageUrls.push(result.secure_url);
    }
    const product = new product_model_1.Product(Object.assign(Object.assign({}, data), { images: imageUrls }));
    try {
        const savedProduct = yield product.save();
        console.log('Product saved:', savedProduct);
        return savedProduct;
    }
    catch (error) {
        console.error('Error saving product:', error);
        throw error; // Optionally, rethrow the error to handle it further up the call stack
    }
});
// Service to get all products
const getAllProductsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.find({}).populate('category');
});
// Service to get a product by ID
const getProductByIdService = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.findById(productId).populate('category');
});
// Service to update a product
const updateProductService = (productId, data, files) => __awaiter(void 0, void 0, void 0, function* () {
    const imageUrls = data.images || [];
    for (const file of files) {
        const result = yield cloudinaryConfig_1.default.uploader.upload(file.path);
        imageUrls.push(result.secure_url);
    }
    const updatedProduct = yield product_model_1.Product.findByIdAndUpdate(productId, Object.assign(Object.assign({}, data), { images: imageUrls }), { new: true });
    return updatedProduct;
});
// Service to delete a product
const deleteProductService = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    yield product_model_1.Product.findByIdAndDelete(productId);
});
// Export all product services as a single object
exports.productServices = {
    addProductService,
    getAllProductsService,
    updateProductService,
    deleteProductService,
    getProductByIdService
};
