import { NextRequest, NextResponse } from "next/server";
import { getPhotoMetadata, getPhotoUrl, Photo } from "@/lib/photos/utils";
import kv from "@/lib/kv";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const tag = searchParams.get("tag");
  const order = searchParams.get("order") || "desc";

  try {
    const keys = await kv.keys("*");
    let photos: (Photo & { url: string })[] = [];

    for (const key of keys) {
      const metadata = await getPhotoMetadata(key);
      if (metadata) {
        photos.push({
          ...metadata,
          url: getPhotoUrl(key),
        });
      }
    }

    // Filter by tag if provided
    if (tag) {
      photos = photos.filter((photo) => photo.tags.includes(tag));
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
