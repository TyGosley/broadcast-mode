"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/", label: "Home", short: "H" },
  { href: "/projects", label: "Projects", short: "P" },
  { href: "/contact", label: "Contact", short: "C" },
];

const ICON_COLOR: Record<string, string> = {
  "/": "#FFB800",
  "/projects": "#FF0080",
  "/contact": "#EAF0FF",
};

export function MobileMiniDock() {
  const pathname = usePathname();

  return (
    <nav aria-label="Mobile mini dock" className="fixed inset-x-0 bottom-4 z-[2147483647] flex justify-center px-4 lg:hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -top-12 h-16 w-[92vw] max-w-md -translate-x-1/2 rounded-full blur-lg"
        style={{
          background:
            "radial-gradient(62% 100% at 50% 100%, rgba(13,17,23,0.4) 0%, rgba(13,17,23,0.2) 52%, rgba(13,17,23,0) 100%)",
        }}
      />
      <div
        className="relative w-full max-w-md rounded-2xl border border-white/8 border-t-white/12 bg-gradient-to-b from-[#111216]/96 via-[#1A1B1F]/93 to-[#26272B]/88 p-2 shadow-[inset_0_10px_20px_rgba(0,0,0,0.8),0_-10px_30px_rgba(0,0,0,0.4),0_20px_60px_rgba(0,0,0,0.72)] backdrop-blur-xl"
      >
        <ul className="flex items-center justify-between gap-2">
          {ITEMS.map((it) => {
            const active = pathname === it.href;
            return (
              <li key={it.href} className="flex-1">
                <Link
                  href={it.href}
                  className={[
                    "group flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold tracking-wide transition",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F3FF]/70",
                    active
                      ? "bg-[#00F3FF]/15 text-white shadow-[0_0_18px_rgba(0,243,255,0.22)]"
                      : "text-white/80 hover:bg-white/8 hover:text-white",
                  ].join(" ")}
                  aria-current={active ? "page" : undefined}
                >
                  <span
                    className={[
                      "flex h-8 w-8 items-center justify-center rounded-lg transition",
                      active
                        ? "bg-[#00F3FF]/20 ring-1 ring-[#00F3FF]/45"
                        : "bg-white/10 group-hover:bg-white/15",
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
                  <span className="sr-only">{it.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
