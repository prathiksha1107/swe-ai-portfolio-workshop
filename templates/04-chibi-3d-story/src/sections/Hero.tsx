import { profile } from "../data/profile";

export function Hero({ reducedMotion: _reducedMotion }: { reducedMotion: boolean }) {
  return (
    <section className="hero section" id="hero" aria-labelledby="hero-title">
      <svg className="section-vector hero-vector" viewBox="0 0 1100 700" aria-hidden="true"><path data-vector-path d="M40 525 C210 330 315 610 500 365 S790 90 1060 245"/><path data-vector-path d="M120 155 C310 30 420 255 635 145 S895 35 1030 100"/><circle cx="40" cy="525" r="8"/><circle cx="500" cy="365" r="8"/><circle cx="1060" cy="245" r="8"/><circle cx="635" cy="145" r="8"/></svg>
      <div className="hero__layout shell">
        <div className="hero__content">
          <p className="eyebrow" data-motion-item>{profile.tagline}</p>
          <h1 id="hero-title" data-motion-item>{profile.name}</h1>
          <p className="hero__title" data-motion-item>{profile.title}</p>
          <p className="hero__positioning" data-motion-item>{profile.positioning}</p>
          <p className="hero__intro" data-motion-item>{profile.introduction}</p>
          <div className="button-row" data-motion-item>
            <a className="button button--primary" href="#projects"><span className="button__label">View projects</span><span className="button__icon" aria-hidden="true">↘</span></a>
            {profile.resumeUrl && <a className="button" href={profile.resumeUrl}>Resume</a>}
            <a className="text-link" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="text-link" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
        <div className="hero__character-space" aria-hidden="true" />
      </div>
      <p className="character-description shell">An interactive 3D personal-brand character accompanies the portfolio. All professional content remains available without it.</p>
    </section>
  );
}
