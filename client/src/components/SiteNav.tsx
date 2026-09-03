// Style direction: the mobile menu extends the portfolio's warm Split Signal system with a full-bleed paper surface, Space Grotesk display type, and restrained staggered motion.
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { FaGithub } from "react-icons/fa";
import { FaBars, FaLinkedinIn, FaXmark } from "react-icons/fa6";
import { RaisedButton } from "@/components/RaisedButton";

const links = [
  { label: "Work", href: "#work" },
  { label: "Path", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const drawerVariants: Variants = {
  closed: {
    x: "-100%",
    opacity: 0,
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.34,
      ease: "easeOut",
      when: "beforeChildren",
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      duration: 0.24,
      ease: "easeInOut",
      when: "afterChildren",
    },
  },
};

const drawerContentVariants: Variants = {
  closed: { opacity: 1 },
  open: {
    opacity: 1,
    transition: { delayChildren: 0.05, staggerChildren: 0.08 },
  },
};

const drawerNavVariants: Variants = {
  closed: { opacity: 1 },
  open: {
    opacity: 1,
    transition: { delayChildren: 0.02, staggerChildren: 0.07 },
  },
};

const drawerItemVariants: Variants = {
  closed: { opacity: 0, y: 14 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: "easeOut" },
  },
};

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const isDisclaimerPage = location === "/disclaimer";
  const resumeHref = isDisclaimerPage ? `${import.meta.env.BASE_URL}#resume` : "#resume";
  const navLinks = isDisclaimerPage
    ? [...links.map((link) => ({ ...link, href: `/${link.href}` })), { label: "Profile", href: "/" }]
    : [...links, { label: "Disclaimer", href: "/disclaimer" }];
  const profileHref = isDisclaimerPage ? "/" : "#top";

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-3 z-50 text-[#2e2e2e] sm:top-5">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between rounded-full border border-black/10 bg-[#e9dfcf] px-3 py-2.5 shadow-[0_4px_14px_rgba(0,0,0,0.16)] sm:px-4">
          <a className="group flex items-center gap-3" href={profileHref} onClick={closeMenu}>
            <span className="grid size-10 place-items-center rounded-full bg-[#f6f0e5] p-1 ring-1 ring-black/10 transition group-hover:bg-[#fff8eb]">
              <img alt="" className="size-8 object-contain" src={`${import.meta.env.BASE_URL}man.svg`} />
            </span>
            <span className="font-display text-lg font-semibold tracking-[-0.05em]">Risheb.s</span>
          </a>

          <div className="flex items-center gap-2 md:hidden">
            <button
              aria-expanded={open}
              aria-label={open ? "Close navigation" : "Open navigation"}
              className="theme-toggle border-black/10 bg-black/[0.05]"
              onClick={() => setOpen((value) => !value)}
              type="button"
            >
              {open ? <FaXmark aria-hidden="true" size={15} /> : <FaBars aria-hidden="true" size={15} />}
            </button>
          </div>

          <div className="hidden items-center md:flex">
            <RaisedButton href="https://github.com/rishebss" rel="noreferrer" target="_blank" size="md" iconOnly variant="mauve-brown">
              <FaGithub aria-hidden="true" size={18} className="text-[#f4f0e8]" />
            </RaisedButton>
          </div>
        </div>
        <nav aria-label="Primary navigation" className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a className="text-sm text-[#2e2e2e]/55 transition hover:text-[#2e2e2e]" href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
          <a className="text-sm text-[#2e2e2e]/55 transition hover:text-[#2e2e2e]" href={resumeHref}>
            Resume
          </a>
        </nav>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            aria-label="Mobile navigation drawer"
            aria-modal="true"
            className="fixed inset-0 z-40 bg-[#f5f1e8] text-[#1f1d1a] md:hidden"
            initial="closed"
            animate="open"
            exit="exit"
            role="dialog"
            variants={drawerVariants}
          >
            <motion.div className="mx-auto flex min-h-full max-w-5xl flex-col px-6 pb-10 pt-6 sm:px-10 sm:pt-8" variants={drawerContentVariants}>
              <motion.div className="flex justify-end" variants={drawerItemVariants}>
                <button
                  aria-label="Close navigation"
                  className="grid size-11 place-items-center rounded-full border border-black/10 bg-[#e9dfcf] text-[#1f1d1a] transition hover:bg-[#fff8eb]"
                  onClick={closeMenu}
                  type="button"
                >
                  <FaXmark aria-hidden="true" size={17} />
                </button>
              </motion.div>
              <motion.div className="mt-16 font-display text-[0.68rem] uppercase tracking-[0.24em] text-[#1f1d1a]/45" variants={drawerItemVariants}>
                Navigate the build
              </motion.div>

              <motion.nav aria-label="Mobile navigation" className="mt-12 flex flex-col items-start gap-5" variants={drawerNavVariants}>
                {navLinks.map((link) => (
                  <motion.a
                    className="font-display text-[clamp(2.75rem,13vw,5rem)] leading-[0.86] tracking-[-0.08em] text-[#1f1d1a] transition-colors hover:text-[var(--cobalt)]"
                    href={link.href}
                    key={link.href}
                    onClick={closeMenu}
                    variants={drawerItemVariants}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  className="font-display text-[clamp(2.75rem,13vw,5rem)] leading-[0.86] tracking-[-0.08em] text-[#1f1d1a] transition-colors hover:text-[var(--cobalt)]"
                  href={resumeHref}
                  onClick={closeMenu}
                  variants={drawerItemVariants}
                >
                  Resume
                </motion.a>
                <motion.a
                  className="font-display text-[clamp(2.75rem,13vw,5rem)] leading-[0.86] tracking-[-0.08em] text-[#1f1d1a] transition-colors hover:text-[var(--cobalt)]"
                  href="https://github.com/rishebss"
                  rel="noreferrer"
                  target="_blank"
                  onClick={closeMenu}
                  variants={drawerItemVariants}
                >
                  GitHub
                </motion.a>
              </motion.nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center ${compact ? "gap-2" : "gap-3"}`}>
      <a aria-label="GitHub" className="grid size-9 place-items-center rounded-full border border-current/20 text-current transition hover:border-[var(--cobalt)] hover:text-[var(--cobalt)]" href="https://github.com/rishebss" rel="noreferrer" target="_blank">
        <FaGithub aria-hidden="true" size={14} />
      </a>
      <a aria-label="LinkedIn" className="grid size-9 place-items-center rounded-full border border-current/20 text-current transition hover:border-[var(--cobalt)] hover:text-[var(--cobalt)]" href="https://www.linkedin.com/in/risheb-s-b46a40289" rel="noreferrer" target="_blank">
        <FaLinkedinIn aria-hidden="true" size={14} />
      </a>
    </div>
  );
}
