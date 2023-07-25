import Category from "@/models/category";
import { mongooseConnect } from "@/lib/mongoose";
import ProductForm from "@/components/Forms/product-form";
import { CategoryDocument } from "@/components/Forms/category-form";

const getCategory = async (): Promise<CategoryDocument[]> => {
  await mongooseConnect();
  try {
    return await Category.find({}).lean();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const page = async () => {
  const rawdata = await getCategory();

  const data: CategoryDocument[] = rawdata.map((category) => {
    return {
      _id: category._id.toString(),
      name: category.name,
      values: category.values,
    };
  });

  return <ProductForm categories={data} method="POST" />;
};

export default page;
