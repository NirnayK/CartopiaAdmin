import { mongooseConnect } from "@/lib/mongoose";
import { DataTable } from "@/components/data-table";
import Category from "@/models/category";
import { CategoryDocument, columns } from "./columns";

export default async function CategoryTable() {
  await mongooseConnect();

  const getCategory = async (): Promise<CategoryDocument[]> => {
    try {
      return await Category.find({}).select("name  _id").lean();
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  const rawdata = await getCategory();

  const data: CategoryDocument[] = rawdata.map((category) => {
    return {
      _id: category._id.toString(),
      name: category.name,
    };
  });

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
