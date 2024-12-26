"use client";

import { useState } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Photo } from "@/lib/photos/utils";
import { usePhotos } from "@/hooks/photos";
import { cloudflareR2Loader } from "@/lib/photos/cloudflareLoader";
import { Spinner } from "@/components/ui/spinner";

export default function PhotoGrid() {
  const { photos, loadMore, hasMore, loading } = usePhotos();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const { ref, inView } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasMore && !loading) {
        loadMore();
      }
    },
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo: Photo, index: number) => (
          <TooltipProvider key={photo.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="relative aspect-square cursor-pointer"
                  onClick={() => setSelectedPhoto(photo.url)}
                >
                  <Image
                    src={photo.url}
                    alt={photo.notes || `Photo ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="rounded-lg object-cover"
                    loading="lazy"
                    loader={cloudflareR2Loader}
                  />
                </div>
              </TooltipTrigger>
              {photo.notes && (
                <TooltipContent>
                  <p>{photo.notes}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      {hasMore && (
        <div ref={ref} className="flex h-20 items-center justify-center">
          {loading && <Spinner />}
        </div>
      )}
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
