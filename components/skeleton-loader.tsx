import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("skeleton rounded-md bg-muted", className)} />
}

export function BlogCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg p-6 animate-fade-in">
      <Skeleton className="h-4 w-20 mb-2" />
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <Skeleton className="h-4 w-24" />
    </div>
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden animate-fade-in">
      <Skeleton className="h-48 w-full" />
      <div className="p-6">
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-14" />
        </div>
      </div>
    </div>
  )
}
