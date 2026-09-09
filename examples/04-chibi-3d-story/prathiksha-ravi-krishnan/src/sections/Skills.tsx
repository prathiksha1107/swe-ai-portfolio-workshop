import { profile } from "../data/profile";
import { SectionHeading } from "../components/layout/SectionHeading";

export function Skills({ reducedMotion: _reducedMotion }: { reducedMotion: boolean }) {
  return (
    <section className="section story-section" id="skills" aria-labelledby="skills-title">
      <svg className="section-vector skills-vector" viewBox="0 0 900 600" aria-hidden="true">
        <path data-vector-path d="M70 470 C190 300 285 525 405 330 S650 115 830 240" />
        <path data-vector-path d="M130 170 C280 55 355 245 520 150 S735 80 820 125" />
        <circle cx="70" cy="470" r="8" /><circle cx="405" cy="330" r="8" /><circle cx="830" cy="240" r="8" /><circle cx="520" cy="150" r="8" />
      </svg>
      <div className="shell section-inner">
        <SectionHeading number="04" eyebrow="Capabilities"><span id="skills-title">Tools chosen for outcomes, not trends.</span></SectionHeading>
        <div className="skills-grid">{profile.skills.map((group, index) => <article data-capability-card key={group.label}><span>0{index + 1}</span><h3>{group.label}</h3><p>{group.items.join(" · ")}</p></article>)}</div>
      </div>
    </section>
  );
}
