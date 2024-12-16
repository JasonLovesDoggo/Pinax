import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { ImageEnhanced } from "./types";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");

export default async function getImages(): Promise<ImageEnhanced[]> {
  const files = await fs.readdir(IMAGES_DIR);
  const imageFiles = files.filter((file) =>
    /\.(jpg|jpeg|png|gif)$/i.test(file),
  );

  return await Promise.all(
    imageFiles.map(async (file) => {
      const filePath = path.join(IMAGES_DIR, file);
      const image = sharp(filePath);
      const metadata = await image.metadata();
      const { width, height } = metadata;

      // Generate blur data URL
      const blurImage = await image.resize(10).blur().toBuffer();
      const blurDataUrl = `data:image/${metadata.format};base64,${blurImage.toString("base64")}`;

      // Generate thumbnail
      const thumbnailBuffer = await image.resize(200).toBuffer();
      const thumbnailDataUrl = `data:image/${metadata.format};base64,${thumbnailBuffer.toString("base64")}`;

      const slug = path.parse(file).name;

      return {
        href: `/images/${file}`,
        thumbnailHref: thumbnailDataUrl,
        src: `/images/${file}`,
        alt: slug,
        width: width || 0,
        height: height || 0,
        blurDataUrl,
        slug,
      };
    }),
  );
}
