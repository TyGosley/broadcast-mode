"use client";

import type { Project } from "../lib/projects";
import { ProjectMediaThumb, type ProjectThumbVariant } from "./ProjectMediaThumb";

export function ProjectCard({
  project,
  onOpen,
  thumbVariant = "clean",
}: {
  project: Project;
  onOpen: (id: string) => void;
  thumbVariant?: ProjectThumbVariant;
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
      ? "border-[#FF0080]/70 bg-[#FF0080]/30 text-[#FFD8EA]"
      : project.status === "in-progress"
      ? "border-[#00F3FF]/70 bg-[#00F3FF]/30 text-[#DEE6FF]"
      : "border-[#5F368C]/80 bg-[#5F368C]/50 text-[#E9CCFF]";

  return (
    <button
      type="button"
      onClick={handleOpen}
      onKeyDown={onKeyDown}
      // ✅ for grid keyboard nav (page.tsx will use these)
      data-project-card
      data-project-id={project.id}
      className={[
        "group flex h-full w-full flex-col text-center",
        "ui-panel rounded-2xl p-5",
        "transition",
        "hover:border-white/16",
        // ✅ focus style
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0080]/70",
      ].join(" ")}
    >
      <ProjectMediaThumb project={project} variant={thumbVariant} />

      <div className="mt-4 flex flex-1 flex-col justify-start">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xs tracking-[0.25em] text-white/55">
              {project.client ?? "INTERNAL"}
              {project.year ? ` • ${project.year}` : ""}
            </div>
            <div className="font-display mt-2 truncate text-lg font-bold text-white">
              {project.title}
            </div>
            <p className="mt-2 min-h-[2.75rem] line-clamp-2 text-sm text-white/70">
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

        <div className="mt-4 grid grid-cols-2 justify-center gap-2">
          {project.type.slice(0, 3).map((t, i) => (
            <span
              key={t}
              className={[
                "ui-pill px-2.5 text-xs",
                i === 2 ? "col-span-2 justify-self-center" : "",
              ].join(" ")}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 text-xs text-white/55">
          Tip: Press <span className="text-white/80">Space</span> to Quick Look
        </div>
      </div>
    </button>
  );
}
