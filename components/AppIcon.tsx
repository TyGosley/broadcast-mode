import Link from "next/link";
import type { CSSProperties } from "react";
import type { AppDefinition } from "../lib/apps";

type AppIconProps = {
  app: AppDefinition;
};

const APP_NEON: Record<string, string> = {
  projects: "#FF0080",
  studio: "#00F3FF",
  archive: "#FFB800",
  contact: "#00F3FF",
};

const APP_NEON_RGB: Record<string, string> = {
  projects: "255,0,128",
  studio: "0,243,255",
  archive: "255,184,0",
  contact: "0,243,255",
};

const APP_CARD_VARIANT: Record<string, string> = {
  projects: "card-pink",
  studio: "card-cyan",
  archive: "card-amber",
  contact: "card-cyan",
};

export function AppIcon({ app }: AppIconProps) {
  const subtitleId = `${app.id}-subtitle`;
  const accent = APP_NEON[app.id] ?? "#00F3FF";
  const accentRgb = APP_NEON_RGB[app.id] ?? "0,243,255";
  const variant = APP_CARD_VARIANT[app.id] ?? "card-cyan";
  const cardVars: CSSProperties & { "--card-accent-rgb": string } = {
    "--card-accent-rgb": accentRgb,
  };

  return (
    <Link
      href={app.href}
      aria-label={app.label}
      aria-describedby={app.subtitle ? subtitleId : undefined}
      className={[
        "group block rounded-2xl",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F3FF]/75",
      ].join(" ")}
    >
      <div
        className={[
          "card-module relative aspect-square w-full rounded-2xl",
          variant,
          "bg-[#0D1117]/58 backdrop-blur-2xl",
          "border border-white/12",
        ].join(" ")}
        style={cardVars}
      >
        {/* Neon glow (accent, not focus) */}
        <div
          className="pointer-events-none absolute -inset-0.5 rounded-2xl blur-md opacity-75"
          style={{
            background: `radial-gradient(130% 90% at 50% 0%, ${accent}55 0%, transparent 70%)`,
          }}
        />

        {/* Icon body */}
        <div className="relative flex h-full items-center justify-center">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/20 bg-[#0D1117]/78"
            style={{ boxShadow: `4px 4px 0 ${accent}88` }}
          >
            <span className="bg-gradient-to-b from-[#F8FAFF] via-[#B0B8C8] to-[#EEF2FF] bg-clip-text text-xl font-black tracking-wide text-transparent drop-shadow-[0_1px_0_rgba(255,255,255,0.45)]">
              {app.label.charAt(0)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 text-center">
        <div className="font-display text-sm font-semibold tracking-wide text-white">
          {app.label}
        </div>

        {app.subtitle && (
          <div id={subtitleId} className="text-xs text-white/62">
            {app.subtitle}
          </div>
        )}
      </div>
    </Link>
  );
}
