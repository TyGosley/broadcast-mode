"use client";

import { useMemo } from "react";
import type { Project } from "../lib/projects";
import { usePrefersReducedMotion } from "../lib/a11y";

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

function shortCode(input?: string) {
  if (!input) return "INT";
  const letters = input
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => w[0]?.toUpperCase())
    .join("");
  return letters || input.slice(0, 3).toUpperCase();
}

function projectCode(p: Project) {
  const year = p.year?.replace(/\D/g, "") || "0000";
  const client = shortCode(p.client ?? "Internal");
  const id = p.id.replace(/[^a-zA-Z0-9]/g, "").slice(0, 6).toUpperCase();
  return `${client}-${year}-${id}`;
}

function CassetteVisual({
  project,
  allowMotion,
}: {
  project: Project;
  allowMotion: boolean;
}) {
  const code = projectCode(project);
  const side =
    project.status === "live"
      ? "SIDE A"
      : project.status === "in-progress"
      ? "SIDE B"
      : "ARCHIVE";
  const minutes =
    project.status === "live"
      ? "60 MIN"
      : project.status === "in-progress"
      ? "90 MIN"
      : "00 MIN";
  const tag = project.type?.[0]?.toUpperCase() ?? "PROJECT";

  return (
    <div
      className={[
        "relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/35 backdrop-blur",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_18px_60px_rgba(0,0,0,0.55)]",
        "transition-transform duration-200",
        // tap pulse (mobile) + hover lift (desktop)
        allowMotion ? "active:scale-[0.985] md:group-hover:-translate-y-0.5" : "",
      ].join(" ")}
    >
      {/* Outer glow */}
      <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-cyan-400/14 via-fuchsia-500/12 to-purple-500/14 blur-md opacity-65" />

      <div className="relative p-4">
        {/* Top lip + bevel */}
        <div className="rounded-xl border border-white/10 bg-gradient-to-b from-white/7 to-white/0 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          {/* Micro label header */}
          <div className="mb-2 flex items-center justify-between text-[10px] font-semibold tracking-[0.22em] text-white/60">
            <span>{side}</span>
            <span className="rounded-full border border-white/10 bg-black/25 px-2 py-0.5 text-[10px] text-white/65">
              {minutes}
            </span>
          </div>

          {/* Label window */}
          <div className="relative rounded-lg border border-white/10 bg-black/25 p-2 overflow-hidden">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/10 via-fuchsia-500/8 to-purple-500/10" />
            <div className="absolute inset-0 rounded-lg shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]" />

            {/* “Glint” sweep (subtle) */}
            <div
              className={[
                "pointer-events-none absolute -left-24 top-0 h-full w-20 rotate-12 bg-white/10 blur-[1px] opacity-0",
                allowMotion ? "md:group-hover:opacity-60 md:group-hover:translate-x-[520%] transition duration-700" : "",
              ].join(" ")}
            />

            <div className="relative flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="truncate text-[11px] font-semibold text-white/80">
                  {project.title}
                </div>
                <div className="truncate text-[10px] text-white/55">
                  {tag} • {code}
                </div>
              </div>

              <div className="shrink-0 rounded-md border border-white/10 bg-black/25 px-2 py-1 text-[10px] font-semibold text-white/70">
                PLAY ▷
              </div>
            </div>
          </div>

          {/* Mid screw channel */}
          <div className="mt-3 h-3 rounded-md border border-white/10 bg-black/20" />

          {/* Spool chamber */}
          <div className="mt-3 rounded-lg border border-white/10 bg-black/22 p-3">
            <div className="grid grid-cols-3 items-center gap-3">
              {/* Left spool */}
              <div className="relative mx-auto h-11 w-11 rounded-full border border-white/12 bg-black/35 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
                <div
                  className={[
                    "absolute inset-2 rounded-full border border-white/10 bg-black/25",
                    allowMotion ? "md:group-hover:animate-[spin_2.4s_linear_infinite]" : "",
                  ].join(" ")}
                />
                <div className="absolute inset-[18px] rounded-full bg-white/10" />
              </div>

              {/* Tape strip */}
              <div className="relative h-5 rounded-md border border-white/10 bg-black/30 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] overflow-hidden">
                <div
                  className={[
                    "absolute inset-0 rounded-md bg-gradient-to-r from-transparent via-white/12 to-transparent opacity-25",
                    allowMotion ? "md:group-hover:opacity-40 transition duration-300" : "",
                  ].join(" ")}
                />
              </div>

              {/* Right spool */}
              <div className="relative mx-auto h-11 w-11 rounded-full border border-white/12 bg-black/35 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
                <div
                  className={[
                    "absolute inset-2 rounded-full border border-white/10 bg-black/25",
                    allowMotion ? "md:group-hover:animate-[spin_2.4s_linear_infinite]" : "",
                  ].join(" ")}
                />
                <div className="absolute inset-[18px] rounded-full bg-white/10" />
              </div>
            </div>

            {/* Micro footer strip */}
            <div className="mt-3 flex items-center justify-between text-[10px] font-semibold tracking-[0.22em] text-white/55">
              <span>NO REWIND</span>
              <span className="rounded-full border border-white/10 bg-black/25 px-2 py-0.5 text-[10px] text-white/60">
                BAP TAPE
              </span>
            </div>
          </div>
        </div>

        {/* Bottom edge */}
        <div className="mt-3 h-3 rounded-lg border border-white/10 bg-black/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />
      </div>
    </div>
  );
}

function CdVisual({
  project,
  allowMotion,
}: {
  project: Project;
  allowMotion: boolean;
}) {
  const code = projectCode(project);
  const track =
    project.status === "live"
      ? "TRACK 01"
      : project.status === "in-progress"
      ? "TRACK 00"
      : "TRACK 99";
  const discId = shortCode(project.client ?? "Internal");
  const tag = project.type?.[0]?.toUpperCase() ?? "PROJECT";

  return (
    <div
      className={[
        "relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/35 backdrop-blur",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_18px_60px_rgba(0,0,0,0.55)]",
        "transition-transform duration-200",
        allowMotion ? "active:scale-[0.985] md:group-hover:-translate-y-0.5" : "",
      ].join(" ")}
    >
      {/* Outer glow */}
      <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-cyan-400/14 via-fuchsia-500/12 to-purple-500/14 blur-md opacity-65" />

      <div className="relative p-4">
        <div className="rounded-xl border border-white/10 bg-gradient-to-b from-white/7 to-white/0 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          {/* Micro header */}
          <div className="mb-2 flex items-center justify-between text-[10px] font-semibold tracking-[0.22em] text-white/60">
            <span>{track}</span>
            <span className="rounded-full border border-white/10 bg-black/25 px-2 py-0.5 text-[10px] text-white/65">
              DISC {discId}
            </span>
          </div>

          <div className="relative h-28 rounded-lg border border-white/10 bg-black/22 overflow-hidden">
            {/* subtle sheen */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-55" />

            {/* holo stripe */}
            <div className="absolute -left-10 top-0 h-full w-36 rotate-12 bg-gradient-to-b from-cyan-400/10 via-fuchsia-500/10 to-purple-500/10 opacity-55 blur-[1px]" />

            {/* Glint sweep */}
            <div
              className={[
                "pointer-events-none absolute -left-28 top-0 h-full w-24 rotate-12 bg-white/12 blur-[1px] opacity-0",
                allowMotion ? "md:group-hover:opacity-70 md:group-hover:translate-x-[520%] transition duration-700" : "",
              ].join(" ")}
            />

            {/* Disc */}
            <div className="absolute right-3 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full border border-white/12 bg-black/30 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
              <div className="absolute inset-3 rounded-full border border-white/10 bg-black/22" />
              <div className="absolute inset-[22px] rounded-full bg-white/10" />

              {/* Rotating “specular ring” */}
              <div
                className={[
                  "pointer-events-none absolute inset-1 rounded-full",
                  "bg-[conic-gradient(from_180deg,rgba(255,255,255,0.0),rgba(255,255,255,0.10),rgba(255,255,255,0.0))]",
                  "opacity-35",
                  allowMotion ? "md:group-hover:animate-[spin_2.2s_linear_infinite]" : "",
                ].join(" ")}
              />
            </div>

            {/* Title plate */}
            <div className="absolute left-3 right-28 top-3 rounded-md border border-white/10 bg-black/25 p-2">
              <div className="truncate text-[11px] font-semibold text-white/80">
                {project.title}
              </div>
              <div className="truncate text-[10px] text-white/55">
                {tag} • {code}
              </div>
            </div>

            <div className="absolute left-3 right-28 top-[76px] h-4 rounded-md border border-white/10 bg-black/18" />
          </div>

          {/* Bottom hinge strip */}
          <div className="mt-3 flex items-center justify-between">
            <div className="h-3 flex-1 rounded-lg border border-white/10 bg-black/22 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />
            <div className="ml-3 rounded-full border border-white/10 bg-black/25 px-2 py-0.5 text-[10px] font-semibold tracking-[0.22em] text-white/60">
              DIGITAL AUDIO
            </div>
          </div>

          {/* Tiny footer code */}
          <div className="mt-2 text-[10px] font-semibold tracking-[0.22em] text-white/45">
            ID {code}
          </div>
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
  const reducedMotion = usePrefersReducedMotion();

  // Allow motion only when user hasn't requested reduced motion
  const allowMotion = useMemo(() => !reducedMotion, [reducedMotion]);
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
          {project.format === "cassette" ? (
            <CassetteVisual project={project} allowMotion={allowMotion} />
          ) : (
            <CdVisual project={project} allowMotion={allowMotion} />
          )}
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

        <div className="mt-5 text-xs font-semibold text-white/60">Tap to open</div>
      </div>
    </button>
  );
}
