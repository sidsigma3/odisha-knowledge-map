export default function AppShell({ header, sidebar, map, detail }) {
  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-slate-200 bg-white px-3 py-2 sm:px-4 sm:py-3">
        <div className="flex items-center gap-3">
          <h1 className="hidden whitespace-nowrap text-base font-semibold sm:block sm:text-lg">
            Odisha Knowledge Map
          </h1>
          <h1 className="text-sm font-semibold sm:hidden">Odisha</h1>
          <div className="min-w-0 flex-1">{header}</div>
        </div>
      </header>

      <div className="grid flex-1 grid-cols-1 overflow-hidden md:grid-cols-[320px_1fr]">
        <aside className="hidden flex-col gap-3 overflow-y-auto border-r border-slate-200 bg-white p-3 md:flex">
          {sidebar}
        </aside>
        <main className="relative overflow-hidden">{map}</main>
      </div>

      {detail}
    </div>
  );
}
