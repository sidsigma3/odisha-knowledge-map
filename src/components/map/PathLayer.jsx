import { memo } from "react";
import { toSvgCoords } from "../../lib/coords.js";

// Quadratic bezier smoothing: passes through each waypoint via midpoint control
function buildSmoothPath(path) {
  const pts = path.map((pt) => toSvgCoords(pt));
  if (pts.length < 2) return "";
  let d = `M ${pts[0].cx},${pts[0].cy}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].cx + pts[i + 1].cx) / 2;
    const my = (pts[i].cy + pts[i + 1].cy) / 2;
    d += ` Q ${pts[i].cx},${pts[i].cy} ${mx},${my}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last.cx},${last.cy}`;
  return d;
}

function PathLayer({ locations, color, selectedId, hoveredId, onSelect, onHover }) {
  return (
    <g>
      {locations.map((loc) => {
        if (!Array.isArray(loc.path) || loc.path.length < 2) return null;
        const selected = loc.id === selectedId;
        const hovered = loc.id === hoveredId;
        const d = buildSmoothPath(loc.path);
        const strokeWidth = selected ? 6 : hovered ? 5 : 3;
        const opacity = selected ? 1 : hovered ? 0.95 : 0.75;

        return (
          <g
            key={loc.id}
            role="button"
            aria-label={`${loc.name} course`}
            tabIndex={0}
            onClick={() => onSelect(loc.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(loc.id);
              }
            }}
            onMouseEnter={() => onHover(loc.id)}
            onMouseLeave={() => onHover(null)}
            className="cursor-pointer focus:outline-none"
          >
            {/* invisible thick stroke to enlarge the hit target */}
            <path d={d} fill="none" stroke="transparent" strokeWidth={18} strokeLinecap="round" />
            <path
              d={d}
              fill="none"
              stroke={loc.color ?? color}
              strokeWidth={strokeWidth}
              strokeOpacity={opacity}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all"
            />
          </g>
        );
      })}
    </g>
  );
}

export default memo(PathLayer);
