// Split Signal redesign: the page moves from product proof to engineering context; every section earns its space.
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaDownload } from "react-icons/fa6";
import { ContactSection } from "@/components/ContactSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { TechSection } from "@/components/TechSection";
import { Hero } from "@/components/Hero";
import { RaisedButton } from "@/components/RaisedButton";
import { SiteNav } from "@/components/SiteNav";
import { WorkSection } from "@/components/WorkSection";
import { ProjectsSection } from "@/components/ProjectsSection";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      if (reduced) {
        gsap.set(".hero-animate, .section-reveal", { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(".hero-animate", { opacity: 0, y: 18 }, { opacity: 1, y: 0, delay: 0.15, duration: 0.75, stagger: 0.08, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>(".section-reveal").forEach((element) => {
        gsap.fromTo(element, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 86%", once: true } });
      });
      gsap.to(".evidence-orbit", { y: -8, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, root);
    return () => context.revert();
  }, []);

  return (
    <div className="site-shell" ref={pageRef}>
      <SiteNav />
      <Hero />

      <main>
        <WorkSection />
        <ProjectsSection />
        <TechSection />
        <ExperienceSection />
        

        <section className="editorial-paper py-16 sm:py-24" id="resume">
          <div className="container">
            <div
              className="section-reveal flex flex-col gap-6 rounded-[1.5rem] border border-black/10 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-10"
              style={{
                background: "#f5f1e8",
                boxShadow: [
                  "inset 1px 1px 1px rgba(255,255,255,0.9)",
                  "inset -1px -1px 1px rgba(110,99,85,0.12)",
                  "inset 10px 7px 16px rgba(120,105,75,0.18)",
                  "inset -10px -7px 16px rgba(255,255,255,0.7)",
                  "0 12px 32px rgba(87,69,52,0.10)",
                ].join(", "),
              }}
            >
              <div className="max-w-xl">
                <p className="eyebrow">My Resume</p>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.05em] text-[#1f1d1a]">The short version.</h2>
                <p className="mt-2 text-sm text-[#1f1d1a]/60">Download the current resume as a PDF.</p>
              </div>
              <RaisedButton
                variant="mauve-brown"
                href={`${import.meta.env.BASE_URL}resume/Risheb.s_Resume.pdf`}
                download="Rishebs-Resume.pdf"
              >
                <FaDownload aria-hidden="true" size={12} />
                Download resume
              </RaisedButton>
            </div>
          </div>
        </section>
      </main>

      <ContactSection />
    </div>
  );
}
