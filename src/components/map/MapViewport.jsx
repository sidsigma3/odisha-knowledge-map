import { MAP_VIEWBOX } from "../../lib/constants.js";
import MarkerLayer from "./MarkerLayer.jsx";
import PathLayer from "./PathLayer.jsx";
import mapSvgUrl from "../../assets/odisha-map.svg";

export default function MapViewport({
  topic,
  locations,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  overlay,
}) {
  return (
    <div className="relative h-full w-full bg-slate-100">
      <img
        src={mapSvgUrl}
        alt={`Odisha map showing ${topic.label}`}
        className="absolute inset-0 h-full w-full object-contain select-none"
        draggable={false}
      />
      <svg
        viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label={`${topic.label} overlay on Odisha map`}
      >
        <PathLayer
          locations={locations}
          color={topic.color}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={onSelect}
          onHover={onHover}
        />
        <MarkerLayer
          locations={locations}
          color={topic.color}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={onSelect}
          onHover={onHover}
        />
      </svg>
      {overlay}
    </div>
  );
}
