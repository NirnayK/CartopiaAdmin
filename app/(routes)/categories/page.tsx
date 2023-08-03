import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import CategoryTable from "@/components/Tables/Category-Table/category-table";
import TableSkeleton from "@/components/Skeletons/table-skeleton";

const page = () => {
  return (
    <div className="flex flex-col space-y-1">
      {/* Add a new product */}
      <div className="mx-auto flex md:flex-row gap-4 items-center">
        <h1 className="text-xl md:text-2xl font-bold">Add A New Category</h1>
        <Link href="/categories/new">
          <Button variant="outline">ADD</Button>
        </Link>
      </div>
      {/* Table of categories*/}
      <div className="space-y-20">
        <Suspense fallback={<TableSkeleton />}>
          <CategoryTable />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
