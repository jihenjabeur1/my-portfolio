import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiPhone, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { usePrefs } from "../context/Prefs";
import { profile } from "../i18n/content";
import Section, { Reveal } from "./Section";

// Messages are delivered by FormSubmit (free, no backend, no API key).
// The very first message triggers an activation email to the address below:
// open it and click "Activate Form" once — after that every message lands in the inbox.
const ENDPOINT = `https://formsubmit.co/ajax/${profile.email}`;

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export default function Contact() {
  const { t } = usePrefs();
  const c = t.contact;
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", _honey: "" });
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (form._honey) return; // bot
    if (!form.name.trim() || !emailOk(form.email) || !form.message.trim()) {
      setStatus({ state: "error", msg: c.fill });
      return;
    }
    setStatus({ state: "sending", msg: "" });
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          _replyto: form.email,
          _subject: `Portfolio — ${form.subject || form.name}`,
          _template: "table",
          _captcha: "false",
          message: form.message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) !== "true") throw new Error(data.message || "failed");
      setStatus({ state: "ok", msg: c.ok });
      setForm({ name: "", email: "", subject: "", message: "", _honey: "" });
    } catch {
      setStatus({ state: "error", msg: "err" });
    }
  };

  const channels = [
    { icon: FiMail, label: c.emailLabel, value: profile.email, href: `mailto:${profile.email}` },
    { icon: FiPhone, label: c.phone, value: profile.phone, href: profile.phoneHref },
    { icon: FaWhatsapp, label: c.whatsapp, value: profile.phone, href: profile.whatsapp, ext: true },
    { icon: FaLinkedinIn, label: c.linkedin, value: "jihen-jabeur", href: profile.linkedin, ext: true },
  ];

  return (
    <Section id="contact" kicker={c.kicker} title={c.title}>
      <div className="contact-grid">
        <div className="contact-info">
          <Reveal as="p" className="contact-intro">{c.intro}</Reveal>
          {channels.map((ch, i) => (
            <Reveal key={ch.label} i={i}>
              <a
                className="card channel"
                href={ch.href}
                {...(ch.ext ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                <span className="channel-icon"><ch.icon /></span>
                <span className="channel-text">
                  <span className="channel-label">{ch.label}</span>
                  <span className="channel-value">{ch.value}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal i={1} className="card form-card">
          <form onSubmit={submit} noValidate>
            <input
              type="text"
              name="_honey"
              value={form._honey}
              onChange={set("_honey")}
              className="hp"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <div className="row2">
              <label className="field">
                <span>{c.name}</span>
                <input type="text" name="name" value={form.name} onChange={set("name")} autoComplete="name" required />
              </label>
              <label className="field">
                <span>{c.email}</span>
                <input type="email" name="email" value={form.email} onChange={set("email")} autoComplete="email" required />
              </label>
            </div>
            <label className="field">
              <span>{c.subject}</span>
              <input type="text" name="subject" value={form.subject} onChange={set("subject")} />
            </label>
            <label className="field">
              <span>{c.message}</span>
              <textarea name="message" rows={6} value={form.message} onChange={set("message")} required />
            </label>

            <AnimatePresence mode="wait">
              {(status.state === "ok" || status.state === "error") && (
                <motion.p
                  key={status.state + status.msg}
                  className={`form-status ${status.state}`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="status"
                >
                  {status.state === "ok" ? <FiCheckCircle /> : <FiAlertCircle />}
                  <span>
                    {status.msg === "err" ? (
                      <>
                        {c.err} <a href={`mailto:${profile.email}`}>{profile.email}</a>
                      </>
                    ) : (
                      status.msg
                    )}
                  </span>
                </motion.p>
              )}
            </AnimatePresence>

            <button type="submit" className="btn primary full" disabled={status.state === "sending"}>
              {status.state === "sending" ? (
                <>
                  <span className="spinner" /> {c.sending}
                </>
              ) : (
                <>
                  {c.send} <FiSend />
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
