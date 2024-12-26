import { NextResponse } from "next/server";
import {
  _Object,
  ListObjectsV2Command,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { createPhotoKey, parsePhotoKey, s3Client } from "@/lib/photos/utils";
import { env } from "@/env";

const R2_BUCKET_NAME = env.R2_BUCKET_NAME;

export async function GET(request: Request) {
  if (env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const command = new ListObjectsV2Command({ Bucket: R2_BUCKET_NAME });
    const response = await s3Client.send(command);

    const photos = await Promise.all(
      (response.Contents || []).map(async (s3object: _Object) => {
        return parsePhotoKey(s3object.Key!);
      }),
    );

    return NextResponse.json(photos);
  } catch (error) {
    console.error("Error fetching photos:", error);
    return NextResponse.json(
      { error: "Failed to fetch photos" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const tags = JSON.parse(formData.get("tags") as string);
    const captureDate = formData.get("captureDate") as string;
    const notes = formData.get("notes") as string;

    // const fileExtension = file.name.split(".").pop();
    const id = uuidv4();
    const key = createPhotoKey({ id, tags, captureDate, notes });

    const putObjectCommand = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: Buffer.from(await file.arrayBuffer()),
      ContentType: file.type,
    });

    await s3Client.send(putObjectCommand);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error uploading photo:", error);
    return NextResponse.json(
      { error: "Failed to upload photo" },
      { status: 500 },
    );
  }
}
