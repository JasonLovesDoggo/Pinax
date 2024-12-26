import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import SortOrder from "@/components/photos/SortOrder";
import TagFilter from "@/components/photos/TagFilter";
import PhotoGrid from "@/components/admin/PhotoGrid";

export default function PhotoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Photo Gallery</h1>
      <div className="mb-4 flex items-center justify-between">
        <TagFilter />
        <SortOrder />
      </div>
      <Suspense fallback={<PhotoGridSkeleton />}>
        <PhotoGrid />
      </Suspense>
    </div>
  );
}

function PhotoGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <Skeleton key={i} className="aspect-square w-full rounded-lg" />
      ))}
    </div>
  );
}
