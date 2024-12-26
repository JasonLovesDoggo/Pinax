"use client";

import { useState } from "react";
import PhotoUploader from "./PhotoUploader";
import PhotoList from "./PhotoList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdminPhotos } from "@/hooks/admin";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("upload");
  const { photos, uploadPhotos, deletePhoto, updatePhotoTags } =
    useAdminPhotos();

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="upload">Upload Photos</TabsTrigger>
        <TabsTrigger value="manage">Manage Photos</TabsTrigger>
      </TabsList>
      <TabsContent value="upload">
        <PhotoUploader onUpload={uploadPhotos} />
      </TabsContent>
      <TabsContent value="manage">
        <PhotoList
          photos={photos}
          onDelete={deletePhoto}
          onUpdateTags={updatePhotoTags}
        />
      </TabsContent>
    </Tabs>
  );
}
