import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaGithub } from "react-icons/fa";
import {
  FaReact, FaPython, FaNodeJs, FaJava, FaDocker,
} from "react-icons/fa";
import {
  SiSpringboot, SiMysql, SiTypescript, SiNextdotjs,
} from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { projectsData } from "../data/projects";

const APPLE = [0.16, 1, 0.3, 1];

// ─── Tech filter config ───────────────────────────────────────────────────────
const TECH_FILTERS = [
  { name: "Java",        icon: FaJava,       color: "#007396" },
  { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
  { name: "React",       icon: FaReact,      color: "#61DAFB" },
  { name: "Python",      icon: FaPython,     color: "#3776AB" },
  { name: "TypeScript",  icon: SiTypescript, color: "#3178C6" },
  { name: "Next.js",     icon: SiNextdotjs,  color: "#E8E8E8" },
  { name: "MySQL",       icon: SiMysql,      color: "#4479A1" },
  { name: "Node.js",     icon: FaNodeJs,     color: "#339933" },
  { name: "Docker",      icon: FaDocker,     color: "#2496ED" },
];

// ─── Tag accent colours ───────────────────────────────────────────────────────
const TAG_STYLES = [
  { bg: "rgba(124,58,237,0.15)", border: "rgba(124,58,237,0.3)",  color: "#A78BFA" },
  { bg: "rgba(34,211,238,0.10)", border: "rgba(34,211,238,0.25)", color: "#67E8F9" },
  { bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.25)", color: "#FCD34D" },
];

// ─── Project card ─────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index, detailsLabel, githubLabel, onClick }) => {
  const tagStyle = TAG_STYLES[index % TAG_STYLES.length];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: APPLE }}
      className="bento-card group cursor-pointer flex flex-col"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <img
          src={project.images[0]}
          alt={project.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => { e.target.style.display = "none"; }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

        {/* Tag */}
        <span
          className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
          style={{
            background: tagStyle.bg,
            border: `1px solid ${tagStyle.border}`,
            color: tagStyle.color,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          {project.tag}
        </span>

        {/* Screenshot count */}
        {project.images.length > 1 && (
          <span
            className="absolute bottom-3 right-3 text-[9px] font-mono px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(0,0,0,0.55)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(6px)",
            }}
          >
            {project.images.length} imgs
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-bold text-white mb-2 group-hover:text-violet-300 transition-colors leading-snug">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "var(--color-text-3)" }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((chip, j) => (
            <span key={j} className="tech-chip">{chip}</span>
          ))}
        </div>

        <div
          className="flex items-center gap-3 pt-3 border-t"
          style={{ borderColor: "var(--color-border)" }}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-xs font-bold transition-colors"
            style={{ color: "var(--color-text-3)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-1)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-3)")}
          >
            <FaGithub size={13} /> {githubLabel}
          </a>
          <button
            className="flex items-center gap-1.5 text-xs font-bold ml-auto group/btn"
            style={{ color: "var(--accent-violet)" }}
          >
            {detailsLabel}
            <FaArrowRight size={10} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.article>
  );
};

// ─── AllProjects ──────────────────────────────────────────────────────────────
const AllProjects = ({ language }) => {
  const navigate = useNavigate();
  const [activeTech, setActiveTech] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const projects = projectsData[language] || projectsData["pt"];

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchTech = !activeTech || p.tech.some(
        (t) => t.toLowerCase() === activeTech.toLowerCase()
      );
      const s = searchTerm.toLowerCase();
      const matchSearch =
        !s ||
        p.title.toLowerCase().includes(s) ||
        p.tech.some((t) => t.toLowerCase().includes(s));
      return matchTech && matchSearch;
    });
  }, [projects, activeTech, searchTerm]);

  const isPt = language === "pt";
  const t = {
    back:    isPt ? "Voltar para Home"                    : "Back to Home",
    label:   isPt ? "// galeria de projetos"              : "// project gallery",
    title1:  isPt ? "TODOS OS"                            : "ALL MY",
    title2:  isPt ? "PROJETOS."                           : "PROJECTS.",
    filter:  isPt ? "Filtrar por tecnologia"              : "Filter by technology",
    search:  isPt ? "Buscar projeto ou tecnologia…"       : "Search project or tech…",
    details: isPt ? "Ver Dashboard"                       : "View Dashboard",
    github:  "GitHub",
    empty:   isPt ? "Nenhum projeto encontrado."          : "No projects found.",
    count:   `${filtered.length} ${isPt ? (filtered.length !== 1 ? "projetos" : "projeto") : (filtered.length !== 1 ? "projects" : "project")}`,
  };

  return (
    <div
      className="min-h-screen relative pb-24 px-6"
      style={{ paddingTop: "clamp(5rem, 10vw, 7rem)" }}
    >
      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Back ── */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: APPLE }}
        >
          <Link
            to="/home"
            className="inline-flex items-center gap-2 mb-14 text-sm transition-colors group"
            style={{ color: "var(--color-text-3)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-1)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-3)")}
          >
            <FaArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            {t.back}
          </Link>
        </motion.div>

        {/* ── Hero title ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: APPLE }}
          className="mb-14"
        >
          <p
            className="text-[11px] font-mono tracking-[0.35em] uppercase mb-4"
            style={{ color: "var(--color-text-3)" }}
          >
            {t.label}
          </p>
          <h1
            className="font-black text-white leading-[0.9] mb-5"
            style={{ fontSize: "clamp(3rem, 9vw, 7rem)", letterSpacing: "-0.03em" }}
          >
            {t.title1}
            <br />
            <span className="text-gradient">{t.title2}</span>
          </h1>
          <span className="accent-bar" />
        </motion.div>

        {/* ── Tech filter grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: APPLE }}
          className="mb-10"
        >
          <p
            className="text-[10px] font-mono tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--color-text-3)" }}
          >
            {t.filter}
          </p>
          <div className="flex flex-wrap gap-3">
            {TECH_FILTERS.map(({ name, icon: Icon, color }) => {
              const active = activeTech === name;
              return (
                <button
                  key={name}
                  onClick={() => setActiveTech(active ? null : name)}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200"
                  style={{
                    background: active ? "rgba(124,58,237,0.18)" : "rgba(255,255,255,0.05)",
                    border: active
                      ? "1px solid rgba(124,58,237,0.55)"
                      : "1px solid rgba(255,255,255,0.08)",
                    color: active ? "#C4B5FD" : "var(--color-text-3)",
                    boxShadow: active ? "0 0 16px rgba(124,58,237,0.15)" : "none",
                  }}
                >
                  <Icon style={{ color: active ? color : undefined, fontSize: "1.1em", flexShrink: 0 }} />
                  {name}
                </button>
              );
            })}
            {activeTech && (
              <button
                onClick={() => setActiveTech(null)}
                className="px-4 py-2.5 rounded-2xl text-xs font-bold transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "var(--color-text-3)",
                }}
              >
                ✕ limpar
              </button>
            )}
          </div>
        </motion.div>

        {/* ── Search + count ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: APPLE }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12"
        >
          <input
            type="text"
            placeholder={t.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:max-w-xs text-sm rounded-2xl py-3 px-5 outline-none transition-all"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(124,58,237,0.22)",
              color: "var(--color-text-1)",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(124,58,237,0.65)";
              e.target.style.background = "rgba(124,58,237,0.05)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(124,58,237,0.22)";
              e.target.style.background = "rgba(255,255,255,0.04)";
            }}
          />
          <span
            className="text-[11px] font-mono tracking-widest uppercase sm:ml-auto"
            style={{ color: "var(--color-text-3)" }}
          >
            {t.count}
          </span>
        </motion.div>

        {/* ── Grid ── */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-3 text-center py-24 text-sm"
                style={{ color: "var(--color-text-3)" }}
              >
                {t.empty}
              </motion.p>
            ) : (
              filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  detailsLabel={t.details}
                  githubLabel={t.github}
                  onClick={() => navigate(`/projetos/${project.id}`)}
                />
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default AllProjects;
