// Split Signal reminder: section headers behave like system labels—small signal first, one clear statement second.
import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function SectionHeader({
  eyebrow,
  title,
  description,
  light = false,
  titleClassName = "",
  descriptionClassName = "",
  contentClassName = "",
}: {
  eyebrow: string | ReactNode;
  title: string | ReactNode;
  description?: string;
  light?: boolean;
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
}) {
  return (
    <div className={`grid gap-5 ${light ? "text-white" : "text-[var(--editorial-ink)]"}`}>
      <div>
        <p className={light ? "eyebrow text-[var(--amber)]" : "eyebrow"}>{eyebrow}</p>
      </div>
      <div className={`max-w-3xl ${contentClassName}`}>
        <motion.h2
          className={`display-title uppercase text-[clamp(1.8rem,4vw,3.5rem)] ${titleClassName}`}
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {title}
        </motion.h2>
        {description && <p className={`mt-6 max-w-xl text-base leading-7 sm:text-lg ${light ? "text-white/62" : "text-[var(--editorial-muted)]"} ${descriptionClassName}`}>{description}</p>}
      </div>
    </div>
  );
}

export function SignalIndex({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--editorial-ink)]">
      <span className="grid size-8 place-items-center rounded-full border border-current/40 font-display text-xs tracking-normal">{number}</span>
      <span>{label}</span>
    </div>
  );
}
