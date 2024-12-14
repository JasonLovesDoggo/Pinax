import GridCard from "@/components/cards/default";
import { Site } from "@/config/site";

import useSWR from "swr";

import { SiSpotify } from "react-icons/si";

export default function Spotify() {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data } = useSWR("/api/spotify", fetcher);
  return (
    <GridCard className={`flex-col items-center justify-center`}>
      <a
        target="_blank"
        rel="noopener noreferer"
        href={data?.isPlaying ? data.songUrl : Site.spotifyAccountUrl}
        className="relative flex w-72 items-center space-x-4 rounded-md border p-5 transition-shadow hover:shadow-md"
      >
        <div className="w-16">
          {data?.isPlaying ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="w-16 shadow-sm"
              src={data?.albumImageUrl}
              alt={data?.album}
            />
          ) : (
            <SiSpotify size={64} color={"#1ED760"} />
          )}
        </div>

        <div className="flex-1">
          <p className="component font-bold">
            {data?.isPlaying ? data.title : "Not Listening"}
          </p>
          <p className="font-dark text-xs">
            {data?.isPlaying ? data.artist : "Spotify"}
          </p>
        </div>
        <div className="absolute bottom-1.5 right-1.5">
          <SiSpotify size={20} color={"#1ED760"} />
        </div>
      </a>
    </GridCard>
  );
}
