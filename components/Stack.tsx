import { marqueeRows, stackCards, type StackCard } from "@/lib/content";
import { Meter } from "./Meter";
import { SectionHeader } from "./SectionHeader";
import { TechIcon } from "./TechIcon";

const CHIP = "jk-chip jk-chip--sunk jk-chip--icon jk-hoverable";

function TechChips({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item) => (
        <span key={item} className={CHIP}>
          <TechIcon name={item} />
          {item}
        </span>
      ))}
    </>
  );
}

function SkillCard({ card }: { card: StackCard }) {
  // The full-width card lays its intro and chips side by side.
  if (card.span === 6) {
    return (
      <div className="jk-skill jk-skill--6">
        <div className="jk-skill__intro">
          <div className="jk-skill__head jk-skill__head--start">
            <h3 className="jk-skill__title">{card.title}</h3>
            <span className="jk-skill__code">{card.code}</span>
          </div>
          <Meter level={card.level} label={card.levelLabel} />
          <p className="jk-skill__desc">{card.description}</p>
        </div>
        <div className="jk-skill__chips jk-skill__chips--wide">
          <TechChips items={card.chips} />
        </div>
      </div>
    );
  }

  return (
    <div className={`jk-skill jk-skill--${card.span}`}>
      <div className="jk-skill__head">
        <h3 className="jk-skill__title">{card.title}</h3>
        <span className="jk-skill__code">{card.code}</span>
      </div>
      <Meter level={card.level} label={card.levelLabel} />
      <p className="jk-skill__desc">{card.description}</p>
      <div className="jk-skill__chips">
        <TechChips items={card.chips} />
      </div>
    </div>
  );
}

export function Stack() {
  return (
    <section id="stack" className="jk-stack">
      <div className="jk-gutter">
        <SectionHeader index="03" label="Stack" className="jk-wrap" />
      </div>

      {/* Decorative: every marquee item is repeated in the cards below. Each row is doubled for a seamless loop. */}
      <div aria-hidden="true" className="jk-marquees">
        {marqueeRows.map((row, rowIndex) => (
          <div key={rowIndex} className="jk-marquee">
            <div className={rowIndex === 0 ? "jk-marquee__track" : "jk-marquee__track jk-marquee__track--rev"}>
              {[...row, ...row].map((item, itemIndex) => (
                <span key={itemIndex} className={rowIndex === 0 ? "jk-pill" : "jk-pill jk-pill--sunk"}>
                  <TechIcon name={item} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="jk-gutter">
        <div className="jk-wrap jk-bento">
          {stackCards.map((card) => (
            <SkillCard key={card.code} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
