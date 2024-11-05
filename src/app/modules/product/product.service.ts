import cloudinary from '../../config/cloudinaryConfig';
import { Product } from './product.model';
import { IProduct } from './product.interface';
import { Express } from 'express-serve-static-core';


// Service to create a new product with image uploads
const addProductService = async (data: IProduct, files: Express.Multer.File[]) => {
  const imageUrls: string[] = [];
  console.log('hello product serv');

  for (const file of files) {
    const result = await cloudinary.uploader.upload(file.path);
    console.log('Cloudinary upload result:', result);
    imageUrls.push(result.secure_url);
  }

  const product = new Product({ ...data, images: imageUrls });
  try {
    const savedProduct = await product.save();
    console.log('Product saved:', savedProduct);
    return savedProduct;
  } catch (error) {
    console.error('Error saving product:', error);
    throw error;  // Optionally, rethrow the error to handle it further up the call stack
  }
};


// Service to get all products
const getAllProductsService = async () => {
  return await Product.find({}).populate('category');
};

// Service to get a product by ID
const getProductByIdService = async (productId: string) => {
  return await Product.findById(productId).populate('category');
};

// Service to update a product
const updateProductService = async (productId: string, data: IProduct, files: Express.Multer.File[]) => {
  const imageUrls: string[] = data.images || [];

  for (const file of files) {
    const result = await cloudinary.uploader.upload(file.path);
    imageUrls.push(result.secure_url);
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { ...data, images: imageUrls },
    { new: true }
  );
  return updatedProduct;
};

// Service to delete a product
const deleteProductService = async (productId: string) => {
  await Product.findByIdAndDelete(productId);
};

// Export all product services as a single object
export const productServices = {
  addProductService,
  getAllProductsService,
  updateProductService,
  deleteProductService,
  getProductByIdService
};
