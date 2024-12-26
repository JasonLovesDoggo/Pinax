"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function TagFilter() {
  const [tags, setTags] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedTag = searchParams.get("tag");

  useEffect(() => {
    fetch("/api/photos/tags")
      .then((res) => res.json())
      .then((data) => setTags(data));
  }, []);

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    if (tag === selectedTag) {
      params.delete("tag");
    } else {
      params.set("tag", tag);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant={tag === selectedTag ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
