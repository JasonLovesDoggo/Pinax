import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { env } from "@/env";
import kv from "@/lib/kv";

export interface Photo {
  id: string /*todo: switch to key (i.e. contains extension)  */;
  tags: string[];
  captureDate: string;
  notes?: string;
  url: string;
}

export const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.CF_ACCESS_KEY_ID,
    secretAccessKey: env.CF_SECRET_ACCESS_KEY,
  },
});

export async function getPhotoMetadata(key: string): Promise<Photo | null> {
  const metadata = await kv.get<Photo>(key);
  if (!metadata) return null;
  return {
    ...metadata,
    url: getPhotoUrl(key),
  };
}

export async function setPhotoMetadata(
  key: string,
  metadata: Photo,
): Promise<void> {
  await kv.set(key, metadata);
}

export async function deletePhotoMetadata(key: string): Promise<void> {
  await kv.del(key);
}

export function getPhotoUrl(key: string): string {
  return `https://${env.R2_CACHE_DOMAIN}/${key}`;
}

export async function uploadPhotoToR2(
  key: string,
  file: Buffer,
  contentType: string,
): Promise<void> {
  const command = new PutObjectCommand({
    Bucket: env.R2_BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: contentType,
  });

  await s3Client.send(command);
}

export async function deletePhotoFromR2(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: env.R2_BUCKET_NAME,
    Key: key,
  });

  await s3Client.send(command);
}

export function getRawId(id: string): string {
  // Removes the extension from the ID
  return id.split(".")[0] as string;
}
