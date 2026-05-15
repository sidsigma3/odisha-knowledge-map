export default function Legend({ topic }) {
  if (!topic) return null;
  return (
    <div className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-white/90 px-3 py-2 text-xs shadow">
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-3 w-3 rounded-full"
          style={{ backgroundColor: topic.color }}
        />
        <span className="font-medium">{topic.label}</span>
        <span className="text-slate-500">· {topic.locations.length} items</span>
      </div>
    </div>
  );
}