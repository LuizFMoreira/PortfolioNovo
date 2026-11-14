import { useLanguage } from "../context/LanguageContext";
import ImageCarousel from "./ImageCarousel";
import Reveal from "./Reveal";

export default function ProjectCase({ project }) {
  const { language, t } = useLanguage();

  return (
    <Reveal>
      <article className="grid gap-6 border-t border-line py-10 md:grid-cols-12 md:gap-10">
        <div className="flex flex-col justify-between gap-6 md:col-span-5">
          <div>
            <p className="eyebrow mb-3">{project.kind[language]}</p>
            <h3 className="font-display text-4xl leading-none tracking-tight sm:text-5xl">
              {project.title[language]}
            </h3>
            <p className="mt-5 max-w-[46ch] leading-relaxed text-mute">
              {project.description[language]}
            </p>
          </div>

          <div>
            <ul className="mb-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-ink">
              {project.tech.map((tech) => (
                <li key={tech} className="after:ml-3 after:text-line after:content-['/'] last:after:content-['']">
                  {tech}
                </li>
              ))}
            </ul>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm font-medium"
            >
              {t.projects.code} ↗
            </a>
          </div>
        </div>

        <div className="md:col-span-7">
          <ImageCarousel images={project.images} alt={project.alt[language]} />
        </div>
      </article>
    </Reveal>
  );
}
