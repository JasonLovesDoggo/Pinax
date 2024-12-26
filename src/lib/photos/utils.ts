import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "@/env";

export interface Photo {
  id: string;
  url: string;
  tags: string[];
  captureDate: string;
  notes?: string;
}

export const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.CF_ACCESS_KEY_ID!,
    secretAccessKey: env.CF_SECRET_ACCESS_KEY!,
  },
});

export async function getSignedPhotoUrl(key: string): Promise<string> {
  return getSignedUrl(
    s3Client,
    new PutObjectCommand({
      Bucket: env.R2_BUCKET_NAME,
      Key: key,
      Metadata: {
        "x-amz-meta-width": "{width}",
        "x-amz-meta-quality": "{quality}",
      },
    }),
    { expiresIn: 3600 },
  );
}

export function parsePhotoKey(key: string): Photo {
  const [id, metadataString] = key.split("_");
  const [tagsString, dateString, ...notesArray] = metadataString.split(".");
  const tags = tagsString.split(",");
  const captureDate = new Date(parseInt(dateString)).toISOString();
  const notes = notesArray.join(".") || undefined;

  console.log(key);
  return {
    id: id as string,
    tags: tags,
    captureDate: captureDate,
    notes: notes,
    url: R2IdToUrl(id as string),
  };
}

export function createPhotoKey(photo: Omit<Photo, "url">): string {
  const { id, tags, captureDate, notes } = photo;
  const dateString = new Date(captureDate).getTime().toString();
  const metadataParts = [tags.join(","), dateString];
  if (notes) metadataParts.push(notes);
  return `${id}_${metadataParts.join(".")}`;
}

const R2IdToUrl = (id: string) => {
  return "https://" + env.R2_DOMAIN + "/" + id;
};
