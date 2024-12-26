"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Photo } from "@/lib/photos/utils";

interface PhotoListProps {
  photos: Photo[];
  onDelete: (id: string) => Promise<void>;
  onUpdate: (photo: Photo) => Promise<void>;
}

export default function PhotoList({
  photos,
  onDelete,
  onUpdate,
}: PhotoListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);

  const handleEdit = (photo: Photo) => {
    setEditingId(photo.id);
    setEditingPhoto({ ...photo });
  };

  const handleSave = async () => {
    if (editingPhoto) {
      await onUpdate(editingPhoto);
      setEditingId(null);
      setEditingPhoto(null);
    }
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
          {editingId === photo.id && editingPhoto ? (
            <>
              <Label htmlFor={`tags-${photo.id}`}>Edit Tags</Label>
              <Input
                id={`tags-${photo.id}`}
                value={editingPhoto.tags.join(", ")}
                onChange={(e) =>
                  setEditingPhoto({
                    ...editingPhoto,
                    tags: e.target.value.split(",").map((tag) => tag.trim()),
                  })
                }
              />
              <Label htmlFor={`captureDate-${photo.id}`}>Capture Date</Label>
              <Input
                type="date"
                id={`captureDate-${photo.id}`}
                value={editingPhoto.captureDate.split("T")[0]}
                onChange={(e) =>
                  setEditingPhoto({
                    ...editingPhoto,
                    captureDate: new Date(e.target.value).toISOString(),
                  })
                }
              />
              <Label htmlFor={`notes-${photo.id}`}>Notes</Label>
              <Textarea
                id={`notes-${photo.id}`}
                value={editingPhoto.notes || ""}
                onChange={(e) =>
                  setEditingPhoto({ ...editingPhoto, notes: e.target.value })
                }
              />
              <Button onClick={handleSave}>Save</Button>
              <Button variant="outline" onClick={() => setEditingId(null)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <p className="text-sm">Tags: {photo.tags.join(", ")}</p>
              <p className="text-sm">
                Capture Date: {new Date(photo.captureDate).toLocaleDateString()}
              </p>
              {photo.notes && <p className="text-sm">Notes: {photo.notes}</p>}
              <Button onClick={() => handleEdit(photo)}>Edit</Button>
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
