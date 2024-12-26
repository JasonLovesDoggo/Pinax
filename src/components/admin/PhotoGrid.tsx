"use client";

import { useState } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cloudflareR2Loader } from "@/lib/photos/cloudflareLoader";
import { usePhotos } from "@/hooks/photos";

export default function PhotoGrid() {
  const { photos, loadMore } = usePhotos();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const { ref, inView } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView) {
        loadMore();
      }
    },
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="relative aspect-square cursor-pointer"
            onClick={() => setSelectedPhoto(photo.url)}
          >
            <Image
              src={photo.url}
              alt={`Photo ${index + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="rounded-lg object-cover"
              loading="lazy"
              loader={cloudflareR2Loader}
            />
          </div>
        ))}
      </div>
      <div ref={ref} className="h-10" />
      <Dialog
        open={!!selectedPhoto}
        onOpenChange={() => setSelectedPhoto(null)}
      >
        <DialogContent className="max-w-3xl">
          {selectedPhoto && (
            <div className="relative aspect-square">
              <Image
                src={selectedPhoto}
                alt="Selected photo"
                fill
                sizes="100vw"
                className="object-contain"
                priority
                loader={cloudflareR2Loader}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
