export default function LocationListSidebar({ locations, selectedId, onSelect, onHover }) {
  if (!locations.length) {
    return <p className="px-1 text-sm text-slate-500">No matches.</p>;
  }
  return (
    <ul className="flex flex-col gap-1" role="listbox" aria-label="Locations">
      {locations.map((loc) => {
        const active = loc.id === selectedId;
        return (
          <li key={loc.id}>
            <button
              type="button"
              onClick={() => onSelect(loc.id)}
              onMouseEnter={() => onHover(loc.id)}
              onMouseLeave={() => onHover(null)}
              className={[
                "w-full rounded-md px-3 py-2 text-left text-sm transition",
                active ? "bg-slate-900 text-white" : "hover:bg-slate-100",
              ].join(" ")}
              aria-selected={active}
              role="option"
            >
              <div className="font-medium">{loc.name}</div>
              {loc.summary && (
                <div className={`mt-0.5 line-clamp-1 text-xs ${active ? "text-slate-200" : "text-slate-500"}`}>
                  {loc.summary}
                </div>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}