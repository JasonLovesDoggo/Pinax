import { env } from "@/env";
import { NextResponse } from "next/server";

const CLOUDFLARE_ACCOUNT_ID = env.CF_ACCOUNT_ID;
const CLOUDFLARE_API_TOKEN = env.CF_API_TOKEN;

export async function GET() {
  if (env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/images/v1`,
      {
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
        },
      },
    );

    const data = await response.json();

    if (!data.success) {
      throw new Error("Failed to fetch images from Cloudflare");
    }

    const photos = data.result.images.map((image: any) => ({
      id: image.id,
      url: image.variants[0],
      tags: image.meta?.tags ? JSON.parse(image.meta.tags) : [],
    }));

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
    const { imageIds, tags } = await request.json();

    // The images are already uploaded to Cloudflare at this point
    // We just need to update their metadata if necessary

    const updatePromises = imageIds.map(async (id: string) => {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/images/v1/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            metadata: {
              tags: JSON.stringify(tags),
            },
          }),
        },
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(`Failed to update metadata for image ${id}`);
      }
    });

    await Promise.all(updatePromises);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing uploaded photos:", error);
    return NextResponse.json(
      { error: "Failed to process uploaded photos" },
      { status: 500 },
    );
  }
}
