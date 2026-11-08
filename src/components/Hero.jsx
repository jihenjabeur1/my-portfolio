import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiDownload, FiMail, FiMapPin } from "react-icons/fi";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { usePrefs } from "../context/Prefs";
import { profile } from "../i18n/content";

function Typer({ words }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    setI(0);
    setText("");
    setDel(false);
  }, [words]);

  useEffect(() => {
    const word = words[i % words.length];
    let delay = del ? 35 : 70;
    if (!del && text === word) delay = 1600;
    if (del && text === "") delay = 300;
    const id = setTimeout(() => {
      if (!del && text === word) setDel(true);
      else if (del && text === "") {
        setDel(false);
        setI((x) => x + 1);
      } else setText(word.slice(0, text.length + (del ? -1 : 1)));
    }, delay);
    return () => clearTimeout(id);
  }, [text, del, i, words]);

  return (
    <span className="typer">
      {text}
      <span className="caret" aria-hidden="true" />
    </span>
  );
}

const chip = (d) => ({
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { delay: 0.8 + d, duration: 0.5 } },
});

export default function Hero() {
  const { t } = usePrefs();
  const h = t.hero;

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <motion.span
            className="badge"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="dot" /> {h.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hello">{h.hello}</span>
            <span className="name">Jihen Jabeur</span>
          </motion.h1>

          <motion.p
            className="role-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            aria-label={h.roles[0]}
          >
            <span className="mono">&gt;</span> <Typer words={h.roles} />
          </motion.p>

          <motion.p
            className="lead"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            {h.summary}
          </motion.p>

          <motion.div
            className="cta-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a href="#contact" className="btn primary">
              {h.ctaContact} <FiArrowRight />
            </a>
            <a href={profile.cv} download className="btn ghost">
              <FiDownload /> {h.ctaCv}
            </a>
          </motion.div>

          <motion.div
            className="socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
          >
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email"><FiMail /></a>
            <a href={profile.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
            <span className="loc"><FiMapPin /> {h.location}</span>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="photo-ring">
            <div className="photo">
              <img src={profile.photo} alt="Jihen Jabeur" width="720" height="720" fetchpriority="high" />
            </div>
          </div>
          <motion.span className="float-chip c1" {...chip(0)}>Business Central · AL</motion.span>
          <motion.span className="float-chip c2" {...chip(0.15)}>AI · RAG · LLM</motion.span>
          <motion.span className="float-chip c3" {...chip(0.3)}>Power BI · Power Apps</motion.span>
        </motion.div>
      </div>

      <a href="#about" className="scroll-cue" aria-label={t.nav.about}>
        <span />
      </a>
    </section>
  );
}
