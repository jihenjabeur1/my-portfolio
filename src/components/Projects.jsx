import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiLayers, FiActivity, FiTruck, FiCpu, FiZap } from "react-icons/fi";
import { usePrefs } from "../context/Prefs";
import Section, { Reveal } from "./Section";

const ICONS = { erp: FiLayers, industry: FiActivity, logistics: FiTruck, auto: FiCpu, automation: FiZap };

function TiltCard({ children }) {
  const [s, setS] = useState({});
  const onMove = (e) => {
    if (window.matchMedia("(hover: none)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setS({
      transform: `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 6}deg) translateY(-4px)`,
      "--mx": `${(x + 0.5) * 100}%`,
      "--my": `${(y + 0.5) * 100}%`,
    });
  };
  return (
    <div className="card project-card" style={s} onMouseMove={onMove} onMouseLeave={() => setS({})}>
      {children}
    </div>
  );
}

export default function Projects() {
  const { t } = usePrefs();
  const p = t.projects;
  const [filter, setFilter] = useState("all");
  const cats = ["all", ...Object.keys(p.filters)];
  const list = p.items.filter((x) => filter === "all" || x.cat === filter);

  return (
    <Section id="projects" kicker={p.kicker} title={p.title}>
      <Reveal className="filters" role="tablist">
        {cats.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={filter === c}
            className={filter === c ? "on" : ""}
            onClick={() => setFilter(c)}
          >
            {filter === c && <motion.span layoutId="filter-pill" className="pill" />}
            <span className="lbl">{c === "all" ? p.all : p.filters[c]}</span>
          </button>
        ))}
      </Reveal>

      <motion.div layout className="projects-grid">
        <AnimatePresence mode="popLayout">
          {list.map((x) => {
            const Icon = ICONS[x.cat];
            return (
              <motion.div
                key={x.title}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3 }}
              >
                <TiltCard>
                  <div className="project-top">
                    <span className="project-icon"><Icon /></span>
                    <span className="project-cat">{p.filters[x.cat]}</span>
                  </div>
                  <h3>{x.title}</h3>
                  <p className="project-date">{x.date}</p>
                  <p className="project-desc">{x.desc}</p>
                  <ul className="tags">
                    {x.tags.map((tg) => (
                      <li key={tg}>{tg}</li>
                    ))}
                  </ul>
                </TiltCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
