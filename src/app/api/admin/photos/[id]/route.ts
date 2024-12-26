import { NextResponse } from "next/server";
import { env } from "@/env";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/images/v1/${params.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${env.CF_API_TOKEN}`,
        },
      },
    );

    const data = await response.json();

    if (!data.success) {
      throw new Error("Failed to delete image from Cloudflare");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting photo:", error);
    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { tags } = await request.json();

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/images/v1/${params.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${env.CF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metadata: {
            tags: tags,
          },
        }),
      },
    );

    const data = await response.json();

    if (!data.success) {
      throw new Error("Failed to update image metadata");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating photo tags:", error);
    return NextResponse.json(
      { error: "Failed to update photo tags" },
      { status: 500 },
    );
  }
}
