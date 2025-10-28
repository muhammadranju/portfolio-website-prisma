import { Skeleton } from "@/components/ui/skeleton";

const ProjectCardSkeleton = () => {
  return (
    <div className="group hover:shadow-lg transition-all duration-300 animate-fade-in animate-pulse">
      <div className="aspect-video overflow-hidden rounded-t-lg">
        <Skeleton className="w-full h-full" />
      </div>
      <div>
        <div className="text-xl text-foreground group-hover:text-primary transition-colors">
          <Skeleton className="h-6 w-3/4" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-12 rounded-md" />
          <Skeleton className="h-6 w-16 rounded-md" />
          <Skeleton className="h-6 w-14 rounded-md" />
        </div>
        <div className="flex gap-3 pt-2">
          <Skeleton className="h-9 w-24 rounded-md" />
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
