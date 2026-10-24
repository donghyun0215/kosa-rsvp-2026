import type { CSSProperties } from "react";
import globeArt from "@/assets/globe-asia.webp";

// Hero art (Tammy's mock-up: night earth with routes). Asia at night is
// NASA Black Marble rendered as a globe on #08142E (three.js, 2880×1300);
// city points are that render's projected coordinates, so routes land on
// the real city lights. Every route ends in Singapore; Seoul's is orange.
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
export function Globe({ align }: { align: "xMaxYMid" | "xMidYMid" }) {
  return (
    <svg viewBox="0 0 2880 1300" preserveAspectRatio={`${align} slice`} className="absolute inset-0 h-full w-full">
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
        <circle cx={CITY.singapore[0]} cy={CITY.singapore[1]} r="12" className="city-ring" />
        <circle cx={CITY.singapore[0]} cy={CITY.singapore[1]} r="13" className="city city-hub" style={{ "--i": 6 } as CSSProperties} />
      </g>
    </svg>
  );
}

