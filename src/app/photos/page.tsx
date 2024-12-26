// "use server";
// import ImageGallery from "@/components/photos/ImageGallery";
// import ImageGallerySkeleton from "@/components/photos/ImageGallerySkeleton";
// import { getImagesFromR2 } from "@/lib/photos/getImages";
// import { Suspense } from 'react';
//
// export default async function ImageGalleryPage() {
//   const images = await getImagesFromR2();
//
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Image Gallery</h1>
//       <Suspense fallback={<ImageGallerySkeleton />}>
//         <ImageGallery images={images} />
//       </Suspense>
//     </div>
//   );
// }
//

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import PhotoGrid from "@/components/admin/PhotoGrid";

export default function PhotoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Photo Gallery</h1>
      <Suspense fallback={<PhotoGridSkeleton />}>
        <PhotoGrid />
      </Suspense>
    </div>
  );
}

function PhotoGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <Skeleton key={i} className="w-full aspect-square rounded-lg" />
      ))}
    </div>
  )
}

