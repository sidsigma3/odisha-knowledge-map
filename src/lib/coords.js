import { MAP_VIEWBOX } from "./constants.js";

export function toSvgCoords({ x, y }) {
  return {
    cx: (x / 100) * MAP_VIEWBOX.width,
    cy: (y / 100) * MAP_VIEWBOX.height,
  };
}