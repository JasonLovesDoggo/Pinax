import { useEffect } from "react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import getImages from "@/lib/photos/getImages";

export async function generateStaticParams() {
  const images = await getImages();
  return images.map((image) => ({
    slug: image.src,
  }));
}

export default function FullScreenImagePage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const images = await getImages();
  const image = images.find(
    (img) => img.src === decodeURIComponent(params.slug),
  );

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
    return notFound();
  }

  return (
    <div className="bg-black fixed inset-0 flex flex-col items-center justify-center">
      <div className="absolute left-4 top-4 z-10">
        <Link href="/photos" className="flex items-center gap-2">
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Back to gallery</span>
        </Link>
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
