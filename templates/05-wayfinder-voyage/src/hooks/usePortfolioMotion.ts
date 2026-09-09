import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function usePortfolioMotion(scope: RefObject<HTMLDivElement | null>, reducedMotion: boolean) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      if (reducedMotion) {
        gsap.set(root.querySelectorAll("[data-motion-item]"), { clearProps: "all" });
        return;
      }

      const heroItems = gsap.utils.toArray<HTMLElement>(".hero__content > [data-motion-item]", root);
      gsap.from(heroItems, {
        autoAlpha: 0,
        y: 24,
        duration: 0.72,
        stagger: 0.075,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility",
      });

      const canoe = root.querySelector<HTMLElement>(".voyage-canoe");
      if (canoe) {
        gsap.fromTo(canoe, { xPercent: 12, rotation: -2 }, {
          xPercent: -42,
          rotation: 2,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.8 },
        });
      }

      gsap.utils.toArray<HTMLElement>(".story-section", root).forEach((section) => {
        const frame = section.querySelector<HTMLElement>(".section-inner");
        if (frame) {
          gsap.fromTo(frame, { yPercent: 7, scale: 0.965 }, {
            yPercent: -3,
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top bottom", end: "center center", scrub: 0.7 },
          });
        }
        const heading = gsap.utils.toArray<HTMLElement>(".section-heading > *", section);
        const content = gsap.utils.toArray<HTMLElement>("[data-motion-item]", section);
        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        });

        timeline
          .from(heading, { autoAlpha: 0, y: 20, duration: 0.55, stagger: 0.08 })
          .from(content, {
            autoAlpha: 0,
            y: 22,
            duration: 0.48,
            stagger: { each: 0.065, from: "start", grid: "auto" },
            clearProps: "transform,opacity,visibility",
          }, "-=0.28");
      });

      const experience = root.querySelector<HTMLElement>("#experience");
      const timelineProgress = experience?.querySelector<HTMLElement>(".timeline__progress");
      if (experience && timelineProgress) {
        gsap.fromTo(timelineProgress, { scaleY: 0 }, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: experience, start: "top 68%", end: "bottom 72%", scrub: 0.35 },
        });

        gsap.utils.toArray<HTMLElement>("[data-timeline-item]", experience).forEach((item) => {
          gsap.from(item, {
            autoAlpha: 0,
            x: 24,
            y: 18,
            duration: 0.58,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: { trigger: item, start: "top 84%", once: true },
          });
        });
      }

      const projects = root.querySelector<HTMLElement>("#projects");
      if (projects) {
        gsap.utils.toArray<HTMLElement>("[data-project-card]", projects).forEach((card) => {
          const meter = card.querySelector<HTMLElement>(".project-card__meter");
          const details = gsap.utils.toArray<HTMLElement>("[data-project-detail]", card);

          gsap.from(card, {
            autoAlpha: 0,
            y: 48,
            scale: 0.975,
            duration: 0.72,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: { trigger: card, start: "top 86%", once: true },
          });
          if (meter) {
            gsap.fromTo(meter, { scaleX: 0 }, {
              scaleX: 1,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top 78%", end: "bottom 62%", scrub: 0.3 },
            });
          }
          gsap.from(details, {
            autoAlpha: 0,
            y: 18,
            duration: 0.5,
            stagger: 0.075,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: { trigger: card, start: "top 72%", once: true },
          });
        });
      }

      ["#hero", "#about", "#skills", "#education"].forEach((selector) => {
        const section = root.querySelector<HTMLElement>(selector);
        if (!section) return;

        const vector = section.querySelector<SVGSVGElement>(".section-vector");
        if (vector) {
          gsap.fromTo(vector, { xPercent: 7, yPercent: 5, rotate: -2 }, {
            xPercent: -4,
            yPercent: -3,
            rotate: 2,
            ease: "none",
            transformOrigin: "center",
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.65 },
          });
        }

        gsap.utils.toArray<SVGPathElement>("[data-vector-path]", section).forEach((path) => {
          const length = path.getTotalLength();
          gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top 78%", end: "center 42%", scrub: 0.4 },
          });
        });
        gsap.from(section.querySelectorAll(".section-vector circle"), {
          autoAlpha: 0,
          scale: 0.25,
          transformOrigin: "center",
          duration: 0.45,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 58%", once: true },
        });
      });

      const capabilityCards = gsap.utils.toArray<HTMLElement>("[data-capability-card]", root);
      gsap.from(capabilityCards, {
        autoAlpha: 0,
        y: 34,
        rotateX: 5,
        transformOrigin: "center bottom",
        duration: 0.62,
        stagger: 0.09,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility",
        scrollTrigger: { trigger: "#skills", start: "top 70%", once: true },
      });

      gsap.utils.toArray<HTMLElement>("[data-learning-card]", root).forEach((card, index) => {
        gsap.from(card, {
          autoAlpha: 0,
          x: index % 2 === 0 ? -30 : 30,
          y: 16,
          duration: 0.62,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: { trigger: card, start: "top 84%", once: true },
        });
      });

      const contact = root.querySelector<HTMLElement>(".contact");
      if (contact) {
        gsap.from(gsap.utils.toArray<HTMLElement>("[data-motion-item]", contact), {
          autoAlpha: 0,
          y: 22,
          duration: 0.55,
          stagger: 0.075,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: { trigger: contact, start: "top 76%", once: true },
        });
      }
    },
    { scope, dependencies: [reducedMotion], revertOnUpdate: true },
  );
}
