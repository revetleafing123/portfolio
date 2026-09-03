"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { FaCode } from "react-icons/fa6";
import { FaCloud } from "react-icons/fa";
import { HiSquare3Stack3D } from "react-icons/hi2";

type TileIcon = React.ComponentType<{ size?: number; style?: React.CSSProperties }>;

const publicAsset = (name: string) => `${import.meta.env.BASE_URL}${name}`;

type TileData = {
  id: string;
  label: string;
  Icon?: TileIcon;
  imgSrc?: string;
  rectImgSrc?: string;
  techSvgs?: string[];
  href: string;
  accent: string;
};

const tiles: TileData[] = [
  { id: "linkedin", label: "LinkedIn", imgSrc: publicAsset("linkedin.svg"), rectImgSrc: publicAsset("LinkedIn-Logo.wine.svg"), href: "https://www.linkedin.com/in/risheb-s-b46a40289", accent: "#0A66C2" },
  { id: "cloud", label: "Cloud", imgSrc: publicAsset("cloud-16.svg"), href: "#tech", accent: "#2563eb" },
  { id: "github", label: "GitHub", imgSrc: publicAsset("github_dark.svg"), rectImgSrc: publicAsset("GitHub_Lockup_Black_Clearspace.svg"), href: "https://github.com/rishebss", accent: "#24292e" },
  { id: "techs", label: "Techs", Icon: FaCode, href: "#tech", accent: "#c2410c", techSvgs: [publicAsset("ai-terminal.svg")] },
];

// Four slots arranged as a 2x2 bento block. TL (0) and BR (2) are wide
// rectangles; TR (1) and BL (3) are squares. Tiles circulate anti-clockwise
// (0 -> 3 -> 2 -> 1 -> 0) and morph between square and rectangle as they go.
const SLOTS: Record<number, { left: string; top: string; width: string; height: string }> = {
  0: { left: "0%", top: "0%", width: "62%", height: "47%" },
  1: { left: "67%", top: "0%", width: "33%", height: "47%" },
  2: { left: "38%", top: "53%", width: "62%", height: "47%" },
  3: { left: "0%", top: "53%", width: "33%", height: "47%" },
};

const isRectangleSlot = (slot: number) => slot === 0 || slot === 2;

// Neomorphic (soft UI) shadow pair, tuned for the #f5f1e8 page background.
// Light source assumed top-left: a warm-white highlight top-left, a soft
// warm-grey shadow bottom-right. Every tile shares this so the whole group
// reads as one molded surface rather than four separately-styled cards.
const NEO_BASE_BG = "#f5f1e8";
const NEO_SHADOW_DARK = "rgba(163, 150, 124, 0.45)";
const NEO_SHADOW_LIGHT = "rgba(255, 255, 255, 0.9)";
const neoShadow = (pressed = false) =>
  pressed
    ? `inset 3px 3px 6px ${NEO_SHADOW_DARK}, inset -3px -3px 6px ${NEO_SHADOW_LIGHT}`
    : `5px 5px 10px ${NEO_SHADOW_DARK}, -5px -5px 10px ${NEO_SHADOW_LIGHT}`;

export function DynamicTiles({ className }: { className?: string }) {
  const [tileSlots, setTileSlots] = useState<number[]>([0, 1, 2, 3]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTileSlots((prev) =>
        prev.map((slot) => {
          if (slot === 0) return 3;
          if (slot === 3) return 2;
          if (slot === 2) return 1;
          return 0;
        })
      );
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const slotMap = useMemo(() => {
    const map = new Map<number, number>();
    tileSlots.forEach((slot, tileIdx) => map.set(slot, tileIdx));
    return map;
  }, [tileSlots]);

  return (
    <div className={`relative w-full ${className ?? ""}`}>
      {[0, 1, 2, 3].map((slot) => {
        const tileIdx = slotMap.get(slot);
        if (tileIdx === undefined) return null;
        const tile = tiles[tileIdx];
        const rect = isRectangleSlot(slot);
        const pos = SLOTS[slot];

        return (
          <motion.a
            key={tile.id}
            href={tile.href}
            target="_blank"
            rel="noreferrer"
            className={`absolute flex items-center overflow-hidden rounded-[6px] md:rounded-[22px] lg:rounded-[15px] border-0 ${
              rect ? "justify-start gap-2 px-4" : "justify-center"
            }`}
            style={{ backgroundColor: NEO_BASE_BG, boxShadow: neoShadow() }}
            whileTap={{ boxShadow: neoShadow(true) }}
            animate={{
              left: pos.left,
              top: pos.top,
              width: pos.width,
              height: pos.height,
            }}
            transition={{ type: "spring", stiffness: 170, damping: 22 }}
            onClick={(event) => {
              if (tile.id !== "techs" && tile.id !== "cloud") return;
              event.preventDefault();
              window.dispatchEvent(new CustomEvent("portfolio:select-tech", {
                detail: { category: tile.id === "cloud" ? "Cloud" : "Frameworks" },
              }));
              document.getElementById("tech")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            {tile.techSvgs && !rect ? (
              <div className="grid h-24 w-24 place-items-center lg:h-40 lg:w-40">
                {tile.techSvgs.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className="h-20 w-20 object-contain lg:h-32 lg:w-32"
                    style={{ filter: "grayscale(1) brightness(0.85)" }}
                  />
                ))}
              </div>
            ) : rect && tile.rectImgSrc ? (
              <img src={tile.rectImgSrc} alt={tile.label} className="h-full w-full object-contain px-5" />
            ) : rect && tile.id === "cloud" ? (
              <div className="flex w-full items-center justify-center gap-2">
                <FaCloud className="h-10 w-10 sm:h-10 sm:w-10 lg:h-16 lg:w-16" style={{ color: tile.accent }} />
                <span className="built-titling uppercase text-4xl sm:text-4xl lg:text-7xl" style={{ color: tile.accent }}>Cloud</span>
              </div>
            ) : rect && tile.id === "techs" ? (
              <div className="flex w-full items-center justify-center gap-2">
                <HiSquare3Stack3D className="h-10 w-10 sm:h-10 sm:w-10 lg:h-16 lg:w-16 text-[#2e2e2e]" />
                <span className="built-titling uppercase text-4xl sm:text-4xl lg:text-7xl text-[#2e2e2e]">Stack</span>
              </div>
            ) : (
              <>
                <span className={`grid shrink-0 place-items-center ${rect ? "h-6 w-6" : "h-20 w-20 lg:h-28 lg:w-28"}`}>
                  {tile.imgSrc ? (
                    <img
                      src={tile.imgSrc}
                      alt={tile.label}
                      className={rect ? "h-6 w-6" : tile.id === "github" ? "h-20 w-20 lg:h-28 lg:w-28" : "h-16 w-16 lg:h-24 lg:w-24"}
                    />
                  ) : (
                    <div className={rect ? "w-[18px] h-[18px]" : "w-16 h-16 lg:w-24 lg:h-24"}>
                      {tile.Icon && <tile.Icon style={{ color: tile.accent, width: '100%', height: '100%' }} />}
                    </div>
                  )}
                </span>
                <motion.span
                  initial={false}
                  animate={{ maxWidth: rect ? 110 : 0, opacity: rect ? 1 : 0, marginLeft: rect ? 8 : 0 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="overflow-hidden whitespace-nowrap text-sm font-semibold text-[#2e2e2e]"
                >
                  {tile.label}
                </motion.span>
              </>
            )}
          </motion.a>
        );
      })}
    </div>
  );
}

export default DynamicTiles;