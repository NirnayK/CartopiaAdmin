import { Document, model, Schema, models } from "mongoose";
import Category from "@/models/category";

export interface ProductProperties {
  [key: string]: string | number;
}

export interface ProductDocument extends Document {
  name: string;
  price: number;
  description: string;
  category: Schema.Types.ObjectId;
  properties: ProductProperties;
  images: string[];
}

export const productSchema: Schema<ProductDocument> = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: Category,
    required: true,
  },
  properties: {
    type: Schema.Types.Mixed, // Use Schema.Types.Mixed for any type of value
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
});

const Product =
  models.Product || model<ProductDocument>("Product", productSchema);

export default Product;
