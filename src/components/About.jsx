import { useLanguage } from "../context/LanguageContext";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="container-page py-20 md:py-28">
      <SectionHeader id="sobre-titulo" title={t.about.title} />

      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-7">
          <p className="font-display text-3xl leading-snug tracking-tight sm:text-4xl">{t.about.lead}</p>
          <p className="mt-6 max-w-[56ch] leading-relaxed text-mute">{t.about.body}</p>
          <blockquote className="mt-10 max-w-[48ch] border-l border-accent pl-5 font-display text-xl italic leading-snug">
            {t.about.quote}
          </blockquote>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-5">
          <h3 className="eyebrow mb-4">{t.about.stackTitle}</h3>
          <dl className="border-t border-ink">
            {t.about.stack.map(([label, items]) => (
              <div key={label} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-4 text-sm">
                <dt className="font-medium">{label}</dt>
                <dd className="text-mute">{items}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
