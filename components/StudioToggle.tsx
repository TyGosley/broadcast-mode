"use client";

export function StudioToggle({
  label,
  description,
  enabled,
  onChange,
}: {
  label: string;
  description?: string;
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      aria-pressed={enabled}
      className="relative w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-center transition hover:bg-black/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F3FF]/70"
    >
      <div className="mx-auto max-w-[calc(100%-4rem)] text-center">
        <div className="text-sm font-semibold text-white">{label}</div>
        {description && (
          <div className="mt-0.5 text-xs text-white/60">{description}</div>
        )}
      </div>

      <div
        className={[
          "pointer-events-none absolute right-4 top-1/2 h-6 w-11 -translate-y-1/2 rounded-full border transition-all",
          enabled
            ? "border-[#00F3FF]/55 bg-gradient-to-r from-[#00F3FF]/55 to-[#65FAFF]/45 shadow-[0_0_10px_rgba(0,243,255,0.35)]"
            : "border-white/16 bg-black/45",
        ].join(" ")}
      >
        <span
          className={[
            "absolute left-0.5 top-0.5 h-5 w-5 rounded-full border border-white/20 bg-[#0D1117] shadow-[0_1px_1px_rgba(255,255,255,0.2),0_1px_6px_rgba(0,0,0,0.5)] transition-transform",
            enabled ? "translate-x-5" : "translate-x-0",
          ].join(" ")}
        />
      </div>
    </button>
  );
}
