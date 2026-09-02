import { useEffect, useState } from "react";
import { profile } from "../../data/profile";

const links = ["about", "experience", "projects", "skills", "contact"];

export function Navigation({ activeSection }: { activeSection: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="site-header">
      <nav className="navigation shell" aria-label="Main navigation">
        <a className="brand" href="#hero" aria-label={`${profile.name}, home`}>
          <span>{profile.initials}</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-links"
          onClick={() => setOpen((current) => !current)}
        >
          <span>Menu</span><i aria-hidden="true" />
        </button>
        <div className={`navigation__panel${open ? " is-open" : ""}`} id="site-links">
          <ul>
            {links.map((link) => (
              <li key={link}>
                <a
                  href={`#${link}`}
                  aria-current={activeSection === link ? "location" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link[0].toUpperCase() + link.slice(1)}
                </a>
              </li>
            ))}
          </ul>
          <div className="navigation__actions">
            {profile.resumeUrl && <a href={profile.resumeUrl}>Resume</a>}
            <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </nav>
    </header>
  );
}
