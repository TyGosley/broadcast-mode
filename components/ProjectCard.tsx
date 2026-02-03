"use client";

import { useRef } from "react";
import type { Project } from "../lib/projects";

function StatusPill({ status }: { status: Project["status"] }) {
  const cls =
    status === "active"
      ? "bg-cyan-400/15 text-cyan-200 border-cyan-300/20"
      : status === "shipped"
      ? "bg-emerald-400/15 text-emerald-200 border-emerald-300/20"
      : "bg-purple-400/15 text-purple-200 border-purple-300/20";

  return (
    <span className={["inline-flex items-center rounded-full border px-2.5 py-1 text-xs", cls].join(" ")}>
      {status}
    </span>
  );
}

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (id: string) => void;
}) {
  const isCassette = project.format === "cassette";

  const pressTimer = useRef<number | null>(null);
  const longPressed = useRef(false);

  const startLongPress = () => {
    longPressed.current = false;

    pressTimer.current = window.setTimeout(() => {
      longPressed.current = true;
      window.dispatchEvent(new CustomEvent("broadcast:burst", { detail: { strength: "high" } }));
      (navigator as any).vibrate?.(25);
    }, 600);
  };

  const cancelLongPress = () => {
    if (pressTimer.current) window.clearTimeout(pressTimer.current);
    pressTimer.current = null;
  };

  const onCardClick = () => {
    // If user just long-pressed, don’t also open the modal on release
    if (longPressed.current) return;
    onOpen(project.id);
  };

  return (
    <button
      type="button"
      onClick={onCardClick}
      className={[
        "group relative w-full text-left",
        "overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_18px_44px_rgba(0,0,0,0.45)]",
        "transition-transform duration-200 md:hover:-translate-y-1",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-cyan-400/10 via-fuchsia-500/8 to-purple-500/10 blur-md opacity-60" />

      <div className="relative p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-white">{project.title}</h3>
            <p className="mt-1 text-xs text-white/55">
              {project.client ? project.client : "Internal"}
              {project.year ? ` • ${project.year}` : ""}
            </p>
          </div>

          <StatusPill status={project.status} />
        </div>

        {/* cassette / cd face (long-press target) */}
        <div className="mt-4">
          <div
            onPointerDown={startLongPress}
            onPointerUp={cancelLongPress}
            onPointerCancel={cancelLongPress}
            onPointerLeave={cancelLongPress}
            className="rounded-xl"
          >
            {isCassette ? (
              <div
                className={[
                  "relative h-28 w-full overflow-hidden rounded-xl border border-white/12 bg-black/35",
                  "transition-transform duration-200 md:group-hover:scale-[1.015]",
                ].join(" ")}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30" />

                <div className="absolute left-3 right-3 top-3 h-8 rounded-lg border border-white/12 bg-white/5">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/10 via-fuchsia-500/10 to-purple-500/10" />
                  <div className="absolute left-2 top-1.5 h-1.5 w-12 rounded-full bg-white/10" />
                  <div className="absolute left-2 top-4 h-1.5 w-20 rounded-full bg-white/10" />
                </div>

                <div className="absolute left-4 top-[3.15rem] h-12 w-12 rounded-full border border-white/12 bg-black/45">
                  <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/8" />
                  <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30" />
                </div>

                <div className="absolute right-4 top-[3.15rem] h-12 w-12 rounded-full border border-white/12 bg-black/45">
                  <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/8" />
                  <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30" />
                </div>

                <div className="absolute left-1/2 top-[4.05rem] h-5 w-14 -translate-x-1/2 rounded-lg border border-white/10 bg-black/25" />

                <div className="absolute bottom-3 left-3 right-3 h-7 rounded-lg border border-white/12 bg-white/5">
                  <div className="absolute left-3 top-1/2 h-1 w-10 -translate-y-1/2 rounded-full bg-white/10" />
                  <div className="absolute right-3 top-1/2 h-1 w-16 -translate-y-1/2 rounded-full bg-white/10" />
                </div>

                <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_-16px_30px_rgba(0,0,0,0.35)]" />
              </div>
            ) : (
              <div
                className={[
                  "relative h-28 w-full overflow-hidden rounded-xl border border-white/12 bg-black/35",
                  "transition-transform duration-200 md:group-hover:scale-[1.015]",
                ].join(" ")}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/35" />

                <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/14 bg-white/5">
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.18),transparent_55%)]" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/12 via-fuchsia-500/10 to-purple-500/12 opacity-80" />
                  <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_120deg,transparent,rgba(255,255,255,0.08),transparent_60%)] opacity-40" />

                  <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/12 bg-black/35">
                    <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/60" />
                  </div>

                  <div className="absolute inset-0 rounded-full opacity-30 [background:repeating-radial-gradient(circle,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_1px,transparent_2px,transparent_6px)]" />
                </div>

                <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_-16px_30px_rgba(0,0,0,0.35)]" />
              </div>
            )}
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-white/70">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.type.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-black/35 px-2.5 py-1 text-xs text-white/75"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 text-xs text-white/55">
          Tap to open window
          <span className="hidden md:inline"> • Long-press media for a burst</span>
        </div>
      </div>
    </button>
  );
}
