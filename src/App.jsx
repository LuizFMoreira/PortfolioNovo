import { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ReactLenis } from "@studio-freight/react-lenis";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Music from "./components/Music";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AllProjects from "./components/AllProjects";
import ProjectDetail from "./components/ProjectDetail";
import WelcomePage from "./components/WelcomePage";
import "./App.css";

const Background = lazy(() => import("./components/Background"));

// ─── Inner layout (needs Router context for useLocation) ──────────────────────
function AppInner({ language, toggleLanguage }) {
  const location = useLocation();
  const isWelcome = location.pathname === "/";

  return (
    <div className="relative font-sans min-h-screen selection:bg-neon-cyan/30 selection:text-white text-slate-200 bg-black">

      {/* Aurora background — always visible */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Suspense fallback={<div className="bg-black w-full h-full" />}>
          <Background />
        </Suspense>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar hidden on welcome page */}
        {!isWelcome && (
          <Navbar language={language} toggleLanguage={toggleLanguage} />
        )}

        <main className="flex-grow">
          <Routes>
            {/* ── Welcome ── */}
            <Route path="/" element={<WelcomePage language={language} />} />

            {/* ── Home (full portfolio) ── */}
            <Route
              path="/home"
              element={
                <>
                  <Hero language={language} />
                  <div className="h-16 md:h-20" />
                  <About language={language} />
                  <Projects language={language} />
                  <Experience language={language} />
                  <Music language={language} />
                  <Contact language={language} />
                </>
              }
            />

            {/* ── Gallery ── */}
            <Route path="/todos-projetos" element={<AllProjects language={language} />} />

            {/* ── Project dashboard ── */}
            <Route path="/projetos/:id" element={<ProjectDetail language={language} />} />
          </Routes>
        </main>

        {/* Footer hidden on welcome page */}
        {!isWelcome && <Footer />}
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
function App() {
  const [language, setLanguage] = useState("pt");

  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "pt" ? "en" : "pt"));

  const lenisOptions = {
    duration: 1.2,
    lerp: 0.1,
    wheelMultiplier: 1,
    smoothWheel: true,
    syncTouch: true,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      <Router>
        <AppInner language={language} toggleLanguage={toggleLanguage} />
      </Router>
    </ReactLenis>
  );
}

export default App;
