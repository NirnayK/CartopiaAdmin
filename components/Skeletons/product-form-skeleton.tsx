import { Skeleton } from "@/components/ui/skeleton";

const ProductFormSkeleton = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col space-y-6 w-[380px] md:w-[1000px]">
        <div className="text-lg font-medium">Name</div>
        <Skeleton className="h-12 w-full" />

        <div className="text-lg font-medium">Price</div>
        <Skeleton className="h-12 w-full" />

        <div className="text-lg font-medium">Description</div>
        <Skeleton className="h-24 w-full" />

        <div className="text-lg font-medium">Category</div>
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
};

export default ProductFormSkeleton;
