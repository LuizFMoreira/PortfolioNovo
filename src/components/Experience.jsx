import { useLanguage } from "../context/LanguageContext";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Experience() {
  const { language, t } = useLanguage();

  return (
    <section id="experiencia" aria-labelledby="experiencia-titulo" className="container-page py-20 md:py-28">
      <SectionHeader id="experiencia-titulo" title={t.experience.title} intro={t.experience.intro} />

      <ol className="border-b border-line">
        {t.experience.items.map((item) => (
          <li key={item.id}>
            <Reveal>
              <div className="grid gap-4 border-t border-line py-8 md:grid-cols-12 md:gap-10">
                <p className="eyebrow md:col-span-3 md:pt-2">{item.period[language]}</p>

                <div className="md:col-span-5">
                  <h3 className="font-display text-3xl leading-tight tracking-tight">{item.role[language]}</h3>
                  <p className="mt-1 text-sm text-accent">{item.org[language]}</p>
                  <p className="mt-4 max-w-[46ch] leading-relaxed text-mute">{item.description[language]}</p>
                </div>

                <div className="md:col-span-4">
                  <ul className="space-y-2 text-sm leading-relaxed">
                    {item.points[language].map((point) => (
                      <li key={point} className="flex gap-3">
                        <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-ink" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 font-mono text-xs text-mute">{item.stack.join(" / ")}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
