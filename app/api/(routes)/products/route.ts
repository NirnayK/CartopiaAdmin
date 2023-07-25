import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/product";
import { ObjectId } from "mongodb";

function capitalize(input: string): string {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const POST = async (req: Request) => {
  try {
    console.log(req);
    const jsonData = await req.json();
    console.log(jsonData);
    const { price, description, categoryid, properties, images } = jsonData;
    const name = capitalize(jsonData.name);
    const category = new ObjectId(categoryid);
    await mongooseConnect();
    try {
      const newProduct = await Product.create({
        name,
        price,
        description,
        category,
        properties,
        images,
      });
      console.log("New product created", newProduct);
      return new Response(JSON.stringify(newProduct), { status: 201 });
    } catch (error) {
      console.log("Error in creating a new product");
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    }
  } catch (error) {
    console.log("Error in connecting to the database");
    console.error(error);
    return new Response(JSON.stringify(error), { status: 501 });
  }
};
