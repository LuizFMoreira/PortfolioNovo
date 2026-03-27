import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProjectModal from "./ProjectModal";

// ─── Data ────────────────────────────────────────────────────────────────────
const projectsData = {
  pt: [
    {
      id: 1,
      title: "Re.use — Plataforma Sustentável",
      description: "Plataforma digital para economia circular têxtil. Fluxo completo de cadastro, triagem e redistribuição de peças de roupa.",
      tech: ["Java", "Spring Boot", "MySQL", "Node.js"],
      github: "https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2025-1-ti2-3687100-brecho-re-use",
      images: ["/img/Re.use/image.png", "/img/Re.use/image2.png", "/img/Re.use/image3.png", "/img/Re.use/image4.png", "/img/Re.use/image5.png"],
      alt: "Re.use platform",
      tag: "Projeto Principal",
    },
    {
      id: 2,
      title: "IA Cirúrgica",
      description: "Visão computacional com YOLOv8n para identificar instrumentos cirúrgicos em tempo real.",
      tech: ["Python", "Flask", "React", "YOLOv8n", "Docker"],
      github: "https://github.com/ICEI-PUC-Minas-PPLES-TI/plu-es-2025-2-extensao-software-saude-fhsfa",
      images: ["/img/ProjetoExtensao/imagem3.jpeg", "/img/ProjetoExtensao/imagem4.jpeg", "/img/ProjetoExtensao/image5.jpeg"],
      alt: "Surgical AI",
      tag: "Pesquisa",
    },
    {
      id: 3,
      title: "Detalhes em Prata",
      description: "E-commerce full-stack para joias com Java, Spring Boot e Next.js.",
      tech: ["Java", "Spring Boot", "TypeScript", "Next.js"],
      github: "https://github.com/LuizFMoreira/seu-repositorio-joalheria",
      images: ["/img/detalhesPrata/image.png", "/img/detalhesPrata/image2.png", "/img/detalhesPrata/image3.png"],
      alt: "Detalhes em Prata",
      tag: "E-commerce",
    },
  ],
  en: [
    {
      id: 1,
      title: "Re.use — Sustainable Platform",
      description: "Digital platform for textile circular economy. Complete flow for registration, sorting, and redistribution of clothing.",
      tech: ["Java", "Spring Boot", "MySQL", "Node.js"],
      github: "https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2025-1-ti2-3687100-brecho-re-use",
      images: ["/img/Re.use/image.png", "/img/Re.use/image2.png", "/img/Re.use/image3.png", "/img/Re.use/image4.png", "/img/Re.use/image5.png"],
      alt: "Re.use platform",
      tag: "Main Project",
    },
    {
      id: 2,
      title: "Surgical AI",
      description: "Computer vision with YOLOv8n to identify surgical instruments in real-time.",
      tech: ["Python", "Flask", "React", "YOLOv8n", "Docker"],
      github: "https://github.com/ICEI-PUC-Minas-PPLES-TI/plu-es-2025-2-extensao-software-saude-fhsfa",
      images: ["/img/ProjetoExtensao/imagem3.jpeg", "/img/ProjetoExtensao/imagem4.jpeg", "/img/ProjetoExtensao/image5.jpeg"],
      alt: "Surgical AI",
      tag: "Research",
    },
    {
      id: 3,
      title: "Detalhes em Prata",
      description: "Full-stack jewelry e-commerce with Java, Spring Boot, and Next.js.",
      tech: ["Java", "Spring Boot", "TypeScript", "Next.js"],
      github: "https://github.com/LuizFMoreira/seu-repositorio-joalheria",
      images: ["/img/detalhesPrata/image.png", "/img/detalhesPrata/image2.png", "/img/detalhesPrata/image3.png"],
      alt: "Detalhes em Prata",
      tag: "E-commerce",
    },
  ],
};

// ─── Auto-cycling image ───────────────────────────────────────────────────────
import { useEffect } from "react";

const CyclingImage = ({ images, alt, aspectClass }) => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % images.length), 3500);
    return () => clearInterval(id);
  }, [images]);

  if (!images?.length) return null;

  return (
    <div className={`relative overflow-hidden ${aspectClass}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={idx}
          src={images[idx]}
          alt={`${alt} ${idx + 1}`}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </AnimatePresence>
      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
    </div>
  );
};

// ─── Projects ────────────────────────────────────────────────────────────────
const Projects = ({ language }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = projectsData[language] || projectsData["pt"];
  const [featured, ...rest] = projects;
  const detailsLabel = language === "pt" ? "Detalhes" : "Details";
  const sectionTitle = language === "pt" ? "Projetos & Pesquisa." : "Projects & Research.";
  const viewAllLabel = language === "pt" ? "Ver Todos os Projetos" : "View All Projects";

  return (
    <section id="projetos" className="py-28 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <p className="text-[11px] font-mono tracking-[0.35em] uppercase mb-3" style={{ color: 'var(--color-text-3)' }}>
            // projects
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {sectionTitle}
          </h2>
          <span className="accent-bar" />
        </motion.div>

        {/* ── BENTO GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">

          {/* ── Featured — spans 2 cols ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 bento-card bento-card-featured group cursor-pointer"
            onClick={() => setSelectedProject(featured)}
          >
            {/* Image */}
            <CyclingImage images={featured.images} alt={featured.alt} aspectClass="aspect-video" />

            {/* Content */}
            <div className="p-6">
              {/* Tag */}
              <span className="inline-block text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3"
                style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#A78BFA' }}>
                {featured.tag}
              </span>

              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                {featured.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-2)' }}>
                {featured.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {featured.tech.map((t, i) => <span key={i} className="tech-chip">{t}</span>)}
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={featured.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
                >
                  <FaGithub size={14} /> GitHub
                </a>
                <button
                  className="flex items-center gap-2 text-sm font-bold group/btn"
                  style={{ color: 'var(--accent-violet)' }}
                >
                  {detailsLabel}
                  <FaArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* ── Small cards — 1 col each ── */}
          <div className="flex flex-col gap-5">
            {rest.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.7, delay: 0.1 * (i + 1), ease: [0.16, 1, 0.3, 1] }}
                className="bento-card group cursor-pointer flex-1 flex flex-col"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image */}
                <CyclingImage images={project.images} alt={project.alt} aspectClass="aspect-[4/3]" />

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <span className="inline-block text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2 w-fit"
                    style={{ background: 'rgba(34,211,238,0.10)', border: '1px solid rgba(34,211,238,0.22)', color: '#67E8F9' }}>
                    {project.tag}
                  </span>
                  <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-violet-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs leading-relaxed mb-3 flex-1" style={{ color: 'var(--color-text-3)' }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tech.slice(0, 3).map((t, j) => <span key={j} className="tech-chip">{t}</span>)}
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-xs font-bold transition-colors"
                      style={{ color: 'var(--color-text-3)' }}
                    >
                      <FaGithub size={12} /> GitHub
                    </a>
                    <button className="flex items-center gap-1.5 text-xs font-bold ml-auto group/btn"
                      style={{ color: 'var(--accent-cyan)' }}>
                      {detailsLabel} <FaArrowRight size={10} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View all button */}
        <div className="text-center">
          <Link to="/todos-projetos">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-10 py-4 rounded-full font-bold text-sm transition-all duration-300"
              style={{
                background: 'transparent',
                border: '1px solid rgba(124,58,237,0.4)',
                color: 'var(--color-text-2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(124,58,237,0.12)';
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.7)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)';
                e.currentTarget.style.color = 'var(--color-text-2)';
              }}
            >
              {viewAllLabel} →
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        language={language}
      />
    </section>
  );
};

export default Projects;
