import ImageGallery from "@/components/photos/ImageGallery";
import ImageGallerySkeleton from "@/components/photos/ImageGallerySkeleton";
import { Suspense } from "react";
import getImages from "@/lib/photos/getImages";

export default async function ImageGalleryPage() {
  const images = await getImages();

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Image Gallery</h1>
      <Suspense fallback={<ImageGallerySkeleton />}>
        <ImageGallery images={images} />
      </Suspense>
    </div>
  );
}
