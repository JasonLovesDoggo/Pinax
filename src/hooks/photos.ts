import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Photo } from "@/lib/photos/utils";

const PAGE_SIZE = 20;
export const dynamic = "force-static";

export function usePhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const searchParams = useSearchParams();

  const fetchPhotos = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const tag = searchParams.get("tag");
      const order = searchParams.get("order") || "desc";
      const response = await fetch(
        `/api/photos?page=${page}&limit=${PAGE_SIZE}&tag=${tag || ""}&order=${order}`,
      );
      const newPhotos = await response.json();
      if (newPhotos.length < PAGE_SIZE) {
        setHasMore(false);
      }
      setPhotos((prevPhotos) => {
        const uniquePhotos = newPhotos.filter(
          (newPhoto: Photo) =>
            !prevPhotos.some((prevPhoto) => prevPhoto.key === newPhoto.key),
        );
        return [...prevPhotos, ...uniquePhotos];
      });
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, searchParams]);

  // Reset photos and fetch new data when searchParams change
  useEffect(() => {
    setPhotos([]);
    setPage(1);
    setHasMore(true);
    void fetchPhotos();
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  // Load more photos when requested
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      void fetchPhotos();
    }
  }, [fetchPhotos, loading, hasMore]);

  return { photos, loadMore, hasMore, loading };
}
