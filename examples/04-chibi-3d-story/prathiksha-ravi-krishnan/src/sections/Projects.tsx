import { profile } from "../data/profile";
import { SectionHeading } from "../components/layout/SectionHeading";

export function Projects({ reducedMotion: _reducedMotion }: { reducedMotion: boolean }) {
  return (
    <section className="section story-section projects" id="projects" aria-labelledby="projects-title">
      <div className="shell section-inner section-inner--wide">
        <SectionHeading number="03" eyebrow="Selected work"><span id="projects-title">Complex problems, made usable.</span></SectionHeading>
        <div className="project-grid">
          {profile.projects.map((project, index) => (
            <article className="project-card" data-project-card key={project.title}>
              <span className="project-card__meter" aria-hidden="true" />
              <div className="project-card__number" aria-hidden="true"><span>Case</span>0{index + 1}</div>
              <div className="project-card__body">
                <header className="project-card__header" data-project-detail><h3>{project.title}</h3><p className="project-summary">{project.summary}</p></header>
                <dl className="project-story"><div data-project-detail><dt><span>01</span>Problem</dt><dd>{project.problem}</dd></div><div data-project-detail><dt><span>02</span>Approach</dt><dd>{project.approach}</dd></div><div data-project-detail><dt><span>03</span>Impact</dt><dd>{project.impact}</dd></div></dl>
                <ul className="tags" data-project-detail aria-label={`Technologies used for ${project.title}`}>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
                {(project.githubUrl || project.demoUrl) && <div className="project-card__links" data-project-detail>{project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub</a>}{project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer">Live demo</a>}</div>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
