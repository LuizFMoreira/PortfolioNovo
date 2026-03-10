import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaGithub, FaSearch, FaArrowLeft, FaCode, FaServer, FaLayerGroup,
  FaReact, FaPython, FaNodeJs, FaJava, FaDocker 
} from "react-icons/fa";
import { 
  SiSpringboot, SiMysql, SiJavascript, SiTypescript, SiNextdotjs 
} from "react-icons/si";
import { Link } from "react-router-dom";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";

// ==========================================
// MÁQUINA DE ESTADOS DO CARROSSEL
// ==========================================
const ImageCarousel = ({ images, altText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return <img src="https://via.placeholder.com/600x400/0f0728/38bdf8?text=Sem+Imagem" className="absolute inset-0 w-full h-full object-cover" alt="Placeholder" />;
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
          onError={(e) => { e.target.src = `https://via.placeholder.com/600x400/0f0728/38bdf8?text=Erro`; }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-black/40 px-2 py-1 rounded-full backdrop-blur-md border border-white/10">
          {images.map((_, idx) => (
            <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-neon-cyan' : 'w-1.5 bg-white/40'}`} />
          ))}
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
    </div>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL (GALERIA)
// ==========================================
const AllProjects = ({ language }) => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Dicionário de Ícones Atualizado
  const techIcons = {
    "React": <FaReact className="text-[#61DAFB]" />,
    "Next.js": <SiNextdotjs className="text-white" />,
    "TypeScript": <SiTypescript className="text-[#3178C6]" />,
    "Python": <FaPython className="text-[#3776AB]" />,
    "Node.js": <FaNodeJs className="text-[#339933]" />,
    "Java": <FaJava className="text-[#007396]" />,
    "Spring Boot": <SiSpringboot className="text-[#6DB33F]" />,
    "MySQL": <SiMysql className="text-[#4479A1]" />,
    "Docker": <FaDocker className="text-[#2496ED]" />,
    "JS": <SiJavascript className="text-[#F7DF1E]" />
  };

  // Matriz de Dados Bilíngue com Categorias
  const allProjectsData = {
    pt: [
      {
        id: 1,
        title: "Re.use - Plataforma Sustentável",
        category: "full",
        description: "Plataforma digital para economia circular têxtil. Fluxo completo de cadastro, triagem e redistribuição.",
        tech: ["Java", "Spring Boot", "MySQL", "Node.js"],
        github: "https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2025-1-ti2-3687100-brecho-re-use",
        images: ["/img/Re.use/image.png", "/img/Re.use/image2.png", "/img/Re.use/image3.png", "/img/Re.use/image4.png", "/img/Re.use/image5.png"],
      },
      {
        id: 2,
        title: "IA Cirúrgica (Pesquisa)",
        category: "full",
        description: "Visão computacional (YOLOv8n) para identificar instrumentos cirúrgicos em tempo real.",
        tech: ["Python", "Flask", "React", "Docker"],
        github: "https://github.com/ICEI-PUC-Minas-PPLES-TI/plu-es-2025-2-extensao-software-saude-fhsfa",
        images: ["/img/ProjetoExtensao/imagem3.jpeg", "/img/ProjetoExtensao/imagem4.jpeg", "/img/ProjetoExtensao/imagem5.jpeg"],
      },
      {
        id: 3,
        title: "Detalhes em Prata - E-commerce",
        category: "full",
        description: "Aplicação full-stack para e-commerce de joias. Back-end robusto construído com Java e Spring Boot.",
        tech: ["Java", "Spring Boot", "TypeScript", "Next.js"],
        github: "https://github.com/LuizFMoreira/seu-repositorio-joalheria",
        images: ["/img/detalhesPrata/image.png", "/img/detalhesPrata/image2.png", "/img/detalhesPrata/image3.png"],
      }
    ],
    en: [
      {
        id: 1,
        title: "Re.use - Sustainable Platform",
        category: "full",
        description: "Digital platform for textile circular economy. Complete flow for registration, sorting, and redistribution.",
        tech: ["Java", "Spring Boot", "MySQL", "Node.js"],
        github: "https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2025-1-ti2-3687100-brecho-re-use",
        images: ["/img/Re.use/image.png", "/img/Re.use/image2.png", "/img/Re.use/image3.png", "/img/Re.use/image4.png", "/img/Re.use/image5.png"],
      },
      {
        id: 2,
        title: "Surgical AI (Research)",
        category: "full",
        description: "Computer vision (YOLOv8n) to identify surgical instruments in real-time.",
        tech: ["Python", "Flask", "React", "Docker"],
        github: "https://github.com/ICEI-PUC-Minas-PPLES-TI/plu-es-2025-2-extensao-software-saude-fhsfa",
        images: ["/img/ProjetoExtensao/imagem3.jpeg", "/img/ProjetoExtensao/imagem4.jpeg", "/img/ProjetoExtensao/imagem5.jpeg"],
      },
      {
        id: 3,
        title: "Detalhes em Prata - E-commerce",
        category: "full",
        description: "Full-stack jewelry e-commerce application. Robust back-end built with Java and Spring Boot.",
        tech: ["Java", "Spring Boot", "TypeScript", "Next.js"],
        github: "https://github.com/LuizFMoreira/seu-repositorio-joalheria",
        images: ["/img/detalhesPrata/image.png", "/img/detalhesPrata/image2.png", "/img/detalhesPrata/image3.png"],
      }
    ]
  };

  const allProjects = allProjectsData[language] || allProjectsData['pt'];

  // Lógica de Filtragem Otimizada
  const filteredProjects = useMemo(() => {
    return allProjects.filter((p) => {
      const matchesFilter = filter === "all" || p.category === filter;
      const matchesSearch = p.tech.some(t => 
        t.toLowerCase().includes(searchTerm.toLowerCase())
      ) || p.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchTerm, allProjects]);

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6 pb-20 relative overflow-hidden">
      {/* Glow de fundo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-cyan/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-neon-cyan transition-colors group">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
            {language === 'pt' ? 'Voltar para Home' : 'Back to Home'}
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
            {language === 'pt' ? 'GALERIA DE PROJETOS' : 'PROJECT GALLERY'}
          </h1>
        </div>

        {/* Grade de Tecnologias */}
        <div className="mb-12">
          <p className="text-[10px] uppercase font-bold text-slate-500 mb-4 tracking-[0.2em] text-center md:text-left">
            {language === 'pt' ? 'Filtrar por Tecnologia' : 'Filter by Tech'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {Object.entries(techIcons).map(([name, icon]) => (
              <button
                key={name}
                onClick={() => setSearchTerm(name === searchTerm ? "" : name)}
                className={`flex flex-col items-center justify-center p-4 w-24 h-24 rounded-2xl border transition-all duration-300 group ${
                  searchTerm.toLowerCase() === name.toLowerCase()
                  ? 'bg-neon-cyan/20 border-neon-cyan shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                  : 'bg-white/5 border-white/10 hover:border-white/30'
                }`}
              >
                <div className={`text-3xl mb-2 transition-transform ${searchTerm.toLowerCase() === name.toLowerCase() ? 'scale-110' : 'grayscale group-hover:grayscale-0'}`}>
                  {icon}
                </div>
                <span className="text-[10px] font-bold tracking-tight text-center">{name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filtros de Categoria e Busca */}
        <div className="flex flex-col lg:flex-row gap-6 mb-16 items-center justify-between bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-md">
          <div className="flex flex-wrap gap-2 p-1 bg-black/40 rounded-2xl">
            {[
              { id: 'all', label: 'Todos', icon: <FaLayerGroup /> },
              { id: 'front', label: 'Front', icon: <FaCode /> },
              { id: 'back', label: 'Back', icon: <FaServer /> },
              { id: 'full', label: 'Full', icon: <FaLayerGroup /> }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                  filter === cat.id ? 'bg-neon-cyan text-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-96">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text"
              placeholder={language === 'pt' ? "Buscar tecnologia..." : "Search tech..."}
              className="w-full bg-black/60 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-neon-cyan outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Grid de Cards */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <CardContainer className="w-full h-full">
                  <CardBody className="bg-black/40 backdrop-blur-md border border-white/10 hover:border-neon-cyan/40 w-full h-full rounded-3xl p-6 flex flex-col justify-between transition-all group/card">
                    <div>
                      <CardItem translateZ="50" className="text-xl font-bold text-white mb-2">{project.title}</CardItem>
                      <CardItem translateZ="60" as="p" className="text-slate-400 text-sm mb-6 line-clamp-2 min-h-[40px]">{project.description}</CardItem>
                      
                      {/* Carrossel integrado perfeitamente no Z-index da Galeria */}
                      <CardItem translateZ="100" className="w-full mb-6">
                        <div className="h-44 w-full rounded-2xl relative border border-white/5 overflow-hidden">
                           <ImageCarousel images={project.images} altText={project.title} />
                        </div>
                      </CardItem>
                    </div>

                    <div className="space-y-6">
                      <CardItem translateZ="30" className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span key={t} className="text-[10px] font-mono bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 px-2 py-1 rounded">
                            {t}
                          </span>
                        ))}
                      </CardItem>
                      
                      <CardItem translateZ="50" className="w-full">
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-neon-cyan hover:text-black transition-all">
                          <FaGithub size={18} /> GitHub
                        </a>
                      </CardItem>
                    </div>
                  </CardBody>
                </CardContainer>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default AllProjects;