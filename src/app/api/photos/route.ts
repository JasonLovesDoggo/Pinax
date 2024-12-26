import { NextResponse } from "next/server";
import { env } from "@/env";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/images/v1?page=${page}&per_page=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${env.CF_API_TOKEN}`,
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
