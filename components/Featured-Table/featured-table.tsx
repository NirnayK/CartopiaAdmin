import { mongooseConnect } from "@/lib/mongoose";
import FeatureProduct from "@/models/feature-product";
import { ProductDocument, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import Product from "@/models/product";

type category = {
  _id: string;
  name: string;
};

interface OgProductDocument {
  _id: string;
  name: string;
  price: number;
  category: category;
}

export default async function FeaturedTable() {
  await mongooseConnect();

  const getProducts = async (): Promise<OgProductDocument[]> => {
    try {
      return await Product.find({})
        .select("name category price _id") // Select only the specified fields
        .populate({ path: "category", select: "name" })
        .lean();
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  const rawdata = await getProducts();

  const data: ProductDocument[] = rawdata.map((product) => {
    return {
      _id: product._id.toString(),
      name: product.name,
      price: product.price,
      category_id: product.category._id.toString(),
      categoryName: product.category.name,
    };
  });

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
