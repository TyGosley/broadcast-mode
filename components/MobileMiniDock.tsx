"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type DockItem = {
  id: "home" | "projects" | "contact";
  label: string;
  href: string;
  glyph: string; // keep it simple for now
};

const ITEMS: DockItem[] = [
  { id: "home", label: "Home", href: "/", glyph: "⌂" },
  { id: "projects", label: "Projects", href: "/projects", glyph: "P" },
  { id: "contact", label: "Contact", href: "/contact", glyph: "C" },
];

export function MobileMiniDock() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile Dock"
      className={[
        "fixed z-50 md:hidden",
        "left-1/2 -translate-x-1/2",
        "bottom-[calc(0.75rem+env(safe-area-inset-bottom))]",
        "w-[min(420px,calc(100%-1.5rem))]",
      ].join(" ")}
    >
      <div className="rounded-2xl border border-white/10 bg-black/60 p-2 backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.75)]">
        <ul className="flex items-center justify-between gap-2">
          {ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.id} className="flex-1">
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "group flex flex-col items-center justify-center rounded-xl px-3 py-2",
                    "text-[11px] font-semibold tracking-wide transition",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70",
                    isActive
                      ? "bg-white/12 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "mb-1 flex h-8 w-8 items-center justify-center rounded-lg transition",
                      isActive
                        ? "bg-white/18"
                        : "bg-white/10 group-hover:bg-white/15",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    <span className="text-sm font-bold text-white/90">
                      {item.glyph}
                    </span>
                  </span>

                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
