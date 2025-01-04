import { NextResponse } from "next/server";
import { getPhotoMetadata } from "@/lib/photos/utils";
import kv from "@/lib/kv";
import { unstable_cache } from "next/cache";

export const dynamic = "force-static";

const getCachedTags = unstable_cache(
  async () => {
    console.log("Fetching tags from KV");
    const keys = await kv.keys("*");
    const allTags = new Set<string>();

    for (const key of keys) {
      const metadata = await getPhotoMetadata(key);
      if (metadata && Array.isArray(metadata.tags)) {
        metadata.tags.forEach((tag: string) => allTags.add(tag));
      }
    }

    return Array.from(allTags);
  },
  [],
  { tags: ["photos", "tags"] },
);

export async function GET() {
  try {
    const tagsArray = await getCachedTags();
    return NextResponse.json(tagsArray);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 },
    );
  }
}
