import { techIcon } from "@/lib/tech-icons";

/**
 * A technology's logo, drawn in the surrounding text colour so it follows the chip's hover state.
 * Server-only on purpose: importing it from a client component would pull the icon data into the bundle.
 */
export function TechIcon({ name }: { name: string }) {
  const glyph = techIcon(name);
  if (!glyph) return null;
  return (
    <svg aria-hidden="true" focusable="false" viewBox={glyph.viewBox} className="jk-techicon">
      <path d={glyph.d} fill="currentColor" />
    </svg>
  );
}
