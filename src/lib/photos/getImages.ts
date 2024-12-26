import {
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import sharp from "sharp";
import { ImageEnhanced } from "./types";
import { env } from "@/env";

export const createS3Client = () => {
  return new S3Client({
    region: "auto",
    endpoint: `https://${env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: env.CF_ACCESS_KEY_ID!,
      secretAccessKey: env.CF_SECRET_ACCESS_KEY!,
    },
  });
};

const s3Client = createS3Client();

async function processImage(
  key: string,
  signedUrl: string,
): Promise<ImageEnhanced> {
  const imageBuffer = await fetch(signedUrl).then((res) => res.arrayBuffer());
  const image = sharp(Buffer.from(imageBuffer));
  const metadata = await image.metadata();
  const { width, height } = metadata;

  // Generate blur data URL
  const blurImage = await image.resize(10).blur().toBuffer();
  const blurDataUrl = `data:image/${metadata.format};base64,${blurImage.toString("base64")}`;

  // Generate thumbnail
  const thumbnailBuffer = await image.resize(200).toBuffer();
  const thumbnailDataUrl = `data:image/${metadata.format};base64,${thumbnailBuffer.toString("base64")}`;

  const slug = key.split(".")[0];

  return {
    href: `https://${env.R2_DOMAIN}/${key}`,
    thumbnailHref: thumbnailDataUrl,
    src: `https://${env.R2_DOMAIN}/${key}`,
    alt: slug as string, // slug cant be empty
    width: width || 0,
    height: height || 0,
    slug: slug as string,
    blurDataUrl,
  };
}

export async function getImagesFromR2(): Promise<ImageEnhanced[]> {
  const listCommand = new ListObjectsV2Command({
    Bucket: env.R2_BUCKET_NAME,
  });
  const listResponse = await s3Client.send(listCommand);
  const objects = listResponse.Contents || [];

  return await Promise.all(
    objects.map(async (object) => {
      const getObjectCommand = new GetObjectCommand({
        Bucket: env.R2_BUCKET_NAME,
        Key: object.Key,
      });

      const signedUrl = await getSignedUrl(s3Client, getObjectCommand, {
        expiresIn: 3600,
      });
      return processImage(object.Key!, signedUrl);
    }),
  );
}

export async function getImageFromR2(key: string): Promise<ImageEnhanced> {
  const getObjectCommand = new GetObjectCommand({
    Bucket: env.R2_BUCKET_NAME,
    Key: key,
  });

  const signedUrl = await getSignedUrl(s3Client, getObjectCommand, {
    expiresIn: 3600,
  });
  return processImage(key, signedUrl);
}
