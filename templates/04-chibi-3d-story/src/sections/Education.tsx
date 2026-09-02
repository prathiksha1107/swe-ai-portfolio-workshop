import { profile } from "../data/profile";
import { SectionHeading } from "../components/layout/SectionHeading";

export function Education() {
  return (
    <section className="section story-section education" id="education" aria-labelledby="education-title">
      <svg className="section-vector education-vector" viewBox="0 0 900 600" aria-hidden="true">
        <path data-vector-path d="M80 510 C210 480 190 350 335 340 S470 215 590 235 S700 105 830 85" />
        <path data-vector-path d="M80 545 H830" />
        <circle cx="335" cy="340" r="9" /><circle cx="590" cy="235" r="9" /><circle cx="830" cy="85" r="9" />
      </svg>
      <div className="shell section-inner section-inner--wide">
        <SectionHeading number="05" eyebrow="Education & recognition"><span id="education-title">Learning translated into practice.</span></SectionHeading>
        <div className="education-layout"><div className="education-list">{profile.education.map((item) => <article data-learning-card key={item.degree}><time>{item.date}</time><h3>{item.degree}</h3><p>{item.school}</p>{item.detail && <small>{item.detail}</small>}</article>)}</div><aside className="recognition" data-learning-card><p>Recognition</p><ul>{profile.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}</ul></aside></div>
      </div>
    </section>
  );
}
