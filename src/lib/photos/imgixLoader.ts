import { ImageLoaderProps } from "next/image";

export function imgixLoader({ src, width, quality }: ImageLoaderProps): string {
  const baseUrl = process.env.NEXT_PUBLIC_MEDIA_URL || "";
  const url = new URL(src, baseUrl);
  const params = url.searchParams;

  params.set("auto", params.getAll("auto").join(",") || "format");
  params.set("fit", params.get("fit") || "max");
  params.set("w", params.get("w") || width.toString());

  if (quality) {
    params.set("q", quality.toString());
  }

  return url.toString();
}
