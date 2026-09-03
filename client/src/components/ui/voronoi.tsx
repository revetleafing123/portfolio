import { useMemo, useState } from "react";
import { Group } from "@visx/group";
import { Polygon, voronoi } from "@visx/delaunay";
import { getSeededRandom } from "@visx/mock-data";

type Datum = {
  x: number;
  y: number;
  id: string;
  colorIndex: number;
};

const CRACK_FILL_PALETTE = ["#d7ba8d", "#c7a577", "#ead7b2", "#b89468", "#f0e2be", "#9a7754"];
const CRACK_STROKE_COLOR = "rgba(72, 58, 43, 0.6)";

const seededRandom = getSeededRandom(0.88);

const data: Datum[] = new Array(150).fill(null).map(() => ({
  x: seededRandom(),
  y: seededRandom(),
  id: Math.random().toString(36).slice(2),
  colorIndex: Math.floor(seededRandom() * CRACK_FILL_PALETTE.length),
}));

const defaultMargin = { top: 0, left: 0, right: 0, bottom: 0 };

export type VoronoiDiagramProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  crackWidth?: number;
};

export const VoronoiDiagram = ({
  width,
  height,
  margin = defaultMargin,
  crackWidth = 1.5,
}: VoronoiDiagramProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const voronoiDiagram = useMemo(
    () =>
      voronoi<Datum>({
        data,
        x: (d) => d.x * innerWidth,
        y: (d) => d.y * innerHeight,
        width: innerWidth,
        height: innerHeight,
      }),
    [innerWidth, innerHeight],
  );

  return width < 10 || height < 10 ? null : (
    <svg
      height={height}
      width={width}
      style={{
        display: "block",
        opacity: 0.95,
        filter: "saturate(0.9) contrast(1.12)",
        pointerEvents: "auto",
      }}
    >
      <Group left={margin.left} top={margin.top}>
        {data.map((d, i) => (
          <Polygon
            fill={hoveredId === d.id ? "#e8956c" : CRACK_FILL_PALETTE[d.colorIndex]}
            key={`polygon-${d.id}`}
            polygon={voronoiDiagram.cellPolygon(i)}
            stroke={CRACK_STROKE_COLOR}
            strokeWidth={crackWidth}
            onMouseEnter={() => setHoveredId(d.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{ cursor: "pointer", transition: "fill 0.2s ease" }}
          />
        ))}
      </Group>
    </svg>
  );
};
