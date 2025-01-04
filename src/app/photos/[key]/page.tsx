import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { X } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPhotoMetadata, getPhotoUrl } from "@/lib/photos/utils";

interface PhotoPageProps {
  params: { key: string };
}

export async function generateMetadata({
  params,
}: PhotoPageProps): Promise<Metadata> {
  const photo = await getPhotoMetadata(params.key);
  if (!photo) return {};

  return {
    title: `Photo ${photo.key}  - Jason Cameron`,
    description:
      photo.notes ||
      `Photo taken on ${new Date(photo.captureDate).toLocaleDateString()}`,
    openGraph: {
      images: [getPhotoUrl(params.key)],
    },
  };
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  "use client";
  const photo = await getPhotoMetadata(params.key);

  if (!photo) {
    notFound();
  }

  return (
    <div className="bg-black/80 fixed inset-0 p-6 backdrop-blur-sm">
      <Card className="bg-background/95 supports-[backdrop-filter]:bg-background/60 relative mx-auto h-full max-w-6xl overflow-hidden backdrop-blur">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-50"
          onClick={() => window.history.back()}
        >
          <X className="h-4 w-4" />
        </Button>

        <div>
          <div className="grid grid-rows-[auto_1fr_auto] justify-center text-center align-middle">
            <CardHeader className="space-y-1 pb-4">
              <h2 className="text-lg font-semibold tracking-tight">
                Photo Details
              </h2>
              <p className="text-muted-foreground text-sm">
                Captured on {new Date(photo.captureDate).toLocaleDateString()}
              </p>
            </CardHeader>

            <div className="relative min-h-0 flex-1">
              <Image
                src={getPhotoUrl(params.key)}
                alt={photo.notes || `Photo ${photo.key}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>

            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 text-sm font-medium">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {photo.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-secondary/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                {photo.notes && (
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Notes</h4>
                    <p className="text-muted-foreground text-sm">
                      {photo.notes}
                    </p>
                  </div>
                )}
                <Button className="w-full" variant="secondary">
                  View Full Page
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
