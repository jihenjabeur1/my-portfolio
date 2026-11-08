import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { usePrefs } from "../context/Prefs";
import { profile } from "../i18n/content";

export default function Footer() {
  const { t } = usePrefs();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} Jihen Jabeur. {t.footer.rights}
        </p>
        <div className="socials small">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email"><FiMail /></a>
          <a href={profile.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
        </div>
      </div>
    </footer>
  );
}
