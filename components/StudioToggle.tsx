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
      className="flex w-full items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-left transition hover:bg-black/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
    >
      <div>
        <div className="text-sm font-semibold text-white">{label}</div>
        {description && (
          <div className="text-xs text-white/60">{description}</div>
        )}
      </div>

      <div
        className={[
          "relative h-6 w-11 rounded-full transition",
          enabled ? "bg-cyan-400/60" : "bg-white/20",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-0.5 h-5 w-5 rounded-full bg-black transition-transform",
            enabled ? "translate-x-5" : "translate-x-0.5",
          ].join(" ")}
        />
      </div>
    </button>
  );
}
