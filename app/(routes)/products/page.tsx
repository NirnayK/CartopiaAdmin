import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import TableSkeleton from "@/components/Skeletons/table-skeleton";
import ProductTable from "@/components/Tables/Product-Table/products-table";
import FeaturedTable from "@/components/Tables/Featured-Table/featured-table";

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
      <div className="flex-col space-y-20">
        <Suspense fallback={<TableSkeleton />}>
          <FeaturedTable />
        </Suspense>

        {/* Table of products*/}
        <Suspense fallback={<TableSkeleton />}>
          <ProductTable />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
