import { useMemo } from "react";

function unique(values) {
  return Array.from(new Set(values.filter(Boolean))).sort();
}

export default function FilterPanel({ topic, filters, onChange }) {
  const districts = useMemo(
    () => unique(topic.locations.map((l) => l.district)),
    [topic]
  );

  if (!districts.length) return null;

  const selected = filters.district ?? [];
  const toggle = (d) => {
    const next = selected.includes(d) ? selected.filter((x) => x !== d) : [...selected, d];
    onChange({ ...filters, district: next });
  };

  return (
    <details className="rounded-md border border-slate-200 bg-white">
      <summary className="cursor-pointer px-3 py-2 text-sm font-medium">Filter by district</summary>
      <div className="flex flex-wrap gap-1 px-3 pb-3">
        {districts.map((d) => {
          const on = selected.includes(d);
          return (
            <button
              key={d}
              type="button"
              onClick={() => toggle(d)}
              className={[
                "rounded-full border px-2 py-0.5 text-xs",
                on
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100",
              ].join(" ")}
              aria-pressed={on}
            >
              {d}
            </button>
          );
        })}
      </div>
    </details>
  );
}