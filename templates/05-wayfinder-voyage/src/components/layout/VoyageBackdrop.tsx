const chapters = [
  { id: "hero", label: "Shore" }, { id: "experience", label: "Set sail" },
  { id: "projects", label: "Open water" }, { id: "skills", label: "Navigate" },
  { id: "contact", label: "Homecoming" },
];

export function VoyageBackdrop({ activeSection }: { activeSection: string }) {
  const scene = activeSection === "hero" || activeSection === "about" ? "shore"
    : activeSection === "experience" || activeSection === "projects" ? "ocean"
      : activeSection === "skills" || activeSection === "education" ? "night" : "island";
  return <div className={`voyage-backdrop voyage-backdrop--${scene}`} aria-hidden="true">
    <div className="voyage-sky"><i/><i/><i/><i/><i/><i/></div><div className="voyage-sun" />
    <div className="voyage-island"><span/><span/><span/></div>
    <div className="voyage-swell voyage-swell--far" />
    <div className="voyage-canoe"><span className="voyage-sail"/><span className="voyage-hull"/></div>
    <div className="voyage-swell voyage-swell--near" /><div className="voyage-heart"><span>✦</span></div>
    <ol className="voyage-route">{chapters.map((chapter, index) => <li key={chapter.id} className={chapter.id === activeSection ? "is-current" : ""}><span>{String(index + 1).padStart(2, "0")}</span>{chapter.label}</li>)}</ol>
  </div>;
}
