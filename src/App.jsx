import { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importamos o Router
import { ReactLenis } from "@studio-freight/react-lenis";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Music from "./components/Music";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AllProjects from "./components/AllProjects"; // O componente novo de galeria
import "./App.css";

const Background = lazy(() => import("./components/Background"));

function App() {
  const [language, setLanguage] = useState("pt");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "pt" ? "en" : "pt"));
  };

  const lenisOptions = {
    duration: 1.2,
    lerp: 0.1,
    wheelMultiplier: 1,
    smoothWheel: true,
    syncTouch: true,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      {/* O Router PRECISA envolver tudo que contém Links ou Routes */}
      <Router> 
        <div className="relative font-sans min-h-screen selection:bg-neon-cyan/30 selection:text-white text-slate-200 bg-black">
          
          <div className="fixed inset-0 z-0 pointer-events-none">
            <Suspense fallback={<div className="bg-black w-full h-full" />}>
              <Background />
            </Suspense>
          </div>

          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar language={language} toggleLanguage={toggleLanguage} />

            <main className="flex-grow">
              <Routes>
                {/* ROTA DA HOME (Sua página principal atual) */}
                <Route path="/" element={
                  <>
                    <Hero language={language} />
                    <div className="h-16 md:h-20" />
                    <About language={language} />
                    <Projects language={language} />
                    <Experience language={language} />
                    <Music language={language} />
                    <Contact language={language} />
                  </>
                } />

                {/* ROTA DA GALERIA (A página de todos os projetos) */}
                <Route path="/todos-projetos" element={<AllProjects language={language} />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </div>
      </Router>
    </ReactLenis>
  );
}

export default App;