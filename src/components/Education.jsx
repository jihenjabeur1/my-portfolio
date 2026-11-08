import { FiBookOpen, FiUsers } from "react-icons/fi";
import { usePrefs } from "../context/Prefs";
import Section, { Reveal } from "./Section";

export default function Education() {
  const { t } = usePrefs();
  const e = t.education;
  return (
    <Section id="education" kicker={e.kicker} title={e.title}>
      <div className="edu-grid">
        <div className="edu-col">
          {e.items.map((x, i) => (
            <Reveal key={x.title} i={i} className="card edu-card">
              <span className="edu-icon"><FiBookOpen /></span>
              <div>
                <p className="edu-date">{x.date}</p>
                <h3>{x.title}</h3>
                <p className="edu-school">{x.school}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="edu-col">
          <Reveal as="h3" className="sub-title">{e.volTitle}</Reveal>
          {e.volunteering.map((v, i) => (
            <Reveal key={v.title} i={i} className="card edu-card">
              <span className="edu-icon alt"><FiUsers /></span>
              <div>
                <p className="edu-date">{v.date}</p>
                <h3>{v.title}</h3>
                <p className="edu-school">{v.org}</p>
                <p className="edu-desc">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
