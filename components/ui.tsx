import { Fragment, type CSSProperties } from "react";
import type { Segment } from "@/lib/content";

/** Style for the design's staggered fade-up entrance (`.jk-in`) with its own duration, delay and easing. */
export function fadeIn(duration: string, delay: string, easing?: string): CSSProperties {
  return { "--dur": duration, "--delay": delay, ...(easing ? { "--in-ease": easing } : {}) } as CSSProperties;
}

/** Renders prose runs, lifting highlighted runs to bone white. */
export function Prose({ segments }: { segments: Segment[] }) {
  return (
    <>
      {segments.map((segment, index) =>
        segment.hi ? (
          <span key={index} className="jk-hi">
            {segment.text}
          </span>
        ) : (
          <Fragment key={index}>{segment.text}</Fragment>
        ),
      )}
    </>
  );
}

/** Four L-shaped corner marks inside the nearest positioned parent. */
export function CropMarks({ size, color }: { size: number; color?: string }) {
  const style = { "--crop": `${size}px`, ...(color ? { "--crop-color": color } : {}) } as CSSProperties;
  return (
    <>
      {(["tl", "tr", "bl", "br"] as const).map((corner) => (
        <span key={corner} aria-hidden="true" className={`jk-crop jk-crop--${corner}`} style={style} />
      ))}
    </>
  );
}

export function ChipList({ items, className }: { items: string[]; className: string }) {
  return (
    <>
      {items.map((item) => (
        <span key={item} className={className}>
          {item}
        </span>
      ))}
    </>
  );
}
