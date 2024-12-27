"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { Photo } from "@/lib/photos/utils";
import { usePhotos } from "@/hooks/photos";

export default function PhotoGrid() {
  const { photos, loadMore, hasMore, loading } = usePhotos();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { ref, inView } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasMore && !loading) {
        loadMore();
      }
    },
  });

  const dialogContentRef = useRef<HTMLDivElement>(null);
  const blurOverlayRef = useRef<HTMLDivElement>(null);
  const selectedImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (selectedPhoto) {
      gsap.to(blurOverlayRef.current, { autoAlpha: 1, duration: 0.3 });

      if (selectedImageRef.current && dialogContentRef.current) {
        const imgRect = selectedImageRef.current.getBoundingClientRect();
        const dialogRect = dialogContentRef.current.getBoundingClientRect();

        gsap.from(dialogContentRef.current, {
          x: imgRect.left - dialogRect.left,
          y: imgRect.top - dialogRect.top,
          width: imgRect.width,
          height: imgRect.height,
          duration: 0.5,
          ease: "power3.out",
        });
      }
    } else {
      gsap.to(blurOverlayRef.current, { autoAlpha: 0, duration: 0.3 });
    }
  }, [selectedPhoto]);

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tag", tag);
    router.push(`/?${params.toString()}`);
    setSelectedPhoto(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, index) => (
          <TooltipProvider key={photo.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="relative aspect-square cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <Image
                    src={photo.url}
                    alt={photo.notes || `Photo ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="rounded-lg object-cover"
                    loading="lazy"
                    ref={
                      selectedPhoto?.id === photo.id ? selectedImageRef : null
                    }
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
      <div
        ref={blurOverlayRef}
        className="bg-black/50 invisible fixed inset-0 z-40 opacity-0 backdrop-blur-sm"
      />
      <Dialog
        open={!!selectedPhoto}
        onOpenChange={() => setSelectedPhoto(null)}
      >
        <DialogContent className="z-50 max-w-4xl p-0" ref={dialogContentRef}>
          <DialogTitle className="sr-only">Photo Details</DialogTitle>
          {selectedPhoto && (
            <div className="flex flex-col md:flex-row">
              <div className="relative aspect-square md:w-2/3">
                <Image
                  src={selectedPhoto.url}
                  alt={selectedPhoto.notes || "Selected photo"}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover"
                  priority
                />
              </div>
              <Card className="rounded-none border-0 md:w-1/3">
                <CardHeader>
                  <CardTitle>Photo Details</CardTitle>
                  <CardDescription>
                    Captured on{" "}
                    {new Date(selectedPhoto.captureDate).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 text-sm font-medium">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedPhoto.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => handleTagClick(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {selectedPhoto.notes && (
                      <div>
                        <h4 className="mb-2 text-sm font-medium">Notes</h4>
                        <p className="text-muted-foreground text-sm">
                          {selectedPhoto.notes}
                        </p>
                      </div>
                    )}
                    <div>
                      <Link href={`/photo/${selectedPhoto.id}`} passHref>
                        <Button variant="outline" className="w-full">
                          View Full Page
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
