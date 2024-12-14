import { NextResponse } from "next/server";
import { env } from "@/env";

interface SpotifyTrack {
  name: string;
  album: {
    name: string;
    artists: Array<{ name: string }>;
    images: Array<{ url: string }>;
  };
  external_urls: {
    spotify: string;
  };
}

interface SpotifyApi {
  is_playing: boolean;
  currently_playing_type?: string;
  item?: SpotifyTrack;
  items?: Array<{ track: SpotifyTrack }>;
}

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_NOW_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";
const SPOTIFY_RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

const getBasicToken = () =>
  Buffer.from(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`).toString(
    "base64",
  );

const getAccessToken = async (): Promise<string> => {
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${getBasicToken()}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: env.SPOTIFY_REFRESH_TOKEN ?? "",
    }).toString(),
  });

  const data = await response.json();
  console.log(data);
  return data.access_token;
};

const fetchSpotifyData = async (
  url: string,
  accessToken: string,
): Promise<SpotifyApi> => {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return response.json();
};

const formatResponse = (data: SpotifyApi) => {
  const track = data.item ?? data.items?.[0]?.track;
  if (!track) {
    throw new Error("No track data available");
  }

  return {
    isPlaying: data.is_playing || false,
    title: track.name,
    album: track.album.name,
    artist: track.album.artists.map((artist) => artist.name).join(", "),
    albumImageUrl: track.album.images[0]?.url,
    songUrl: track.external_urls.spotify,
  };
};

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    console.log("access token", accessToken);
    let data = await fetchSpotifyData(SPOTIFY_NOW_PLAYING_URL, accessToken);
    console.log(data);

    if (!data.is_playing || data.currently_playing_type !== "track") {
      data = await fetchSpotifyData(SPOTIFY_RECENTLY_PLAYED_URL, accessToken);
    }

    return NextResponse.json(formatResponse(data));
  } catch (error) {
    const accessToken = await getAccessToken();
    const data = await fetchSpotifyData(
      SPOTIFY_RECENTLY_PLAYED_URL,
      accessToken,
    );

    return NextResponse.json(formatResponse(data));
  }
}
