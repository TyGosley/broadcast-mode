"use client";

import { useEffect, useMemo, useRef } from "react";
import type { Project } from "../lib/projects";

type Props = {
  project: Project;
  onClose: () => void;
};

function getFocusable(container: HTMLElement) {
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(",");

  return Array.from(container.querySelectorAll<HTMLElement>(selectors)).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
  );
}

export function ProjectModal({ project, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const titleId = useMemo(() => `project-${project.id}-title`, [project.id]);
  const descId = useMemo(() => `project-${project.id}-desc`, [project.id]);

  // Focus + scroll lock + restore
  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    // Focus first focusable element (or dialog)
    window.setTimeout(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusables = getFocusable(dialog);
      (focusables[0] ?? dialog).focus();
    }, 0);

    return () => {
      document.documentElement.style.overflow = prevOverflow;
      previouslyFocusedRef.current?.focus?.();
    };
  }, []);

  // Escape closes
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Focus trap
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusables = getFocusable(dialog);
      if (focusables.length === 0) {
        e.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (!active || active === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function onOverlayMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) onClose();
  }

  const statusLabel =
    project.status === "live"
      ? "Live"
      : project.status === "in-progress"
      ? "In Progress"
      : "Archived";

  return (
    <div
      ref={overlayRef}
      onMouseDown={onOverlayMouseDown}
      className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/55 p-3 backdrop-blur-sm md:items-center"
      aria-hidden="false"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        className="w-full max-w-3xl rounded-3xl border border-white/10 bg-black/55 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_70px_rgba(0,0,0,0.75)] outline-none"
      >
        {/* Top bar */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5">
          <div className="min-w-0">
            <p className="text-xs tracking-[0.25em] text-white/60">PROJECT</p>
            <h2
              id={titleId}
              className="mt-2 truncate text-xl font-bold text-white md:text-2xl"
            >
              {project.title}
            </h2>
            <p className="mt-1 text-sm text-white/65">
              {(project.client ?? "Internal") + (project.year ? ` • ${project.year}` : "")}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
              {statusLabel}
            </span>

            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/85 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
              aria-label="Close project window"
            >
              Close
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid gap-5 p-5 md:grid-cols-[1fr_0.9fr]">
          {/* Left column */}
          <div className="grid gap-4">
            <p id={descId} className="text-sm text-white/75">
              {project.summary}
            </p>

            {project.type?.length ? (
              <div className="flex flex-wrap gap-2">
                {project.type.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/75"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}

            {project.context ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs tracking-[0.25em] text-white/60">CONTEXT</p>
                <p className="mt-2 text-sm text-white/75">{project.context}</p>
              </div>
            ) : null}

            {project.outcomes?.length ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs tracking-[0.25em] text-white/60">OUTCOMES</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/75">
                  {project.outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {/* Right column */}
          <div className="grid gap-4">
            {/* Preview block (uses your previewHref if you have it) */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/35">
              <div className="p-3">
                <p className="text-xs tracking-[0.25em] text-white/60">PREVIEW</p>
              </div>

              {/* If you have previewHref in your Project model, it will show.
                  Otherwise it falls back to static/noise block. */}
              {"previewHref" in project && (project as any).previewHref ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={(project as any).previewHref}
                  alt={`${project.title} preview`}
                  className="h-44 w-full object-cover opacity-90"
                  loading="lazy"
                />
              ) : (
                <div className="relative h-44 w-full bg-black/50">
                  <div className="absolute inset-0 broadcast-noise opacity-70" />
                  <div className="absolute inset-0 [background:linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:100%_4px] opacity-30" />
                  <div className="absolute inset-0 [background:radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.18),transparent_55%)]" />
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold tracking-[0.2em] text-white/70">
                    SIGNAL PREVIEW
                  </div>
                </div>
              )}
            </div>

            {project.stack?.length ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs tracking-[0.25em] text-white/60">STACK</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-semibold text-white/75"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-gradient-to-r from-cyan-400/25 via-fuchsia-500/20 to-purple-500/20 px-5 py-3 text-sm font-semibold text-white transition hover:from-cyan-400/30 hover:via-fuchsia-500/25 hover:to-purple-500/25"
                >
                  Open Live Project
                </a>
              ) : (
                <span className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/70">
                  Launching soon
                </span>
              )}

              <button
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
              >
                Close window
              </button>
            </div>

            {/* Behind the build */}
            {project.behindTheBuild?.body ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs tracking-[0.25em] text-white/60">
                  {project.behindTheBuild.title ?? "BEHIND THE BUILD"}
                </p>
                <p className="mt-2 text-sm text-white/75">
                  {project.behindTheBuild.body}
                </p>
                {project.behindTheBuild.notes?.length ? (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-white/70">
                    {project.behindTheBuild.notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}