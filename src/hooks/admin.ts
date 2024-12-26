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
      setPhotos(data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const uploadPhotos = useCallback(
    async (files: File[], tags: string[]) => {
      try {
        // Get presigned URLs for each file
        const presignedUrlsResponse = await fetch("/api/admin/presigned-urls", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ count: files.length, tags }),
        });
        const { uploadURLs, imageIds } = await presignedUrlsResponse.json();

        // Upload each file to its presigned URL
        const uploadPromises = files.map(async (file, index) => {
          const response = await fetch(uploadURLs[index], {
            method: "POST",
            body: file,
          });
          if (!response.ok)
            throw new Error(`Failed to upload file ${index + 1}`);
        });

        await Promise.all(uploadPromises);

        // Notify the server that all uploads are complete
        await fetch("/api/admin/photos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageIds, tags }),
        });

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
