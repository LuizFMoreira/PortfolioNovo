import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import ProjectCase from "./ProjectCase";

export default function AllProjects() {
  const { t } = useLanguage();
  const [tech, setTech] = useState("all");

  const allTech = useMemo(
    () => [...new Set(t.projects.items.flatMap((p) => p.tech))].sort(),
    [t.projects.items]
  );

  const visible = useMemo(
    () => (tech === "all" ? t.projects.items : t.projects.items.filter((p) => p.tech.includes(tech))),
    [tech, t.projects.items]
  );

  const chip = (active) =>
    `border px-3 py-1 font-mono text-xs transition-colors ${
      active ? "border-ink bg-ink text-paper" : "border-ink/30 hover:border-ink"
    }`;

  return (
    <section className="container-page pb-24 pt-14">
      <Link to="/" className="link-underline text-sm">
        ← {t.archive.back}
      </Link>

      <h1 className="mt-8 font-display text-5xl leading-none tracking-tight sm:text-7xl">{t.archive.title}</h1>

      <div className="mt-10 flex flex-wrap items-center gap-2" role="group" aria-label={t.archive.filter}>
        <span className="eyebrow mr-2">{t.archive.filter}</span>
        <button type="button" onClick={() => setTech("all")} aria-pressed={tech === "all"} className={chip(tech === "all")}>
          {t.archive.all}
        </button>
        {allTech.map((name) => (
          <button key={name} type="button" onClick={() => setTech(name)} aria-pressed={tech === name} className={chip(tech === name)}>
            {name}
          </button>
        ))}
      </div>

      <div className="mt-8 border-b border-line">
        {visible.length ? (
          visible.map((p) => <ProjectCase key={p.id} project={p} />)
        ) : (
          <p className="border-t border-line py-10 text-mute">{t.archive.empty}</p>
        )}
      </div>
    </section>
  );
}
