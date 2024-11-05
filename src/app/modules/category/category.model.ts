import { Schema, model } from 'mongoose';
import { CategoryDocument, CategoryModel } from './category.interface';

const categorySchema = new Schema<CategoryDocument, CategoryModel>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const Category = model<CategoryDocument, CategoryModel>('Category', categorySchema);
