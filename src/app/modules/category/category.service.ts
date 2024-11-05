import cloudinary from '../../config/cloudinaryConfig';
import { Category } from './category.model';
import { ICategory } from './category.interface'; // Assuming you have an interface for Category
import { Express } from 'express-serve-static-core';

// Service to create a new category with image upload
const addCategoryService = async (data: ICategory, file?: Express.Multer.File) => {
    console.log('service')
  let imageUrl = '';

  // Upload image if a file is provided
  if (file) {
    const result = await cloudinary.uploader.upload(file.path);
    imageUrl = result.secure_url;
  }

  const category = new Category({ ...data, image: imageUrl });
  await category.save();
  return category;
};

// Service to get all categories
const getAllCategoriesService = async () => {
  return await Category.find({});
};

// Service to update a category
const updateCategoryService = async (categoryId: string, data: ICategory, file?: Express.Multer.File) => {
  let imageUrl = data.image;

  // If a new image file is provided, upload it to Cloudinary
  if (file) {
    const result = await cloudinary.uploader.upload(file.path);
    imageUrl = result.secure_url;
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    categoryId,
    { ...data, image: imageUrl },
    { new: true }
  );
  return updatedCategory;
};

// Service to delete a category
const deleteCategoryService = async (categoryId: string) => {
  await Category.findByIdAndDelete(categoryId);
};

// Export all category services as a single object
export const categoryServices = {
  addCategoryService,
  getAllCategoriesService,
  updateCategoryService,
  deleteCategoryService,
};
