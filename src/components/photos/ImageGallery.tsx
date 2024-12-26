"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Masonry from "react-masonry-css";
import { useInView } from "react-intersection-observer";
import { ImageEnhanced } from "@/lib/photos/types";

type ImageGalleryProps = {
  images: ImageEnhanced[];
};

function LazyImage({ image }: { image: ImageEnhanced }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
  });

  return (
    <div ref={ref}>
      {inView && (
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
      )}
    </div>
  );
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [visibleImages, setVisibleImages] = useState(20);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const loadMore = () => {
    setVisibleImages((prevVisible) => prevVisible + 20);
  };

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="-ml-4 flex w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {images.slice(0, visibleImages).map((image) => (
          <div key={image.src} className="mb-4">
            <LazyImage image={image} />
          </div>
        ))}
      </Masonry>
      {visibleImages < images.length && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMore}
            className="bg-blue-500 hover:bg-blue-700 text-white rounded px-4 py-2 font-bold"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}
