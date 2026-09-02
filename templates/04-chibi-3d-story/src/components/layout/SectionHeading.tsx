import type { ReactNode } from "react";

export function SectionHeading({ number, eyebrow, children }: { number: string; eyebrow: string; children: ReactNode }) {
  return (
    <header className="section-heading">
      <p><span>{number}</span>{eyebrow}</p>
      <h2>{children}</h2>
    </header>
  );
}
