"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

interface DragDropZoneProps {
  onFileDrop: (files: File[]) => void;
  files: File[];
}

export default function DragDropZone({ onFileDrop, files }: DragDropZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFileDrop(acceptedFiles);
    },
    [onFileDrop],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
        isDragActive
          ? "border-primary bg-primary/10"
          : "border-gray-300 hover:border-primary"
      }`}
    >
      <input {...getInputProps()} />
      <UploadCloud className="text-gray-400 mx-auto h-12 w-12" />
      {files.length > 0 ? (
        <p className="mt-2">{files.length} file(s) selected</p>
      ) : isDragActive ? (
        <p className="mt-2">Drop the images here ...</p>
      ) : (
        <p className="mt-2">Drag & drop images here, or click to select</p>
      )}
    </div>
  );
}
