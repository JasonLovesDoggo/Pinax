"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ImageEnhanced } from "@/lib/photos/types";
import { getImageFromR2 } from "@/lib/photos/getImages";

export default function FullScreenImage({ imageKey }: { imageKey: string }) {
  const router = useRouter();
  const [image, setImage] = useState<ImageEnhanced | null>(null);

  useEffect(() => {
    async function loadImage() {
      const loadedImage = await getImageFromR2(imageKey);
      setImage(loadedImage);
    }
    loadImage();
  }, [imageKey]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.push("/photos");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  if (!image) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-black fixed inset-0 flex flex-col items-center justify-center">
      <div className="absolute left-4 top-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/photos")}
          className="text-white hover:bg-white/20"
        >
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Back to gallery</span>
        </Button>
      </div>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="max-h-full max-w-full object-contain"
        placeholder="blur"
        blurDataURL={image.blurDataUrl}
      />
    </div>
  );
}
