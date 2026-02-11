"use client";

import type { Project } from "../lib/projects";

function statusLabel(status: Project["status"]) {
  if (status === "live") return "Live";
  if (status === "in-progress") return "In Progress";
  return "Archived";
}

function statusPillClass(status: Project["status"]) {
  if (status === "live")
    return "border-emerald-300/20 bg-emerald-400/10 text-emerald-100";
  if (status === "in-progress")
    return "border-cyan-300/20 bg-cyan-400/10 text-cyan-100";
  return "border-purple-300/20 bg-purple-400/10 text-purple-100";
}

function CassetteVisual() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/35 backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_18px_60px_rgba(0,0,0,0.55)]">
      {/* Outer glow */}
      <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-cyan-400/14 via-fuchsia-500/12 to-purple-500/14 blur-md opacity-65" />

      <div className="relative p-4">
        {/* Top lip + bevel */}
        <div className="rounded-xl border border-white/10 bg-gradient-to-b from-white/7 to-white/0 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          {/* Label window */}
          <div className="relative h-10 rounded-lg border border-white/10 bg-black/25">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/10 via-fuchsia-500/8 to-purple-500/10" />
            <div className="absolute inset-0 rounded-lg shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]" />
          </div>

          {/* Mid screw channel */}
          <div className="mt-3 h-3 rounded-md border border-white/10 bg-black/20" />

          {/* Spool chamber */}
          <div className="mt-3 rounded-lg border border-white/10 bg-black/22 p-3">
            <div className="grid grid-cols-3 items-center gap-3">
              {/* Left spool */}
              <div className="relative mx-auto h-11 w-11 rounded-full border border-white/12 bg-black/35 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
                <div className="absolute inset-3 rounded-full border border-white/10 bg-black/25" />
                <div className="absolute inset-[18px] rounded-full bg-white/10" />
              </div>

              {/* Tape strip */}
              <div className="h-5 rounded-md border border-white/10 bg-black/30 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]" />

              {/* Right spool */}
              <div className="relative mx-auto h-11 w-11 rounded-full border border-white/12 bg-black/35 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
                <div className="absolute inset-3 rounded-full border border-white/10 bg-black/25" />
                <div className="absolute inset-[18px] rounded-full bg-white/10" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom edge */}
        <div className="mt-3 h-3 rounded-lg border border-white/10 bg-black/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />
      </div>
    </div>
  );
}

function CdVisual() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/35 backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_18px_60px_rgba(0,0,0,0.55)]">
      {/* Outer glow */}
      <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-cyan-400/14 via-fuchsia-500/12 to-purple-500/14 blur-md opacity-65" />

      {/* Jewel case bevel */}
      <div className="relative p-4">
        <div className="rounded-xl border border-white/10 bg-gradient-to-b from-white/7 to-white/0 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <div className="relative h-28 rounded-lg border border-white/10 bg-black/22 overflow-hidden">
            {/* subtle sheen */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-60" />

            {/* Disc */}
            <div className="absolute right-3 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full border border-white/12 bg-black/30 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
              {/* rings */}
              <div className="absolute inset-3 rounded-full border border-white/10 bg-black/22" />
              <div className="absolute inset-[22px] rounded-full bg-white/10" />
              {/* light prism */}
              <div className="pointer-events-none absolute -inset-2 rounded-full bg-gradient-to-br from-cyan-400/10 via-fuchsia-500/10 to-purple-500/10 blur-md opacity-70" />
            </div>

            {/* Title plate area */}
            <div className="absolute left-3 right-28 top-3 h-8 rounded-md border border-white/10 bg-black/25" />
            <div className="absolute left-3 right-28 top-[52px] h-4 rounded-md border border-white/10 bg-black/18" />
          </div>

          {/* Bottom hinge strip */}
          <div className="mt-3 h-3 rounded-lg border border-white/10 bg-black/22 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />
        </div>
      </div>
    </div>
  );
}

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (id: string) => void;
}) {
  const badge = statusLabel(project.status);

  return (
    <button
      type="button"
      onClick={() => onOpen(project.id)}
      className={[
        "group w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30 text-left backdrop-blur",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_18px_60px_rgba(0,0,0,0.55)]",
        "transition hover:-translate-y-0.5 hover:bg-black/40",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60",
      ].join(" ")}
      aria-label={`Open project: ${project.title}`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xs tracking-[0.25em] text-white/60">PROJECT</div>
            <h3 className="mt-2 truncate text-lg font-bold text-white">
              {project.title}
            </h3>
            <p className="mt-1 truncate text-xs text-white/65">
              {(project.client ?? "Internal") +
                (project.year ? ` • ${project.year}` : "")}
            </p>
          </div>

          <span
            className={[
              "shrink-0 rounded-full border px-3 py-1 text-xs font-semibold",
              statusPillClass(project.status),
            ].join(" ")}
          >
            {badge}
          </span>
        </div>

        <div className="mt-4">
          {project.format === "cassette" ? <CassetteVisual /> : <CdVisual />}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-white/75">
          {project.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.type.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-xs text-white/80"
            >
              {t}
            </span>
          ))}
          {project.type.length > 3 ? (
            <span className="rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-xs text-white/70">
              +{project.type.length - 3}
            </span>
          ) : null}
        </div>

        <div className="mt-5 text-xs font-semibold text-white/60">
          Tap to open
        </div>
      </div>
    </button>
  );
}
