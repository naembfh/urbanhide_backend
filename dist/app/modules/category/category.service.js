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
exports.categoryServices = void 0;
const cloudinaryConfig_1 = __importDefault(require("../../config/cloudinaryConfig"));
const category_model_1 = require("./category.model");
// Service to create a new category with image upload
const addCategoryService = (data, file) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('service');
    let imageUrl = '';
    // Upload image if a file is provided
    if (file) {
        const result = yield cloudinaryConfig_1.default.uploader.upload(file.path);
        imageUrl = result.secure_url;
    }
    const category = new category_model_1.Category(Object.assign(Object.assign({}, data), { image: imageUrl }));
    yield category.save();
    return category;
});
// Service to get all categories
const getAllCategoriesService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_model_1.Category.find({});
});
// Service to update a category
const updateCategoryService = (categoryId, data, file) => __awaiter(void 0, void 0, void 0, function* () {
    let imageUrl = data.image;
    // If a new image file is provided, upload it to Cloudinary
    if (file) {
        const result = yield cloudinaryConfig_1.default.uploader.upload(file.path);
        imageUrl = result.secure_url;
    }
    const updatedCategory = yield category_model_1.Category.findByIdAndUpdate(categoryId, Object.assign(Object.assign({}, data), { image: imageUrl }), { new: true });
    return updatedCategory;
});
// Service to delete a category
const deleteCategoryService = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    yield category_model_1.Category.findByIdAndDelete(categoryId);
});
// Export all category services as a single object
exports.categoryServices = {
    addCategoryService,
    getAllCategoriesService,
    updateCategoryService,
    deleteCategoryService,
};
