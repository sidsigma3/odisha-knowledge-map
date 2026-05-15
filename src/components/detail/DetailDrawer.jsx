import { useEffect, useState } from "react";
import DetailRenderer from "./DetailRenderer.jsx";

export default function DetailDrawer({ topic, location, isMobile, onClose }) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [location?.id]);

  if (!location) return null;

  const accent = location.color ?? topic.color;

  const Header = (
    <div className="flex items-start gap-3">
      <span
        className="mt-1.5 inline-block h-3 w-3 flex-shrink-0 rounded-full"
        style={{ backgroundColor: accent }}
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <div
          className="text-[10px] font-semibold uppercase tracking-wide"
          style={{ color: topic.color }}
        >
          {topic.label}
        </div>
        <h2 className="text-sm font-semibold leading-tight sm:text-base">
          {location.name}
        </h2>
      </div>
      <div className="flex flex-shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? "Collapse details" : "Show full details"}
          className="rounded-md px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100"
        >
          {expanded ? "Less ▴" : "More ▾"}
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
        >
          ✕
        </button>
      </div>
    </div>
  );

  if (!expanded) {
    const compactClass = isMobile
      ? "fixed inset-x-3 bottom-3 z-20 rounded-xl border border-slate-200 bg-white shadow-lg"
      : "fixed bottom-4 right-4 z-20 w-[340px] rounded-xl border border-slate-200 bg-white shadow-lg";

    return (
      <aside
        className={compactClass}
        role="dialog"
        aria-label={`Summary for ${location.name}`}
      >
        <div className="px-3 py-2.5">
          {Header}
          {location.summary && (
            <p className="ml-6 mt-2 line-clamp-3 text-xs text-slate-600 sm:text-sm">
              {location.summary}
            </p>
          )}
        </div>
      </aside>
    );
  }

  const expandedClass = isMobile
    ? "fixed inset-x-0 bottom-0 z-20 flex max-h-[65vh] flex-col rounded-t-2xl border-t border-slate-200 bg-white shadow-xl"
    : "fixed right-0 top-0 z-20 flex h-full w-[380px] flex-col border-l border-slate-200 bg-white shadow-xl";

  return (
    <aside
      className={expandedClass}
      role="dialog"
      aria-label={`Details for ${location.name}`}
    >
      {isMobile && (
        <div className="flex justify-center pt-2" aria-hidden="true">
          <span className="h-1 w-10 rounded-full bg-slate-300" />
        </div>
      )}
      <div className="border-b border-slate-200 px-4 py-3">{Header}</div>
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {location.summary && (
          <p className="mb-4 text-sm text-slate-700">{location.summary}</p>
        )}
        <DetailRenderer topic={topic} location={location} />
      </div>
    </aside>
  );
}
