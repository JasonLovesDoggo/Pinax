"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Masonry from "react-masonry-css";

export default function ImageGallerySkeleton() {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="-ml-4 flex w-auto"
      columnClassName="pl-4 bg-clip-padding"
    >
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="mb-4">
          <Skeleton className="h-48 w-full" />
        </div>
      ))}
    </Masonry>
  );
}
