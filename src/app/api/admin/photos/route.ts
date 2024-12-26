import { NextResponse } from "next/server";
import { ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { env } from "@/env";
import { R2ObjToPhoto } from "@/lib/photos/cloudflareLoader";
import { createS3Client } from "@/lib/photos/getImages";

const R2_BUCKET_NAME = env.R2_BUCKET_NAME;
const s3Client = createS3Client();

export async function GET(request: Request) {
  if (env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const command = new ListObjectsV2Command({ Bucket: R2_BUCKET_NAME });
    const response = await s3Client.send(command);

    const photos = await Promise.all(
      (response.Contents || []).map(async (object) => {
        // const getObjectUrl = await getSignedUrl(
        //   s3Client,
        //   new PutObjectCommand({
        //     Bucket: R2_BUCKET_NAME,
        //     Key: object.Key!,
        //     // Add custom parameters for image processing
        //     Metadata: {
        //       'x-amz-meta-width': '{width}',
        //       'x-amz-meta-quality': '{quality}'
        //     }
        //   }),
        //   { expiresIn: 3600 }
        // )
        if (!object.Key) {
          console.error("No key found for object", object);
        }

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

export async function POST(request: Request) {
  if (env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const tags = JSON.parse(formData.get("tags") as string);

    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}_${tags.join(",")}.${fileExtension}`;

    const putObjectCommand = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: fileName,
      Body: Buffer.from(await file.arrayBuffer()),
      ContentType: file.type,
    });

    await s3Client.send(putObjectCommand);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error uploading photo:", error);
    return NextResponse.json(
      { error: "Failed to upload photo" },
      { status: 500 },
    );
  }
}
