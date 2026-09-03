// Split Signal reminder: the archive supports the flagship stories without competing with them; keep it compact, visual, and honest.
import { motion } from "framer-motion";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { supportingWork } from "@/lib/portfolioData";

export function SupportingWork() {
  return (
    <div className="mt-14 grid gap-5 md:grid-cols-3">
      {supportingWork.map((item, index) => (
        <motion.a
          className="group overflow-hidden rounded-[1.2rem] border border-border bg-card shadow-[0_16px_45px_rgba(15,23,42,0.06)]"
          href={item.link}
          key={item.name}
          rel="noreferrer"
          target="_blank"
          initial={{ opacity: 0, y: 22 }}
          transition={{ delay: index * 0.06, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.24 }}
        >
          <div className="relative aspect-[1.4/1] overflow-hidden">
            <img alt="" className="h-full w-full object-cover grayscale-[0.15] transition duration-700 group-hover:scale-105 group-hover:grayscale-0" loading="lazy" src={item.image} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            <span className="absolute bottom-4 left-4 rounded-full bg-black/35 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md">{item.type}</span>
          </div>
          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-xl font-semibold tracking-[-0.045em]">{item.name}</h3>
              <FaArrowUpRightFromSquare aria-hidden="true" className="mt-1 shrink-0 text-muted-foreground transition group-hover:text-[var(--cobalt)]" size={13} />
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.detail}</p>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
