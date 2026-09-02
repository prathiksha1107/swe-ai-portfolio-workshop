import { profile } from "../data/profile";
import { SectionHeading } from "../components/layout/SectionHeading";

export function About({ reducedMotion: _reducedMotion }: { reducedMotion: boolean }) {
  return (
    <section className="section story-section about" id="about" aria-labelledby="about-title">
      <svg className="section-vector about-vector" viewBox="0 0 1000 650" aria-hidden="true"><path data-vector-path d="M55 130 C245 260 300 55 485 205 S720 490 955 350"/><path data-vector-path d="M90 535 C250 390 410 590 570 420 S790 210 930 165"/><circle cx="55" cy="130" r="8"/><circle cx="485" cy="205" r="8"/><circle cx="570" cy="420" r="8"/><circle cx="955" cy="350" r="8"/></svg>
      <div className="shell section-inner">
        <SectionHeading number="01" eyebrow="About"><span id="about-title">Thoughtful engineering, grounded in real work.</span></SectionHeading>
        <div className="about__copy" data-motion-item>
          {profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
    </section>
  );
}
