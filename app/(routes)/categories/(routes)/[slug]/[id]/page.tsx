import Category from "@/models/category";
import { mongooseConnect } from "@/lib/mongoose";
import CategoryForm from "@/components/Forms/category-form";
import { CategoryDocument } from "@/components/Forms/category-form";

const getCategorybyID = async (id: string): Promise<CategoryDocument> => {
  try {
    const res = await Category.findById(id).lean();
    return {
      _id: res?._id.toString(),
      name: res?.name,
      values: res?.values,
    } as CategoryDocument;
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      _id: "",
      name: "",
      values: [],
    };
  }
};

const page = async ({ params }: { params: { slug: string; id: string } }) => {
  await mongooseConnect();

  const data = await getCategorybyID(params.id);

  return (
    <div>
      <CategoryForm catdata={data} method={params.slug.toUpperCase()} />
    </div>
  );
};

export default page;
