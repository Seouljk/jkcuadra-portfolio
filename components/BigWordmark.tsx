"use client";

import { useInViewOnce } from "@/lib/hooks";

/** The footer's outlined wordmark, which fills with bone white when it scrolls into view. */
export function BigWordmark({ text }: { text: string }) {
  const [ref, inView] = useInViewOnce<HTMLDivElement>();
  return (
    <div ref={ref} aria-hidden="true" className={inView ? "jk-bigmark is-on" : "jk-bigmark"}>
      {text}
    </div>
  );
}
