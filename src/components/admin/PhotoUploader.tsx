"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertCircle,
  CalendarIcon,
  Check,
  CheckCircle2,
  ChevronsUpDown,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DragDropZone from "./DragDropZone";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface PhotoUploaderProps {
  onUpload: (
    files: File[],
    tags: string[],
    captureDate: string,
    notes: string,
    onProgress: (progress: number) => void,
  ) => Promise<void>;
  availableTags: string[];
}

export default function PhotoUploader({
  onUpload,
  availableTags,
}: PhotoUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [captureDate, setCaptureDate] = useState<Date>();
  const [notes, setNotes] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [open, setOpen] = useState(false); // For the tag popover
  const [inputValue, setInputValue] = useState(""); // For the tag input

  const handleFileDrop = (droppedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleAddNewTag = () => {
    if (inputValue && !availableTags.includes(inputValue.toLowerCase())) {
      // Add the new tag to the available tags (if needed)
      availableTags.push(inputValue.toLowerCase());
      handleTagSelect(inputValue.toLowerCase());
      setInputValue(""); // Clear the input
    }
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

      await onUpload(
        files,
        selectedTags,
        captureDate.toISOString(),
        notes,
        updateProgress,
      );

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
    setCaptureDate(undefined);
    setNotes("");
    setUploadProgress(0);
    setUploadStatus("idle");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DragDropZone onFileDrop={handleFileDrop} files={files} />

      <div>
        <Label htmlFor="captureDate">Capture Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "bg-background/90 w-full justify-start text-left font-normal backdrop-blur-md",
                !captureDate && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {captureDate ? (
                format(captureDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-background/90 w-auto p-0 backdrop-blur-md">
            <Calendar
              mode="single"
              selected={captureDate}
              onSelect={setCaptureDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any additional notes here..."
          className="bg-[unset] !text-[unset]"
        />
      </div>

      <div>
        <Label className="mb-2 block">Select Tags</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {selectedTags.length > 0
                ? `${selectedTags.length} selected`
                : "Select tags..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput
                placeholder="Search or add a tag..."
                className="h-9 bg-[unset]"
                value={inputValue}
                onValueChange={setInputValue}
              />
              <CommandList>
                <CommandEmpty className="py-[unset]">
                  <Button
                    variant="ghost"
                    className="w-full justify-start backdrop-blur"
                    onClick={handleAddNewTag}
                  >
                    <Plus className="mr- w-4" />
                    Add &#34;{inputValue}&#34;
                  </Button>
                </CommandEmpty>
                <CommandGroup>
                  <CommandList>
                    {availableTags.map((tag) => (
                      <CommandItem
                        key={tag}
                        value={tag}
                        onSelect={() => handleTagSelect(tag)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedTags.includes(tag)
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {tag}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-sm">
              {tag}
              <button
                className="ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleTagSelect(tag);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleTagSelect(tag)}
              >
                ✕
              </button>
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
        <DialogContent className="backdrop-blur">
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
