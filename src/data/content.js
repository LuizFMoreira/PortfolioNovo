// Todo o texto e os dados do site ficam aqui, separados da interface.
// Para mudar uma frase, um projeto ou um link, edite apenas este arquivo.

// ATENÇÃO: os links abaixo marcados com TODO ainda são placeholders herdados
// da versão anterior. Troque pelos endereços reais antes de publicar.
export const links = {
  github: "https://github.com/LuizFMoreira",
  linkedin: "https://www.linkedin.com/in/luiz-fernando-batista-moreira-987834218/",
  whatsapp: "https://wa.me/5533998069662",
  email: "mailto:bluizfernando720@gmail.com",
  resume: "/curriculo.pdf",
  resumeFileName: "LuizFernando_BatistaMoreira_Currículo.pdf",
};

const projects = [
  {
    id: "homefix",
    title: { pt: "HomeFix", en: "HomeFix" },
    kind: { pt: "Gestão de reparos em condomínios", en: "Condo repair management" },
    description: {
      pt: "Plataforma que conecta moradores, prestadores de serviço e síndicos: chamados, orçamentos, agendamentos e transparência financeira. Trabalho interdisciplinar em equipe; atuo no front-end web em React, nos protótipos e no planejamento das sprints.",
      en: "Platform connecting residents, service providers and building managers: requests, quotes, scheduling and financial transparency. Team capstone project; I work on the React web front-end, prototypes and sprint planning.",
    },
    tech: ["React", "TypeScript", "Java", "Spring Boot", "PostgreSQL", "Flutter"],
    private: true,
  },
  {
    id: "reuse",
    title: { pt: "Re.use", en: "Re.use" },
    kind: { pt: "Plataforma sustentável", en: "Sustainable platform" },
    description: {
      pt: "Plataforma digital para economia circular têxtil. Fluxo completo de cadastro, triagem e redistribuição.",
      en: "Digital platform for the textile circular economy. Full flow for registration, sorting and redistribution.",
    },
    tech: ["Java", "Spring Boot", "MySQL", "Node.js"],
    github:
      "https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2025-1-ti2-3687100-brecho-re-use",
    images: [
      "/img/Re.use/image.png",
      "/img/Re.use/image2.png",
      "/img/Re.use/image3.png",
      "/img/Re.use/image4.png",
      "/img/Re.use/image5.png",
    ],
    alt: { pt: "Telas da plataforma Re.use", en: "Re.use platform screens" },
  },
  {
    id: "ia-cirurgica",
    title: { pt: "IA Cirúrgica", en: "Surgical AI" },
    kind: { pt: "Pesquisa e extensão", en: "Research and outreach" },
    description: {
      pt: "Aplicação web com visão computacional (YOLOv8n) para identificar instrumentos cirúrgicos em tempo real.",
      en: "Web application with computer vision (YOLOv8n) that identifies surgical instruments in real time.",
    },
    tech: ["Python", "Flask", "React", "YOLOv8n", "Docker"],
    github:
      "https://github.com/ICEI-PUC-Minas-PPLES-TI/plu-es-2025-2-extensao-software-saude-fhsfa",
    images: [
      "/img/ProjetoExtensao/imagem3.jpeg",
      "/img/ProjetoExtensao/imagem4.jpeg",
      "/img/ProjetoExtensao/image5.jpeg",
    ],
    alt: {
      pt: "Detecção de instrumentos cirúrgicos",
      en: "Surgical instrument detection",
    },
  },
  {
    id: "detalhes-em-prata",
    featured: false,
    title: { pt: "Detalhes em Prata", en: "Detalhes em Prata" },
    kind: { pt: "E-commerce de joias", en: "Jewelry e-commerce" },
    description: {
      pt: "Aplicação full-stack para e-commerce de joias. Back-end em Java e Spring Boot, integrado a uma interface reativa e tipada em TypeScript e Next.js.",
      en: "Full-stack jewelry e-commerce. Java and Spring Boot back-end integrated with a reactive, typed TypeScript and Next.js interface.",
    },
    tech: ["Java", "Spring Boot", "TypeScript", "Next.js"],
    github: "https://github.com/LuizFMoreira/seu-repositorio-joalheria", // TODO
    images: [
      "/img/detalhesPrata/image.png",
      "/img/detalhesPrata/image2.png",
      "/img/detalhesPrata/image3.png",
    ],
    alt: {
      pt: "Interface da loja Detalhes em Prata",
      en: "Detalhes em Prata store interface",
    },
  },
  {
    id: "divideconta",
    featured: false,
    title: { pt: "DivideConta", en: "DivideConta" },
    kind: { pt: "App mobile", en: "Mobile app" },
    description: {
      pt: "App em Flutter para dividir a conta do bar: valor total, número de pessoas e gorjeta viram um recibo com a parte de cada um, atualizado enquanto você digita.",
      en: "Flutter app to split a bar tab: total, headcount and tip become a receipt with each person's share, updated as you type.",
    },
    tech: ["Flutter", "Dart"],
    github: "https://github.com/LuizFMoreira/DivideConta_",
  },
  {
    id: "rastro",
    featured: false,
    title: { pt: "Rastro", en: "Rastro" },
    kind: { pt: "Proposta de aplicativo", en: "App proposal" },
    description: {
      pt: "Proposta de app de alerta comunitário para pets perdidos: avisos por proximidade, avistamentos com foto e localização, e funcionamento offline. Trabalho de Aplicações Móveis, com proposta de Flutter e Supabase.",
      en: "Proposal for a community alert app for lost pets: proximity notifications, sightings with photo and location, and offline use. Mobile Applications coursework, proposing Flutter and Supabase.",
    },
    tech: ["Flutter", "Supabase", "UX"],
    private: true,
  },
];

const experience = [
  {
    id: "groohub",
    period: { pt: "2026 — Presente", en: "2026 — Present" },
    role: { pt: "Estagiário de desenvolvimento", en: "Development intern" },
    org: { pt: "Groohub", en: "Groohub" },
    description: {
      pt: "Desenvolvimento de software em equipe.",
      en: "Software development in a team.",
    },
    points: { pt: [], en: [] },
    stack: ["Flutter", "Dart", "Supabase"],
  },
  {
    id: "lim",
    period: { pt: "Out. 2025 — Presente", en: "Oct. 2025 — Present" },
    role: { pt: "Desenvolvedor e líder de equipe", en: "Developer and team lead" },
    org: { pt: "Laboratório LIM", en: "LIM Laboratory" },
    description: {
      pt: "Software para gestão de estágios universitários, aplicando princípios sólidos de arquitetura.",
      en: "Software for university internship management, applying solid architecture principles.",
    },
    points: {
      pt: [
        "Liderança técnica e delegação de tarefas ágeis para a equipe.",
        "Engenharia de Requisitos aplicada no levantamento e na modelagem do sistema.",
        "Integração de banco relacional com interfaces modernas e tipadas.",
      ],
      en: [
        "Technical leadership and agile task delegation for the team.",
        "Requirements Engineering applied to gathering and modeling the system.",
        "Relational database integration with modern, typed interfaces.",
      ],
    },
    stack: ["Java", "Spring Boot", "TypeScript", "Next.js"],
  },
  {
    id: "hackathon",
    period: { pt: "Junho 2025", en: "June 2025" },
    role: { pt: "Gestor de projetos", en: "Project manager" },
    org: { pt: "PUC Minas (Hackathon)", en: "PUC Minas (Hackathon)" },
    description: {
      pt: "Gestão e coordenação de equipes durante uma maratona de desenvolvimento.",
      en: "Project management and team coordination during a development marathon.",
    },
    points: {
      pt: [
        "Coordenação do ciclo de vida da aplicação, do zero à prova de conceito.",
        "Entrega do MVP dentro do prazo crítico estabelecido.",
        "Resolução de conflitos e priorização de funcionalidades de maior impacto.",
      ],
      en: [
        "Coordinated the application lifecycle, from scratch to proof of concept.",
        "Delivered the MVP within the critical deadline.",
        "Resolved conflicts and prioritized the highest-impact features.",
      ],
    },
    stack: ["Metodologias ágeis", "Figma", "MVP"],
  },
];

export const content = {
  pt: {
    meta: { langName: "Português", switchTo: "EN" },
    nav: {
      links: [
        { label: "Projetos", href: "#projetos" },
        { label: "Experiência", href: "#experiencia" },
        { label: "Sobre", href: "#sobre" },
        { label: "Livros", href: "#livros" },
        { label: "Radar", href: "/radar" },
        { label: "Contato", href: "#contato" },
      ],
      resume: "Currículo",
      home: "Início",
    },
    hero: {
      status: "Disponível para novos projetos",
      headline: ["Software com", "rigor", "e bom gosto."],
      description:
        "Estudante de Engenharia de Software na PUC Minas. Projeto arquiteturas em Java e Spring Boot e construo interfaces em React e TypeScript.",
      meta: ["PUC Minas · 5º período", "Groohub · estágio · 2026 — hoje"],
      ctaProjects: "Ver projetos",
      ctaContact: "Iniciar conversa",
    },
    projects: {
      title: "Projetos",
      intro: "Trabalhos acadêmicos e de extensão, do banco de dados à interface.",
      code: "Código no GitHub",
      privateRepo: "Repositório privado",
      all: "Ver arquivo completo",
      items: projects,
    },
    experience: {
      title: "Experiência",
      intro: "Onde apliquei o que estudo, liderando equipes e entregando software.",
      items: experience,
    },
    about: {
      title: "Sobre",
      lead: "Sou estudante do 5º período de Engenharia de Software na PUC Minas e desenvolvedor Full Stack.",
      body: "Minha trajetória é focada em projetar arquiteturas eficientes e construir soluções escaláveis de ponta a ponta. Tecnicamente, atuo com domínio do ecossistema Java e Spring Boot no back-end, integrando bancos de dados relacionais com interfaces modernas, tipadas e reativas em React, TypeScript e Next.js.",
      quote:
        "O rigor analítico e matemático, que aplico diariamente em Cálculo e Algoritmos, é fundamental para criar sistemas limpos e manuteníveis.",
      stackTitle: "Ferramentas",
      stack: [
        ["Back-end", "Java, Spring Boot, Node.js, Python, Flask"],
        ["Front-end", "React, TypeScript, Next.js, Tailwind"],
        ["Mobile", "Flutter, Dart"],
        ["Dados e infra", "MySQL, PostgreSQL, Supabase, Docker"],
      ],
    },
    contact: {
      title: "Vamos conversar",
      description:
        "Estou disponível para projetos freelance, colaborações ou oportunidades de carreira. Envie uma mensagem e vamos ver como posso agregar ao seu time.",
      name: "Seu nome",
      email: "Seu e-mail",
      message: "Sua mensagem",
      send: "Enviar mensagem",
      sending: "Enviando…",
      success: "Mensagem enviada. Obrigado!",
      error: "Não foi possível enviar. Tente novamente.",
      errors: {
        name: "Informe seu nome.",
        email: "Informe um e-mail válido.",
        message: "Escreva uma mensagem.",
      },
      elsewhere: "Ou em outro canal",
      channels: [
        { label: "GitHub", href: links.github },
        { label: "LinkedIn", href: links.linkedin },
        { label: "WhatsApp", href: links.whatsapp },
        { label: "E-mail", href: links.email },
      ],
    },
    archive: {
      back: "Voltar ao início",
      title: "Arquivo de projetos",
      filter: "Tecnologia",
      all: "Todas",
      empty: "Nenhum projeto com essa tecnologia.",
    },
    footer: {
      rights: "Luiz Fernando Batista Moreira",
      built: "Feito com React, Vite e Tailwind.",
      nowPlaying: "Ouvindo agora",
    },
  },
  en: {
    meta: { langName: "English", switchTo: "PT" },
    nav: {
      links: [
        { label: "Projects", href: "#projetos" },
        { label: "Experience", href: "#experiencia" },
        { label: "About", href: "#sobre" },
        { label: "Books", href: "#livros" },
        { label: "Radar", href: "/radar" },
        { label: "Contact", href: "#contato" },
      ],
      resume: "Resume",
      home: "Home",
    },
    hero: {
      status: "Available for new projects",
      headline: ["Software built", "with rigor", "and taste."],
      description:
        "Software Engineering student at PUC Minas. I design architectures in Java and Spring Boot and build interfaces in React and TypeScript.",
      meta: ["PUC Minas · 5th term", "Groohub · internship · 2026 — now"],
      ctaProjects: "See projects",
      ctaContact: "Start a conversation",
    },
    projects: {
      title: "Projects",
      intro: "Academic and outreach work, from the database to the interface.",
      code: "Code on GitHub",
      privateRepo: "Private repository",
      all: "See full archive",
      items: projects,
    },
    experience: {
      title: "Experience",
      intro: "Where I applied what I study, leading teams and shipping software.",
      items: experience,
    },
    about: {
      title: "About",
      lead: "I am a 5th-term Software Engineering student at PUC Minas and a Full Stack developer.",
      body: "My focus is designing efficient architectures and building scalable end-to-end solutions. On the back-end I work with the Java and Spring Boot ecosystem, integrating relational databases with modern, typed and reactive interfaces in React, TypeScript and Next.js.",
      quote:
        "Analytical and mathematical rigor, which I apply daily in Calculus and Algorithms, is fundamental to building clean, maintainable systems.",
      stackTitle: "Tools",
      stack: [
        ["Back-end", "Java, Spring Boot, Node.js, Python, Flask"],
        ["Front-end", "React, TypeScript, Next.js, Tailwind"],
        ["Mobile", "Flutter, Dart"],
        ["Data and infra", "MySQL, PostgreSQL, Supabase, Docker"],
      ],
    },
    contact: {
      title: "Let's talk",
      description:
        "I am available for freelance projects, collaborations or career opportunities. Send a message and let's see how I can add to your team.",
      name: "Your name",
      email: "Your email",
      message: "Your message",
      send: "Send message",
      sending: "Sending…",
      success: "Message sent. Thank you!",
      error: "Could not send. Please try again.",
      errors: {
        name: "Enter your name.",
        email: "Enter a valid email.",
        message: "Write a message.",
      },
      elsewhere: "Or elsewhere",
      channels: [
        { label: "GitHub", href: links.github },
        { label: "LinkedIn", href: links.linkedin },
        { label: "WhatsApp", href: links.whatsapp },
        { label: "Email", href: links.email },
      ],
    },
    archive: {
      back: "Back to home",
      title: "Project archive",
      filter: "Technology",
      all: "All",
      empty: "No project uses that technology.",
    },
    footer: {
      rights: "Luiz Fernando Batista Moreira",
      built: "Built with React, Vite and Tailwind.",
      nowPlaying: "Now playing",
    },
  },
};
