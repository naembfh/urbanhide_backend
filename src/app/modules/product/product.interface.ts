import { Document, Model, Types } from 'mongoose';

export interface IProduct {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: Types.ObjectId; // Reference to Category model
  gender?: 'Men' | 'Women' | 'Unisex';
  rating: number;
  images: string[]; // Array of image URLs stored in Cloudinary
}

export interface ProductDocument extends IProduct, Document {}

export interface ProductModel extends Model<ProductDocument> {}
