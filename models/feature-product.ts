import { model, models } from "mongoose";
import { ProductDocument, productSchema } from "@/models/product";

const FeatureProduct =
  models.FeatureProduct ||
  model<ProductDocument>("FeatureProduct", productSchema);

export default FeatureProduct;
