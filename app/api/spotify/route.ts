import { NextResponse } from "next/server";

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN,
} = process.env;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

async function getAccessToken() {
  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN as string,
    }),
    cache: "no-store",
  });

  return res.json();
}

export async function GET() {
  try {
    const { access_token } = await getAccessToken();

    // Try current track first
    const nowRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    });

    if (nowRes.status === 204 || nowRes.status > 400) {
      // Nothing playing → get last played
      const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        cache: "no-store",
      });
      const recentData = await recentRes.json();
      const last = recentData.items[0].track;

      return NextResponse.json({
        isPlaying: false,
        track: {
          title: last.name,
          artist: last.artists.map((a: any) => a.name).join(", "),
          albumArtUrl: last.album.images[0].url,
          songUrl: last.external_urls.spotify,
        },
      });
    } else {
      const data = await nowRes.json();
      return NextResponse.json({
        isPlaying: true,
        track: {
          title: data.item.name,
          artist: data.item.artists.map((a: any) => a.name).join(", "),
          albumArtUrl: data.item.album.images[0].url,
          songUrl: data.item.external_urls.spotify,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch Spotify data" }, { status: 500 });
  }
}
