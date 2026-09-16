"use client";

import { useEffect, useRef, useState } from "react";
import { otherRoles, roles } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";
import { ChipList } from "./ui";

const OTHER_ROW = roles.length;

export function Experience() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const timelineRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  // The amber rail fills as the timeline passes 60% of the viewport height, as in the design.
  useEffect(() => {
    const timeline = timelineRef.current;
    const fill = fillRef.current;
    if (!timeline || !fill) return;
    const update = () => {
      const rect = timeline.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - rect.top) / Math.max(1, rect.height)));
      fill.style.height = `${(progress * 100).toFixed(2)}%`;
    };
    update();
    const resizes = new ResizeObserver(update);
    resizes.observe(timeline);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      resizes.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const toggle = (row: number) => setOpen((current) => ({ ...current, [row]: !current[row] }));
  const mark = (row: number) => (open[row] ? "[ − ]" : "[ + ]");

  return (
    <section id="experience" className="jk-section">
      <div className="jk-wrap">
        <SectionHeader index="02" label="Experience" hint="Click a row to expand" />
        <div ref={timelineRef} className="jk-timeline">
          <span aria-hidden="true" className="jk-timeline__base" />
          <span ref={fillRef} aria-hidden="true" className="jk-timeline__fill" />
          <div className="jk-timeline__rows">
            {roles.map((role, row) => {
              const isOpen = Boolean(open[row]);
              const panelId = `role-${row}`;
              return (
                <div key={`${role.title}-${role.org}`} className="jk-role">
                  <span
                    aria-hidden="true"
                    className={role.current ? "jk-role__dot jk-role__dot--current" : "jk-role__dot"}
                  />
                  <button
                    type="button"
                    className="jk-role__btn"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(row)}
                  >
                    <span className="jk-role__main">
                      <span className="jk-role__title">
                        {role.title}
                        {role.note && (
                          <>
                            {" "}
                            <span className="jk-role__note">{role.note}</span>
                          </>
                        )}
                      </span>
                      <span className="jk-role__org">{role.org}</span>
                      <span className="jk-role__chips">
                        <ChipList items={role.chips} className="jk-chip jk-chip--spaced" />
                      </span>
                    </span>
                    <span className="jk-role__dates">{role.dates}</span>
                    <span aria-hidden="true" className="jk-role__mark">
                      {mark(row)}
                    </span>
                  </button>
                  <p id={panelId} hidden={!isOpen} className="jk-role__summary">
                    {role.summary}
                  </p>
                </div>
              );
            })}

            <div className="jk-role jk-role--other">
              <button
                type="button"
                className="jk-other__btn"
                aria-expanded={Boolean(open[OTHER_ROW])}
                aria-controls="role-other"
                onClick={() => toggle(OTHER_ROW)}
              >
                <span className="jk-other__label">
                  Other experience <span className="jk-dimtext">— {otherRoles.length} roles</span>
                </span>
                <span aria-hidden="true" className="jk-other__mark">
                  {mark(OTHER_ROW)}
                </span>
              </button>
              <div id="role-other" hidden={!open[OTHER_ROW]} className="jk-other__list">
                {otherRoles.map((role) => (
                  <span key={role.title} className="jk-other__item">
                    {role.title} <span className="jk-dimtext">· {role.org}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
