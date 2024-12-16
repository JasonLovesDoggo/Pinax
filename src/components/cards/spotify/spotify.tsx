import SpotifyCurrentlyPlaying from "@/components/cards/spotify/player";

const Spotify = () => {
  return (
    <div className="flex flex-col gap-4">
      <SpotifyCurrentlyPlaying />
      {/*<SpotifyRecentHits />*/}
    </div>
  );
};

export default Spotify;
