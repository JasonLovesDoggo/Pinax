import { useCallback, useEffect, useState } from "react";

interface Photo {
  id: string;
  url: string;
  tags: string[];
}

const PAGE_SIZE = 20;

export function usePhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPhotos = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(
        `/api/photos?page=${page}&limit=${PAGE_SIZE}`,
      );
      const newPhotos = await response.json();
      console.table(newPhotos);
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const loadMore = useCallback(() => {
    if (!loading) {
      fetchPhotos();
    }
  }, [fetchPhotos, loading]);

  return { photos, loadMore };
}
