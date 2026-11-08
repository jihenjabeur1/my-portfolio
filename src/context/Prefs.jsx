import { createContext, useContext, useEffect, useState } from "react";
import { content } from "../i18n/content";

const PrefsContext = createContext(null);

const read = (key, allowed, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return allowed.includes(v) ? v : fallback;
  } catch {
    return fallback;
  }
};

export function PrefsProvider({ children }) {
  // index.html already resolved these before first paint
  const [theme, setTheme] = useState(() =>
    read("theme", ["light", "dark"], document.documentElement.dataset.theme || "dark")
  );
  const [lang, setLang] = useState(() =>
    read("lang", ["en", "fr"], document.documentElement.lang === "fr" ? "fr" : "en")
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0d0e11" : "#f7f4ef");
    try { localStorage.setItem("theme", theme); } catch { /* ignore */ }
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title =
      lang === "fr"
        ? "Jihen Jabeur | Ingénieure en Informatique Industrielle"
        : "Jihen Jabeur | Industrial Computer Engineer";
    try { localStorage.setItem("lang", lang); } catch { /* ignore */ }
  }, [lang]);

  const value = {
    theme,
    lang,
    t: content[lang],
    toggleTheme: () => setTheme((p) => (p === "dark" ? "light" : "dark")),
    setLang,
  };

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export const usePrefs = () => useContext(PrefsContext);
