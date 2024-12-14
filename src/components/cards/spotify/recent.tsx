// components/spotify-recent-hits.tsx
"use client";

import Link from "next/link";
import useSWR from "swr";
import { getRecentHits } from "@/lib/spotify";
import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const SpotifyRecentHitsPlaceholder = () => {
  return (
    <div className="relative h-full min-h-[75px] overflow-hidden">
      <div className="text-black relative z-10 flex h-full flex-col items-start justify-center gap-2 bg-[#00000050] pl-4">
        <Skeleton className="h-2 w-2/3" />
        <Skeleton className="h-2 w-1/3" />
      </div>
      <div className="text-white absolute right-1 top-1/2 h-12 -translate-y-1/2 pr-2">
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
    </div>
  );
};

const HIT_LIMIT = 5;

const SpotifyRecentHits = () => {
  const { data: tracks, error } = useSWR(
    "recent-hits",
    () => getRecentHits(5),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  if (error || !tracks || typeof tracks === "number") {
    return <SpotifyRecentHitsPlaceholder />;
  }

  const getImageUrl = (track: any) => {
    // @ts-ignore
    return (
      track.album.images.sort(
        (album1: { width: number }, album2: { width: number }) =>
          album2.width - album1.width,
      )[0] ?? track.album.images[0]
    ).url;
  };

  // @ts-ignore
  return (
    <ul className="flex flex-col gap-2">
      {tracks.items.map(({ track }, i) => (
        <Fragment key={`${track.name}-${i}`}>
          <li className="flex w-full items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getImageUrl(track)}
              alt="Cover"
              className="z-0 h-[50px] w-[50px] rounded object-cover object-[50%_33%] transition-transform group-hover:scale-110"
            />
            <Link
              href={track.uri}
              className="group flex cursor-pointer flex-col overflow-hidden text-ellipsis whitespace-nowrap"
            >
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                {track.name}
              </div>
              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm opacity-70">
                {track.artists.map((a) => a.name).join(",")}
              </div>
            </Link>
          </li>
          {i < HIT_LIMIT - 1 && <Separator />}
        </Fragment>
      ))}
    </ul>
  );
};

export default SpotifyRecentHits;
export { SpotifyRecentHitsPlaceholder };
