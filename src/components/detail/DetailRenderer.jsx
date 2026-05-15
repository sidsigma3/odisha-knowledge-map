function inferFields(details) {
  return Object.keys(details).map((key) => ({
    key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    format: Array.isArray(details[key]) ? "list" : "text",
  }));
}

export default function DetailRenderer({ topic, location }) {
  if (!location) return null;
  const fields = topic.detailFields ?? inferFields(location.details);

  return (
    <dl className="grid grid-cols-1 gap-3">
      {fields.map(({ key, label, format }) => {
        const value = location.details[key];
        if (value == null) return null;
        return (
          <div key={key}>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</dt>
            <dd className="mt-0.5 text-sm text-slate-800">
              {format === "list" && Array.isArray(value) ? value.join(", ") : String(value)}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}