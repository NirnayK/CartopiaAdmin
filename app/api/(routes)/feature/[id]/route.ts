import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/product";
import FeatureProduct from "@/models/feature-product";

export const POST = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await mongooseConnect();
    try {
      const product = await Product.findById(params.id);
      const newFeatureProduct = await FeatureProduct.create({
        _id: params.id,
        ...product.toObject(),
      });
      console.log("New feature product created", newFeatureProduct);
      return new Response(JSON.stringify(newFeatureProduct), { status: 201 });
    } catch (error) {
      console.log("Error in creating a new feature product");
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    }
  } catch (error) {
    console.log("Error in connecting to the database");
    console.error(error);
    return new Response(JSON.stringify(error), { status: 501 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await mongooseConnect();
    try {
      const deletedFeatureProduct = await FeatureProduct.findByIdAndDelete(
        params.id
      );
      console.log("Feature product deleted", deletedFeatureProduct);
      return new Response(JSON.stringify(deletedFeatureProduct), {
        status: 200,
      });
    } catch (error) {
      console.log("Error in deleting feature product");
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    }
  } catch (error) {
    console.log("Error in connecting to the database");
    console.error(error);
    return new Response(JSON.stringify(error), { status: 501 });
  }
};
