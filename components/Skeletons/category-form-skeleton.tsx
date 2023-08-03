import { Skeleton } from "@/components/ui/skeleton";

const CategoryFormSkeleton = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col space-y-6 w-[380px] md:w-[1000px]">
        <div className="text-lg font-medium">Name</div>
        <Skeleton className="h-12 w-full" />

        <div className="text-lg font-medium">Properties</div>
        <Skeleton className="h-12 w-full" />

        <div className="text-lg font-medium">Values:</div>
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
};

export default CategoryFormSkeleton;
