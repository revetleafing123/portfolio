import { useEffect, useState } from "react";
import { VoronoiDiagram } from "@/components/ui/voronoi";

export function CrackedEarthBackground({
  className,
  opacity = 0.55,
}: {
  className?: string;
  opacity?: number;
}) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (size.width === 0 || size.height === 0) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 ${className ?? ""}`}
      style={{
        opacity,
        background:
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.45), transparent 30%), linear-gradient(135deg, rgba(228,214,188,0.7), rgba(195,168,130,0.4))",
      }}
    >
      <VoronoiDiagram height={size.height} width={size.width} />
    </div>
  );
}
