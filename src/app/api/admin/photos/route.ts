import {
  getPhotoMetadata,
  getPhotoUrl,
  type Photo,
  setPhotoMetadata,
  uploadPhotoToR2,
} from "@/lib/photos/utils";
import kv from "@/lib/kv";
import { revalidateTag, unstable_cache } from "next/cache";
import { NextResponse } from "next/server";

const getCachedPhotos = unstable_cache(
  async () => {
    const keys = await kv.keys("*"); // Expensive operation
    const photos: Photo[] = [];

    for (const key of keys) {
      const metadata = await getPhotoMetadata(key);
      if (metadata) {
        photos.push({
          ...metadata,
          url: getPhotoUrl(key),
        });
      }
    }

    return photos;
  },
  [],
  { tags: ["photos"] },
);

export async function GET(request: Request) {
  try {
    const photos = await getCachedPhotos();
    return NextResponse.json(photos);
  } catch (error) {
    console.error("Error fetching photos:", error);
    return NextResponse.json(
      { error: "Failed to fetch photos" },
      { status: 500 },
    );
  }
}

/*Photo uploading*/
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const tags = JSON.parse(formData.get("tags") as string);
    const captureDate = formData.get("captureDate") as string;
    const notes = formData.get("notes") as string;

    const key = file.name;
    const metadata: Photo = {
      key,
      tags,
      captureDate,
      notes,
      url: getPhotoUrl(key),
    };

    await uploadPhotoToR2(
      key,
      Buffer.from(await file.arrayBuffer()),
      file.type,
    );
    await setPhotoMetadata(key, metadata);

    revalidateTag("photos");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error uploading photo:", error);
    return NextResponse.json(
      { error: "Failed to upload photo" },
      { status: 500 },
    );
  }
}
