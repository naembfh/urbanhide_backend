import { Request, Response } from 'express';
import { categoryServices } from './category.service';
import { Express } from 'express-serve-static-core';


// Controller to add a new category
const addCategory = async (req: Request, res: Response) => {
    console.log('hello')
  try {
    const category = await categoryServices.addCategoryService(req.body, req.file as Express.Multer.File);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Controller to get all categories
const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryServices.getAllCategoriesService();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Controller to update a category
const updateCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const updatedCategory = await categoryServices.updateCategoryService(
      categoryId,
      req.body,
      req.file as Express.Multer.File
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Controller to delete a category
const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    await categoryServices.deleteCategoryService(categoryId);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Export all category controllers as a single object
export const categoryControllers = {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
