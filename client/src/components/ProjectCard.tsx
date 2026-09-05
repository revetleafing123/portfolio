// Split Signal redesign: each project gets its own editorial composition; show the artifact, the decision, and the outcome.
import { motion } from "framer-motion";
import { FaArrowUpRightFromSquare, FaCodeBranch, FaDatabase, FaRobot, FaUsers } from "react-icons/fa6";
import type { Project } from "@/lib/portfolioData";

function Links({ project, dark = false }: { project: Project; dark?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-3 ${dark ? "text-white/70" : "text-foreground/70"}`}>
      {project.liveUrl && <a className={`signal-link ${dark ? "text-[var(--amber)]" : "text-[var(--cobalt)]"}`} href={project.liveUrl} rel="noreferrer" target="_blank">Live <FaArrowUpRightFromSquare aria-hidden="true" size={10} /></a>}
      {project.frontendUrl && <a className="signal-link hover:text-foreground" href={project.frontendUrl} rel="noreferrer" target="_blank"><FaCodeBranch aria-hidden="true" size={11} /> Frontend</a>}
      {project.backendUrl && <a className="signal-link hover:text-foreground" href={project.backendUrl} rel="noreferrer" target="_blank"><FaCodeBranch aria-hidden="true" size={11} /> Backend</a>}
    </div>
  );
}

function Tags({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return <div className="flex flex-wrap gap-2">{items.map((item) => <span className={`rounded-full border px-3 py-1.5 text-[0.65rem] font-medium ${dark ? "border-white/15 text-white/60" : "border-foreground/15 text-foreground/65"}`} key={item}>{item}</span>)}</div>;
}

function NurturelyCaseStudy({ project }: { project: Project }) {
  return (
    <article className="grid gap-8 border-t border-[var(--editorial-line)] py-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:py-24">
      <div className="flex flex-col justify-between gap-9">
        <div>
          <div className="flex items-center gap-3"><span className="font-display text-4xl tracking-[-0.08em] text-[var(--cobalt)]">01</span><span className="eyebrow-muted">{project.eyebrow}</span></div>
          <h3 className="mt-7 max-w-xl built-titling uppercase text-[clamp(2.8rem,5vw,5.9rem)] font-semibold leading-[0.91]">The operating layer for teams past spreadsheets.</h3>
          <p className="mt-6 max-w-md text-base leading-7 text-[var(--editorial-muted)]">{project.description}</p>
        </div>
      </div>
      <div>
        <div className="project-image-frame overflow-hidden rounded-[1.25rem] border border-[var(--cobalt)]/25 bg-[#111b2a] shadow-[0_25px_70px_rgba(37,99,235,0.12)]"><img alt={project.imageAlt} className="aspect-[1.25/1] w-full object-cover transition duration-700 hover:scale-[1.025]" loading="eager" src={project.image} /></div>
        <div className="mt-6 grid gap-5 md:grid-cols-[1fr_1fr] md:items-start">
          <div><p className="eyebrow-muted">Engineering decision</p><p className="mt-3 text-sm leading-6 text-[var(--editorial-muted)]">Domain modules and reusable schemas let CRM, HR, invoicing, and accounts grow without turning the core API into a monolith.</p></div>
          <div><p className="eyebrow-muted">Built with</p><div className="mt-3"><Tags items={project.stack} /></div></div>
        </div>
        <Links project={project} />
      </div>
    </article>
  );
}

function SneaketCaseStudy({ project }: { project: Project }) {
  return (
    <article className="relative overflow-hidden rounded-[1.5rem] bg-[#111923] px-5 py-8 text-white sm:px-10 sm:py-12 lg:px-16 lg:py-16">
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[var(--cobalt)]/15 blur-3xl" />
      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-3"><span className="font-display text-4xl tracking-[-0.08em] text-[var(--amber)]">02</span><span className="eyebrow text-[var(--amber)]">AI COMMERCE / SNEAKET</span></div>
          <h3 className="mt-7 max-w-xl built-titling uppercase text-[clamp(2.8rem,5vw,5.8rem)] font-semibold leading-[0.91]">A shopping assistant that knows the next move.</h3>
          <p className="mt-6 max-w-md text-base leading-7 text-white/60">{project.description}</p>
          <div className="mt-7"><Tags dark items={project.stack} /></div>
          <div className="mt-8"><Links dark project={project} /></div>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-[1.15rem] border border-white/15 bg-[#0a0f17] shadow-2xl"><img alt={project.imageAlt} className="aspect-[1.22/1] w-full object-cover opacity-90" loading="lazy" src={project.image} /></div>
          <motion.div className="absolute -bottom-5 left-3 max-w-[78%] rounded-xl border border-white/15 bg-[#172131]/95 p-4 shadow-2xl backdrop-blur-xl sm:left-[-1.5rem] sm:max-w-[62%]" initial={{ opacity: 0, y: 14 }} transition={{ delay: 0.2, duration: 0.5 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}>
            <div className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[var(--amber)]"><FaRobot aria-hidden="true" size={11} /> Tool call / add_to_cart</div>
            <p className="mt-2 text-sm leading-5 text-white/80">“I found the black low-tops in your size. Want me to add them?”</p>
          </motion.div>
        </div>
      </div>
    </article>
  );
}

function FifacCaseStudy({ project }: { project: Project }) {
  return (
    <article className="grid gap-8 border-y border-[var(--editorial-line)] py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-20">
      <div className="order-2 lg:order-1">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-[var(--editorial-line)] bg-white/55 p-4"><FaUsers aria-hidden="true" className="text-[var(--coral)]" size={16} /><p className="mt-8 font-display text-lg font-semibold tracking-[-0.04em]">Leads</p><p className="mt-1 text-xs text-[var(--editorial-muted)]">Pipeline visibility</p></div>
          <div className="rounded-2xl border border-[var(--editorial-line)] bg-white/55 p-4"><FaDatabase aria-hidden="true" className="text-[var(--cobalt)]" size={16} /><p className="mt-8 font-display text-lg font-semibold tracking-[-0.04em]">Attendance</p><p className="mt-1 text-xs text-[var(--editorial-muted)]">Daily operations</p></div>
          <div className="rounded-2xl border border-[var(--editorial-line)] bg-white/55 p-4"><FaCodeBranch aria-hidden="true" className="text-[var(--amber)]" size={16} /><p className="mt-8 font-display text-lg font-semibold tracking-[-0.04em]">Payments</p><p className="mt-1 text-xs text-[var(--editorial-muted)]">Service boundary</p></div>
        </div>
        <div className="mt-6 overflow-hidden rounded-[1.25rem] border border-[var(--editorial-line)] bg-[#111923]"><img alt={project.imageAlt} className="aspect-[1.55/1] w-full object-cover" loading="lazy" src={project.image} /></div>
      </div>
      <div className="order-1 lg:order-2">
        <div className="flex items-center gap-3"><span className="font-display text-4xl tracking-[-0.08em] text-[var(--amber)]">03</span><span className="eyebrow-muted">CLIENT PLATFORM / OPERATIONS</span></div>
        <h3 className="mt-7 max-w-xl built-titling uppercase text-[clamp(2.8rem,5vw,5.5rem)] font-semibold leading-[0.91]">The calm behind a busy studio.</h3>
        <p className="mt-6 max-w-md text-base leading-7 text-[var(--editorial-muted)]">{project.description}</p>
        <div className="mt-7 border-l-2 border-[var(--cobalt)] pl-5"><p className="eyebrow-muted">Architecture note</p><p className="mt-2 text-sm leading-6 text-[var(--editorial-muted)]">React/Express owns the authenticated dashboard. Django owns secure payment operations. Firebase keeps the shared operational data close.</p></div>
        <div className="mt-7"><Tags items={project.stack} /></div>
        <div className="mt-8"><Links project={project} /></div>
      </div>
    </article>
  );
}

export function ProjectCard({ project }: { project: Project; index?: number }) {
  if (project.slug === "sneaket") return <SneaketCaseStudy project={project} />;
  if (project.slug === "fifac") return <FifacCaseStudy project={project} />;
  return <NurturelyCaseStudy project={project} />;
}
