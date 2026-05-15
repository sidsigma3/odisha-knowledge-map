import { memo } from "react";
import { toSvgCoords } from "../../lib/coords.js";
import Marker from "./Marker.jsx";

function AreaDisk({ location, color, selected, hovered }) {
  const { cx, cy } = toSvgCoords(location.coordinates);
  const fill = location.color ?? color;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={location.radius}
      fill={fill}
      fillOpacity={selected ? 0.45 : hovered ? 0.4 : 0.28}
      stroke={fill}
      strokeOpacity={selected ? 0.9 : 0.5}
      strokeWidth={selected ? 2 : 1}
      className="pointer-events-none transition-all"
    />
  );
}

function MarkerLayer({
  locations,
  color,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
}) {
  const areas = locations.filter((l) => l.radius);
  return (
    <g>
      <g>
        {areas.map((loc) => (
          <AreaDisk
            key={`area-${loc.id}`}
            location={loc}
            color={color}
            selected={loc.id === selectedId}
            hovered={loc.id === hoveredId}
          />
        ))}
      </g>
      {locations.map((loc) => (
        <Marker
          key={loc.id}
          location={loc}
          color={color}
          selected={loc.id === selectedId}
          hovered={loc.id === hoveredId}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </g>
  );
}

export default memo(MarkerLayer);
