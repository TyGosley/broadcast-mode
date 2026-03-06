"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";

const ITEMS = [
  { href: "/", label: "Home", short: "H" },
  { href: "/projects", label: "Projects", short: "P" },
  { href: "/studio", label: "Studio", short: "S" },
  { href: "/archive", label: "Archive", short: "A" },
  { href: "/contact", label: "Contact", short: "C" },
];

const ICON_COLOR: Record<string, string> = {
  "/": "#FFB800",
  "/projects": "#FF0080",
  "/studio": "#00F3FF",
  "/archive": "#FFB800",
  "/contact": "#EAF0FF",
};

const ICON_COLOR_RGB: Record<string, string> = {
  "/": "255,184,0",
  "/projects": "255,0,128",
  "/studio": "0,243,255",
  "/archive": "255,184,0",
  "/contact": "234,240,255",
};

const PANEL_SHELL_CLASS = [
  "ui-panel relative w-full rounded-2xl p-2",
  "border-white/8 border-t-white/12",
  "bg-gradient-to-b from-[#111216]/96 via-[#1A1B1F]/93 to-[#26272B]/88",
  "shadow-[inset_0_10px_20px_rgba(0,0,0,0.8),0_-10px_30px_rgba(0,0,0,0.4),0_20px_60px_rgba(0,0,0,0.72)] backdrop-blur-xl",
].join(" ");

const ITEM_BUTTON_BASE_CLASS = [
  "ui-btn-secondary group flex w-full items-center justify-center gap-2 rounded-xl",
  "min-h-0 border-transparent bg-transparent px-3 py-2 text-xs font-semibold tracking-wide",
  "transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F3FF]/70",
].join(" ");

const ITEM_ICON_BASE_CLASS = [
  "ui-panel-inset flex h-8 w-8 items-center justify-center rounded-lg",
  "min-h-0 px-0 py-0 transition",
].join(" ");

export function Dock() {
  const pathname = usePathname();

  return (
    <nav aria-label="Dock" className="fixed inset-x-0 bottom-4 z-[2147483647] hidden lg:flex justify-center px-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -top-16 h-20 w-[92vw] max-w-3xl -translate-x-1/2 rounded-full blur-xl"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, rgba(13,17,23,0.42) 0%, rgba(13,17,23,0.24) 48%, rgba(13,17,23,0) 100%)",
        }}
      />
      <div
        className={[PANEL_SHELL_CLASS, "max-w-3xl"].join(" ")}
      >
        <ul className="flex items-center justify-between gap-2">
          {ITEMS.map((it) => {
            const active = pathname === it.href;
            const accentRgb = ICON_COLOR_RGB[it.href] ?? "0,243,255";
            const dockVars: CSSProperties & { "--dock-accent-rgb": string } = {
              "--dock-accent-rgb": accentRgb,
            };
            return (
              <li key={it.href} className="flex-1">
                <Link
                  href={it.href}
                  style={dockVars}
                  className={[
                    ITEM_BUTTON_BASE_CLASS,
                    active
                      ? "bg-[rgba(var(--dock-accent-rgb),0.24)] text-white shadow-[0_0_24px_rgba(var(--dock-accent-rgb),0.42)]"
                      : "text-white/80 hover:bg-[rgba(var(--dock-accent-rgb),0.10)] hover:text-white hover:shadow-[0_0_16px_rgba(var(--dock-accent-rgb),0.30)]",
                  ].join(" ")}
                  aria-current={active ? "page" : undefined}
                >
                  <span
                    className={[
                      ITEM_ICON_BASE_CLASS,
                      active
                        ? "bg-[rgba(var(--dock-accent-rgb),0.30)] ring-1 ring-[rgba(var(--dock-accent-rgb),0.65)] shadow-[0_0_14px_rgba(var(--dock-accent-rgb),0.45)]"
                        : "bg-white/10 group-hover:bg-white/15 group-hover:ring-1 group-hover:ring-[rgba(var(--dock-accent-rgb),0.35)] group-hover:shadow-[0_0_12px_rgba(var(--dock-accent-rgb),0.30)]",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    <span
                      className="text-sm font-bold"
                      style={{
                        color: active ? "#00F3FF" : ICON_COLOR[it.href] ?? "#EAF0FF",
                        textShadow: active
                          ? "0 0 8px rgba(0,243,255,0.85), 0 0 16px rgba(0,243,255,0.45)"
                          : "0 0 8px rgba(255,184,0,0.35)",
                      }}
                    >
                      {it.short}
                    </span>
                  </span>
                  <span className="hidden lg:inline">{it.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
