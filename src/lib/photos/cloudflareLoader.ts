export const cloudflareR2Loader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  // Remove any existing query parameters

  const url = new URL(src.split("?")[0] as string);

  // Add our custom parameters
  url.searchParams.set("width", width.toString());
  if (quality) {
    url.searchParams.set("quality", quality.toString());
  }

  return url.toString();
};
