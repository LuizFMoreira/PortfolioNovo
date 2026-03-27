export default async function handler(req, res) {
  const client_id     = process.env.VITE_SPOTIFY_CLIENT_ID;
  const client_secret = process.env.VITE_SPOTIFY_CLIENT_SECRET;
  const refresh_token = process.env.VITE_SPOTIFY_REFRESH_TOKEN;

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  const TOKEN_ENDPOINT        = 'https://accounts.spotify.com/api/token';
  const NOW_PLAYING_ENDPOINT  = 'https://api.spotify.com/v1/me/player/currently-playing';
  const RECENTLY_PLAYED_URL   = 'https://api.spotify.com/v1/me/player/recently-played?limit=6';

  try {
    // Exchange refresh token for access token
    const tokenRes = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token }),
    });

    const { access_token } = await tokenRes.json();
    const authHeader = { Authorization: `Bearer ${access_token}` };

    // Fetch now-playing and recently-played in parallel
    const [nowRes, recentRes] = await Promise.all([
      fetch(NOW_PLAYING_ENDPOINT,  { headers: authHeader }),
      fetch(RECENTLY_PLAYED_URL,   { headers: authHeader }),
    ]);

    // --- Now Playing ---
    let nowPlaying = null;
    if (nowRes.status === 200) {
      const song = await nowRes.json();
      if (song?.item) {
        nowPlaying = {
          isPlaying:     song.is_playing,
          title:         song.item.name,
          artist:        song.item.artists.map((a) => a.name).join(', '),
          album:         song.item.album.name,
          albumImageUrl: song.item.album.images[0]?.url ?? null,
          songUrl:       song.item.external_urls.spotify,
        };
      }
    }

    // --- Recently Played ---
    let recent = [];
    if (recentRes.status === 200) {
      const recentData = await recentRes.json();
      recent = (recentData.items ?? []).map((item) => ({
        title:         item.track.name,
        artist:        item.track.artists.map((a) => a.name).join(', '),
        album:         item.track.album.name,
        albumImageUrl: item.track.album.images[0]?.url ?? null,
        songUrl:       item.track.external_urls.spotify,
        playedAt:      item.played_at,
      }));
    }

    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');
    return res.status(200).json({ nowPlaying, recent });
  } catch (error) {
    return res.status(500).json({ nowPlaying: null, recent: [], message: 'Server error.' });
  }
}
