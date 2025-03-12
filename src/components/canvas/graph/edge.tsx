import { getIconColor } from "@/types/data";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface EdgeProps {
  treeNodeMap: Map<string, any>;
  link: Link;
  i: number;
}

interface Link {
  source: string;
  target: string;
  value: number;
}

const NODE_WIDTH = 360;
const NODE_HEIGHT = 160;

export function Edge(props: EdgeProps) {
  const { treeNodeMap, link, i } = props;

  const s = treeNodeMap.get(link.source);
  const t = treeNodeMap.get(link.target);
  if (!s || !t) {
    console.log(link.value + " is missing s or t");
    return null;
  }

  const sx = s.screenX;
  const sy = s.screenY;

  const tx = t.screenX;
  const ty = t.screenY;

  const sourceX = sx;
  const sourceY = sy + NODE_HEIGHT / 2;

  const targetX = tx + NODE_WIDTH;
  const targetY = ty + NODE_HEIGHT / 2;

  const curveOffset = Math.min(150, Math.abs(sourceX - targetX) * 0.5);

  return (
    <g key={i} className="overflow-visible">
      <path
        d={`
          M ${sourceX},${sourceY}
          C ${sourceX - curveOffset},${sourceY} 
            ${targetX + curveOffset},${targetY} 
            ${targetX - 40},${targetY}
        `}
        stroke={`rgba(from ${getIconColor(s.data.item.id)} r g b)`}
        fillOpacity={0}
        strokeOpacity={0.1}
        strokeWidth="40"
        style={{ pointerEvents: "none" }}
      />
    </g>
  );
}
