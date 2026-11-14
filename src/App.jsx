import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ReactLenis } from "@studio-freight/react-lenis";

import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AllProjects from "./components/AllProjects";
import Radar from "./components/Radar";

const lenisOptions = { duration: 1.1, lerp: 0.1, smoothWheel: true };

function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Experience />
      <About />
      <Contact />
    </>
  );
}

// Ao trocar de página (sem âncora) volta ao topo.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <ReactLenis root options={lenisOptions}>
        <BrowserRouter>
          <ScrollToTop />
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projetos" element={<AllProjects />} />
                <Route path="/todos-projetos" element={<AllProjects />} />
                <Route path="/radar" element={<Radar />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </ReactLenis>
    </LanguageProvider>
  );
}
