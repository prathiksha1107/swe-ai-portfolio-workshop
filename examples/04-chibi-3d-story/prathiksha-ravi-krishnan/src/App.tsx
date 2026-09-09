import { Navigation } from "./components/layout/Navigation";
import { lazy, Suspense, useRef } from "react";
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

const sections = ["hero", "about", "experience", "projects", "skills", "education", "contact"];
const CharacterStage = lazy(() =>
  import("./components/three/CharacterStage").then((module) => ({ default: module.CharacterStage })),
);

export default function App() {
  const app = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const activeSection = useActiveSection(sections);
  usePortfolioMotion(app, reducedMotion);
  return (
    <div className="app" ref={app}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navigation activeSection={activeSection} />
      <Suspense fallback={<div className="character-stage character-stage--loading" aria-hidden="true" />}>
        <CharacterStage activeSection={activeSection} reducedMotion={reducedMotion} />
      </Suspense>
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
