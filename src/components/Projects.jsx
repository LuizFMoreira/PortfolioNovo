import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom"; 
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";

// ==========================================
// MÁQUINA DE ESTADOS DO CARROSSEL
// ==========================================
const ImageCarousel = ({ images, altText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Se não houver imagens ou for apenas uma, não inicia o loop
    if (!images || images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [images]);

  // Fallback de segurança caso o vetor venha vazio
  if (!images || images.length === 0) {
    return (
      <img
        src={`https://via.placeholder.com/600x400/0f0728/38bdf8?text=Sem+Imagem`}
        className="absolute inset-0 w-full h-full object-cover"
        alt="Placeholder"
      />
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl bg-black/50 group/carousel">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover/card:opacity-100 transition-opacity duration-300"
          alt={`${altText} - frame ${currentIndex + 1}`}
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/600x400/0f0728/38bdf8?text=Erro+na+Imagem`;
          }}
        />
      </AnimatePresence>

      {/* Indicadores de Posição (Dots) */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-black/40 px-2 py-1 rounded-full backdrop-blur-md border border-white/10">
          {images.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-4 bg-neon-cyan' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
      
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
    </div>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL (PROJECTS)
// ==========================================
const Projects = ({ language }) => {
  const projectsData = {
    pt: [
      {
        id: 1,
        title: "Re.use - Plataforma Sustentável",
        description: "Plataforma digital para economia circular têxtil. Fluxo completo de cadastro, triagem e redistribuição.",
        tech: ["Java", "Spring Boot", "MySQL", "Node.js"],
        github: "https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2025-1-ti2-3687100-brecho-re-use",
        images: [
          "/img/Re.use/image.png", 
          "/img/Re.use/image2.png", 
          "/img/Re.use/image3.png", 
          "/img/Re.use/image4.png", 
          "/img/Re.use/image5.png"
        ],
        alt: "Demonstração da plataforma Re.use",
      },
      {
        id: 2,
        title: "IA Cirúrgica (Pesquisa)",
        description: "Aplicação web com visão computacional (YOLOv8n) para identificar instrumentos cirúrgicos em tempo real.",
        tech: ["Python", "Flask", "React", "YOLOv8n", "Docker"],
        github: "https://github.com/ICEI-PUC-Minas-PPLES-TI/plu-es-2025-2-extensao-software-saude-fhsfa",
        images: [
          "/img/ProjetoExtensao/imagem3.jpeg", 
          "/img/ProjetoExtensao/imagem4.jpeg",
          "/img/ProjetoExtensao/imagem5.jpeg" 
        ],
        alt: "Detecção de instrumentos cirúrgicos",
      },
      {
        id: 3,
        title: "Detalhes em Prata - E-commerce",
        description: "Aplicação full-stack para e-commerce de joias. Back-end robusto construído com Java e Spring Boot, integrado a uma interface moderna, reativa e tipada utilizando TypeScript e Next.js.",
        tech: ["Java", "Spring Boot", "TypeScript", "Next.js"],
        github: "https://github.com/LuizFMoreira/seu-repositorio-joalheria",
        images: [
          "/img/detalhesPrata/image.png", 
          "/img/detalhesPrata/image2.png", 
          "/img/detalhesPrata/image3.png"
        ],
        alt: "Interface da loja Detalhes em Prata",
      }
    ],
    en: [
      {
        id: 1,
        title: "Re.use - Sustainable Platform",
        description: "Digital platform for textile circular economy. Complete flow for registration, sorting, and redistribution.",
        tech: ["Java", "Spring Boot", "MySQL", "Node.js"],
        github: "https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2025-1-ti2-3687100-brecho-re-use",
        images: [
          "/img/Re.use/image.png", 
          "/img/Re.use/image2.png", 
          "/img/Re.use/image3.png", 
          "/img/Re.use/image4.png", 
          "/img/Re.use/image5.png"
        ],
        alt: "Re.use platform demonstration",
      },
      {
        id: 2,
        title: "Surgical AI (Research)",
        description: "Web application with computer vision (YOLOv8n) to identify surgical instruments in real-time.",
        tech: ["Python", "Flask", "React", "YOLOv8n", "Docker"],
        github: "https://github.com/ICEI-PUC-Minas-PPLES-TI/plu-es-2025-2-extensao-software-saude-fhsfa",
        images: [
          "/img/ProjetoExtensao/imagem3.jpeg", 
          "/img/ProjetoExtensao/imagem4.jpeg",
          "/img/ProjetoExtensao/imagem5.jpeg" 
        ],
        alt: "Surgical instrument detection",
      },
      {
        id: 3,
        title: "Detalhes em Prata - E-commerce",
        description: "Full-stack application for a jewelry e-commerce. Robust back-end built with Java and Spring Boot, integrated with a modern, reactive, and strongly-typed interface using TypeScript and Next.js.",
        tech: ["Java", "Spring Boot", "TypeScript", "Next.js"],
        github: "https://github.com/LuizFMoreira/seu-repositorio-joalheria",
        images: [
          "/img/detalhesPrata/image.png", 
          "/img/detalhesPrata/image2.png", 
          "/img/detalhesPrata/image3.png"
        ],
        alt: "Detalhes em Prata store interface",
      }
    ]
  };

  const projects = projectsData[language] || projectsData['pt'];
  const sectionTitle = language === "pt" ? "Projetos e Pesquisa." : "Projects & Research.";

  return (
    <section id="projetos" className="py-24 px-6 relative z-10 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {sectionTitle}
          </h2>
          <div className="w-20 h-1.5 bg-neon-cyan mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((project) => (
            <CardContainer key={project.id} className="w-full h-full">
              <CardBody className="bg-black/30 backdrop-blur-md border border-white/10 hover:border-neon-cyan/40 w-full h-full rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-neon-cyan/20 group/card">
                <div>
                  <CardItem translateZ="40" className="text-xl font-bold text-white mb-3">
                    {project.title}
                  </CardItem>

                  <CardItem
                    as="p"
                    translateZ="50"
                    className="text-slate-300 text-sm mb-5 leading-relaxed"
                  >
                    {project.description}
                  </CardItem>

                  {/* AQUI ESTÁ A INTEGRAÇÃO CORRETA DO CARROSSEL NO EIXO Z */}
                  <CardItem translateZ="80" className="w-full mb-6">
                    <div className="h-44 w-full overflow-hidden rounded-xl border border-white/5 relative">
                      <ImageCarousel images={project.images} altText={project.alt} />
                    </div>
                  </CardItem>
                </div>

                <div className="flex flex-col gap-4">
                  <CardItem translateZ={20} className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono tracking-wider bg-white/5 text-neon-cyan px-2 py-1 rounded-md border border-neon-cyan/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </CardItem>

                  <div className="flex items-center justify-between mt-2">
                    <CardItem
                      translateZ={20}
                      as="a"
                      href={project.github}
                      target="_blank"
                      className="px-4 py-2 rounded-xl bg-white/10 text-white border border-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-2 transition-all"
                    >
                      <FaGithub size={16} /> GitHub
                    </CardItem>

                    <CardItem translateZ={20}>
                      <Link 
                        to="/todos-projetos" 
                        className="text-neon-cyan text-xs font-bold flex items-center gap-2 hover:underline group"
                      >
                        {language === 'pt' ? 'Detalhes' : 'Details'} 
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </CardItem>
                  </div>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>

        {/* BOTÃO VER TODOS */}
        <div className="mt-20 text-center">
          <Link to="/todos-projetos">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 211, 238, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-transparent border-2 border-neon-cyan text-neon-cyan font-bold rounded-full hover:bg-neon-cyan hover:text-black transition-all duration-300"
            >
              {language === "pt" ? "Ver Todos os Projetos" : "View All Projects"}
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;