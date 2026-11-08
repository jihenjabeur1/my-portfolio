import { usePrefs } from "../context/Prefs";
import Section, { Reveal } from "./Section";

export default function About() {
  const { t } = usePrefs();
  const a = t.about;
  return (
    <Section id="about" kicker={a.kicker} title={a.title}>
      <div className="about-grid">
        <div className="about-text">
          {a.body.map((p, i) => (
            <Reveal as="p" key={i} i={i}>
              {p}
            </Reveal>
          ))}
        </div>
        <div className="facts">
          {a.facts.map((f, i) => (
            <Reveal key={f.k} i={i} className="fact card">
              <span className="fact-k">{f.k}</span>
              <span className="fact-v">{f.v}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
