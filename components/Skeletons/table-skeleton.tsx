import { Skeleton } from "@/components/ui/skeleton";

// Table skeleton
const TableSkeleton = () => {
  return (
    <div className="flex w-full justify-center">
      <Skeleton className="h-[250px] w-4/5" />
    </div>
  );
};

export default TableSkeleton;
