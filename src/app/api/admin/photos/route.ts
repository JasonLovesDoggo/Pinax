import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import {
  getPhotoMetadata,
  getPhotoUrl,
  Photo,
  setPhotoMetadata,
  uploadPhotoToR2,
} from "@/lib/photos/utils";
import kv from "@/lib/kv";

export async function GET(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const keys = await kv.keys("*");
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

    const fileExtension = file.name.split(".").pop();
    const id = uuidv4();
    const key = `${id}.${fileExtension}`;

    const metadata: Photo = {
      id,
      tags,
      captureDate,
      notes,
    };

    await uploadPhotoToR2(
      key,
      Buffer.from(await file.arrayBuffer()),
      file.type,
    );
    await setPhotoMetadata(key, metadata);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error uploading photo:", error);
    return NextResponse.json(
      { error: "Failed to upload photo" },
      { status: 500 },
    );
  }
}
