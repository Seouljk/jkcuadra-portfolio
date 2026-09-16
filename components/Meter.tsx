"use client";

import { useInViewOnce, useReducedMotion } from "@/lib/hooks";

/** Three-segment skill meter whose lit segments fill one after another when it scrolls into view. */
export function Meter({ level, label }: { level: number; label: string }) {
  const [ref, inView] = useInViewOnce<HTMLDivElement>();
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className={inView ? "jk-meter is-on" : "jk-meter"}>
      {[0, 1, 2].map((segment) => (
        <span
          key={segment}
          aria-hidden="true"
          className={segment < level ? "jk-meter__seg jk-meter__seg--lit" : "jk-meter__seg"}
          style={{ transitionDelay: reduced ? "0ms" : `${90 * segment + 70}ms` }}
        />
      ))}
      <span className={level === 3 ? "jk-meter__label jk-meter__label--top" : "jk-meter__label"}>{label}</span>
    </div>
  );
}
