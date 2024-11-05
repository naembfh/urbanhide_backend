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
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryControllers = void 0;
const category_service_1 = require("./category.service");
// Controller to add a new category
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('hello');
    try {
        const category = yield category_service_1.categoryServices.addCategoryService(req.body, req.file);
        res.status(201).json(category);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Controller to get all categories
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_service_1.categoryServices.getAllCategoriesService();
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Controller to update a category
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        const updatedCategory = yield category_service_1.categoryServices.updateCategoryService(categoryId, req.body, req.file);
        res.status(200).json(updatedCategory);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Controller to delete a category
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        yield category_service_1.categoryServices.deleteCategoryService(categoryId);
        res.status(200).json({ message: 'Category deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Export all category controllers as a single object
exports.categoryControllers = {
    addCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
};
