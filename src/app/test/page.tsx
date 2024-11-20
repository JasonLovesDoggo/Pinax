"use client";

import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Move } from "lucide-react";

const initialComponents = [
  { id: "button", content: <Button>Click me</Button> },
  {
    id: "card",
    content: (
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
      </Card>
    ),
  },
  { id: "badge", content: <Badge>New</Badge> },
  { id: "switch", content: <Switch /> },
  { id: "slider", content: <Slider defaultValue={[50]} max={100} step={1} /> },
  { id: "input", content: <Input placeholder="Type here..." /> },
  {
    id: "calendar",
    content: <Calendar mode="single" className="rounded-md border" />,
  },
  { id: "label", content: <Label>Label</Label> },
];

export default function Component() {
  const [components, setComponents] =
    useState<{ id: string; content: Element }[]>(initialComponents);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(components);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setComponents(items);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Draggable Masonry Grid</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="grid">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {components.map((component, index) => (
                <Draggable
                  key={component.id}
                  draggableId={component.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`bg-background group relative rounded-lg p-4 shadow-md ${
                        snapshot.isDragging ? "shadow-lg" : ""
                      }`}
                    >
                      <div
                        {...provided.dragHandleProps}
                        className="bg-primary text-primary-foreground absolute right-2 top-2 cursor-move rounded-full p-1 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Move size={16} />
                      </div>
                      {component.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
