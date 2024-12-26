// import Site from "@/config/site";
// import { env } from "@/env";
//
// const normalizeSrc = (src: string) => {
//   return src.startsWith("/") ? src.slice(1) : src;
// };
//
// export default function cloudflareLoader({
//   src,
//   width,
//   quality,
// }: {
//   src: string;
//   width: number;
//   quality?: number;
// }) {
//   if (env.NODE_ENV === "test") {
//     return src;
//   }
//   const params = [`width=${width}`];
//   if (quality) {
//     params.push(`quality=${quality}`);
//   }
//   const paramsString = params.join(",");
//   // Note: you need to enable
//   // [Resize images from any origin](https://developers.cloudflare.com/images/get-started/)
//   const prefix = env.NODE_ENV == "development" ? Site.url : "";
//   return prefix + `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
// }

import { env } from "@/env";
import { _Object } from "@aws-sdk/client-s3";

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

export const toR2CustomDomain = (url: string) => {
  if (!env.R2_DOMAIN || !url.includes("r2.cloudflarestorage.com")) {
    /*note: if you wish to use a different s3 provider, you can change this to your s3 domain*/
    return url;
  }
  return env.R2_DOMAIN + url.split("r2.cloudflarestorage.com")[1];
};

const R2IdToUrl = (id: string) => {
  return "https://" + env.R2_DOMAIN + "/" + id;
};

const KeyToTags = (r2obj: _Object): string[] => {
  // @ts-ignore
  return r2obj.Key?.split("_")[1].split(".")[0].split(",") || [];
};


export const R2ObjToPhoto = (r2obj: _Object) => {
  return {
    id: r2obj.Key,
    url: R2IdToUrl(r2obj.Key as string),
    tags: KeyToTags(r2obj),
  }
}
