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
  onDeleteAction: (key: string) => Promise<void>;
  onUpdateAction: (photo: Photo) => Promise<void>;
}

export default function PhotoList({
  photos,
  onDeleteAction,
  onUpdateAction,
}: PhotoListProps) {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);

  const handleEdit = (photo: Photo) => {
    setEditingKey(photo.key);
    setEditingPhoto({ ...photo });
  };

  const handleSave = async () => {
    if (editingPhoto) {
      await onUpdateAction(editingPhoto);
      setEditingKey(null);
      setEditingPhoto(null);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {photos.map((photo) => (
        <div key={photo.key} className="space-y-2 rounded-lg border p-4">
          <div className="relative aspect-square">
            <Image
              src={photo.url}
              alt={photo.notes || `Photo ${photo.key}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="rounded-lg object-cover"
            />
          </div>
          {editingKey === photo.key && editingPhoto ? (
            <>
              <Label htmlFor={`tags-${photo.key}`}>Edit Tags</Label>
              <Input
                id={`tags-${photo.key}`}
                value={editingPhoto.tags.join(", ")}
                onChange={(e) =>
                  setEditingPhoto({
                    ...editingPhoto,
                    tags: e.target.value.split(",").map((tag) => tag.trim()),
                  })
                }
              />
              <Label htmlFor={`captureDate-${photo.key}`}>Capture Date</Label>
              <Input
                type="date"
                id={`captureDate-${photo.key}`}
                value={editingPhoto.captureDate.split("T")[0]}
                onChange={(e) =>
                  setEditingPhoto({
                    ...editingPhoto,
                    captureDate: new Date(e.target.value).toISOString(),
                  })
                }
              />
              <Label htmlFor={`notes-${photo.key}`}>Notes</Label>
              <Textarea
                id={`notes-${photo.key}`}
                value={editingPhoto.notes || ""}
                onChange={(e) =>
                  setEditingPhoto({ ...editingPhoto, notes: e.target.value })
                }
              />
              <Button onClick={handleSave}>Save</Button>
              <Button variant="outline" onClick={() => setEditingKey(null)}>
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
          <Button
            variant="destructive"
            onClick={() => onDeleteAction(photo.key)}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
}
