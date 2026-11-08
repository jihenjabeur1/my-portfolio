import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMoon, FiSun, FiMenu, FiX } from "react-icons/fi";
import { usePrefs } from "../context/Prefs";

const IDS = ["about", "skills", "experience", "projects", "education", "contact"];

export function Controls() {
  const { theme, toggleTheme, lang, setLang, t } = usePrefs();
  return (
    <div className="controls">
      <div className="lang-switch" role="group" aria-label={t.ui.lang}>
        {["en", "fr"].map((l) => (
          <button
            key={l}
            className={lang === l ? "on" : ""}
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
          >
            {lang === l && <motion.span layoutId="lang-pill" className="pill" />}
            <span className="lbl">{l.toUpperCase()}</span>
          </button>
        ))}
      </div>
      <button className="icon-btn" onClick={toggleTheme} aria-label={t.ui.theme} title={t.ui.theme}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            style={{ display: "grid" }}
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}

export default function Navbar() {
  const { t } = usePrefs();
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id === "home" ? "" : e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["home", ...IDS].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#home" className="logo" onClick={() => setOpen(false)} aria-label="Jihen Jabeur">
          <span className="logo-mark">JJ</span>
          <span className="logo-text">Jihen Jabeur</span>
        </a>

        <nav className="nav-links" aria-label="Main">
          {IDS.map((id) => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""}>
              {active === id && <motion.span layoutId="nav-pill" className="nav-pill" />}
              <span>{t.nav[id]}</span>
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <Controls />
          <button
            className="icon-btn burger"
            onClick={() => setOpen((o) => !o)}
            aria-label={t.ui.menu}
            aria-expanded={open}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            {IDS.map((id, i) => (
              <motion.a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className={active === id ? "active" : ""}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i }}
              >
                <span className="num">0{i + 1}</span>
                {t.nav[id]}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
