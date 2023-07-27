import FeaturedTable from "@/components/Tables/Featured-Table/featured-table";
import ProductTable from "@/components/Tables/Product-Table/products-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col space-y-2">
      {/* Add a new product */}
      <div className="mx-auto flex md:flex-row gap-4 items-center">
        <h1 className="text-xl md:text-2xl font-bold">Add A New Product</h1>
        <Link href="/products/new">
          <Button variant="outline">ADD</Button>
        </Link>
      </div>
      {/* Feature Table */}
      <FeaturedTable />
      {/* Table of products*/}
      <ProductTable />
    </div>
  );
};

export default page;
