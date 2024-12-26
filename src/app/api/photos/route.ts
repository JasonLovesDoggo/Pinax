import { NextRequest, NextResponse } from "next/server";
import { _Object, ListObjectsV2Command } from "@aws-sdk/client-s3";
import {
  getSignedPhotoUrl,
  parsePhotoKey,
  Photo,
  s3Client,
} from "@/lib/photos/utils";

const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const tag = searchParams.get("tag");
  const order = searchParams.get("order") || "desc";

  try {
    const command = new ListObjectsV2Command({
      Bucket: R2_BUCKET_NAME,
      MaxKeys: 1000, // Fetch more to allow for filtering
    });

    const response = await s3Client.send(command);

    let photos = await Promise.all(
      (response.Contents || []).map(async (object: _Object) => {
        const photo = parsePhotoKey(object.Key!);
        const url = await getSignedPhotoUrl(object.Key!);
        return { ...photo, url };
      }),
    );

    // Filter by tag if provided
    if (tag) {
      photos = photos.filter((photo: Photo) => photo.tags.includes(tag));
    }

    // Sort by capture date
    photos.sort((a, b) => {
      return order === "desc"
        ? new Date(b.captureDate).getTime() - new Date(a.captureDate).getTime()
        : new Date(a.captureDate).getTime() - new Date(b.captureDate).getTime();
    });

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const paginatedPhotos = photos.slice(startIndex, startIndex + limit);

    return NextResponse.json(paginatedPhotos);
  } catch (error) {
    console.error("Error fetching photos:", error);
    return NextResponse.json(
      { error: "Failed to fetch photos" },
      { status: 500 },
    );
  }
}
