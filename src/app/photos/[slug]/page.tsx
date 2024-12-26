import { Suspense } from "react";
import FullScreenImage from "./FullScreenImage";
import { getImagesFromR2 } from "@/lib/photos/getImages";

export async function generateStaticParams() {
  const images = await getImagesFromR2();
  return images.map((image) => ({
    slug: image.slug,
  }));
}

export default async function FullScreenImagePage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FullScreenImage imageKey={params.slug} />
    </Suspense>
  );
}
