export default function TopicTabs({ topics, activeId, onChange }) {
  return (
    <nav
      className="-mx-1 flex gap-2 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Topic selector"
    >
      {topics.map((t) => {
        const active = t.id === activeId;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={[
              "flex-shrink-0 rounded-full px-3 py-1 text-sm transition",
              active
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200",
            ].join(" ")}
            style={active ? { backgroundColor: t.color } : undefined}
            aria-pressed={active}
          >
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}
