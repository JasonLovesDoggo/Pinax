import { NextResponse } from "next/server";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { createS3Client } from "@/lib/photos/getImages";

const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

const s3Client = createS3Client();

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const command = new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: params.id,
    });

    await s3Client.send(command);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting photo:", error);
    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { tags } = await request.json();

    // Get the existing object
    const getCommand = new GetObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: params.id,
    });
    const existingObject = await s3Client.send(getCommand);

    // Create a new key with updated tags
    const [uuid, _, extension] = params.id.split("_");
    const newKey = `${uuid}_${tags.join(",")}.${extension}`;

    // Copy the object with the new key
    const putCommand = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: newKey,
      Body: existingObject.Body,
      ContentType: existingObject.ContentType,
    });
    await s3Client.send(putCommand);

    // Delete the old object
    const deleteCommand = new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: params.id,
    });
    await s3Client.send(deleteCommand);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating photo tags:", error);
    return NextResponse.json(
      { error: "Failed to update photo tags" },
      { status: 500 },
    );
  }
}
