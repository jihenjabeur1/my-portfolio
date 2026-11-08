import { motion } from "framer-motion";

export const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

export function Reveal({ children, i = 0, className, as = "div", ...rest }) {
  const M = motion[as];
  return (
    <M
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      custom={i}
      {...rest}
    >
      {children}
    </M>
  );
}

export default function Section({ id, kicker, title, children, className = "" }) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="container">
        {(kicker || title) && (
          <Reveal className="section-head">
            {kicker && <p className="kicker">{kicker}</p>}
            {title && <h2 className="section-title">{title}</h2>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
