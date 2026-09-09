import { Navigation } from "./components/layout/Navigation";
import { lazy, Suspense, useRef, useState } from "react";
import { useActiveSection } from "./hooks/useActiveSection";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Education } from "./sections/Education";
import { Experience } from "./sections/Experience";
import { Hero } from "./sections/Hero";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { profile } from "./data/profile";
import { usePortfolioMotion } from "./hooks/usePortfolioMotion";
import { VoyageEntry } from "./components/layout/VoyageEntry";

const sections = ["hero", "about", "experience", "projects", "skills", "education", "contact"];
const OceanWorld = lazy(() => import("./components/three/OceanWorld").then((module) => ({ default: module.OceanWorld })));
export default function App() {
  const app = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const reducedMotion = useReducedMotion();
  const activeSection = useActiveSection(sections);
  usePortfolioMotion(app, reducedMotion);
  return (
    <div className={`app${entered ? " is-entered" : " is-awaiting-entry"}`} ref={app}>
      {!entered && <VoyageEntry onEnter={() => setEntered(true)} />}
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Suspense fallback={<div className="ocean-world ocean-world--loading" aria-hidden="true" />}><OceanWorld reducedMotion={reducedMotion} /></Suspense>
      <Navigation activeSection={activeSection} />
      <main id="main-content">
        <Hero reducedMotion={reducedMotion} />
        <About reducedMotion={reducedMotion} />
        <Experience reducedMotion={reducedMotion} />
        <Projects reducedMotion={reducedMotion} />
        <Skills reducedMotion={reducedMotion} />
        <Education />
        <Contact />
      </main>
      <footer className="site-footer"><div className="shell"><p>© {new Date().getFullYear()} {profile.name}</p><a href="#hero">Back to top ↑</a></div></footer>
    </div>
  );
}
