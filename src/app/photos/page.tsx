"use client";

import { Suspense, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { gsap } from "gsap";
import TagFilter from "@/components/photos/TagFilter";
import SortOrder from "@/components/photos/SortOrder";
import PhotoGrid from "@/components/admin/PhotoGrid";

export default function PhotoPage() {
  useEffect(() => {
    gsap.from(".animate-in", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.5,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold animate-in">Photo Gallery</h1>
      <div className="mb-4 flex flex-col items-start justify-between space-y-4 animate-in sm:flex-row sm:items-center sm:space-y-0">
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
