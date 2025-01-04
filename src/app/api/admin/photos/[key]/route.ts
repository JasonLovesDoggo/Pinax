import { NextResponse } from "next/server";
import {
  deletePhotoFromR2,
  deletePhotoMetadata,
  getRawId,
  Photo,
  setPhotoMetadata,
} from "@/lib/photos/utils";

export async function DELETE(
  request: Request,
  { params }: { params: { key: string } },
) {
  try {
    await deletePhotoFromR2(params.key);
    await deletePhotoMetadata(params.key);

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
  { params }: { params: { key: string } },
) {
  try {
    const updatedPhoto: Photo = await request.json();
    await setPhotoMetadata(getRawId(params.key), updatedPhoto);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating photo:", error);
    return NextResponse.json(
      { error: "Failed to update photo" },
      { status: 500 },
    );
  }
}
