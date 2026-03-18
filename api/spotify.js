export default async function handler(req, res) {
  // Extraímos as variáveis do sistema
  const client_id = process.env.VITE_SPOTIFY_CLIENT_ID;
  const client_secret = process.env.VITE_SPOTIFY_CLIENT_SECRET;
  const refresh_token = process.env.VITE_SPOTIFY_REFRESH_TOKEN;

  // Calculamos a chave base64
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
  const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
  const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

  try {
    // 1ª Derivada: Trocar o refresh token por um token de acesso válido
    const tokenResponse = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      }),
    });

    const tokenData = await tokenResponse.json();
    const access_token = tokenData.access_token;

    // 2ª Derivada: Buscar a música tocando no momento
    const songResponse = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Se o status for 204, o Spotify não está tocando nada
    if (songResponse.status === 204 || songResponse.status > 400) {
      return res.status(200).json({ isPlaying: false });
    }

    const song = await songResponse.json();

    if (song.item === null) {
      return res.status(200).json({ isPlaying: false });
    }

    // Simplificando o JSON para entregar apenas o necessário ao frontend
    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist) => _artist.name).join(', ');
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;

    // Adicionamos um cabeçalho de cache para otimizar o tempo de resposta (física do Vercel)
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');

    // Retorna a função resolvida
    return res.status(200).json({
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    });
  } catch (error) {
    return res.status(500).json({ isPlaying: false, message: 'Erro de cálculo no servidor.' });
  }
}