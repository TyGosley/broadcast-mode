"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APPS } from "../lib/apps";

export function Dock() {
  const pathname = usePathname();

  return (
    <nav aria-label="Dock" className="w-full">
      <div className="mx-auto w-full max-w-3xl rounded-2xl border border-white/10 bg-black/55 p-2 backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.7)]">
        <ul className="flex items-center justify-between gap-2">
          {APPS.map((app) => {
            const isActive =
              pathname === app.href || pathname.startsWith(`${app.href}/`);

            return (
              <li key={app.id} className="flex-1">
                <Link
                  href={app.href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "group flex items-center justify-center gap-2 rounded-xl px-3 py-2",
                    "text-xs font-semibold tracking-wide transition",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60",
                    isActive
                      ? "bg-white/12 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex h-8 w-8 items-center justify-center rounded-lg transition",
                      isActive
                        ? "bg-white/18"
                        : "bg-white/10 group-hover:bg-white/15",
                    ].join(" ")}
                  >
                    <span className="text-sm font-bold text-white/85">
                      {app.label.charAt(0)}
                    </span>
                  </span>

                  <span className="hidden lg:inline">{app.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
