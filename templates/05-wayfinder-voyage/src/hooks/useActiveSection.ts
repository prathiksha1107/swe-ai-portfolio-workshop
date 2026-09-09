import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (window.scrollY < 24) {
          setActiveSection(sectionIds[0]);
          return;
        }

        // Change the cinematic backdrop before the incoming chapter reaches the
        // center of the viewport, producing a gradual scene handoff.
        const readingLine = window.innerHeight * 0.82;
        const current = elements.find((element) => {
          const bounds = element.getBoundingClientRect();
          return bounds.top <= readingLine && bounds.bottom > readingLine;
        });
        if (current) setActiveSection(current.id);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sectionIds]);

  return activeSection;
}
