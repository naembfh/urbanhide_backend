import { Document, Model } from 'mongoose';

export interface ICategory {
  name: string;
  description?: string;
  image?: string; // URL for the image stored in Cloudinary
}

export interface CategoryDocument extends ICategory, Document {}

export interface CategoryModel extends Model<CategoryDocument> {}
