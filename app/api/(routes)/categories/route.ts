import { mongooseConnect } from "@/lib/mongoose";
import Category from "@/models/category";

export const POST = async (req: Request) => {
  try {
    const jsonData = await req.json();
    console.log(jsonData);
    const { name, values } = jsonData;
    console.log(values);
    await mongooseConnect();
    try {
      const newCategory = await Category.create({ name, values });
      return new Response(JSON.stringify(newCategory), { status: 201 });
    } catch (error) {
      console.log("Error in creating a new category");
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    }
  } catch (error) {
    console.log("Error in connecting to the database");
    console.error(error);
    return new Response(JSON.stringify(error), { status: 501 });
  }
};

export const GET = async (req: Request) => {
  try {
    await mongooseConnect();
    try {
      const Categories = await Category.find();
      return new Response(JSON.stringify(Categories), { status: 200 });
    } catch (error) {
      console.log("Error in fetching categories");
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    }
  } catch (error) {
    console.log("Error in connecting to the database");
    console.error(error);
    return new Response(JSON.stringify(error), { status: 501 });
  }
};
