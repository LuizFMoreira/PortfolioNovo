import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import ProjectCase from "./ProjectCase";
import SectionHeader from "./SectionHeader";

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projetos" aria-labelledby="projetos-titulo" className="container-page py-20 md:py-28">
      <SectionHeader id="projetos-titulo" title={t.projects.title} intro={t.projects.intro} />

      <div className="border-b border-line">
        {t.projects.items.map((project) => (
          <ProjectCase key={project.id} project={project} />
        ))}
      </div>

      <div className="mt-8">
        <Link to="/projetos" className="link-underline text-sm font-medium">
          {t.projects.all} →
        </Link>
      </div>
    </section>
  );
}
