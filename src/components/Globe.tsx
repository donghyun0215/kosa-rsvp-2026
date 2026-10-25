import type { CSSProperties } from "react";
import globeArt from "@/assets/globe-asia.webp";

// Hero art (Tammy's mock-up: night earth with routes). Asia at night is
// NASA Black Marble rendered as a globe on #08142E (three.js, 2880×1300);
// city points are that render's projected coordinates, so routes land on
// the real city lights. Seoul ⇄ Singapore is drawn as a two-way corridor
// (orange out of Korea, blue back from Singapore) so the art reads as a
// joint programme, not a one-way delegation (Tammy, 25 Oct); the other
// regional routes stay faint behind it.
const CITY: Record<string, [number, number]> = {
  seoul: [2148, 131], tokyo: [2404, 165], hongkong: [1875, 553], manila: [2067, 773],
  bangkok: [1497, 788], hcmc: [1664, 883], singapore: [1587, 1131],
};
const ROUTES = ["seoul", "tokyo", "hongkong", "manila", "hcmc", "bangkok"];
function arc(from: string, to: string) {
  const [x1, y1] = CITY[from], [x2, y2] = CITY[to];
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1;
  const bow = 0.22; // bulge to the right of the direction of travel
  return `M${x1} ${y1} Q${mx - dy * bow} ${my + dx * bow} ${x2} ${y2}`;
}
// `corridor`: centre narrow (phone) crops on the Seoul ⇄ Singapore arcs.
export function Globe({ align, focus }: { align: "xMaxYMid" | "xMidYMid"; focus?: "corridor" }) {
  return (
    <svg viewBox={focus === "corridor" ? "1130 0 1400 1300" : "0 0 2880 1300"} preserveAspectRatio={`${align} slice`} className="absolute inset-0 h-full w-full">
      <g className="globe-drift">
        <image href={globeArt} width="2880" height="1300" />
        {ROUTES.map((c, i) => (
          <path key={c} d={arc(c, "singapore")} pathLength={1} className={`route ${c === "seoul" ? "route-main" : ""}`} style={{ "--i": i } as CSSProperties} />
        ))}
        {ROUTES.map((c, i) => (
          <path key={`p-${c}`} d={arc(c, "singapore")} pathLength={1} className="route-pulse" style={{ "--i": i } as CSSProperties} />
        ))}
        {ROUTES.map((c, i) => (
          <circle key={`c-${c}`} cx={CITY[c][0]} cy={CITY[c][1]} r={c === "seoul" ? 11 : 8} className={`city ${c === "seoul" ? "city-hub" : ""}`} style={{ "--i": i } as CSSProperties} />
        ))}
        {/* the return leg: Singapore → Seoul, bowing the other way */}
        <path d={arc("singapore", "seoul")} pathLength={1} className="route route-return" style={{ "--i": 1 } as CSSProperties} />
        <path d={arc("singapore", "seoul")} pathLength={1} className="route-pulse" style={{ "--i": 3.5 } as CSSProperties} />
        <circle cx={CITY.singapore[0]} cy={CITY.singapore[1]} r="12" className="city-ring city-ring-sg" />
        <circle cx={CITY.singapore[0]} cy={CITY.singapore[1]} r="13" className="city city-hub city-sg" style={{ "--i": 6 } as CSSProperties} />
        <text x={CITY.seoul[0] + 34} y={CITY.seoul[1] + 14} className="city-label" style={{ "--i": 7 } as CSSProperties}>Seoul</text>
        <text x={CITY.singapore[0] + 38} y={CITY.singapore[1] + 16} className="city-label" style={{ "--i": 7 } as CSSProperties}>Singapore</text>
      </g>
    </svg>
  );
}

