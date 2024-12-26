"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DragDropZone from "./DragDropZone";

interface PhotoUploaderProps {
  onUpload: (
    files: File[],
    tags: string[],
    captureDate: string,
    notes: string,
    onProgress: (progress: number) => void,
  ) => Promise<void>;
}

const PRESET_TAGS = [
  "nature",
  "urban",
  "people",
  "animals",
  "architecture",
  "food",
  "travel",
  "technology",
];

export default function PhotoUploader({ onUpload }: PhotoUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [captureDate, setCaptureDate] = useState("");
  const [notes, setNotes] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleFileDrop = (droppedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0 || !captureDate) return;

    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatus("idle");

    try {
      const totalSize = files.reduce((acc, file) => acc + file.size, 0);
      let uploadedSize = 0;

      const updateProgress = (chunkSize: number) => {
        uploadedSize += chunkSize;
        const progress = Math.round((uploadedSize / totalSize) * 100);
        setUploadProgress(progress);
      };

      await onUpload(files, selectedTags, captureDate, notes, updateProgress);
      setUploadStatus("success");
    } catch (error) {
      console.error("Error uploading photos:", error);
      setUploadStatus("error");
    } finally {
      setIsUploading(false);
    }
  };

  const resetUpload = () => {
    setFiles([]);
    setSelectedTags([]);
    setCaptureDate("");
    setNotes("");
    setUploadProgress(0);
    setUploadStatus("idle");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DragDropZone onFileDrop={handleFileDrop} files={files} />

      <div>
        <Label htmlFor="captureDate">Capture Date</Label>
        <Input
          type="date"
          id="captureDate"
          value={captureDate}
          onChange={(e) => setCaptureDate(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any additional notes here..."
        />
      </div>

      <div>
        <Label className="mb-2 block">Select Tags</Label>
        <div className="flex flex-wrap gap-2">
          {PRESET_TAGS.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleTagToggle(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        disabled={files.length === 0 || !captureDate || isUploading}
      >
        Upload Photos
      </Button>

      <Dialog
        open={isUploading || uploadStatus !== "idle"}
        onOpenChange={() => resetUpload()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {uploadStatus === "idle"
                ? "Uploading Photos"
                : uploadStatus === "success"
                  ? "Upload Successful"
                  : "Upload Failed"}
            </DialogTitle>
          </DialogHeader>
          {uploadStatus === "idle" && (
            <div className="space-y-4">
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-center">{uploadProgress}% Uploaded</p>
            </div>
          )}
          {uploadStatus === "success" && (
            <div className="text-green-500 flex items-center justify-center space-x-2">
              <CheckCircle2 />
              <p>Photos uploaded successfully!</p>
            </div>
          )}
          {uploadStatus === "error" && (
            <div className="text-red-500 flex items-center justify-center space-x-2">
              <AlertCircle />
              <p>Failed to upload photos. Please try again.</p>
            </div>
          )}
          {uploadStatus !== "idle" && (
            <Button onClick={resetUpload}>Close</Button>
          )}
        </DialogContent>
      </Dialog>
    </form>
  );
}
