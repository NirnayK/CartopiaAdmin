import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/product";
import { ObjectId } from "mongodb";

function capitalize(input: string): string {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await mongooseConnect();
    try {
      const product = await Product.findById(params.id);
      return new Response(JSON.stringify(product), { status: 200 });
    } catch (error) {
      console.log("Error in finding product");
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    }
  } catch (error) {
    console.log("Error in connecting to the database");
    console.error(error);
    return new Response(JSON.stringify(error), { status: 501 });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const data = await req.json();
    const { categoryid } = data;
    const category = new ObjectId(categoryid);
    await mongooseConnect();
    try {
      const name = capitalize(data.name);
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: params.id },
        {
          $set: {
            name: name,
            price: data.price,
            description: data.description,
            category: category,
            properties: data.properties,
            images: data.images,
          },
        },
        { new: true } // To return the updated document
      );
      return new Response(JSON.stringify(updatedProduct), { status: 200 });
    } catch (error) {
      console.log("Error in updating product");
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
      const deletedProduct = await Product.findByIdAndDelete(params.id);
      return new Response(JSON.stringify(deletedProduct), { status: 200 });
    } catch (error) {
      console.log("Error in deleting product");
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    }
  } catch (error) {
    console.log("Error in connecting to the database");
    console.error(error);
    return new Response(JSON.stringify(error), { status: 501 });
  }
};
