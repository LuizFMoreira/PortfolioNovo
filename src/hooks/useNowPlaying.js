import { useEffect, useState } from "react";

// Consulta /api/spotify a cada 30s e só atualiza com a aba visível.
export function useNowPlaying(intervalMs = 30000) {
  const [song, setSong] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (document.hidden) return;
      try {
        const res = await fetch("/api/spotify");
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        if (!cancelled) setSong(data?.isPlaying ? data : null);
      } catch {
        if (!cancelled) setSong(null);
      }
    };

    load();
    const id = setInterval(load, intervalMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [intervalMs]);

  return song;
}
