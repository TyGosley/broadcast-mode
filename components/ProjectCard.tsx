"use client";

import type { Project } from "../lib/projects";

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (id: string) => void;
}) {
  // Keep click behavior
  function handleOpen() {
    onOpen(project.id);
  }

  // Allow Enter/Space on the card itself (extra safety)
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpen();
    }
  }

  const status =
    project.status === "live"
      ? "LIVE"
      : project.status === "in-progress"
      ? "IN PROGRESS"
      : "ARCHIVED";

  const statusClass =
    project.status === "live"
      ? "border-emerald-400/35 bg-emerald-400/15 text-emerald-200"
      : project.status === "in-progress"
      ? "border-cyan-400/35 bg-cyan-400/15 text-cyan-200"
      : "border-purple-400/35 bg-purple-400/15 text-purple-200";

  return (
    <button
      type="button"
      onClick={handleOpen}
      onKeyDown={onKeyDown}
      // ✅ for grid keyboard nav (page.tsx will use these)
      data-project-card
      data-project-id={project.id}
      className={[
        "group w-full text-left",
        "rounded-2xl border border-white/10 bg-black/35 p-5",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_60px_rgba(0,0,0,0.55)]",
        "transition",
        "hover:border-white/16 hover:bg-black/45",
        // ✅ focus style
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/70",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs tracking-[0.25em] text-white/55">
            {project.client ?? "INTERNAL"}
            {project.year ? ` • ${project.year}` : ""}
          </div>
          <div className="mt-2 truncate text-lg font-bold text-white">
            {project.title}
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-white/70">
            {project.summary}
          </p>
        </div>

        <span
          className={[
            "shrink-0 rounded-full border px-3 py-1 text-[10px] font-semibold tracking-[0.2em]",
            statusClass,
          ].join(" ")}
        >
          {status}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.type.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/75"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 text-xs text-white/55">
        Tip: Press <span className="text-white/80">Space</span> to Quick Look
      </div>
    </button>
  );
}
