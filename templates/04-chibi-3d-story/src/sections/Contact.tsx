import { profile } from "../data/profile";

export function Contact() {
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="shell contact__inner">
        <p className="eyebrow" data-motion-item>Let’s connect</p><h2 id="contact-title" data-motion-item>Have a meaningful problem to solve?</h2><p data-motion-item>I’m interested in thoughtful conversations about applied AI, scalable software, and engineering platforms.</p>
        <div className="contact__links" data-motion-item><a className="button button--primary" href={`mailto:${profile.email}`}><span className="button__label">Email me</span><span className="button__icon" aria-hidden="true">↗</span></a><a className="text-link" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a className="text-link" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a></div><p className="contact__location" data-motion-item>Based in {profile.location}</p>
      </div>
    </section>
  );
}
