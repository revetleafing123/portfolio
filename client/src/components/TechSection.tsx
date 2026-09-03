import { useEffect, useRef, useState, type CSSProperties } from "react";
import OptionWheel from "@/components/OptionWheel";
import type { OptionWheelHandle } from "@/components/OptionWheel";
import { RaisedButton } from "@/components/RaisedButton";
import { SectionHeader } from "@/components/SectionHeader";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const TECH_OPTIONS = ["Frameworks", "Cloud", "Database", "AI / Agents", "Designs"];

type TechTile = {
  name: string;
  mark: string;
  asset?: string;
};

const techAsset = (name: string) => `${import.meta.env.BASE_URL}techs/${name}`;

const TECH_TILES: Record<string, TechTile[]> = {
  Frameworks: [
    { name: "React", mark: "R", asset: techAsset("react-dark.svg") },
    { name: "Next.js", mark: "N", asset: techAsset("nextjs-icon.svg") },
    { name: "TypeScript", mark: "TS", asset: techAsset("typescript-icon.svg") },
    { name: "TanStack", mark: "TS", asset: techAsset("tanstack.svg") },
    { name: "Django", mark: "D", asset: techAsset("django.svg") },
    { name: "FastAPI", mark: "F", asset: techAsset("fastapi.svg") },
    { name: "Express", mark: "E", asset: techAsset("expressjs-dark.svg") },
    { name: "Vite", mark: "V", asset: techAsset("vitejs.svg") },
    { name: "HTML", mark: "H", asset: techAsset("html.svg") },
  ],
  Cloud: [
    { name: "AWS", mark: "A", asset: techAsset("aws.svg") },
    { name: "Azure", mark: "Az", asset: techAsset("azure (1).svg") },
    { name: "Docker", mark: "D", asset: techAsset("docker (1).svg") },
    { name: "Vercel", mark: "V", asset: techAsset("vercel-dark.svg") },
    { name: "Railway", mark: "R", asset: techAsset("railway.svg") },
    { name: "Cloudflare", mark: "C", asset: techAsset("cloudflare.svg") },
    { name: "Netlify", mark: "N", asset: techAsset("netlify (2).svg") },
    { name: "Appwrite", mark: "A", asset: techAsset("appwrite.svg") },
    { name: "Convex", mark: "C", asset: techAsset("convex.svg") },
  ],
  Database: [
    { name: "PostgreSQL", mark: "PG", asset: techAsset("postgresql (1).svg") },
    { name: "MySQL", mark: "M", asset: techAsset("mysql.svg") },
    { name: "MongoDB", mark: "M", asset: techAsset("mongodb.svg") },
    { name: "Redis", mark: "R", asset: techAsset("redis.svg") },
    { name: "SQLite", mark: "S", asset: techAsset("sqlite.svg") },
    { name: "Neon", mark: "Ne", asset: techAsset("neon.svg") },
    { name: "Firebase", mark: "F", asset: techAsset("firebase-icon.svg") },
    { name: "Prisma", mark: "P", asset: techAsset("prisma.svg") },
    { name: "Supabase", mark: "Su", asset: techAsset("supabase-dark.svg") },
  ],
  "AI / Agents": [
    { name: "OpenAI", mark: "O", asset: techAsset("openai-fill.svg") },
    { name: "Gemini", mark: "G", asset: techAsset("gemini (1).svg") },
    { name: "Claude Code", mark: "C", asset: techAsset("claude-code.svg") },
    { name: "DeepSeek", mark: "DS", asset: techAsset("deepseek-icon.svg") },
    { name: "OpenCode", mark: "OC", asset: techAsset("file-type-light-opencode.svg") },
    { name: "GitHub Copilot", mark: "GH", asset: techAsset("github-copilot-dark.svg") },
    { name: "Antigravity", mark: "AG", asset: techAsset("google-antigravity.svg") },
    { name: "Mistral", mark: "M", asset: techAsset("mistral.svg") },
    { name: "Qwen", mark: "Q", asset: techAsset("qwen-light.svg") },
  ],
  Designs: [
    { name: "Figma", mark: "F", asset: techAsset("figma.svg") },
    { name: "Framer", mark: "Fr", asset: techAsset("framer-logo-block.svg") },
    { name: "Tailwind", mark: "T", asset: techAsset("tailwind-css.svg") },
    { name: "GSAP", mark: "GS", asset: techAsset("gsap.svg") },
    { name: "Magic UI", mark: "MU", asset: techAsset("magic-ui.svg") },
    { name: "Motion", mark: "M", asset: techAsset("motion.svg") },
    { name: "React Bits", mark: "RB", asset: techAsset("react-bits.svg") },
    { name: "shadcn/ui", mark: "S", asset: techAsset("shadcn-ui-light.svg") },
    { name: "21st.dev", mark: "21", asset: techAsset("21stdev.svg") },
  ],
};

export function TechSection() {
  const wheelRef = useRef<OptionWheelHandle>(null);
  const [selectedTech, setSelectedTech] = useState("Frameworks");

  const handleTechChange = (_index: number, item: string) => {
    setSelectedTech(item);
  };

  useEffect(() => {
    const handleTechNavigation = (event: Event) => {
      const category = (event as CustomEvent<{ category?: string }>).detail?.category;
      if (!category) return;
      const index = TECH_OPTIONS.indexOf(category);
      if (index >= 0) wheelRef.current?.select(index);
    };

    window.addEventListener("portfolio:select-tech", handleTechNavigation);
    return () => window.removeEventListener("portfolio:select-tech", handleTechNavigation);
  }, []);

  return (
    <section className="editorial-paper py-16 sm:py-24" id="tech">
      <div className="container">
        <div className="section-reveal flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow={
              <>
                <span className="lg:hidden">STACKS</span>
                <span className="hidden lg:inline">TECHNOLOGY</span>
              </>
            }
            title="Tech Stack"
            description="Technologies and tools I work with across different domains."
            titleClassName="hidden lg:block"
            descriptionClassName="hidden lg:block"
            contentClassName="hidden lg:block"
          />
          <div className="hidden gap-2 lg:flex">
            <RaisedButton
              className="!p-3 rounded-full"
              onClick={() => wheelRef.current?.previous()}
              aria-label="Previous technology"
            >
              <FaArrowLeft size={14} />
            </RaisedButton>
            <RaisedButton
              className="!p-3 rounded-full"
              onClick={() => wheelRef.current?.next()}
              aria-label="Next technology"
            >
              <FaArrowRight size={14} />
            </RaisedButton>
          </div>
        </div>

        <div className="section-reveal mt-3 flex items-center justify-between lg:hidden">
          <p
            key={selectedTech}
            className="animate-[tech-option-in_280ms_ease-out] font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--editorial-ink)]"
          >
            {selectedTech}
          </p>
          <div className="flex gap-2">
            <RaisedButton
              className="!p-3 rounded-full"
              onClick={() => wheelRef.current?.previous()}
              aria-label="Previous technology"
            >
              <FaArrowLeft size={14} />
            </RaisedButton>
            <RaisedButton
              className="!p-3 rounded-full"
              onClick={() => wheelRef.current?.next()}
              aria-label="Next technology"
            >
              <FaArrowRight size={14} />
            </RaisedButton>
          </div>
        </div>

        <div className="section-reveal mt-10 grid gap-10 lg:grid-cols-[minmax(15rem,0.7fr)_minmax(0,1.3fr)] lg:items-center">
          <div className="relative hidden h-96 lg:col-start-1 lg:block">
            <OptionWheel
              ref={wheelRef}
              items={TECH_OPTIONS}
              defaultSelected={0}
              textColor="#a6a6a6"
              activeColor="#8b6f47"
              side="left"
              fontSize={3.5}
              spacing={1.2}
              curve={0}
              tilt={0}
              blur={1.2}
              fade={0.15}
              smoothing={200}
              inset={0}
              loop={true}
              draggable
              onChange={handleTechChange}
              className="pointer-events-none [&>[role=option]]:pointer-events-auto"
            />
          </div>

          <div
            key={selectedTech}
            className="grid w-full max-w-[30rem] grid-cols-3 justify-self-center rounded-[6px] border border-[rgba(163,150,124,0.3)] bg-[#f5f1e8] p-4 sm:p-5 lg:col-start-2 lg:justify-self-end"
          >
            {TECH_TILES[selectedTech].map((tile, index) => (
              <div
                key={tile.name}
                className={`section-reveal tech-tile-shift ${Math.floor(index / 3) === 1 ? "tech-tile-shift-left" : "tech-tile-shift-right"} flex h-20 flex-col items-center justify-center gap-2 border-[rgba(163,150,124,0.28)] p-2 text-center text-[#2e2e2e] transition-transform duration-300 hover:-translate-y-0.5 sm:h-24 ${index % 3 !== 2 ? "border-r" : ""} ${index < 6 ? "border-b" : ""}`}
                style={{
                  "--tech-row-delay": `${Math.floor(index / 3) * 70}ms`,
                } as CSSProperties}
              >
                {tile.asset ? (
                  <img
                    src={tile.asset}
                    alt=""
                    className="tech-tile-logo h-9 w-9 object-contain sm:h-10 sm:w-10"
                  />
                ) : (
                  <span
                    className="tech-tile-logo grid h-9 w-9 place-items-center rounded-[10px] bg-[#17181d] text-[0.65rem] font-semibold tracking-[0.08em] text-[#f5b942] sm:h-10 sm:w-10"
                  >
                    {tile.mark}
                  </span>
                )}
                <span className="tech-tile-logo max-w-full truncate text-[0.65rem] font-semibold text-[#2e2e2e] sm:text-xs">{tile.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
