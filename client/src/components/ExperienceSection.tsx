import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { experience } from "@/lib/portfolioData";

type ConnectorPath = { d: string; key: string };

export function ExperienceSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<ConnectorPath[]>([]);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    function measure() {
      const grid = gridRef.current;
      if (!grid) return;
      if (window.innerWidth < 768) {
        setPaths([]);
        return;
      }
      const gridRect = grid.getBoundingClientRect();
      const cards = grid.querySelectorAll<HTMLDivElement>("[data-exp-card]");
      const next: ConnectorPath[] = [];

      cards.forEach((_, i) => {
        if (i >= cards.length - 1) return;
        const curr = cards[i].getBoundingClientRect();
        const nextCard = cards[i + 1].getBoundingClientRect();
        const isLastInRow = (i + 1) % 4 === 0;

        const startX = curr.right - gridRect.left;
        const startY = curr.top + curr.height / 2 - gridRect.top;
        const endX = nextCard.left - gridRect.left;
        const endY = nextCard.top + nextCard.height / 2 - gridRect.top;

        if (isLastInRow) {
          const midX = startX + (endX - startX) / 2;
          next.push({
            key: `${i}-${i + 1}`,
            d: `M ${startX} ${startY} C ${midX} ${startY} ${midX} ${endY} ${endX} ${endY}`,
          });
        } else {
          next.push({
            key: `${i}-${i + 1}`,
            d: `M ${startX} ${startY} L ${endX} ${endY}`,
          });
        }
      });

      setPaths(next);
      setSvgSize({ width: gridRect.width, height: gridRect.height });
    }

    measure();
    document.fonts?.ready.then(measure).catch(() => {});
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (gridRef.current) ro.observe(gridRef.current);

    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  return (
    <section className="editorial-surface py-16 sm:py-24" id="experience">
      <div className="container">
        <div className="section-reveal">
          <SectionHeader
            eyebrow="EXPERIENCE"
            title="My journey"
            description="A practical stack shaped by shipping AI systems, SaaS workflows, and client operations."
          />
        </div>

        {paths.length > 0 && (
<svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden"
              height={svgSize.height}
              width={svgSize.width}
            >
            <defs>
              <filter height="300%" id="beamGlow" width="300%" x="-100%" y="-100%">
                <feGaussianBlur in="SourceGraphic" result="blur1" stdDeviation="2.2" />
                <feGaussianBlur in="SourceGraphic" result="blur2" stdDeviation="6" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {paths.map((path) => (
              <g key={path.key}>
                <path d={path.d} fill="none" stroke="rgba(220,120,40,0.45)" strokeLinecap="round" strokeWidth={2} />
                <motion.path
                  animate={{ strokeDashoffset: [0, -100] }}
                  d={path.d}
                  fill="none"
                  filter="url(#beamGlow)"
                  pathLength={100}
                  stroke="rgba(255,140,30,0.9)"
                  strokeDasharray="20 80"
                  strokeLinecap="round"
                  strokeWidth={7}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay: 0.2 }}
                />
                <motion.path
                  animate={{ strokeDashoffset: [0, -100] }}
                  d={path.d}
                  fill="none"
                  pathLength={100}
                  stroke="#fff3e2"
                  strokeDasharray="16 84"
                  strokeLinecap="round"
                  strokeWidth={1.6}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay: 0.2 }}
                />
              </g>
            ))}
          </svg>
        )}

        <div
          className="section-reveal relative mt-10 grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-5"
          ref={gridRef}
        >
          {experience.map((item, index) => {
            const isCurrent = /present/i.test(item.period);
            return (
              <div
                className="relative rounded-tl-xl border-l border-t border-[var(--editorial-line)] pl-5 pb-6 pt-4 shadow-[0_-5px_6px_-4px_rgba(0,0,0,0.15)] md:shadow-[-5px_0_6px_-4px_rgba(0,0,0,0.15),0_-5px_6px_-4px_rgba(0,0,0,0.15)]"
                data-exp-card
                key={item.company}
              >
                {index < experience.length - 1 && (
                  <span className="absolute -bottom-[calc(1.5rem+var(--radius-xl))] -left-px z-10 h-[calc(1.5rem+var(--radius-xl))] w-px bg-[var(--editorial-line)] md:hidden" />
                )}
                <span className="font-display text-3xl tracking-[-0.08em] text-[var(--editorial-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  {item.period}
                  {isCurrent && <span className="size-1.5 rounded-full bg-[var(--cobalt)]" />}
                </p>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-[-0.04em] text-[var(--editorial-ink)]">
                  {item.role}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#7a6456]">{item.company}</p>
                <p className="mt-3 text-sm leading-6 text-[var(--editorial-muted)]">{item.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
