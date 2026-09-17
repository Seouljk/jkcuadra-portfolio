import Image from "next/image";
import { heroIntro, heroWords, site, statusReadouts } from "@/lib/content";
import { LiveClock } from "./LiveClock";
import { ScrambleWord } from "./ScrambleWord";
import { CropMarks, Prose, fadeIn } from "./ui";

export function Hero() {
  return (
    <section className="jk-hero" aria-label="Introduction">
      <div className="jk-hero__grid">
        <div className="min-w-0">
          <div className="jk-eyebrow jk-in" style={fadeIn("0.5s", "0.1s")}>
            <span className="jk-dot jk-dot--7 jk-pulse jk-pulse--fast" />
            <span className="jk-eyebrow__text">
              Currently building at <span className="jk-hi">{site.company}</span>
            </span>
          </div>
          <div className="jk-clockline jk-in" style={fadeIn("0.5s", "0.18s")}>
            {site.locationShort} ·{" "}
            <span className="jk-hi">
              <LiveClock />
            </span>{" "}
            GMT+8
          </div>

          <h1 className="jk-h1">
            <span className="sr-only">I design, build &amp; ship {heroWords.join(", ")}</span>
            <span aria-hidden="true" className="block">
              <span className="jk-h1__mask">
                <span className="jk-h1__line" style={{ animationDelay: "0.1s" }}>
                  I design,
                </span>
              </span>
              <span className="jk-h1__mask">
                <span className="jk-h1__line" style={{ animationDelay: "0.2s" }}>
                  build &amp; ship
                </span>
              </span>
              <span className="jk-h1__mask jk-h1__mask--last">
                <span className="jk-h1__line jk-signal" style={{ animationDelay: "0.3s" }}>
                  [
                  <span className="jk-h1__word">
                    <ScrambleWord />
                  </span>
                  ]
                </span>
              </span>
            </span>
          </h1>

          <p className="jk-sub jk-in" style={fadeIn("0.6s", "0.5s")}>
            <Prose segments={heroIntro} />
          </p>

          <div className="jk-cta-row jk-in" style={fadeIn("0.6s", "0.6s")}>
            <a href="#projects" className="jk-btn jk-btn--primary">
              View Projects
              <span aria-hidden="true" className="jk-arrow jk-arrow--x">
                →
              </span>
            </a>
          </div>

          <div className="jk-social-row jk-in" style={fadeIn("0.6s", "0.68s")}>
            <a href={site.github.href} target="_blank" rel="noreferrer" aria-label="GitHub" className="jk-social">
              GH
            </a>
            <a href={site.linkedin.href} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="jk-social">
              IN
            </a>
            <a href={`mailto:${site.email}`} aria-label="Email" className="jk-social jk-social--at">
              @
            </a>
            <span aria-hidden="true" className="jk-draw" />
          </div>
        </div>

        <aside className="jk-panel jk-in" style={fadeIn("0.6s", "0.7s")} aria-label="Status panel">
          <div className="jk-panel__head">
            <span className="jk-label">Status Panel</span>
            <span className="jk-panel__status">
              <span className="jk-dot jk-pulse jk-pulse--fast" />
              OPEN TO WORK
            </span>
          </div>
          <div className="jk-portrait">
            <CropMarks size={12} />
            <div className="jk-portrait__frame">
              <Image
                src={site.portrait}
                alt={`Portrait of ${site.name}`}
                fill
                sizes="(max-width: 1099px) 100vw, 560px"
                preload
                quality={90}
                className="jk-portrait__img"
              />
            </div>
          </div>
          <div className="jk-panel__id">
            <span className="jk-panel__name">{site.name}</span>
            <span className="jk-panel__meta">{site.role}</span>
            <span className="jk-panel__meta">{site.location}</span>
          </div>
          <div className="jk-rule" />
          <dl className="jk-readouts">
            {statusReadouts.map((item) => (
              <div key={item.label} className="jk-readout">
                <dt className="jk-readout__k">{item.label}</dt>
                <dd className="jk-readout__v">{item.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <div aria-hidden="true" className="jk-scrollcue jk-in" style={fadeIn("0.6s", "1s", "ease")}>
        <span className="jk-scrollcue__line" />
        <span className="jk-scrollcue__label">Scroll</span>
      </div>
    </section>
  );
}
