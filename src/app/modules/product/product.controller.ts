import { Request, Response } from 'express';
import { productServices } from './product.service';
import { Express } from 'express-serve-static-core';

// Controller to add a new product
const addProduct = async (req: Request, res: Response) => {
  try {
    console.log('hello product')
    const product = await productServices.addProductService(req.body, req.files as Express.Multer.File[]);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Controller to get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productServices.getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await productServices.getProductByIdService(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Controller to update a product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedProduct = await productServices.updateProductService(
      productId,
      req.body,
      req.files as Express.Multer.File[]
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Controller to delete a product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    await productServices.deleteProductService(productId);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Export all product controllers as a single object
export const productControllers = {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById
};
