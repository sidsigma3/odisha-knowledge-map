# Odisha Knowledge Map

An interactive, responsive React app to explore Odisha across multiple topic layers — rivers, soils, districts, temples, wildlife, tourist places, and more — on a single SVG map.

> **Working with Claude?** Read [`CLAUDE.md`](./CLAUDE.md) first. Role definitions live in [`docs/ROLES.md`](./docs/ROLES.md).

---

## Quick start

```bash
cd "D:\sidx\personal pro\odisha-knowledge-map"
npm install
npm run dev
```

Open http://localhost:5173.

## Scripts

| Command           | What it does                              |
|-------------------|-------------------------------------------|
| `npm run dev`     | Start Vite dev server with HMR            |
| `npm run build`   | Build production bundle into `dist/`      |
| `npm run preview` | Preview the production build              |
| `npm run lint`    | Run ESLint                                |

## Adding a new topic

1. Drop the JSON file into `src/data/<topic>.json` (must match the `Topic` schema in `CLAUDE.md`).
2. Import and register it in `src/data/index.js` and add the id to `TOPIC_ORDER`.
3. Pick a color (already-defined topics live in `tailwind.config.js` → `theme.extend.colors.topic`).
4. That's it — the map, tabs, list, and detail panel all render the topic generically.

## Adding the Odisha SVG map

Place `odisha-map.svg` into `src/assets/`. The SVG should:

- Have a `viewBox` (e.g., `"0 0 1000 1100"`).
- Optionally include district paths with `id` attributes (e.g., `id="district-mayurbhanj"`) so `DistrictLayer` can make them clickable.

## Project structure

See `CLAUDE.md` § 3 for the canonical layout.

## License

Private project.