"use client";

import { useEffect, useState } from "react";
import { useInViewOnce, useReducedMotion } from "@/lib/hooks";

type Props = {
  index: string;
  label: string;
  hint?: string;
  className?: string;
};

/** Numbered section header: on first view the index flickers through random numbers and the hairline draws in. */
export function SectionHeader({ index, label, hint, className }: Props) {
  const [ref, inView] = useInViewOnce<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(index);

  useEffect(() => {
    if (!inView || reduced) return;
    let ticks = 0;
    const timer = window.setInterval(() => {
      ticks += 1;
      if (ticks > 7) {
        window.clearInterval(timer);
        setShown(index);
      } else {
        setShown(String(Math.floor(Math.random() * 89) + 10));
      }
    }, 45);
    return () => window.clearInterval(timer);
  }, [inView, reduced, index]);

  return (
    <div ref={ref} className={className ? `jk-sechead ${className}` : "jk-sechead"}>
      <span aria-hidden="true" className="jk-sechead__num">
        {shown}
      </span>
      <h2 className="jk-sechead__label" aria-label={label}>
        / {label}
      </h2>
      <span aria-hidden="true" className={inView ? "jk-sechead__rule is-on" : "jk-sechead__rule"} />
      {hint && <span className="jk-sechead__hint">{hint}</span>}
    </div>
  );
}
