import { Canvas } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import { gsap } from "gsap";
import { Suspense, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { profile } from "../../data/profile";
import { ChibiScene } from "./ChibiScene";

type Availability = "checking" | "available" | "missing";

export function CharacterStage({ activeSection, reducedMotion }: { activeSection: string; reducedMotion: boolean }) {
  const stageElement = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0, active: false, scroll: window.scrollY });
  const [model, setModel] = useState<Availability>("checking");
  const [coarsePointer, setCoarsePointer] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const [paused, setPaused] = useState(false);
  const [contactReady, setContactReady] = useState(false);
  const [contactTop, setContactTop] = useState(0);
  const [aboutTop, setAboutTop] = useState(0);
  const { active: modelLoading, progress: modelProgress } = useProgress();
  // Keep this URL identical to index.html's preload URL so the browser reuses
  // the prefetched model instead of issuing a second download.
  const modelUrl = `${import.meta.env.BASE_URL}models/chibi.glb`;

  useEffect(() => {
    // Some embedded desktop preview browsers incorrectly report a coarse pointer.
    // Width is a more dependable boundary for this template's mobile layout.
    const query = window.matchMedia("(max-width: 48rem)");
    const update = () => setCoarsePointer(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch(modelUrl, { method: "HEAD", signal: controller.signal })
      .then((response) => {
        const type = response.headers.get("content-type") ?? "";
        setModel(response.ok && !type.includes("text/html") ? "available" : "missing");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setModel("missing");
      });
    return () => controller.abort();
  }, [modelUrl]);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const interactionSurface = stageElement.current;
    if (!hero || !interactionSurface || activeSection !== "hero" || coarsePointer || reducedMotion) return;
    let dragging = false;
    let startX = 0;
    let startRotation = 0;
    const rotationProxy = { value: pointer.current.x };
    const rotateTo = gsap.quickTo(rotationProxy, "value", {
      duration: 0.22,
      ease: "power3.out",
      onUpdate: () => { pointer.current.x = rotationProxy.value; },
    });
    const clampRotation = gsap.utils.clamp(-1, 1);

    const startDrag = (event: PointerEvent) => {
      if (event.button !== 0) return;
      if (event.target instanceof Element && event.target.closest("button, .character-tech-cloud")) return;
      dragging = true;
      startX = event.clientX;
      startRotation = pointer.current.x;
      pointer.current.active = true;
      interactionSurface.setPointerCapture(event.pointerId);
      interactionSurface.classList.add("is-dragging");
    };
    const move = (event: PointerEvent) => {
      if (!dragging) return;
      const sensitivity = Math.max(interactionSurface.clientWidth * 0.55, 180);
      rotateTo(clampRotation(startRotation + (event.clientX - startX) / sensitivity));
      pointer.current.y = 0;
    };
    const endDrag = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      interactionSurface.classList.remove("is-dragging");
      if (interactionSurface.hasPointerCapture(event.pointerId)) interactionSurface.releasePointerCapture(event.pointerId);
    };
    const leave = () => {
      if (!dragging) pointer.current.active = false;
    };

    interactionSurface.addEventListener("pointerdown", startDrag);
    interactionSurface.addEventListener("pointermove", move);
    interactionSurface.addEventListener("pointerup", endDrag);
    interactionSurface.addEventListener("pointercancel", endDrag);
    interactionSurface.addEventListener("pointerleave", leave);
    return () => {
      interactionSurface.removeEventListener("pointerdown", startDrag);
      interactionSurface.removeEventListener("pointermove", move);
      interactionSurface.removeEventListener("pointerup", endDrag);
      interactionSurface.removeEventListener("pointercancel", endDrag);
      interactionSurface.removeEventListener("pointerleave", leave);
      interactionSurface.classList.remove("is-dragging");
      gsap.killTweensOf(rotationProxy);
    };
  }, [activeSection, coarsePointer, reducedMotion]);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const updateScroll = () => { pointer.current.scroll = window.scrollY; };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, [reducedMotion]);

  useEffect(() => {
    const stage = stageElement.current;
    if (!stage || activeSection !== "hero" || reducedMotion || coarsePointer) return;
    const labels = stage.querySelectorAll<HTMLLIElement>(".character-tech-cloud li");
    const surfaces = stage.querySelectorAll<HTMLSpanElement>(".character-tech-cloud li span");
    const listenerCleanups: Array<() => void> = [];
    const context = gsap.context(() => {
      gsap.fromTo(surfaces, { autoAlpha: 0, scale: 0.25, filter: "blur(4px)" }, {
        autoAlpha: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.45,
        stagger: 0.08,
        ease: "back.out(1.35)",
      });
      gsap.to(labels, {
        y: (index) => index % 2 === 0 ? -5 : 5,
        duration: (index) => 2.4 + index * 0.16,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.12,
      });

      labels.forEach((label) => {
        const surface = label.querySelector<HTMLSpanElement>("span");
        if (!surface) return;
        const moveX = gsap.quickTo(surface, "x", { duration: 0.28, ease: "power3.out" });
        const moveY = gsap.quickTo(surface, "y", { duration: 0.28, ease: "power3.out" });
        const move = (event: PointerEvent) => {
          const bounds = label.getBoundingClientRect();
          moveX(gsap.utils.clamp(-8, 8, (event.clientX - bounds.left - bounds.width / 2) * 0.18));
          moveY(gsap.utils.clamp(-6, 6, (event.clientY - bounds.top - bounds.height / 2) * 0.18));
        };
        const reset = () => { moveX(0); moveY(0); };
        label.addEventListener("pointermove", move);
        label.addEventListener("pointerleave", reset);
        listenerCleanups.push(() => {
          label.removeEventListener("pointermove", move);
          label.removeEventListener("pointerleave", reset);
        });
      });
    }, stage);
    return () => {
      listenerCleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, [activeSection, coarsePointer, reducedMotion]);

  useEffect(() => {
    const contact = document.getElementById("contact");
    const about = document.getElementById("about");
    if (!contact || !about) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = contact.getBoundingClientRect();
        setContactTop(Math.round(bounds.top + window.scrollY));
        setContactReady(bounds.top <= window.innerHeight * 0.18);
        const aboutBounds = about.getBoundingClientRect();
        const copyBounds = about.querySelector<HTMLElement>(".about__copy")?.getBoundingClientRect();
        setAboutTop(Math.round(window.innerWidth <= 768 && copyBounds
          ? copyBounds.bottom + window.scrollY + 16
          : aboutBounds.top + window.scrollY + 48));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const showFallback = model !== "available";
  const characterSection = activeSection === "contact" && !contactReady ? "education" : activeSection;
  // Keep the character visually anchored to the two sections that own it. It is
  // no longer a floating viewport overlay while the visitor reads other sections.
  const stageVisible = characterSection === "hero" || characterSection === "about" || characterSection === "contact";
  const stageStyle = { "--about-stage-top": `${aboutTop}px`, "--contact-stage-top": `${contactTop}px` } as CSSProperties;
  return (
    <div ref={stageElement} style={stageStyle} className={`character-stage ${stageVisible ? "is-visible" : "is-hidden"}${characterSection === "hero" ? " is-interactive" : ""}${characterSection === "about" ? " is-about" : ""}${characterSection === "contact" ? " is-contact" : ""}`}>
      <div className="character-stage__halo" />
      {(model === "checking" || modelLoading) && (
        <div className="character-loading" role="status" aria-live="polite">
          <div className="character-loading__figure" aria-hidden="true"></div>
          <p>Preparing character</p>
          <div className="character-loading__track" aria-hidden="true"><span style={{ width: `${Math.max(8, modelProgress)}%` }} /></div>
        </div>
      )}
      {characterSection === "hero" && !coarsePointer && profile.experience[0]?.technologies.length > 0 && <ul className="character-tech-cloud" aria-label="Technologies used in current work">{profile.experience[0].technologies.map((technology) => <li key={technology}><span>{technology}</span></li>)}</ul>}
      <div className="character-stage__visual" aria-hidden="true">
        <Canvas
          dpr={[0.85, coarsePointer ? 1 : 1.15]}
          camera={{ position: [0, 0.15, 6.8], fov: 34 }}
          gl={{ alpha: true, antialias: !coarsePointer, powerPreference: "high-performance" }}
          shadows={false}
          frameloop={!pageVisible || !stageVisible ? "never" : reducedMotion || paused ? "demand" : "always"}
        >
          <Suspense fallback={null}>
            <ChibiScene modelAvailable={!showFallback} modelUrl={modelUrl} pointer={pointer} cursorEnabled={characterSection === "hero" && !coarsePointer} reducedMotion={reducedMotion || paused} activeSection={characterSection} />
          </Suspense>
        </Canvas>
      </div>
      {!reducedMotion && (
        <button className="character-stage__control" type="button" aria-pressed={paused} onClick={() => setPaused((current) => !current)}>
          <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
          {paused ? "Play character" : "Pause character"}
        </button>
      )}
      {model === "checking" && <span className="model-status" role="status" aria-live="polite">Preparing character…</span>}
      {model === "missing" && <span className="model-status" role="status" aria-live="polite">Development character · add chibi.glb</span>}
    </div>
  );
}
