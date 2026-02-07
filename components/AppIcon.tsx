import Link from "next/link";
import type { AppDefinition } from "../lib/apps";

type AppIconProps = {
  app: AppDefinition;
};

export function AppIcon({ app }: AppIconProps) {
  const subtitleId = `${app.id}-subtitle`;

  return (
    <Link
      href={app.href}
      aria-label={app.label}
      aria-describedby={app.subtitle ? subtitleId : undefined}
      className={[
        "group block rounded-2xl",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70",
      ].join(" ")}
    >
      <div
        className={[
          "relative aspect-square w-full rounded-2xl",
          "bg-white/5 backdrop-blur",
          "border border-white/5",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_12px_30px_rgba(0,0,0,0.35)]",
          "transition-transform duration-200",
          "md:group-hover:-translate-y-1",
        ].join(" ")}
      >
        {/* Neon glow (accent, not focus) */}
        <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-cyan-400/15 via-fuchsia-500/10 to-purple-500/15 blur-md opacity-60" />

        {/* Icon body */}
        <div className="relative flex h-full items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
            <span className="text-xl font-bold tracking-wide text-white/85">
              {app.label.charAt(0)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 text-center">
        <div className="text-sm font-semibold tracking-wide text-white">
          {app.label}
        </div>

        {app.subtitle && (
          <div id={subtitleId} className="text-xs text-white/60">
            {app.subtitle}
          </div>
        )}
      </div>
    </Link>
  );
}
