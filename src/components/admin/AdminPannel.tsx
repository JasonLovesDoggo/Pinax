"use client";

import { useState } from "react";
import PhotoUploader from "./PhotoUploader";
import PhotoList from "./PhotoList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdminPhotos } from "@/hooks/admin";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("upload");
  const { photos, availableTags, uploadPhotos, deletePhoto, updatePhoto } =
    useAdminPhotos();

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="upload">Upload Photos</TabsTrigger>
        <TabsTrigger value="manage">Manage Photos</TabsTrigger>
      </TabsList>
      <TabsContent value="upload">
        <div
          className="bg-background/90 border-muted rounded-lg border p-6 backdrop-blur-md" // Added background and blur
        >
          <PhotoUploader
            onUpload={uploadPhotos}
            availableTags={availableTags}
          />
        </div>
      </TabsContent>
      <TabsContent value="manage">
        <PhotoList
          photos={photos}
          onDeleteAction={deletePhoto}
          onUpdateAction={updatePhoto}
        />
      </TabsContent>
    </Tabs>
  );
}
