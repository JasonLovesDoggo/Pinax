"use client";

import { ActivityLogIcon, PlayIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import useSWR from "swr";
import { getCurrentlyPlaying } from "@/lib/spotify";
import { Skeleton } from "@/components/ui/skeleton";

const PlayerOffline = () => {
  return (
    <div className="relative h-full min-h-[75px] overflow-hidden">
      <div className="bg-secondary text-muted-foreground relative z-10 flex h-full flex-col items-start justify-center gap-2 pl-4">
        <p className="group-hover:text-gray-200 w-2/3 overflow-hidden text-ellipsis whitespace-nowrap font-normal">
          Playback paused
        </p>
      </div>
      <div className="text-muted-foreground absolute right-1 top-1/2 z-10 h-12 -translate-y-1/2 pr-2">
        <ActivityLogIcon className="h-12 w-12" />
      </div>
    </div>
  );
};

const PlaceholderPlayer = () => {
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

const SpotifyCurrentlyPlaying = () => {
  const { data: track, error } = useSWR(
    "currently-playing",
    getCurrentlyPlaying,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  if (error || !track) {
    return <PlaceholderPlayer />;
  }

  if (typeof track === "number") {
    return <PlayerOffline />;
  }

  console.log(track);

  const getImageUrl = () => {
    // @ts-ignore
    return (
      track.item.album.images.sort(
        (album1, album2) => album2.width - album1.width,
      )[0] ?? track.item.album.images[0]
    ).url;
  };
  return (
    <Link
      href={track.item.uri}
      className="group h-full min-h-[100px] cursor-pointer"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getImageUrl()}
        alt="Cover"
        className="absolute left-0 top-0 z-0 h-full w-full rounded-[var(--radius)] object-cover object-[50%_33%] transition-transform group-hover:scale-110"
      />
      <div className="text-white relative z-10 flex h-full flex-col items-start justify-end bg-[#00000050] pb-4 pl-4">
        <p className="group-hover:text-gray-200 w-2/3 overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold">
          {track.item.name}
        </p>
        <p className="group-hover:text-gray-200 w-2/3 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal opacity-80">
          {track.item.artists.map((a) => a.name).join(",")}
        </p>
      </div>
      <div className="text-white group-hover:text-gray-200 absolute bottom-4 right-4 z-10 h-6">
        <PlayIcon className="h-6 w-6" />
      </div>
    </Link>
  );
};

export default SpotifyCurrentlyPlaying;
export { PlaceholderPlayer };
