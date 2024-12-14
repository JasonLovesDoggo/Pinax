import SpotifyCurrentlyPlaying from "@/components/cards/spotify/player";
import SpotifyRecentHits from "@/components/cards/spotify/recent";

const Spotify = () => {
  return (
    <div className="flex flex-col gap-4">
      <SpotifyCurrentlyPlaying />
      <SpotifyRecentHits />
    </div>
  );
};

export default Spotify;
