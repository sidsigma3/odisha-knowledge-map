# CLAUDE.md — Project Guide for Claude

> **Read this first** when opening a new session in this repo. This file is the single source of truth for project goals, conventions, and current status. Update it as the project evolves.

---

## 1. What this project is

**Odisha Knowledge Map** — a responsive, interactive React web app that lets users explore Odisha across multiple topic layers on a single SVG map:

- rivers
- soils
- districts
- temples
- wildlife sanctuaries
- tourist places
- historical sites
- cultural locations
- (and any future topics, e.g. festivals, languages, crops)

The factual content (locations, descriptions, district mappings) is **provided by the user as JSON** and lives under `src/data/`. **Do not invent geography facts.** Do not generate placeholder data unless the user explicitly says "make demo data".

## 2. Tech stack (locked-in)

| Layer       | Choice                          | Notes                                              |
|-------------|---------------------------------|----------------------------------------------------|
| Framework   | React 18 + Vite 6               | Plain JS for now; TS optional later                |
| Styling     | Tailwind CSS 3                  | Topic colors under `theme.extend.colors.topic`     |
| Map         | Inline SVG with `viewBox`       | Canvas only if SVG perf becomes a real issue       |
| State       | React hooks only                | Custom hooks under `src/hooks/`. No Redux/Zustand. |
| Data        | Static JSON in `src/data/`      | One file per topic, combined via `data/index.js`   |
| Build/Lint  | Vite, ESLint                    | `npm run dev`, `npm run build`, `npm run lint`     |

**Do not introduce** Next.js, a state library, a CSS-in-JS lib, or a charting lib without explicit user approval.

## 3. Folder layout

```
src/
  App.jsx                       top-level component, owns state
  main.jsx                      Vite entry
  data/
    index.js                    aggregates topics + TOPIC_ORDER
    rivers.json, temples.json…  one file per topic
  assets/
    odisha-map.svg              base map (districts as <path id="…">)
  components/
    layout/    AppShell, Header
    topics/    TopicTabs, Legend
    controls/  SearchBar, FilterPanel
    map/       MapViewport, DistrictLayer, MarkerLayer, Marker, Tooltip
    sidebar/   LocationListSidebar, LocationListItem
    detail/    DetailDrawer, MobileBottomSheet, DetailRenderer
  hooks/
    useMapSelection, useFilteredLocations, useDebouncedValue, useMediaQuery
  lib/
    coords.js                   normalized ↔ SVG coord helpers
    constants.js
  styles/
    index.css                   Tailwind directives
docs/
  ARCHITECTURE.md               deeper design notes
  ROLES.md                      agent roles for systematic work
```

## 4. Data schema (authoritative)

Every topic must conform to this shape. New topics = new JSON file + entry in `data/index.js`.

```ts
interface Coordinates { x: number; y: number; } // 0–100, percent of viewBox

interface LocationItem {
  id: string;
  name: string;
  coordinates: Coordinates;       // anchor point for marker + tooltip + click
  path?: Coordinates[];           // optional polyline (e.g. river course). Rendered by PathLayer beneath markers.
  radius?: number;                // optional coverage-disk radius in viewBox units. Use for area features (e.g. soils).
  color?: string;                 // optional per-location override for the topic color (e.g. soil types).
  summary: string;
  details: Record<string, string | string[] | number>;
  category?: string;
  district?: string;
  districtCluster?: string;
  region?: string;
  image?: string;
  icon?: string;
}

interface Topic {
  id: string;          // "rivers"
  label: string;       // "Rivers"
  color: string;       // marker + legend
  icon?: string;
  locations: LocationItem[];
  detailFields?: Array<{ key: string; label: string; format?: "text"|"list"|"number" }>;
}
```

**Coordinate convention**: `{x, y}` are **percentages (0–100)** of the map viewBox. `MapViewport` multiplies by viewBox width/height at render time. This keeps JSON resolution-independent.

## 5. State model

Owned at `App.jsx`:

- `activeTopicId` — which topic tab is selected
- `selectedId` — currently opened location (drives DetailDrawer)
- `hoveredId` — for tooltip and list highlight
- `query` — search input (debounced in `useFilteredLocations`)
- `filters` — `{ district?: string[], category?: string[] }`

**Rules:**
- No duplicated state. `selectedLocation` is **derived** from `activeTopic.locations + selectedId`.
- `visibleLocations` is **derived** via `useFilteredLocations(topic, query, filters)`.
- Switching topics resets `selectedId` and `query`. Filters reset is up to UX (currently: also reset).

## 6. Conventions

- **Files**: PascalCase for components (`MapViewport.jsx`), camelCase for hooks (`useFilteredLocations.js`), kebab-case for data (`tourist-places.json` ok if needed, but prefer single-word `tourist.json`).
- **Components**: one component per file, default export.
- **Tailwind only.** No inline styles except dynamic SVG attributes (`cx`, `cy`, `fill` driven by topic color).
- **Memoize** `Marker` with `React.memo`; pass stable callbacks via `useCallback` in `App`.
- **Accessibility**: every interactive element is a `<button>` with `aria-label`. Markers get `role="button"` + `aria-label`.
- **No comments** explaining what code does. Only WHY-comments for non-obvious constraints.

## 7. Commands

```bash
npm install          # first-time setup
npm run dev          # localhost:5173
npm run build        # production bundle to dist/
npm run preview      # serve the production build
npm run lint
```

## 8. Working agreement with the user

- The user supplies the SVG map and JSON datasets. Don't fabricate facts.
- Ask before adding a new dependency.
- Prefer editing existing files over creating new ones.
- Keep components small. If a file exceeds ~200 lines, suggest splitting.
- Match the user's terse, action-oriented style. No filler.
- See `docs/ROLES.md` for the agent role system used to break work into systematic phases.

## 9. Current status

- [x] Project scaffolded (Vite + React + Tailwind configs in place)
- [x] Folder structure created
- [x] CLAUDE.md, ROLES.md, README.md written
- [x] Starter stubs (App.jsx, sample data, base components)
- [ ] `npm install` run by user
- [x] Odisha SVG wired into MapViewport — base map at `src/assets/odisha-map.svg` (stub; user pastes real SVG content over it)
- [x] `MAP_VIEWBOX` set to SVG's native viewBox (822.3 × 626.93)
- [x] Rivers topic JSON authored (12 rivers, 6 systems) calibrated to real district label positions — `src/data/rivers.json`
- [x] Soils topic JSON authored (8 soil groups) with per-location colors and coverage disks — `src/data/soils.json`
- [x] Minerals topic JSON authored (19 minerals across Metallic / Non-Metallic / Precious) — `src/data/minerals.json`
- [x] Industry & Power topic JSON authored (31 entries: plants, thermal, hydel, renewable, industrial regions) — `src/data/industry.json`
- [ ] Remaining topic JSON files (districts, temples, wildlife, tourism, historical, cultural)
- [ ] MapViewport + MarkerLayer wired to render real markers
- [ ] DetailDrawer + DetailRenderer (generic, schema-driven)
- [ ] SearchBar + FilterPanel logic
- [ ] Responsive: desktop sidebar + drawer / mobile bottom sheet
- [ ] District polygon clicks → filter by district

Update this list as items complete.

## 10. Where to ask for clarification

- New topic with unusual `details` shape → confirm `detailFields` ordering before coding.
- New interaction (e.g., compare two topics at once) → confirm UX before building.
- Performance concerns at scale → measure first, then propose.