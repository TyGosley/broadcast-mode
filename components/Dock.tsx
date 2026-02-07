"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/", label: "Home", short: "H" },
  { href: "/projects", label: "Projects", short: "P" },
  { href: "/studio", label: "Studio", short: "S" },
  { href: "/archive", label: "Archive", short: "A" },
  { href: "/contact", label: "Contact", short: "C" },
];

export function Dock() {
  const pathname = usePathname();

  return (
    <nav aria-label="Dock" className="fixed inset-x-0 bottom-4 z-[2147483647] hidden lg:flex justify-center px-4">
      <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-black/55 p-2 backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.7)]">
        <ul className="flex items-center justify-between gap-2">
          {ITEMS.map((it) => {
            const active = pathname === it.href;
            return (
              <li key={it.href} className="flex-1">
                <Link
                  href={it.href}
                  className={[
                    "group flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold tracking-wide transition",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60",
                    active ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                  aria-current={active ? "page" : undefined}
                >
                  <span
                    className={[
                      "flex h-8 w-8 items-center justify-center rounded-lg transition",
                      active ? "bg-white/15" : "bg-white/10 group-hover:bg-white/15",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    <span className="text-sm font-bold text-white/85">{it.short}</span>
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
