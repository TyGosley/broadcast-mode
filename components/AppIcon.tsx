import Link from "next/link";
import type { AppDefinition } from "@/lib/apps";

type AppIconProps = {
  app: AppDefinition;
};

export function AppIcon({ app }: AppIconProps) {
  return (
    <Link
      href={app.href}
      aria-label={app.label}
      className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/70"
    >
      <div
        className={[
          "relative aspect-square w-full rounded-2xl",
          "bg-white/5 backdrop-blur",
          "border border-white/10",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_12px_30px_rgba(0,0,0,0.35)]",
          "transition-transform duration-200",
          "md:group-hover:-translate-y-1",
        ].join(" ")}
      >
        {/* Neon glow */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-cyan-400/25 via-fuchsia-500/20 to-purple-500/25 blur-md opacity-70" />

        {/* Icon body */}
        <div className="relative flex h-full items-center justify-center">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-300/80 via-fuchsia-400/80 to-purple-400/80" />
        </div>
      </div>

      <div className="mt-2 text-center">
        <div className="text-sm font-semibold tracking-wide text-white">
          {app.label}
        </div>
        {app.subtitle && (
          <div className="text-xs text-white/60">{app.subtitle}</div>
        )}
      </div>
    </Link>
  );
}
