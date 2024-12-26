import Site from "@/config/site";
import { env } from "@/env";

const normalizeSrc = (src: string) => {
  return src.startsWith("/") ? src.slice(1) : src;
};

export default function cloudflareLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (env.NODE_ENV === "test") {
    return src;
  }
  const params = [`width=${width}`];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  const paramsString = params.join(",");
  // Note: you need to enable
  // [Resize images from any origin](https://developers.cloudflare.com/images/get-started/)
  const prefix = env.NODE_ENV == "development" ? Site.url : "";
  return prefix + `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
}
