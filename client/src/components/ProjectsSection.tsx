import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { RaisedButton } from "@/components/RaisedButton";
import { SectionHeader } from "@/components/SectionHeader";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const projects = [
{
    title: "Nurturley",
    date: "Present",
    badge: "Personal SaaS",
    description: "A comprehensive CRM platform for high-growth teams. Manage leads, automate workflows, and scale operations.",
    image: "https://imgbob.net/ib/W32ABSbfpVvbVwi_1788321064.png",
},
  {
    title: "Sneket Store",
    date: "July 2026",
    badge: "AI Personal Project",
    description: "A sneaker store with AI integration for personalized recommendations and market analysis.",
    image: "https://imgbob.net/ib/L8Hj8oPDLZNk3lz_1788321064.png",
  },
  {
    title: "Kerala Jersey",
    date: "June 2026",
    badge: "E-Commerce",
    description: "An e-commerce store for premium sports jersey collection.",
    image: "https://imgbob.net/ib/Axl6tugyCLnwQNY_1788321064.png",
  },
  {
    title: "YatraSutra",
    date: "Sept 2025",
    badge: "Client Website",
    description: "A travel agency website to discover destinations and craft beautiful itineraries.",
    image: "https://imgbob.net/ib/8vcAdzPQxnQpa5d_1788320196.png",
  },
  {
    title: "LP Workflow",
    date: "Dec 2025",
    badge: "Custom Software",
    description: "A workflow-based custom software designed for abroad studies operations.",
    image: "https://imgbob.net/ib/MuQxumHuyq9lI56_1788321064.png",
  },
  {
    title: "LifePlanner",
    date: "July 2025",
    badge: "Client Website",
    description: "A studies and opportunities website for overseas education consulting.",
    image: "https://imgbob.net/ib/t7udRze64RyDebQ_1788321064.png",
  },
  {
    title: "Filmaatic",
    date: "March 2025",
    badge: "Client Website",
    description: "A studio website for an institute of fashion and cinema.",
    image: "https://imgbob.net/ib/3jwrjIWiB9acyUW_1788320196.png",
  },
];

export function ProjectsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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
                  className="embla__slide flex-none w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw] group border border-[var(--editorial-line)] overflow-hidden bg-[#f5f1e8]"
                >
                  <div className="p-6">
                    <div className="mb-6 bg-[#f5f1e8]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-[var(--editorial-muted)] uppercase tracking-[0.1em]">
                        {project.date}
                      </p>
                      <span className="text-[0.65rem] font-bold uppercase tracking-[0.08em] bg-[#7a6456] text-white px-2 py-0.5">
                        {project.badge}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-[var(--editorial-ink)]">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--editorial-muted)]">
                      {project.description}
                    </p>
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
    </section>
  );
}
