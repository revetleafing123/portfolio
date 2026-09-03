import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { RaisedButton } from "@/components/RaisedButton";
import { SectionHeader } from "@/components/SectionHeader";
import { FaGithub } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight, FaArrowUpRightFromSquare, FaEye } from "react-icons/fa6";
import { ProjectDetails } from "@/components/ProjectDetails";

export interface ProjectItem {
  title: string;
  date: string;
  badge: string;
  type?: string;
  description: string;
  image: string;
  stack?: string[];
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
    description: "A comprehensive CRM platform for high-growth teams. Manage leads, automate workflows, and scale business operations with role-based security.",
    image: "https://imgbob.net/ib/W32ABSbfpVvbVwi_1788321064.png",
    stack: ["Django", "React", "PostgreSQL", "Netlify", "Koyeb"],
    note: "Engineering Note: Domain-driven backend split into independent modules for CRM, HR, contacts, and invoicing without monolithic lock-in.",
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
    stack: ["Django", "React", "PostgreSQL", "Cloudinary", "Vercel"],
    note: "AI Tool-Calling Note: Implements direct LLM tool calling for real-time inventory queries and conversational cart actions.",
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
    note: "E-Commerce Note: Built for high-conversion sports apparel catalog with instant filtered search and responsive checkout.",
  },
  {
    title: "YatraSutra",
    date: "Sept 2025",
    badge: "Client Website",
    type: "Client Platform",
    description: "A travel agency website enabling users to discover exotic destinations, compare packages, and craft custom itineraries.",
    image: "https://imgbob.net/ib/8vcAdzPQxnQpa5d_1788320196.png",
    stack: ["React", "Appwrite"],
    note: "Client Note: Designed for a travel agency with immersive destination discovery and dynamic itinerary builder.",
  },
  {
    title: "LP Workflow",
    date: "Dec 2025",
    badge: "Custom Software",
    type: "Custom Software",
    description: "A workflow-based custom software designed for abroad studies operations, applicant tracking, and status verification.",
    image: "https://imgbob.net/ib/MuQxumHuyq9lI56_1788321064.png",
    stack: ["Django", "HTML", "CSS", "Vercel", "PostgreSQL"],
    note: "Custom Software Note: Multi-stage pipeline automation for overseas study applications and student document tracking.",
  },
  {
    title: "LifePlanner",
    date: "July 2025",
    badge: "Client Website",
    type: "Client Website",
    description: "A studies and opportunities portal connecting students with overseas education consulting, program recommendations, and university advisors.",
    image: "https://imgbob.net/ib/t7udRze64RyDebQ_1788321064.png",
    stack: ["Django", "Vercel", "HTML", "CSS"],
    note: "Consulting Platform Note: Unified education consulting portal connecting students with university opportunities and advisors.",
  },
  {
    title: "Filmaatic",
    date: "March 2025",
    badge: "Client Website",
    type: "Client Studio Site",
    description: "A creative studio website and course enrollment portal for an institute of fashion and cinema.",
    image: "https://imgbob.net/ib/3jwrjIWiB9acyUW_1788320196.png",
    stack: ["React", "Express", "PostgreSQL"],
    note: "Media & Cinema Note: High-impact media showcase and course enrollment portal for a fashion & film institute.",
  },
];

export function ProjectsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
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
    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        const now = Date.now();
        if (now - lastScroll < 400) return;
        lastScroll = now;
        if (e.deltaX > 0) api?.scrollNext();
        else api?.scrollPrev();
      }
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
                  className="embla__slide flex-none w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw] group border border-[var(--editorial-line)] overflow-hidden bg-[#f5f1e8] flex flex-col justify-between"
                >
                  <div className="p-6 flex-1 flex flex-col">
                    <div
                      className="mb-6 bg-[#f5f1e8] overflow-hidden rounded-sm cursor-pointer"
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
                    <h3
                      className="font-display text-2xl font-semibold tracking-[-0.04em] text-[var(--editorial-ink)] cursor-pointer hover:underline"
                      onClick={() => setSelectedProject(project)}
                    >
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--editorial-muted)] flex-1">
                      {project.description}
                    </p>
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
                      <FaEye size={11} />
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

