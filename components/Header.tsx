"use client";

import { useEffect, useState } from "react";
import { navItems, site } from "@/lib/content";
import { LiveClock } from "./LiveClock";

export function Header() {
  const [open, setOpen] = useState(false);

  // While the full-screen menu is open: lock page scroll, close on Escape, and close if the window grows to desktop.
  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia("(min-width: 1100px)");
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onViewport = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onViewport);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onViewport);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="jk-header">
        <div className="jk-header__bar">
          <a href="#top" className="jk-wordmark">
            {site.handle}
            <span className="jk-wordmark__cursor">_</span>
          </a>
          <nav className="jk-nav" aria-label="Primary">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="jk-nav__link">
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="jk-burger"
            aria-expanded={open}
            aria-controls="jk-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? "CLOSE ✕" : "MENU ≡"}
          </button>
        </div>
      </header>

      {open && (
        <div id="jk-menu" className="jk-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="jk-menu__top">
            <span className="jk-wordmark">
              {site.handle}
              <span className="jk-signal">_</span>
            </span>
            <button type="button" className="jk-menu__close" aria-label="Close menu" onClick={close}>
              CLOSE ✕
            </button>
          </div>
          <nav className="jk-menu__nav" aria-label="Menu">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={close}
                className="jk-menu__link"
                style={{ animationDelay: `${(0.04 + index * 0.06).toFixed(2)}s` }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="jk-menu__meta">
            <span>
              CAGAYAN DE ORO, PH · <LiveClock /> GMT+8
            </span>
            <span>{site.email.toUpperCase()}</span>
          </div>
        </div>
      )}
    </>
  );
}
