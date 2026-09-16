import Image from "next/image";
import { projects } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";
import { ChipList, CropMarks } from "./ui";

export function Projects() {
  return (
    <section id="projects" className="jk-section">
      <div className="jk-wrap">
        <SectionHeader index="04" label="Projects" />

        <div className="jk-projects">
          {projects.map((project, index) => (
            <article key={project.slug} className={index % 2 ? "jk-project jk-project--rev" : "jk-project"}>
              <div className="jk-shot">
                {index === 0 && <CropMarks size={14} color="rgba(255, 181, 71, 0.5)" />}
                <div className="jk-frame">
                  <div aria-hidden="true" className="jk-frame__bar">
                    <span className="jk-frame__dot" />
                    <span className="jk-frame__dot" />
                    <span className="jk-frame__dot" />
                    <span className="jk-frame__url">{project.domain}</span>
                  </div>
                  <div className="jk-frame__view">
                    <div className="jk-frame__page">
                      <Image
                        src={project.screenshot.src}
                        alt={`Screenshot of ${project.domain}`}
                        width={project.screenshot.width}
                        height={project.screenshot.height}
                        sizes="(max-width: 1099px) 100vw, 780px"
                        className="jk-frame__img"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="jk-info">
                <span className="jk-label">{project.tag}</span>
                <h3 className="jk-info__title">{project.title}</h3>
                <span className="jk-live">
                  <span className="jk-dot jk-pulse" />
                  <span className="jk-signal">LIVE</span> · {project.domain}
                </span>
                <p className="jk-info__desc">{project.description}</p>
                <div className="jk-wraprow gap-1.5">
                  <ChipList items={project.chips} className="jk-chip jk-hoverable" />
                </div>
                <div className="jk-info__actions">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="jk-btn jk-btn--primary jk-btn--visit"
                  >
                    Visit Site
                    <span aria-hidden="true" className="jk-arrow jk-arrow--x">
                      ↗
                    </span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
