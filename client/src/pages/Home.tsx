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
        
        <ExperienceSection />
        <TechSection />
        

      </main>

      <ContactSection />
    </div>
  );
}
