import Reveal from "./Reveal";

export default function SectionHeader({ id, title, intro }) {
  return (
    <Reveal>
      <header className="mb-10 grid gap-4 border-t border-ink pt-6 md:grid-cols-[1fr_2fr] md:gap-10">
        <h2 id={id} className="font-display text-4xl leading-none tracking-tight sm:text-5xl">
          {title}
        </h2>
        {intro && <p className="max-w-[52ch] text-mute md:pt-2">{intro}</p>}
      </header>
    </Reveal>
  );
}
