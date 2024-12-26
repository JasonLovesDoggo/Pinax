import { NextResponse } from "next/server";
import { _Object, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { parsePhotoKey, s3Client } from "@/lib/photos/utils";

const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

export async function GET() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: R2_BUCKET_NAME,
    });

    const response = await s3Client.send(command);

    const allTags = new Set<string>();

    (response.Contents || []).forEach((s3object: _Object) => {
      const { tags } = parsePhotoKey(s3object.Key!);
      tags.forEach((tag: string) => allTags.add(tag));
    });

    return NextResponse.json(Array.from(allTags));
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 },
    );
  }
}
