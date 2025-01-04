import { env } from "@/env";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { count, tags } = await request.json();
    const uploadURLs: string[] = [];
    const imageIds: string[] = [];

    for (let i = 0; i < count; i++) {
      let formData = new FormData();

      formData.append("requireSignedURLs", "true");
      formData.append(
        "metadata",
        JSON.stringify({ tags: JSON.stringify(tags) }),
      );

      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/images/v2/direct_upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.CF_API_TOKEN}`,
          },
          body: formData,
        },
      );

      const data = await response.json();

      if (!data.success) {
        console.error("Failed to get presigned URL from Cloudflare", data);
        throw new Error("Failed to get presigned URL from Cloudflare");
      }

      uploadURLs.push(data.result.uploadURL);
      console.log("Upload ID:", data.result.id);
      imageIds.push(data.result.id);
    }

    return NextResponse.json({ uploadURLs, imageIds });
  } catch (error) {
    console.error("Error getting presigned URLs:", error);
    return NextResponse.json(
      { error: "Failed to get presigned URLs" },
      { status: 500 },
    );
  }
}
