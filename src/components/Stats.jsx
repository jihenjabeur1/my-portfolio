import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";
import { usePrefs } from "../context/Prefs";
import { Reveal } from "./Section";

function Counter({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{val}</span>;
}

export default function Stats() {
  const { t } = usePrefs();
  return (
    <div className="container">
      <div className="stats">
        {t.stats.map((s, i) => (
          <Reveal key={i} i={i} className="stat">
            <div className="stat-num">
              {s.prefix}
              <Counter to={s.value} />
              {s.suffix}
            </div>
            <p>{s.label}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
