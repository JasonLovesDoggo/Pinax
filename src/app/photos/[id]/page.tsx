import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPhotoMetadata, getPhotoUrl } from "@/lib/photos/utils";

interface PhotoPageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PhotoPageProps): Promise<Metadata> {
  const photo = await getPhotoMetadata(params.id);
  if (!photo) return {};

  return {
    title: `Photo ${photo.id}`,
    description:
      photo.notes ||
      `Photo taken on ${new Date(photo.captureDate).toLocaleDateString()}`,
    openGraph: {
      images: [getPhotoUrl(params.id)],
    },
  };
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const photo = await getPhotoMetadata(params.id);

  if (!photo) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <div className="relative aspect-video">
          <Image
            src={getPhotoUrl(params.id)}
            alt={photo.notes || `Photo ${photo.id}`}
            fill
            className="object-cover"
            priority
          />
        </div>
        <CardHeader>
          <CardTitle>Photo Details</CardTitle>
          <CardDescription>
            Captured on {new Date(photo.captureDate).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-medium">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {photo.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            {photo.notes && (
              <div>
                <h4 className="mb-2 text-sm font-medium">Notes</h4>
                <p className="text-muted-foreground text-sm">{photo.notes}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
