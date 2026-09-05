import { SectionHeader } from "@/components/SectionHeader";
import { FaDownload } from "react-icons/fa6";

export function WorkSection() {
  return (
    <section className="editorial-paper py-16 sm:py-24" id="work">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-12">
          <div className="section-reveal">
            <SectionHeader
              eyebrow="MY BUILDS"
              title={<>What I build.</>}
              titleClassName="text-[clamp(2rem,4vw,3.2rem)]"
              description="I'm a fullstack developer working in Python and JavaScript — from AI agents to SaaS products, end-to-end. The resume has the details."
            />
          </div>
          <div
            id="resume"
            className="work-resume-card section-reveal overflow-hidden rounded-[1.25rem] border border-black/10 px-5 py-6 sm:px-7 sm:py-8"
            style={{
              background: "#f5f1e8",
              boxShadow: [
                "inset 1px 1px 1px rgba(255,255,255,0.9)",
                "inset -1px -1px 1px rgba(110,99,85,0.12)",
                "inset 8px 6px 14px rgba(120,105,75,0.16)",
                "inset -8px -6px 14px rgba(255,255,255,0.7)",
                "0 10px 26px rgba(87,69,52,0.08)",
              ].join(", "),
            }}
          >
            <p className="eyebrow">MY RESUME</p>
            <h2 className="mt-3 built-titling uppercase text-2xl font-semibold text-[#5c4d42] sm:text-3xl">
              The short version.
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#1f1d1a]/60">
              Download the current resume as a PDF.
            </p>
            <a
              className="work-resume-link mt-10"
              href={`${import.meta.env.BASE_URL}resume/Risheb.s_Resume.pdf`}
              download="Rishebs-Resume.pdf"
            >
              <FaDownload aria-hidden="true" size={12} />
              <span>Download resume</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
