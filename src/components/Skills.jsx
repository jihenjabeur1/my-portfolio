import { FiCode, FiCpu, FiLayers, FiBarChart2, FiShield, FiTool } from "react-icons/fi";
import { usePrefs } from "../context/Prefs";
import Section, { Reveal } from "./Section";

const ICONS = { dev: FiCode, ai: FiCpu, erp: FiLayers, data: FiBarChart2, gov: FiShield, tools: FiTool };

export default function Skills() {
  const { t } = usePrefs();
  return (
    <Section id="skills" kicker={t.skills.kicker} title={t.skills.title}>
      <div className="skills-grid">
        {t.skills.groups.map((g, i) => {
          const Icon = ICONS[g.id];
          return (
            <Reveal key={g.id} i={i % 3} className="card skill-card">
              <div className="skill-head">
                <span className="skill-icon"><Icon /></span>
                <h3>{g.name}</h3>
              </div>
              <ul className="chips">
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
