import { mongooseConnect } from "@/lib/mongoose";
import Category from "@/models/category";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await mongooseConnect();
    try {
      const category = await Category.findById(params.id);
      if (!category) return new Response("Category Not Found", { status: 404 });
      return new Response(JSON.stringify(category), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 501 });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await mongooseConnect();
    try {
      const data = await req.json();
      const updatedCategory = await Category.findOneAndUpdate(
        { _id: params.id },
        {
          $set: {
            name: data.name,
            values: data.values,
          },
        },
        { new: true } // To return the updated document
      );

      return new Response(JSON.stringify(updatedCategory), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    }
  } catch (error) {
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
      await Category.findByIdAndDelete({ _id: params.id });
      return new Response("Category deleted successfully", { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 501 });
  }
};
