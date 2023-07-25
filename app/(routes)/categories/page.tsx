import CategoryTable from "@/components/Category-Table/category-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      {/* Table of products*/}
      <CategoryTable />
    </div>
  );
};

export default page;
