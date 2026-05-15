import { memo } from "react";
import { toSvgCoords } from "../../lib/coords.js";

function buildPoints(path) {
  return path
    .map((pt) => {
      const { cx, cy } = toSvgCoords(pt);
      return `${cx},${cy}`;
    })
    .join(" ");
}

function PathLayer({ locations, color, selectedId, hoveredId, onSelect, onHover }) {
  return (
    <g>
      {locations.map((loc) => {
        if (!Array.isArray(loc.path) || loc.path.length < 2) return null;
        const selected = loc.id === selectedId;
        const hovered = loc.id === hoveredId;
        const points = buildPoints(loc.path);
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
            <polyline
              points={points}
              fill="none"
              stroke="transparent"
              strokeWidth={18}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points={points}
              fill="none"
              stroke={color}
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
