"use server";

import { revalidateTag } from "next/cache";

export async function revalidatePhotos() {
  revalidateTag("photos");
}

export async function revalidateTags() {
  revalidateTag("tags");
}
