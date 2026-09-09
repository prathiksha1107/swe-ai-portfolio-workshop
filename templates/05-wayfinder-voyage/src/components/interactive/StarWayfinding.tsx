import { useState } from "react";
const stars = [{ x: 9, y: 68 }, { x: 25, y: 38 }, { x: 43, y: 54 }, { x: 61, y: 25 }, { x: 78, y: 43 }, { x: 91, y: 17 }];
export function StarWayfinding() {
  const [connected, setConnected] = useState(0);
  const complete = connected === stars.length;
  const select = (index: number) => { if (index === connected) setConnected(index + 1); else if (index === 0) setConnected(1); };
  return <section className="wayfinding" aria-labelledby="wayfinding-title">
    <div className="wayfinding__copy"><p className="eyebrow">Wayfinding exercise</p><h3 id="wayfinding-title">Trace a route through the stars.</h3><p>Select each star from left to right. Every strong system begins by turning scattered signals into a navigable path.</p><p className="wayfinding__status" role="status" aria-live="polite">{complete ? "Route found — Master Wayfinder." : `${connected} of ${stars.length} stars connected`}</p>{connected > 0 && <button type="button" onClick={() => setConnected(0)}>Reset route</button>}</div>
    <div className="constellation" aria-label="Interactive constellation"><svg viewBox="0 0 100 80" preserveAspectRatio="none"><polyline points={stars.slice(0, connected).map((star) => `${star.x},${star.y}`).join(" ")} /></svg>{stars.map((star, index) => <button key={index} type="button" className={index < connected ? "is-connected" : ""} style={{ left: `${star.x}%`, top: `${star.y}%` }} onClick={() => select(index)} aria-label={`Connect star ${index + 1}`} disabled={index > connected}><span>✦</span></button>)}</div>
  </section>;
}
