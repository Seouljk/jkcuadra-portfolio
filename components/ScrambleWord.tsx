"use client";

import { useEffect, useState } from "react";
import { heroWords } from "@/lib/content";
import { useReducedMotion } from "@/lib/hooks";

const GLYPHS = "#%$&/|<>[]{}=+*_01xz";
const FRAMES = 15;
const FRAME_MS = 36;
const HOLD_MS = 3400;

/** Cycles the hero's bracketed word, decoding each new word through random glyphs. Static for reduced motion. */
export function ScrambleWord() {
  const [text, setText] = useState(heroWords[0]);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let index = 0;
    let frameTimer: number | undefined;

    const cycleTimer = window.setInterval(() => {
      const previous = heroWords[index];
      index = (index + 1) % heroWords.length;
      const target = heroWords[index];
      const length = Math.max(previous.length, target.length);
      let frame = 0;

      window.clearInterval(frameTimer);
      frameTimer = window.setInterval(() => {
        frame += 1;
        if (frame >= FRAMES) {
          window.clearInterval(frameTimer);
          setText(target);
          return;
        }
        let out = "";
        for (let i = 0; i < length; i += 1) {
          const settlesAt = (i / length) * FRAMES * 0.7 + FRAMES * 0.3;
          if (frame >= settlesAt) out += target[i] ?? "";
          else if (target[i] === " ") out += " ";
          else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setText(out);
      }, FRAME_MS);
    }, HOLD_MS);

    return () => {
      window.clearInterval(cycleTimer);
      window.clearInterval(frameTimer);
    };
  }, [reduced]);

  return <>{text}</>;
}
