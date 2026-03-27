/**
 * spotify.js — thin wrapper around the /api/spotify serverless function.
 *
 * The heavy lifting (token exchange, Spotify API calls) is all done server-side
 * to avoid CORS issues with accounts.spotify.com.
 *
 * Returns:
 *   { nowPlaying: { isPlaying, title, artist, album, albumImageUrl, songUrl } | null,
 *     recent:     [{ title, artist, album, albumImageUrl, songUrl, playedAt }] }
 */
export async function getSpotifyData() {
  const res = await fetch('/api/spotify');
  if (!res.ok) return { nowPlaying: null, recent: [] };
  return res.json();
}
