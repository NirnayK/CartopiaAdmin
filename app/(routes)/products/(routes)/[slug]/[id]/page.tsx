import Category from "@/models/category";
import { mongooseConnect } from "@/lib/mongoose";
import ProductForm from "@/components/Forms/product-form";
import Product, { ProductProperties } from "@/models/product";
import { CategoryDocument } from "@/components/Forms/category-form";

interface ProductData {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  properties: ProductProperties;
  images: string[];
}

const getCategory = async (): Promise<CategoryDocument[]> => {
  try {
    return await Category.find({}).lean();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const getProduct = async (id: string): Promise<ProductData> => {
  try {
    const res = await Product.findById(id).lean();
    return res as ProductData;
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      _id: "",
      name: "",
      price: 0,
      description: "",
      category: "",
      properties: {},
      images: [],
    };
  }
};

const page = async ({ params }: { params: { slug: string; id: string } }) => {
  await mongooseConnect();
  const rawdata = await getCategory();

  const data: CategoryDocument[] = rawdata.map((category) => {
    return {
      _id: category._id.toString(),
      name: category.name,
      values: category.values,
    };
  });

  const rawproduct = await getProduct(params.id);

  if (!rawproduct || Object.keys(rawproduct).length === 0) {
    return null;
  }

  const product: ProductData = {
    _id: rawproduct._id.toString(),
    name: rawproduct.name,
    price: rawproduct.price,
    description: rawproduct.description,
    category: rawproduct.category.toString(),
    properties: rawproduct.properties,
    images: rawproduct.images,
  };

  return (
    <ProductForm
      proddata={product}
      categories={data}
      method={params.slug.toUpperCase()}
    />
  );
};

export default page;
