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
  const statusClass =
    project.status === "live"
      ? "border-[#FF0080]/70 bg-[#FF0080]/30 text-[#FFD8EA]"
      : project.status === "in-progress"
      ? "border-[#00F3FF]/70 bg-[#00F3FF]/30 text-[#DEE6FF]"
      : "border-[#5F368C]/80 bg-[#5F368C]/50 text-[#E9CCFF]";
  const previewSrc = project.previewHref || "/static/no-signal.png";

  return (
    <div
      ref={overlayRef}
      onMouseDown={onOverlayMouseDown}
      className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/55 p-3 pb-24 backdrop-blur-sm md:items-center lg:pb-28"
      aria-hidden="false"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        className="ui-panel-strong flex max-h-[calc(100dvh-7.5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-3xl outline-none lg:max-h-[calc(100dvh-9rem)]"
      >
        {/* Top bar */}
        <div className="shrink-0 flex items-start justify-between gap-4 border-b border-white/10 p-5">
          <div className="min-w-0">
            <p className="ui-eyebrow">PROJECT</p>
            <h2
              id={titleId}
              className="font-display mt-2 truncate text-xl font-bold text-white md:text-2xl"
            >
              {project.title}
            </h2>
            <p className="mt-1 text-sm text-white/65">
              {(project.client ?? "Internal") + (project.year ? ` • ${project.year}` : "")}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={[
                "rounded-full border px-3 py-1 text-xs font-semibold",
                statusClass,
              ].join(" ")}
            >
              {statusLabel}
            </span>

            <button
              onClick={onClose}
              className="ui-btn-secondary rounded-xl px-3 text-xs text-white/85 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
              aria-label="Close project window"
            >
              Close
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid gap-5 overflow-y-auto p-5 md:grid-cols-[1fr_0.9fr]">
          {/* Left column */}
          <div className="grid gap-4">
            <p id={descId} className="text-sm text-white/75">
              {project.summary}
            </p>

            {project.type?.length ? (
              <div className="flex flex-wrap items-center gap-2">
                {project.type.map((t) => (
                  <span
                    key={t}
                    className="ui-pill px-4 text-xs font-semibold leading-none whitespace-nowrap text-white/75"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}

            {project.context ? (
              <div className="ui-panel-inset rounded-2xl p-4">
                <p className="ui-eyebrow">CONTEXT</p>
                <p className="mt-2 text-sm text-white/75">{project.context}</p>
              </div>
            ) : null}

            {project.outcomes?.length ? (
              <div className="ui-panel-inset rounded-2xl p-4">
                <p className="ui-eyebrow">OUTCOMES</p>
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
            <div className="ui-panel overflow-hidden rounded-2xl">
              <div className="p-3">
                <p className="ui-eyebrow">PREVIEW</p>
              </div>

              {/* Uses previewHref when present, otherwise no-signal placeholder image. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewSrc}
                alt={`${project.title} preview`}
                className="h-44 w-full object-cover opacity-90"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/static/no-signal.png";
                }}
              />
            </div>

            {project.stack?.length ? (
              <div className="ui-panel-inset rounded-2xl p-4">
                <p className="ui-eyebrow">STACK</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="ui-pill px-3 text-xs font-semibold text-white/75"
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
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-gradient-to-r from-[#00F3FF]/50 via-[#FF0080]/42 to-[#FFB800]/42 px-5 py-3 text-sm font-semibold text-white transition hover:from-[#00F3FF]/64 hover:via-[#FF0080]/56 hover:to-[#FFB800]/56"
                >
                  Open Live Project
                </a>
              ) : (
                <span className="ui-btn-secondary rounded-xl px-5 py-3 text-sm text-white/70">
                  Launching soon
                </span>
              )}

              <button
                onClick={onClose}
                className="ui-btn-secondary rounded-xl px-5 py-3 text-sm text-white/85 transition hover:bg-white/10"
              >
                Close window
              </button>
            </div>

            {/* Behind the build */}
            {project.behindTheBuild?.body ? (
              <div className="ui-panel-inset rounded-2xl p-4">
                <p className="ui-eyebrow">
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
