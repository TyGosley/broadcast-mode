"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "../lib/projects";
import { trapTabKey, usePrefersReducedMotion } from "../lib/a11y";

function statusLabel(status: Project["status"]) {
  if (status === "live") return "Live";
  if (status === "in-progress") return "In Progress";
  return "Archived";
}

function ctaLabel(status: Project["status"]) {
  if (status === "live") return "Open Live Project";
  if (status === "in-progress") return "Open Preview";
  return "View Project";
}

function StatusLed({ status }: { status: Project["status"] }) {
  const cls =
    status === "live"
      ? "bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.55)]"
      : status === "in-progress"
      ? "bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.55)]"
      : "bg-purple-300 shadow-[0_0_18px_rgba(216,180,254,0.55)]";

  return <span className={["h-2.5 w-2.5 rounded-full", cls].join(" ")} />;
}

function WindowControl({
  tone,
  label,
  onClick,
  disabled,
}: {
  tone: "close" | "min" | "max";
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const base =
    "h-3 w-3 rounded-full border border-white/12 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60";
  const color =
    tone === "close"
      ? "bg-red-400/70 hover:bg-red-400/85"
      : tone === "min"
      ? "bg-amber-300/70 hover:bg-amber-300/85"
      : "bg-emerald-300/70 hover:bg-emerald-300/85";

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={[base, color, disabled ? "opacity-50 cursor-not-allowed" : ""].join(" ")}
    />
  );
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const reducedMotion = usePrefersReducedMotion();

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);
  const [maximized, setMaximized] = useState(false);

  // Easter egg + maximize batching
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const tapCountRef = useRef(0);
  const tapResetTimerRef = useRef<number | null>(null);
  const finalizeTapTimerRef = useRef<number | null>(null);

  // Draggable position (desktop only, disabled when maximized)
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragState = useRef<{
    dragging: boolean;
    pointerId: number | null;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  }>({
    dragging: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });

  const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
  const maxBounds = useMemo(() => ({ x: 220, y: 160 }), []);
  const label = statusLabel(project.status);

  // ✅ Show CTA whenever href exists
  const href = (project.href ?? "").trim();
  const hasHref = href.length > 0;

  const showInProgressNote = project.status === "in-progress" && !hasHref;
  const showArchivedNote = project.status === "archived" && !hasHref;

  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    const t = window.setTimeout(() => {
      setMounted(true);
      closeBtnRef.current?.focus();
    }, 0);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      previouslyFocusedRef.current?.focus?.();
    };
  }, [project.id]);

  const close = () => {
    if (closing) return;

    if (reducedMotion) {
      onClose();
      return;
    }

    setClosing(true);
    window.setTimeout(() => onClose(), 180);
  };

  // Focus trap + ESC close
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }

      const dialog = dialogRef.current;
      if (!dialog) return;

      trapTabKey(e, dialog);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closing, reducedMotion]);

  // Reset per project open
  useEffect(() => {
    setPos({ x: 0, y: 0 });
    setMaximized(false);
    setSecretUnlocked(false);

    tapCountRef.current = 0;
    if (tapResetTimerRef.current) window.clearTimeout(tapResetTimerRef.current);
    if (finalizeTapTimerRef.current) window.clearTimeout(finalizeTapTimerRef.current);
    tapResetTimerRef.current = null;
    finalizeTapTimerRef.current = null;
  }, [project.id]);

  // Draggable header (desktop only)
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const isMobile = () => window.matchMedia("(max-width: 767px)").matches;

    const isInteractiveTarget = (target: EventTarget | null) => {
      const el = target as HTMLElement | null;
      if (!el) return false;
      return Boolean(el.closest("button, a, input, textarea, select, label"));
    };

    const onPointerDown = (e: PointerEvent) => {
      if (maximized) return;
      if (isMobile()) return;
      if (isInteractiveTarget(e.target)) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;

      dragState.current.dragging = true;
      dragState.current.pointerId = e.pointerId;
      dragState.current.startX = e.clientX;
      dragState.current.startY = e.clientY;
      dragState.current.originX = pos.x;
      dragState.current.originY = pos.y;

      header.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragState.current.dragging) return;
      if (dragState.current.pointerId !== e.pointerId) return;

      const dx = e.clientX - dragState.current.startX;
      const dy = e.clientY - dragState.current.startY;

      setPos({
        x: clamp(dragState.current.originX + dx, -maxBounds.x, maxBounds.x),
        y: clamp(dragState.current.originY + dy, -maxBounds.y, maxBounds.y),
      });
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!dragState.current.dragging) return;
      if (dragState.current.pointerId !== e.pointerId) return;

      dragState.current.dragging = false;
      dragState.current.pointerId = null;

      try {
        header.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    };

    header.addEventListener("pointerdown", onPointerDown);
    header.addEventListener("pointermove", onPointerMove);
    header.addEventListener("pointerup", onPointerUp);
    header.addEventListener("pointercancel", onPointerUp);

    return () => {
      header.removeEventListener("pointerdown", onPointerDown);
      header.removeEventListener("pointermove", onPointerMove);
      header.removeEventListener("pointerup", onPointerUp);
      header.removeEventListener("pointercancel", onPointerUp);
    };
  }, [pos.x, pos.y, maximized, maxBounds.x, maxBounds.y]);

  const resetTapWindow = () => {
    tapCountRef.current = 0;
    if (tapResetTimerRef.current) window.clearTimeout(tapResetTimerRef.current);
    if (finalizeTapTimerRef.current) window.clearTimeout(finalizeTapTimerRef.current);
    tapResetTimerRef.current = null;
    finalizeTapTimerRef.current = null;
  };

  const handleMinimize = () => {
    resetTapWindow();
    setMaximized(false);
    setPos({ x: 0, y: 0 });
  };

  const handleMaximize = () => {
    if (tapResetTimerRef.current) window.clearTimeout(tapResetTimerRef.current);
    if (finalizeTapTimerRef.current) window.clearTimeout(finalizeTapTimerRef.current);

    tapCountRef.current += 1;

    tapResetTimerRef.current = window.setTimeout(() => {
      tapCountRef.current = 0;
    }, 1200);

    finalizeTapTimerRef.current = window.setTimeout(() => {
      const clicks = tapCountRef.current;

      if (!reducedMotion) {
        if (!secretUnlocked && clicks >= 3) {
          setSecretUnlocked(true);
          window.dispatchEvent(new CustomEvent("broadcast:burst", { detail: { strength: "high" } }));
          (navigator as any).vibrate?.(35);
        } else {
          window.dispatchEvent(new CustomEvent("broadcast:burst", { detail: { strength: "low" } }));
        }
      }

      setMaximized((v) => !v);
      setPos({ x: 0, y: 0 });

      tapCountRef.current = 0;
      if (tapResetTimerRef.current) window.clearTimeout(tapResetTimerRef.current);
      tapResetTimerRef.current = null;
      finalizeTapTimerRef.current = null;
    }, 260);
  };

  const behind = project.behindTheBuild;

  const titleId = `proj-title-${project.id}`;
  const descId = `proj-desc-${project.id}`;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        onClick={close}
        aria-label="Close project details"
        className={[
          "absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm transition-opacity duration-200",
          mounted && !closing ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        className={[
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 outline-none",
          maximized ? "w-[min(1100px,calc(100%-1rem))]" : "w-[min(920px,calc(100%-1.5rem))]",
        ].join(" ")}
      >
        <div
          className={[
            "relative overflow-hidden rounded-2xl border border-white/10 bg-black/60",
            "shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_26px_90px_rgba(0,0,0,0.75)]",
            "backdrop-blur transition-[opacity,transform,width,height] duration-200 ease-out will-change-transform",
            mounted && !closing ? "opacity-100 scale-100" : "opacity-0 scale-[0.985]",
          ].join(" ")}
          style={{
            transform: maximized ? "translate(0px, 0px)" : `translate(${pos.x}px, ${pos.y}px)`,
          }}
        >
          <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-cyan-400/12 via-fuchsia-500/10 to-purple-500/12 blur-md opacity-70" />

          <div
            ref={headerRef}
            className={[
              "relative flex items-center justify-between gap-3 border-b border-white/10 bg-black/45 px-4 py-3 select-none",
              maximized ? "cursor-default" : "md:cursor-grab active:md:cursor-grabbing",
            ].join(" ")}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <WindowControl tone="close" label="Close window" onClick={close} />
                <WindowControl tone="min" label="Minimize / center window" onClick={handleMinimize} />
                <WindowControl
                  tone="max"
                  label={maximized ? "Restore window" : "Maximize window"}
                  onClick={handleMaximize}
                />
              </div>

              <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                <StatusLed status={project.status} />
                <span className="text-xs font-semibold text-white/75">{label}</span>
              </div>
            </div>

            <div className="min-w-0 flex-1 px-2">
              <div id={titleId} className="truncate text-sm font-semibold text-white">
                {project.title}
              </div>
              <div className="truncate text-xs text-white/55">
                {(project.client ?? "Internal") + (project.year ? ` • ${project.year}` : "")}
              </div>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={close}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/85 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
            >
              Close
            </button>
          </div>

          <div className={["relative overflow-y-auto p-5", maximized ? "max-h-[84vh]" : "max-h-[72vh]"].join(" ")}>
            <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
              <div className="grid gap-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs tracking-[0.25em] text-white/60">CASE STUDY LITE</div>

                  <p id={descId} className="mt-3 text-sm leading-relaxed text-white/75">
                    {project.summary}
                  </p>

                  {project.context ? (
                    <>
                      <div className="mt-4 text-sm font-semibold text-white">Context</div>
                      <p className="mt-2 text-sm text-white/75">{project.context}</p>
                    </>
                  ) : null}

                  {project.constraints?.length ? (
                    <>
                      <div className="mt-4 text-sm font-semibold text-white">Constraints</div>
                      <ul className="mt-2 grid gap-2 text-sm text-white/75">
                        {project.constraints.map((c) => (
                          <li key={c} className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
                            {c}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}

                  {project.outcomes?.length ? (
                    <>
                      <div className="mt-4 text-sm font-semibold text-white">Outcomes</div>
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

                {secretUnlocked && behind ? (
                  <div className="rounded-xl border border-white/10 bg-black/35 p-4">
                    <div className="text-xs tracking-[0.25em] text-white/60">
                      {behind.title ?? "BEHIND THE BUILD"}
                    </div>

                    <p className="mt-3 text-sm text-white/75">{behind.body}</p>

                    {behind.notes?.length ? (
                      <ul className="mt-3 space-y-1 text-xs text-white/65 list-disc pl-4">
                        {behind.notes.map((n) => (
                          <li key={n}>{n}</li>
                        ))}
                      </ul>
                    ) : null}

                    <p className="mt-3 text-xs text-white/55">Unlocked by triple-clicking maximize.</p>
                  </div>
                ) : null}
              </div>

              <aside className="grid gap-4">
                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="text-xs tracking-[0.25em] text-white/60">DETAILS</div>

                  <div className="mt-3 grid gap-3 text-sm text-white/80">
                    <div>
                      <div className="text-xs text-white/55">Status</div>
                      <div className="font-semibold">{label}</div>
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

                {hasHref ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className={[
                      "rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-semibold text-white",
                      project.status === "live"
                        ? "bg-gradient-to-r from-emerald-400/25 via-cyan-400/20 to-fuchsia-500/20 hover:from-emerald-400/30 hover:via-cyan-400/25 hover:to-fuchsia-500/25"
                        : project.status === "in-progress"
                        ? "bg-gradient-to-r from-cyan-400/20 via-fuchsia-500/18 to-purple-500/18 hover:from-cyan-400/26 hover:via-fuchsia-500/24 hover:to-purple-500/24"
                        : "bg-white/10 hover:bg-white/15",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60",
                    ].join(" ")}
                  >
                    {ctaLabel(project.status)}
                  </a>
                ) : showInProgressNote ? (
                  <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <div className="text-xs tracking-[0.25em] text-white/60">LAUNCHING SOON</div>
                    <p className="mt-2 text-sm text-white/70">
                      This build is currently in progress. Check back soon or reach out if you want something similar.
                    </p>
                  </div>
                ) : showArchivedNote ? (
                  <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <div className="text-xs tracking-[0.25em] text-white/60">ARCHIVED</div>
                    <p className="mt-2 text-sm text-white/70">
                      Older work kept for context and growth. The current standard is reflected in Live projects.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-xs text-white/60">
                    Link: coming soon
                  </div>
                )}
              </aside>
            </div>
          </div>

          <div className="relative border-t border-white/10 bg-black/45 px-4 py-3 text-xs text-white/55">
            Tip: Press <span className="text-white/80">ESC</span> to close.
          </div>
        </div>
      </div>
    </div>
  );
}
