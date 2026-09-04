import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import {
  FaArrowLeft,
  FaArrowUpRightFromSquare,
  FaCode,
  FaDatabase,
  FaGear,
  FaLayerGroup,
  FaNoteSticky,
  FaRobot,
  FaServer,
  FaXmark,
} from "react-icons/fa6";
import {
  SiCloudflare,
  SiDjango,
  SiFirebase,
  SiJavascript,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ProjectItem } from "./ProjectsSection";

interface ProjectDetailsProps {
  open: boolean;
  onClose: () => void;
  project: ProjectItem | null;
}

// Drawer animation variants emerging from the right side
const drawerVariants: Variants = {
  closed: {
    x: "100%",
    opacity: 0,
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1], // Smooth natural spring/ease
      when: "beforeChildren",
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: [0.7, 0, 0.84, 0],
    },
  },
};

const overlayVariants: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const contentVariants: Variants = {
  closed: { opacity: 0, y: 12 },
  open: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.1, duration: 0.25, ease: "easeOut" },
  },
};

const techAsset = (file: string) => `${import.meta.env.BASE_URL}techs/${file}`;

// Neomorphic (soft UI) shadow pair, tuned for the #f5f1e8 drawer background.
// Light source assumed top-left: warm-white highlight top-left, warm-grey shadow bottom-right.
const NEO_BASE_BG = "#f5f1e8";
const neoShadow =
  "5px 5px 10px rgba(163,150,124,0.45), -5px -5px 10px rgba(255,255,255,0.9)";
const neoInsetShadow =
  "inset 3px 3px 6px rgba(163,150,124,0.45), inset -3px -3px 6px rgba(255,255,255,0.9)";

function getTechSvgAsset(name: string): string | null {
  const lower = name.toLowerCase().trim();
  if (lower.includes("cloudinary")) return techAsset("cloudinary.svg");
  if (lower.includes("koyeb")) return techAsset("koyeb.svg");
  if (lower.includes("netlify")) return techAsset("netlify (2).svg");
  if (lower.includes("appwrite")) return techAsset("appwrite.svg");
  if (lower.includes("fastapi")) return techAsset("fastapi.svg");
  if (lower.includes("django")) return techAsset("django.svg");
  if (lower.includes("postgres")) return techAsset("postgresql (1).svg");
  if (lower.includes("react")) return techAsset("react-dark.svg");
  if (lower.includes("vercel")) return techAsset("vercel-dark.svg");
  if (lower.includes("html")) return techAsset("html.svg");
  if (lower.includes("css")) return techAsset("css.svg");
  if (lower.includes("express")) return techAsset("expressjs-dark.svg");
  if (lower.includes("python")) return techAsset("fastapi.svg");
  if (lower.includes("next")) return techAsset("nextjs-icon.svg");
  if (lower.includes("typescript") || lower === "ts")
    return techAsset("typescript-icon.svg");
  if (lower.includes("redis")) return techAsset("redis.svg");
  if (lower.includes("tailwind")) return techAsset("tailwind-css.svg");
  if (lower.includes("firebase")) return techAsset("firebase-icon.svg");
  if (lower.includes("cloudflare")) return techAsset("cloudflare.svg");
  if (lower.includes("openai") || lower.includes("llm") || lower.includes("ai"))
    return techAsset("openai-fill.svg");
  if (lower.includes("docker")) return techAsset("docker (1).svg");
  if (lower.includes("aws")) return techAsset("aws.svg");
  if (lower.includes("mongodb")) return techAsset("mongodb.svg");
  if (lower.includes("mysql")) return techAsset("mysql.svg");
  if (lower.includes("sqlite")) return techAsset("sqlite.svg");
  if (lower.includes("supabase")) return techAsset("supabase-dark.svg");
  if (lower.includes("figma")) return techAsset("figma.svg");
  if (lower.includes("framer") || lower.includes("motion"))
    return techAsset("motion.svg");
  return null;
}

function MobileTechTooltip({
  tech,
  src,
  isCss,
  isHtml,
  iconSizeClass,
}: {
  tech: string;
  src: string | null;
  isCss: boolean;
  isHtml: boolean;
  iconSizeClass: string;
}) {
  const [show, setShow] = useState(false);
  const touchHandled = useRef(false);
  const justShown = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    touchHandled.current = true;
    justShown.current = true;
    setShow(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (touchHandled.current) {
      touchHandled.current = false;
      return;
    }
    setShow((prev) => !prev);
  };

  const hide = () => {
    if (justShown.current) {
      justShown.current = false;
      return;
    }
    setShow(false);
  };

  return (
    <div className="relative">
      <div
        role="button"
        tabIndex={0}
        className="relative inline-block cursor-pointer transition-transform hover:scale-125"
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setShow((prev) => !prev);
          }
        }}
        aria-label={tech}
      >
        {src ? (
          <img
            src={src}
            alt={tech}
            className={`${iconSizeClass} object-contain`}
          />
        ) : (
          <span className="text-xs font-bold text-[#7a6456]">{tech}</span>
        )}
      </div>
      {show && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={hide}
            onTouchStart={hide}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 top-full mt-2 z-50 whitespace-nowrap pointer-events-none -translate-x-1/2"
          >
            <div className="bg-[#1f1d1a] text-[#f5f1e8] border border-[var(--editorial-line)] px-2.5 py-1 text-[0.68rem] font-semibold tracking-wider rounded-xs shadow-md uppercase">
              {tech}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}

function useHoverDevice() {
  const [hover, setHover] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    setHover(mq.matches);
    const handler = (e: MediaQueryListEvent) => setHover(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return hover;
}

function TechItem({ tech }: { tech: string }) {
  const hover = useHoverDevice();
  const src = getTechSvgAsset(tech);
  const isCss = tech.toLowerCase().trim() === "css";
  const isHtml = tech.toLowerCase().trim() === "html";
  const iconSizeClass = isCss
    ? "size-8.5 scale-110"
    : isHtml
      ? "size-8"
      : "size-7.5";

  if (hover) {
    return (
      <Tooltip key={tech}>
        <TooltipTrigger asChild>
          <div className="relative inline-block cursor-pointer transition-transform hover:scale-125">
            {src ? (
              <img
                src={src}
                alt={tech}
                className={`${iconSizeClass} object-contain`}
              />
            ) : (
              <span className="text-xs font-bold text-[#7a6456]">{tech}</span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          sideOffset={6}
          className="bg-[#1f1d1a] text-[#f5f1e8] border border-[var(--editorial-line)] px-2.5 py-1 text-[0.68rem] font-semibold tracking-wider rounded-xs shadow-md z-50 uppercase"
        >
          {tech}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <MobileTechTooltip
      key={tech}
      tech={tech}
      src={src}
      isCss={isCss}
      isHtml={isHtml}
      iconSizeClass={iconSizeClass}
    />
  );
}

export function ProjectDetails({
  open,
  onClose,
  project,
}: ProjectDetailsProps) {
  useEffect(() => {
    if (!open) return;

    // Handle ESC key press to close drawer
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // Handle browser back button press (popstate)
    const handlePopState = () => {
      onClose();
    };

    window.history.pushState({ drawerOpen: true }, "");
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && project && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/45 backdrop-blur-xs"
            initial="closed"
            animate="open"
            exit="exit"
            variants={overlayVariants}
            onClick={onClose}
          />

          {/* Right Side Drawer */}
          <motion.aside
            className="relative z-10 w-full max-w-lg sm:max-w-xl h-full bg-[#f5f1e8] text-[#1f1d1a] border-l border-[var(--editorial-line)] shadow-2xl overflow-hidden flex flex-col justify-between"
            initial="closed"
            animate="open"
            exit="exit"
            variants={drawerVariants}
            aria-label={`Project details for ${project.title}`}
            role="dialog"
            aria-modal="true"
          >
            {/* Sticky Drawer Header */}
            <div className="sticky top-0 z-20 bg-[#f5f1e8]/95 backdrop-blur-md px-4 py-3 sm:px-6 border-b border-[var(--editorial-line)] flex items-center justify-between gap-3 shrink-0">
              <h2 className="font-display text-base sm:text-lg font-semibold tracking-[-0.03em] text-[var(--editorial-ink)] truncate">
                {project.title}
              </h2>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="grid size-8 place-items-center rounded-full border border-black/10 bg-[#e9dfcf] text-[#1f1d1a] hover:bg-[#7a6456] hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <FaXmark size={14} />
              </button>
            </div>

            {/* Drawer Scrollable Body Content */}
            <motion.div
              variants={contentVariants}
              className="p-5 sm:p-6 flex-1 overflow-y-auto custom-scrollbar"
            >
              {/* Project Framed Preview Image */}
              <div className="overflow-hidden rounded-none border border-[var(--editorial-line)] mb-6 bg-[#e9dfcf]/60">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto max-h-[280px] object-cover object-top"
                />
              </div>

              {/* Metadata Specs Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-3.5 rounded-none border border-[var(--editorial-line)] bg-[#efeae0]/80">
                <div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[var(--editorial-muted)] block mb-1">
                    Project
                  </span>
                  <span className="text-sm font-semibold text-[var(--editorial-ink)]">
                    {project.title}
                  </span>
                </div>

                <div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[var(--editorial-muted)] block mb-1">
                    Type
                  </span>
                  <span className="text-sm font-semibold text-[var(--editorial-ink)]">
                    {project.type || project.badge}
                  </span>
                </div>

                <div className="col-span-2 pt-2 border-t border-[var(--editorial-line)]/60">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[var(--editorial-muted)] block mb-1">
                    Timeline
                  </span>
                  <span className="text-xs font-medium text-[var(--editorial-ink)]">
                    {project.date}
                  </span>
                </div>
              </div>

              {/* Tech Stack Section with SVGs and bottom tooltips */}
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--editorial-muted)] mb-2.5 flex items-center gap-2">
                  <FaLayerGroup size={12} className="text-[#7a6456]" />
                  <span>Tech Stack</span>
                </h3>

                <TooltipProvider delayDuration={50}>
                  <div className="flex items-center gap-4 flex-wrap pt-1">
                    {(
                      project.stack || [
                        "React",
                        "TypeScript",
                        "Node.js",
                        "Tailwind",
                      ]
                    ).map((tech) => (
                      <TechItem key={tech} tech={tech} />
                    ))}
                  </div>
                </TooltipProvider>
              </div>

              {/* Description Section */}
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--editorial-muted)] mb-2.5 flex items-center gap-2">
                  <FaServer size={12} className="text-[#7a6456]" />
                  <span>Description</span>
                </h3>
                <p className="text-sm leading-6 text-[var(--editorial-muted)]">
                  {project.description ||
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet."}
                </p>
              </div>

              {/* Note Banner – 3D Realistic Glass */}
              <div
                className="mb-6 p-3.5 relative overflow-hidden border border-white/40"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.08) 100%)",
                  backdropFilter: "blur(14px) saturate(1.6)",
                  WebkitBackdropFilter: "blur(14px) saturate(1.6)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.7), 0 4px 16px rgba(163,150,124,0.25), 0 1px 3px rgba(163,150,124,0.15)",
                }}
              >
                {/* top specular highlight strip */}
                <div
                  className="absolute inset-x-0 top-0 h-[1px]"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.85) 70%, transparent)",
                  }}
                />
                <div className="text-[#7a6456] font-bold text-xs uppercase tracking-[0.12em] mb-1">
                  <span>NOTE</span>
                </div>
                <p className="text-xs leading-5 text-[var(--editorial-ink)] font-medium">
                  {project.note ||
                    "Note: Designed with modular architecture principles, performance caching, and clean user experience."}
                </p>
              </div>
            </motion.div>

            {/* Drawer Footer Actions */}
            <motion.div
              variants={contentVariants}
              className="px-4 py-3 sm:px-6 border-t border-[var(--editorial-line)] bg-[#efeae0] flex items-center justify-end gap-3.5 mt-auto shrink-0 z-20"
            >
              <a
                href={project.githubUrl || "https://github.com/rishebss"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center h-8 transition-transform hover:scale-105 cursor-pointer shrink-0"
                title="View Source Code"
              >
                <img
                  src={`${import.meta.env.BASE_URL}github_dark.svg`}
                  alt="GitHub"
                  className="h-8 w-auto object-contain"
                />
              </a>
              <a
                href={
                  project.link ||
                  project.githubUrl ||
                  "https://github.com/rishebss"
                }
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-semibold bg-[#7a6456] text-white hover:bg-[#635145] transition-colors flex items-center gap-2 cursor-pointer shadow-sm h-8"
              >
                <span>Visit</span>
                <FaArrowUpRightFromSquare size={10} />
              </a>
            </motion.div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
