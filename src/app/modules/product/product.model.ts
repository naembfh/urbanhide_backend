import { Schema, model } from 'mongoose';
import { ProductDocument, ProductModel } from './product.interface';

const productSchema = new Schema<ProductDocument, ProductModel>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    gender: { type: String, enum: ['Men', 'Women', 'Unisex'] },
    rating: { type: Number, default: 0 },
    images: [{ type: String }],
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

export const Product = model<ProductDocument, ProductModel>('Product', productSchema);
