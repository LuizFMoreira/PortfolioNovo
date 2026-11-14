import { useLanguage } from "../context/LanguageContext";
import { useNowPlaying } from "../hooks/useNowPlaying";

export default function Footer() {
  const { t } = useLanguage();
  const song = useNowPlaying();

  return (
    <footer className="border-t border-ink">
      <div className="container-page flex flex-col gap-4 py-8 text-sm text-mute md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {t.footer.rights}. {t.footer.built}
        </p>

        {song && (
          <p className="font-mono text-xs">
            <span className="text-accent">●</span> {t.footer.nowPlaying}:{" "}
            <a href={song.songUrl} target="_blank" rel="noopener noreferrer" className="link-underline text-ink">
              {song.title} — {song.artist}
            </a>
          </p>
        )}
      </div>
    </footer>
  );
}
