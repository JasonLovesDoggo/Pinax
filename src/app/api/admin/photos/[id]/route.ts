import { NextResponse } from "next/server";
import {
  deletePhotoFromR2,
  deletePhotoMetadata,
  Photo,
  setPhotoMetadata,
} from "@/lib/photos/utils";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await deletePhotoFromR2(params.id);
    await deletePhotoMetadata(params.id);

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
    const updatedPhoto: Photo = await request.json();
    await setPhotoMetadata(params.id, updatedPhoto);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating photo:", error);
    return NextResponse.json(
      { error: "Failed to update photo" },
      { status: 500 },
    );
  }
}
