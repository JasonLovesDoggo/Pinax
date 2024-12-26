import { useCallback, useEffect, useState } from "react";

interface Photo {
  id: string;
  url: string;
  tags: string[];
}

export function useAdminPhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const fetchPhotos = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/photos");
      const data = await response.json();
      console.table(data);
      setPhotos(data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const uploadPhotos = useCallback(
    async (
      files: File[],
      tags: string[],
      onProgress: (progress: number) => void,
    ) => {
      try {
        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("tags", JSON.stringify(tags));

          const response = await fetch("/api/admin/photos", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error(`Failed to upload file ${file.name}`);
          }

          onProgress(100 / files.length);
        }

        await fetchPhotos();
      } catch (error) {
        console.error("Error uploading photos:", error);
        throw error;
      }
    },
    [fetchPhotos],
  );

  const deletePhoto = useCallback(
    async (id: string) => {
      try {
        const response = await fetch(`/api/admin/photos/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete photo");
        await fetchPhotos();
      } catch (error) {
        console.error("Error deleting photo:", error);
        throw error;
      }
    },
    [fetchPhotos],
  );

  const updatePhotoTags = useCallback(
    async (id: string, tags: string[]) => {
      try {
        const response = await fetch(`/api/admin/photos/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tags }),
        });
        if (!response.ok) throw new Error("Failed to update photo tags");
        await fetchPhotos();
      } catch (error) {
        console.error("Error updating photo tags:", error);
        throw error;
      }
    },
    [fetchPhotos],
  );

  return { photos, uploadPhotos, deletePhoto, updatePhotoTags };
}
