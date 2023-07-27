import { Document, models, model, Model, Schema } from "mongoose";

// Define the category values schema
export interface CategoryValue {
  name: string;
  values: string[];
}

// Define the category schema
export interface CategoryDocument extends Document {
  name: string;
  values: CategoryValue[];
}

const CategorySchema: Schema<CategoryDocument> = new Schema({
  name: { type: String, required: true },
  values: [{ type: Object, required: true }],
});

const Category: Model<CategoryDocument> =
  models.Category || model<CategoryDocument>("Category", CategorySchema);

export default Category;
