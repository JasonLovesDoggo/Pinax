"use client";

import { ImageEnhanced } from "@/lib/photos/types";
import Image from "next/image";
import Link from "next/link";
import Masonry from "react-masonry-css";

type ImageGalleryProps = {
  images: ImageEnhanced[];
};

export default function ImageGallery({ images }: ImageGalleryProps) {
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
      {images.map((image) => (
        <div key={image.src} className="mb-4">
          <Link href={`/photos/${encodeURIComponent(image.src)}`}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
              placeholder="blur"
              blurDataURL={image.blurDataUrl}
            />
          </Link>
        </div>
      ))}
    </Masonry>
  );
}
