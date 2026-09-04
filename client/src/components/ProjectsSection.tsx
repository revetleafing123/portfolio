import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { RaisedButton } from "@/components/RaisedButton";
import { SectionHeader } from "@/components/SectionHeader";
import { FaGithub } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { MdDoubleArrow } from "react-icons/md";
import { ProjectDetails } from "@/components/ProjectDetails";

export interface ProjectItem {
  title: string;
  date: string;
  badge: string;
  type?: string;
  description: string;
  image: string;
  stack?: string[];
  services?: string[];
  note?: string;
  link?: string;
  githubUrl?: string;
}

const projects: ProjectItem[] = [
  {
    title: "Nurturley",
    date: "Present",
    badge: "Personal SaaS",
    type: "Personal SaaS",
    description: "Nurturley is a complete Business Client Relations platform — single-tenant, role-based access with granular menu control. Contacts act as the master source, flowing into Active Leads and a multi-pipeline CRM (Client, Sales, Retarget) with Kanban boards and fully custom stages. Automations include auto lead distribution, payment cycle capture, retarget flows, bulk moves & cross-pipeline bulk copies, plus mandatory-field enforcement on lead details. Includes contact/lead transaction logs, a dedicated Payments hub for one-time, pipeline & invoice tracking, and a Media Library with bucket/collection creation for all contact-linked assets.",
    image: "https://imgbob.net/ib/W32ABSbfpVvbVwi_1788321064.png",
    stack: ["Django", "React", "PostgreSQL", "Netlify", "Koyeb"],
    services: ["Frontend — React", "Backend — Django", "Database — Rivestack Postgres", "Object Storage — Cloudinary", "Hosting — Koyeb (backend), Netlify (frontend)"],
    link: "https://rishebsuite.netlify.app",
    githubUrl: "https://github.com/rishebss/suite-frontend",
  },
  {
    title: "Sneaket Store",
    date: "July 2026",
    badge: "AI Personal Project",
    type: "AI Personal Project",
    description: "A sneaker store integrated with an AI assistant for personalized recommendations, market analysis, and conversational cart actions.",
    image: "https://imgbob.net/ib/L8Hj8oPDLZNk3lz_1788321064.png",
    stack: ["Django", "React", "PostgreSQL", "Cloudinary", "GLM", "Vercel"],
    services: ["Frontend — React", "Backend — Django", "Database — Neon Postgres", "Object Storage — Cloudinary", "Hosting — Vercel (frontend & backend)"],
    link: "https://sneaket.vercel.app",
    githubUrl: "https://github.com/rishebss/sneaket_frontend",
  },
  {
    title: "Kerala Jersey",
    date: "June 2026",
    badge: "E-Commerce",
    type: "E-Commerce Project",
    description: "An e-commerce store designed for premium sports jersey collection, instant filtered search, and merchandise ordering.",
    image: "https://imgbob.net/ib/Axl6tugyCLnwQNY_1788321064.png",
    stack: ["React", "FastAPI", "PostgreSQL", "Vercel", "Cloudinary"],
    services: ["Frontend — React", "Backend — FastAPI", "Database — Neon Postgres", "Object Storage — Cloudinary", "Hosting — Vercel (frontend + backend)"],
    note: "Note: This site belongs to Kerala Jersey — you are visiting their live official store with real products and ordering.",
  },
  {
    title: "Miaat",
    date: "Jan 2026",
    badge: "Client Website",
    type: "Client Website",
    description: "A wellness & booking platform for a 17-year acupuncture practice — personalised treatments, whole-person care, and calendar-based service booking.",
    image: "https://imgbob.net/ib/8FhFQWtNO9pLpVC_1788557688.png",
    stack: ["React", "Express", "Vercel", "Neon"],
    services: ["Frontend — React", "Backend — Express", "Database — Neon Postgres", "Hosting — Vercel (frontend & backend)"],
    note: "Note: This site belongs to Miaat — you are visiting their live official wellness & booking platform for Dr. Thameem Ansari.",
    link: "https://miaat.vercel.app",
  },
  {
    title: "YatraSutra",
    date: "Sept 2025",
    badge: "Client Website",
    type: "Client Platform",
    description: "A travel agency website enabling users to discover exotic destinations, compare packages, and craft custom itineraries.",
    image: "https://imgbob.net/ib/8vcAdzPQxnQpa5d_1788320196.png",
    stack: ["React", "Appwrite"],
    services: ["Frontend — React", "Hosting — Cloudflare (frontend)", "Backend — Appwrite (DB + Storage)"],
    note: "Note: This site belongs to YatraSutra — you are visiting their live official travel agency website with real destinations and itineraries.",
  },
  {
    title: "LP Workflow",
    date: "Dec 2025",
    badge: "Custom Software",
    type: "Custom Software",
    description: "A workflow-based custom software designed for abroad studies operations, applicant tracking, and status verification.",
    image: "https://imgbob.net/ib/MuQxumHuyq9lI56_1788321064.png",
    stack: ["Django", "HTML", "CSS", "Vercel", "PostgreSQL"],
    services: ["Backend — Django", "Database — Neon Postgres", "Hosting — Vercel"],
    note: "Note: The redirecting site is a clone made with client approval for demo purposes — no real applicant data exists on it.",
  },
  {
    title: "LifePlanner",
    date: "July 2025",
    badge: "Client Website",
    type: "Client Website",
    description: "A studies and opportunities portal connecting students with overseas education consulting, program recommendations, and university advisors.",
    image: "https://imgbob.net/ib/t7udRze64RyDebQ_1788321064.png",
    stack: ["Django", "Vercel", "HTML", "CSS"],
    services: ["Backend — Django", "Database — Supabase Postgres", "Hosting — Vercel"],
    note: "Note: This site belongs to LifePlanner — Studies & Opportunities — you are visiting their live official portal with real consulting services.",
  },
  {
    title: "Filmaatic",
    date: "March 2025",
    badge: "Client Website",
    type: "Client Studio Site",
    description: "A creative studio website and course enrollment portal for an institute of fashion and cinema.",
    image: "https://imgbob.net/ib/3jwrjIWiB9acyUW_1788320196.png",
    stack: ["React", "Express", "PostgreSQL"],
    services: ["Frontend — React", "Backend — Express", "Database — Neon Postgres", "Hosting — Cloudflare (frontend), Vercel (backend)"],
    note: "Note: This site belongs to Filmaatic Studios — you are visiting their live official website with real studio content and courses.",
  },
];

export function ProjectsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    skipSnaps: false,
    dragFree: false,
    duration: 28,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    const api = emblaApi;
    if (!api) return;
    onSelect();
    setScrollSnaps(api.scrollSnapList());
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    const container = api.rootNode();
    let lastScroll = 0;
    let wheelAccum = 0;
    let wheelResetTimer: number | undefined;
    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      if (Math.abs(e.deltaX) < 12) return;
      e.preventDefault();
      const now = Date.now();
      if (now - lastScroll < 750) return;
      wheelAccum += e.deltaX;
      clearTimeout(wheelResetTimer);
      wheelResetTimer = window.setTimeout(() => (wheelAccum = 0), 180);
      if (Math.abs(wheelAccum) < 28) return;
      wheelAccum = 0;
      lastScroll = now;
      if (e.deltaX > 0) api?.scrollNext();
      else api?.scrollPrev();
    }
    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
      container.removeEventListener("wheel", onWheel);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="editorial-paper py-16 sm:py-24 overflow-hidden" id="projects">
      <div className="container">
        <div className="section-reveal flex justify-between items-end mb-10">
          <SectionHeader
            eyebrow="PROJECTS"
            title="My work"
            description="Selected projects ranging from full-stack web apps to custom business software."
          />
          <div className="hidden sm:flex gap-2">
            <RaisedButton
              className="!p-3 rounded-full"
              onClick={scrollPrev}
              aria-label="Previous project"
            >
              <FaArrowLeft size={14} />
            </RaisedButton>
            <RaisedButton
              className="!p-3 rounded-full"
              onClick={scrollNext}
              aria-label="Next project"
            >
              <FaArrowRight size={14} />
            </RaisedButton>
          </div>
        </div>

        <div className="section-reveal pt-8">
          <div className="embla overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="embla__container flex">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="embla__slide flex-none w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw] group border border-gray-300/70 bg-[#efeae0] overflow-hidden flex flex-col justify-between"
                >
                  <div className="p-6 flex-1 flex flex-col">
                    <div
                      className="mb-6 bg-[#f5f1e8] overflow-hidden rounded-none cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                    <div className="mb-2">
                      <p className="text-sm font-semibold text-[var(--editorial-muted)] uppercase tracking-[0.1em]">
                        {project.date}
                      </p>
                    </div>
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-[var(--editorial-ink)]">
                      {project.title}
                    </h3>
                  </div>

                  {/* Project Card Footer */}
                  <div className="px-6 py-3.5 border-t border-[var(--editorial-line)] bg-[#efeae0]/70 flex items-center justify-between mt-auto">
                    <span className="text-[0.7rem] font-semibold text-[var(--editorial-muted)] uppercase tracking-[0.08em]">
                      {project.badge}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="bg-[#7a6456] text-white hover:bg-[#635145] text-xs font-semibold px-3.5 py-1.5 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>View</span>
                      <MdDoubleArrow size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  selectedIndex === i
                    ? "bg-[#7a6456] w-6"
                    : "bg-[#d4c5b8] hover:bg-[#7a6456]"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Project Details Right Side Drawer */}
      <ProjectDetails
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </section>
  );
}

