"use client";

import { useEffect } from "react";
import type { Project } from "../lib/projects";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);

    // lock scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label={`Project details: ${project.title}`}
    >
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close project details"
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
      />

      {/* Window */}
      <div className="absolute left-1/2 top-1/2 w-[min(920px,calc(100%-1.5rem))] -translate-x-1/2 -translate-y-1/2">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_26px_90px_rgba(0,0,0,0.75)] backdrop-blur">
          {/* Header bar */}
          <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-black/40 px-4 py-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-white">
                {project.title}
              </div>
              <div className="truncate text-xs text-white/55">
                {(project.client ?? "Internal") + (project.year ? ` • ${project.year}` : "")}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/85 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
            >
              Close
            </button>
          </div>

          {/* Content */}
          <div className="max-h-[72vh] overflow-y-auto p-5">
            <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
              {/* Left */}
              <div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs tracking-[0.25em] text-white/60">
                    CASE STUDY LITE
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">
                    {project.summary}
                  </p>

                  {project.highlights?.length ? (
                    <>
                      <div className="mt-4 text-sm font-semibold text-white">
                        Highlights
                      </div>
                      <ul className="mt-2 grid gap-2 text-sm text-white/75">
                        {project.highlights.map((h) => (
                          <li key={h} className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
                            {h}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}

                  {project.outcomes?.length ? (
                    <>
                      <div className="mt-4 text-sm font-semibold text-white">
                        Outcomes
                      </div>
                      <ul className="mt-2 grid gap-2 text-sm text-white/75">
                        {project.outcomes.map((o) => (
                          <li key={o} className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
                            {o}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </div>
              </div>

              {/* Right */}
              <aside className="grid gap-4">
                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="text-xs tracking-[0.25em] text-white/60">
                    DETAILS
                  </div>

                  <div className="mt-3 grid gap-3 text-sm text-white/80">
                    <div>
                      <div className="text-xs text-white/55">Status</div>
                      <div className="font-semibold">{project.status}</div>
                    </div>

                    {project.role ? (
                      <div>
                        <div className="text-xs text-white/55">Role</div>
                        <div className="font-semibold">{project.role}</div>
                      </div>
                    ) : null}

                    {project.stack?.length ? (
                      <div>
                        <div className="text-xs text-white/55">Stack</div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {project.stack.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    <div>
                      <div className="text-xs text-white/55">Tags</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.type.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-xs text-white/80"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    className="rounded-xl border border-white/10 bg-gradient-to-r from-cyan-400/25 via-fuchsia-500/20 to-purple-500/20 px-4 py-3 text-center text-sm font-semibold text-white hover:from-cyan-400/30 hover:via-fuchsia-500/25 hover:to-purple-500/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
                  >
                    Open Live Project
                  </a>
                ) : (
                  <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-xs text-white/60">
                    Live link: coming soon
                  </div>
                )}
              </aside>
            </div>
          </div>

          {/* Footer hint */}
          <div className="border-t border-white/10 bg-black/40 px-4 py-3 text-xs text-white/55">
            Tip: Press <span className="text-white/80">ESC</span> to close.
          </div>
        </div>
      </div>
    </div>
  );
}
