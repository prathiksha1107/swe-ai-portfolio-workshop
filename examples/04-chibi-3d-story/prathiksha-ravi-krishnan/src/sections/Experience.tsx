import { profile } from "../data/profile";
import { SectionHeading } from "../components/layout/SectionHeading";

export function Experience({ reducedMotion: _reducedMotion }: { reducedMotion: boolean }) {
  return (
    <section className="section story-section" id="experience" aria-labelledby="experience-title">
      <div className="shell section-inner section-inner--wide">
        <SectionHeading number="02" eyebrow="Experience"><span id="experience-title">A career built across systems and scale.</span></SectionHeading>
        <div className="timeline-shell">
          <span className="timeline__track" aria-hidden="true"><span className="timeline__progress" /></span>
          <ol className="timeline" aria-label="Career timeline">
            {profile.experience.map((item, index) => (
              <li className="timeline-item" data-timeline-item key={`${item.company}-${item.dates}`}>
                <span className="timeline-item__marker" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <article className="timeline-item__card">
                  <header className="timeline-item__meta">
                    <span>{item.dates}</span>
                    <strong>{item.company}</strong>
                  </header>
                  <h3>{item.role}</h3>
                  <p className="timeline-item__summary">{item.summary}</p>
                  <p className="impact-line"><span>Measured impact</span>{item.impact}</p>
                  <ul className="tags" aria-label={`Technologies used at ${item.company}`}>{item.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
