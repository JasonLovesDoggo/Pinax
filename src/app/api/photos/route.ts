import { NextRequest, NextResponse } from "next/server";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { createS3Client } from "@/lib/photos/getImages";
import { R2ObjToPhoto } from "@/lib/photos/cloudflareLoader";

const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

const s3Client = createS3Client();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  try {
    const command = new ListObjectsV2Command({
      Bucket: R2_BUCKET_NAME,
      MaxKeys: limit,
      StartAfter: ((page - 1) * limit).toString(),
    });

    const response = await s3Client.send(command);

    const photos = await Promise.all(
      (response.Contents || []).map(async (object) => {
        // const getObjectUrl = await getSignedUrl(
        //   s3Client,
        //   new ListObjectsV2Command({
        //     Bucket: R2_BUCKET_NAME,
        //     Prefix: object.Key,
        //     MaxKeys: 1,
        //   }),
        //   { expiresIn: 3600 }
        // )

        return R2ObjToPhoto(object);
      }),
    );

    return NextResponse.json(photos);
  } catch (error) {
    console.error("Error fetching photos:", error);
    return NextResponse.json(
      { error: "Failed to fetch photos" },
      { status: 500 },
    );
  }
}
