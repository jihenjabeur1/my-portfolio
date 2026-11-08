import { FiCalendar, FiMapPin } from "react-icons/fi";
import { usePrefs } from "../context/Prefs";
import Section, { Reveal } from "./Section";

export default function Experience() {
  const { t } = usePrefs();
  return (
    <Section id="experience" kicker={t.experience.kicker} title={t.experience.title}>
      <ol className="timeline">
        {t.experience.items.map((e, i) => (
          <Reveal as="li" key={e.company} className="tl-item">
            <span className="tl-dot" aria-hidden="true" />
            <article className="card tl-card">
              <header>
                <div>
                  <h3>{e.role}</h3>
                  <p className="company">
                    {e.company}
                    {e.note && <span className="note">{e.note}</span>}
                  </p>
                </div>
                <div className="meta">
                  <span><FiCalendar /> {e.date}</span>
                  <span><FiMapPin /> {e.place}</span>
                </div>
              </header>
              <ul className="points">
                {e.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
              <ul className="tags">
                {e.tags.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
