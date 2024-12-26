"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Photo {
  id: string;
  url: string;
  tags: string[];
}

interface PhotoListProps {
  photos: Photo[];
  onDelete: (id: string) => Promise<void>;
  onUpdateTags: (id: string, tags: string[]) => Promise<void>;
}

export default function PhotoList({
  photos,
  onDelete,
  onUpdateTags,
}: PhotoListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTags, setEditingTags] = useState("");

  const handleEdit = (photo: Photo) => {
    setEditingId(photo.id);
    setEditingTags(photo.tags.join(", "));
  };

  const handleSave = async (id: string) => {
    await onUpdateTags(
      id,
      editingTags.split(",").map((tag) => tag.trim()),
    );
    setEditingId(null);
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {photos.map((photo) => (
        <div key={photo.id} className="space-y-2 rounded-lg border p-4">
          <div className="relative aspect-square">
            <Image
              src={photo.url}
              alt={`Photo ${photo.id}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="rounded-lg object-cover"
            />
          </div>
          {editingId === photo.id ? (
            <>
              <Label htmlFor={`tags-${photo.id}`}>Edit Tags</Label>
              <Input
                id={`tags-${photo.id}`}
                value={editingTags}
                onChange={(e) => setEditingTags(e.target.value)}
              />
              <Button onClick={() => handleSave(photo.id)}>Save</Button>
              <Button variant="outline" onClick={() => setEditingId(null)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <p className="text-sm">Tags: {photo.tags.join(", ")}</p>
              <Button onClick={() => handleEdit(photo)}>Edit Tags</Button>
            </>
          )}
          <Button variant="destructive" onClick={() => onDelete(photo.id)}>
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
}
