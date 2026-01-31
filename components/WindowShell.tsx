type WindowShellProps = {
  title: string;
  children: React.ReactNode;
};

export function WindowShell({ title, children }: WindowShellProps) {
  return (
    <main className="min-h-dvh px-4 py-6">
      <section
        className={[
          "mx-auto max-w-5xl",
          "rounded-2xl",
          "bg-black/40 backdrop-blur",
          "border border-white/10",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_50px_rgba(0,0,0,0.6)]",
        ].join(" ")}
      >
        {/* Title bar */}
        <header className="flex items-center gap-3 border-b border-white/10 px-5 py-3">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/70" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
            <span className="h-3 w-3 rounded-full bg-green-500/70" />
          </div>

          <h1 className="ml-2 text-sm font-semibold tracking-wide text-white">
            {title}
          </h1>
        </header>

        {/* Window content */}
        <div className="p-5 text-white/90">
          {children}
        </div>
      </section>
    </main>
  );
}
