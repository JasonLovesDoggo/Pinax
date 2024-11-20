import { MetadataRoute } from "next";
import { Site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [""].map((route) => ({
    url: `${Site.domain}${route}`,
    lastModified: new Date(),
  }));

  return [...routes];
}
