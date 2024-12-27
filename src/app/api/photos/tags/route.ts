import { NextResponse } from "next/server";
import { getPhotoMetadata } from "@/lib/photos/utils";
import kv from "@/lib/kv";

export async function GET() {
  try {
    const keys = await kv.keys("*");
    const allTags = new Set<string>();

    for (const key of keys) {
      const metadata = await getPhotoMetadata(key);
      if (metadata) {
        metadata.tags.forEach((tag) => allTags.add(tag));
      }
    }

    return NextResponse.json(Array.from(allTags));
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 },
    );
  }
}
