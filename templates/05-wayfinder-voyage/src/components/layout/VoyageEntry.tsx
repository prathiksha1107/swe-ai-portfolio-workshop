import { profile } from "../../data/profile";

export function VoyageEntry({ onEnter }: { onEnter: () => void }) {
  return <div className="voyage-entry" role="dialog" aria-modal="true" aria-labelledby="voyage-entry-title">
    <div className="voyage-entry__content">
      <p className="voyage-entry__kicker">An ocean-wayfinding portfolio</p>
      <h1 id="voyage-entry-title">{profile.name}</h1>
      <p className="voyage-entry__intro">{profile.title} · {profile.location}</p>
      <button type="button" onClick={onEnter}><span>Begin the voyage</span><i aria-hidden="true">↓</i></button>
    </div>
    <p className="voyage-entry__hint">Scroll becomes the current</p>
  </div>;
}
