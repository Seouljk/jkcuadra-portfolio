import { navItems, site } from "@/lib/content";
import { BigWordmark } from "./BigWordmark";
import { LiveClock } from "./LiveClock";

export function Footer() {
  return (
    <footer className="jk-footer">
      <div className="jk-wrap">
        <BigWordmark text="JKCUADRA" />
        <span className="sr-only">{site.name}</span>
        <div className="jk-rule jk-footer__rule" />
        <div className="jk-footer__row">
          <nav className="jk-footer__nav" aria-label="Footer">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="jk-footer__link">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="jk-footer__meta">
            <span className="jk-footer__copy">© 2026 {site.name}</span>
            <span className="jk-footer__clock">
              <span className="jk-dot jk-pulse" />
              <LiveClock /> GMT+8
            </span>
            <a href="#top" className="jk-btn jk-btn--outline jk-btn--top">
              Back to top
              <span aria-hidden="true" className="jk-arrow jk-arrow--up">
                ↑
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
