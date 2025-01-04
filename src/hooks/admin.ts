import { useCallback, useEffect, useState } from "react";
import { Photo } from "@/lib/photos/utils";
import { revalidatePhotos } from "@/actions/photos";

export function useAdminPhotos() {
  const [photos, setPhotos] = useState<(Photo & { url: string })[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  const fetchPhotos = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/photos");
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  }, []);

  const fetchTags = useCallback(async () => {
    try {
      const response = await fetch("/api/photos/tags");
      const data = await response.json();
      setAvailableTags(data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  }, []);

  useEffect(() => {
    void fetchPhotos();
    void fetchTags();
  }, [fetchPhotos, fetchTags]);

  const uploadPhotos = useCallback(
    async (
      files: File[],
      tags: string[],
      captureDate: string,
      notes: string,
      onProgress: (progress: number) => void,
    ) => {
      try {
        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("tags", JSON.stringify(tags));
          formData.append("captureDate", captureDate);
          formData.append("notes", notes);
          const newTags = tags.filter((tag) => !availableTags.includes(tag));

          const response = await fetch(
            `/api/admin/photos${newTags.length > 0 ? "?tag_added=true" : ""}`,
            {
              method: "POST",
              body: formData,
            },
          );

          if (!response.ok) {
            throw new Error(`Failed to upload file ${file.name}`);
          }

          onProgress(100 / files.length);
        }
        await revalidatePhotos();
        void fetchPhotos();
      } catch (error) {
        console.error("Error uploading photos:", error);
        throw error;
      }
    },
    [fetchPhotos],
  );

  const deletePhoto = useCallback(
    async (key: string) => {
      try {
        const response = await fetch(`/api/admin/photos/${key}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete photo");
        await revalidatePhotos();
        await fetchPhotos();
      } catch (error) {
        console.error("Error deleting photo:", error);
        throw error;
      }
    },
    [fetchPhotos],
  );

  const updatePhoto = useCallback(
    async (photo: Photo) => {
      try {
        const response = await fetch(`/api/admin/photos/${photo.key}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(photo),
        });
        if (!response.ok) throw new Error("Failed to update photo");
        await revalidatePhotos();
        await fetchPhotos();
      } catch (error) {
        console.error("Error updating photo:", error);
        throw error;
      }
    },
    [fetchPhotos],
  );

  return { photos, availableTags, uploadPhotos, deletePhoto, updatePhoto };
}
