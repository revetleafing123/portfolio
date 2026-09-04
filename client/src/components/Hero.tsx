"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { MdDoubleArrow } from "react-icons/md";
import { RiMailSendLine } from "react-icons/ri";
import { RaisedButton } from "@/components/RaisedButton";
import { DynamicTiles } from "@/components/ui/DynamicTiles";
import {
  HeroColorPanelsContainer,
  HeroColorPanelsContent,
  HeroColorPanelsDescription,
  HeroColorPanelsHeading,
  HeroColorPanelsRoot,
} from "@/components/ui/hero-color-panel";

// Nudge if the font's cap-height sits a few px below the measured line-box
// top even with tight leading. Positive value pushes tiles down.
const CAP_HEIGHT_FUDGE_PX = 0;

export function Hero() {
  const headingTextRef = useRef<HTMLSpanElement>(null);
  const tilesAnchorRef = useRef<HTMLDivElement>(null);
  const [tilesOffset, setTilesOffset] = useState(0);

  useLayoutEffect(() => {
    function align() {
      const headingEl = headingTextRef.current;
      const anchorEl = tilesAnchorRef.current;
      if (!headingEl || !anchorEl) return;

      // Skip while the anchor is hidden (mobile): a display:none element
      // reports a zero rect, which would produce a bogus offset.
      if (anchorEl.offsetParent === null) {
        setTilesOffset(0);
        return;
      }

      // Both rects are viewport-relative and read fresh each time, so this
      // is safe to call repeatedly without feedback loops (the transform
      // lives on an *inner* wrapper, not on tilesAnchorRef itself).
      const headingTop = headingEl.getBoundingClientRect().top;
      const anchorTop = anchorEl.getBoundingClientRect().top;
      setTilesOffset(headingTop - anchorTop + CAP_HEIGHT_FUDGE_PX);
    }

    align();
    document.fonts?.ready.then(align).catch(() => {});
    window.addEventListener("resize", align);

    const ro = new ResizeObserver(align);
    if (headingTextRef.current) ro.observe(headingTextRef.current);

    return () => {
      window.removeEventListener("resize", align);
      ro.disconnect();
    };
  }, []);

  return (
    <section className="relative isolate min-h-[760px] md:min-h-[min(100dvh,900px)] lg:min-h-[min(100dvh,860px)] overflow-hidden bg-[#f5f1e8] text-[#1f1d1a]" id="top">
      <HeroColorPanelsRoot
        className="absolute inset-0 z-0"
        showBadges={false}
        srTitle="Rishebs portfolio"
      >
        <HeroColorPanelsContainer className="container relative z-10 grid min-h-[min(100dvh,860px)] items-center gap-10 pb-24 pt-32 sm:pb-28 lg:grid-cols-[minmax(340px,0.9fr)_minmax(360px,1.1fr)] lg:gap-14 lg:pt-28 xl:grid-cols-[0.8fr_1.2fr]">
          <HeroColorPanelsContent className="max-w-2xl gap-5 px-0 text-left sm:gap-6 lg:pr-0">
            <HeroColorPanelsHeading
              className="pt-0 text-left"
              headingClassName="font-display whitespace-nowrap text-[clamp(1.9rem,7.5vw,8.2rem)] font-semibold leading-[0.98] tracking-[-0.085em] text-[#1f1d1a] sm:text-[clamp(4.4rem,7.2vw,7.8rem)]"
              subtitle="Zero fluff."
              title={
                <span ref={headingTextRef} className="whitespace-nowrap">
                  Full stack,
                </span>
              }
            />
            <HeroColorPanelsDescription
              className="mx-0 max-w-xl pb-0 text-left"
              description="I’m Rishebs. I build grounded AI, SaaS workflows, and the APIs that make complex products feel simple."
              descriptionClassName="font-sans text-sm leading-6 !text-[#4e4941] sm:text-base sm:leading-7"
            />
            <div className="flex items-center gap-3 mb-10 md:mb-10 lg:mb-0">
              <RaisedButton href="#projects" variant="default">
                See my works <MdDoubleArrow aria-hidden="true" size={14} />
              </RaisedButton>
              <RaisedButton href="mailto:rishebs123456@gmail.com" size="lg" iconOnly variant="default">
                <RiMailSendLine aria-hidden="true" size={18} />
              </RaisedButton>
            </div>
            <div className="lg:hidden">
              <DynamicTiles className="mx-auto aspect-[1.4/1] w-[min(260px,72vw)]" />
            </div>
          </HeroColorPanelsContent>
          <div ref={tilesAnchorRef} className="hidden self-stretch lg:block">
            <div style={{ transform: `translateY(${tilesOffset}px)` }}>
              <DynamicTiles className="mx-auto aspect-[1.4/1] w-[440px]" />
            </div>
          </div>
        </HeroColorPanelsContainer>
      </HeroColorPanelsRoot>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden h-40 bg-gradient-to-t from-[#f5f1e8] via-[#f5f1e8]/70 to-transparent md:block" />
    </section>
  );
}