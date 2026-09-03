import { SectionHeader } from "@/components/SectionHeader";

export function WorkSection() {
  return (
    <section className="editorial-paper py-16 sm:py-24" id="work">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-12">
          <div className="section-reveal">
            <SectionHeader
              eyebrow="MY BUILDS"
              title={<>Products with something<br />real behind them.</>}
              titleClassName="text-[clamp(2rem,4vw,3.2rem)]"
              description="Three builds, each with a different constraint: scale, agency, and operational clarity."
            />
          </div>
          <div className="section-reveal">
            <img
              alt="Selected work"
              className="w-full rounded-3xl object-cover"
              src={`${import.meta.env.BASE_URL}folders2.png`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
