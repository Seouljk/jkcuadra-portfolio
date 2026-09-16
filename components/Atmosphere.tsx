"use client";

import { useEffect } from "react";
import { useReducedMotion } from "@/lib/hooks";

/** Fixed film grain, vignette, and the cursor spotlight that reveals the dot grid. */
export function Atmosphere() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const root = document.documentElement;
    let frame = 0;
    let pointerX = -999;
    let pointerY = -999;

    const paint = () => {
      frame = 0;
      root.style.setProperty("--mx", `${pointerX}px`);
      root.style.setProperty("--my", `${pointerY}px`);
    };
    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      root.style.removeProperty("--mx");
      root.style.removeProperty("--my");
    };
  }, [reduced]);

  return (
    <>
      <div aria-hidden="true" className="jk-grain" />
      <div aria-hidden="true" className="jk-vignette" />
      <div aria-hidden="true" className="jk-dots" />
      <div aria-hidden="true" className="jk-spot" />
    </>
  );
}
