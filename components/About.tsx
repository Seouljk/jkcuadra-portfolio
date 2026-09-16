import { beyondCode, bio, education } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";
import { ChipList, Prose } from "./ui";

export function About() {
  return (
    <section id="about" className="jk-section">
      <div className="jk-wrap">
        <SectionHeader index="01" label="About" />
        <div className="jk-about__grid">
          <p className="jk-bio">
            <Prose segments={bio} />
          </p>
          <div className="jk-card jk-edu">
            <span className="jk-label">Education</span>
            <span className="jk-edu__degree">{education.degree}</span>
            <span className="jk-edu__school">{education.school}</span>
            <div className="jk-rule" />
            <div className="jk-edu__foot">
              <span className="jk-edu__city">{education.city}</span>
              <span className="jk-edu__years">{education.years}</span>
            </div>
          </div>
        </div>
        <div className="jk-beyond">
          <span className="jk-label">Beyond code</span>
          <div className="jk-wraprow gap-2">
            <ChipList items={beyondCode} className="jk-tag jk-hoverable" />
          </div>
        </div>
      </div>
    </section>
  );
}
