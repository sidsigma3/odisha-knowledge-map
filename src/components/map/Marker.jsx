import { memo } from "react";
import { toSvgCoords } from "../../lib/coords.js";

function Marker({ location, color, selected, hovered, onSelect, onHover }) {
  const { cx, cy } = toSvgCoords(location.coordinates);
  const fill = location.color ?? color;
  const r = selected ? 14 : hovered ? 12 : 9;

  return (
    <g
      role="button"
      aria-label={location.name}
      tabIndex={0}
      onClick={() => onSelect(location.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(location.id);
        }
      }}
      onMouseEnter={() => onHover(location.id)}
      onMouseLeave={() => onHover(null)}
      className="cursor-pointer focus:outline-none"
    >
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        stroke="white"
        strokeWidth={selected ? 4 : 2}
        className="transition-all"
      />
    </g>
  );
}

export default memo(Marker);
