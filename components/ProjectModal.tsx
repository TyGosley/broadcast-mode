"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Project, ProjectCoverImage } from "../lib/projects";

/* -------------------------
   Local helpers (copy/paste safe)
-------------------------- */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(!!mq.matches);
    update();

    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  return reduced;
}

function trapTabKey(e: KeyboardEvent, container: HTMLElement) {
  if (e.key !== "Tab") return;

  const focusables = Array.from(
    container.querySelectorAll<HTMLElement>(
      [
        "a[href]",
        "button:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        "[tabindex]:not([tabindex='-1'])",
      ].join(",")
    )
  ).filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));

  if (focusables.length === 0) return;

  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const active = document.activeElement as HTMLElement | null;

  if (!e.shiftKey && active === last) {
    e.preventDefault();
    first.focus();
  }

  if (e.shiftKey && active === first) {
    e.preventDefault();
    last.focus();
  }
}

function normalizeUrl(url?: string) {
  return (url ?? "").trim();
}

function statusLabel(status: Project["status"]) {
  if (status === "live") return "Live";
  if (status === "in-progress") return "In Progress";
  return "Archived";
}

function statusTone(status: Project["status"]) {
  if (status === "live") return "live";
  if (status === "in-progress") return "progress";
  return "archived";
}

function statusChipClass(status: Project["status"]) {
  const tone = statusTone(status);

  if (tone === "live") {
    return "border-emerald-400/35 bg-emerald-400/18 text-emerald-200 shadow-[0_0_18px_rgba(16,185,129,0.45)]";
  }
  if (tone === "progress") {
    return "border-cyan-400/35 bg-cyan-400/18 text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.45)]";
  }
  return "border-purple-400/35 bg-purple-400/18 text-purple-200 shadow-[0_0_18px_rgba(168,85,247,0.45)]";
}

function ctaClass(status: Project["status"]) {
  const tone = statusTone(status);

  if (tone === "live") {
    return [
      "bg-gradient-to-r from-emerald-400/28 via-cyan-400/22 to-fuchsia-500/20",
      "hover:from-emerald-400/36 hover:via-cyan-400/30 hover:to-fuchsia-500/26",
      "shadow-[0_0_20px_rgba(16,185,129,0.22)]",
    ].join(" ");
  }

  if (tone === "progress") {
    return [
      "bg-gradient-to-r from-cyan-400/26 via-fuchsia-500/20 to-purple-500/20",
      "hover:from-cyan-400/34 hover:via-fuchsia-500/28 hover:to-purple-500/28",
      "shadow-[0_0_20px_rgba(34,211,238,0.20)]",
    ].join(" ");
  }

  return "bg-white/10 hover:bg-white/15";
}

function defaultPrimaryLabel(p: any, kind: "live" | "preview") {
  const override = (p.ctaLabel ?? "").trim();
  if (override) return override;
  return kind === "live" ? "Open Live Project" : "Open Preview";
}

function StatusLed({ status }: { status: Project["status"] }) {
  const tone = statusTone(status);

  const cls =
    tone === "live"
      ? "bg-emerald-300 shadow-[0_0_20px_rgba(110,231,183,0.65)]"
      : tone === "progress"
      ? "bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.65)]"
      : "bg-purple-300 shadow-[0_0_20px_rgba(216,180,254,0.65)]";

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
      ? "bg-red-400/75 hover:bg-red-400/90"
      : tone === "min"
      ? "bg-amber-300/75 hover:bg-amber-300/90"
      : "bg-emerald-300/75 hover:bg-emerald-300/90";

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={[
        base,
        color,
        disabled ? "opacity-50 cursor-not-allowed" : "",
      ].join(" ")}
    />
  );
}

/* -------------------------
   Placeholder (static image + animated overlays)
   Requires: public/static/no-signal.png
-------------------------- */

function PlaceholderPreview({
  title,
  status,
  reducedMotion,
}: {
  title: string;
  status: Project["status"];
  reducedMotion: boolean;
}) {
  const tone = statusTone(status);

  const tint =
    tone === "live"
      ? "from-emerald-400/10 via-cyan-400/06 to-fuchsia-500/10"
      : tone === "progress"
      ? "from-cyan-400/12 via-fuchsia-500/06 to-purple-500/10"
      : "from-purple-400/12 via-fuchsia-500/05 to-cyan-400/06";

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/static/no-signal.png"
          alt=""
          className="h-full w-full object-cover opacity-100"
          draggable={false}
        />
      </div>

      <div className={`absolute inset-0 bg-gradient-to-br ${tint} opacity-35`} />

      <div
        className={[
          "absolute inset-0 mix-blend-screen opacity-100",
          "[filter:contrast(270%)_brightness(215%)]",
          "[background-image:",
          "repeating-linear-gradient(0deg,rgba(255,255,255,0)_0px,rgba(255,255,255,0)_6px,rgba(255,255,255,0.95)_7px,rgba(255,255,255,0)_12px),",
          "repeating-linear-gradient(90deg,rgba(255,255,255,0.75)_0px,rgba(255,255,255,0.75)_12px,rgba(0,0,0,0)_12px,rgba(0,0,0,0)_34px)]",
          "[background-size:100%_18px,240px_100%]",
          reducedMotion ? "" : "animate-[bandJitter_80ms_steps(2,end)_infinite]",
        ].join(" ")}
        style={{
          clipPath: "polygon(0 0,100% 0,100% 62%,0 62%)",
        }}
      />

      <div
        className={[
          "absolute inset-x-0 top-[59.5%] h-[14px]",
          "mix-blend-screen opacity-100",
          "[filter:contrast(300%)_brightness(240%)]",
          "[background-image:",
          "linear-gradient(to_right,rgba(255,255,255,0),rgba(255,255,255,1),rgba(255,255,255,0)),",
          "repeating-linear-gradient(90deg,rgba(255,255,255,1)_0px,rgba(255,255,255,1)_5px,rgba(0,0,0,0)_5px,rgba(0,0,0,0)_22px)]",
          "[background-size:100%_100%,260px_100%]",
          reducedMotion ? "" : "animate-[tearJitter_120ms_steps(2,end)_infinite]",
        ].join(" ")}
      />

      <div
        className={[
          "absolute inset-x-0 bottom-0 h-[42%]",
          "mix-blend-overlay opacity-95",
          "[filter:contrast(280%)_brightness(210%)]",
          "[background-image:",
          "repeating-linear-gradient(90deg,rgba(255,255,255,0.95)_0px,rgba(255,255,255,0.95)_3px,rgba(0,0,0,0)_3px,rgba(0,0,0,0)_34px),",
          "repeating-linear-gradient(0deg,rgba(255,255,255,0.90)_0px,rgba(255,255,255,0.90)_3px,rgba(0,0,0,0)_3px,rgba(0,0,0,0)_28px)]",
          "[background-size:320px_100%,100%_280px]",
          reducedMotion ? "" : "animate-[macroDrift_140ms_steps(2,end)_infinite]",
        ].join(" ")}
      />

      <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(to_bottom,rgba(0,0,0,0)_0px,rgba(0,0,0,0)_2px,rgba(0,0,0,0.65)_3px)] [background-size:100%_5px]" />

      <div
        className={[
          "absolute inset-x-0 -top-20 h-36",
          "opacity-75 mix-blend-overlay blur-[0.6px]",
          "bg-gradient-to-b from-white/0 via-white/40 to-white/0",
          reducedMotion ? "" : "animate-[vhsRoll_0.9s_linear_infinite]",
        ].join(" ")}
      />

      <div className="absolute inset-x-0 bottom-0 p-3">
        <div className="rounded-xl border border-white/12 bg-black/65 px-3 py-2 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-xs font-semibold tracking-wide text-white/95">
                {title}
              </div>
              <div className="mt-0.5 text-[10px] tracking-[0.28em] text-white/70">
                NO PREVIEW IMAGE YET
              </div>
            </div>

            <div className="shrink-0 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/40 px-2 py-1">
              <StatusLed status={status} />
              <span className="text-[10px] font-semibold text-white/80">
                {statusLabel(status).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bandJitter {
          0% {
            transform: translate3d(0, 0, 0);
            background-position: 0 0, 0 0;
          }
          50% {
            transform: translate3d(-10px, 2px, 0);
            background-position: 0 10px, 18px 0;
          }
          100% {
            transform: translate3d(8px, -2px, 0);
            background-position: 0 18px, 42px 0;
          }
        }

        @keyframes tearJitter {
          0% {
            transform: translateX(-22px);
          }
          50% {
            transform: translateX(18px);
          }
          100% {
            transform: translateX(-10px);
          }
        }

        @keyframes macroDrift {
          0% {
            transform: translate3d(0, 0, 0);
            background-position: 0 0, 0 0;
          }
          50% {
            transform: translate3d(-18px, 6px, 0);
            background-position: 34px 0, 0 26px;
          }
          100% {
            transform: translate3d(14px, -6px, 0);
            background-position: 68px 0, 0 52px;
          }
        }

        @keyframes vhsRoll {
          0% {
            transform: translateY(-35%);
          }
          100% {
            transform: translateY(210%);
          }
        }
      `}</style>
    </div>
  );
}

/* -------------------------
   Modal
-------------------------- */

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

  const clamp = (v: number, min: number, max: number) =>
    Math.min(max, Math.max(min, v));

  const maxBounds = useMemo(() => ({ x: 220, y: 160 }), []);

  // ✅ Build gallery images (images[] wins; fallback to coverImage; else placeholder)
  const gallery: ProjectCoverImage[] = useMemo(() => {
    const imgs = project.images?.filter(Boolean) ?? [];
    if (imgs.length > 0) return imgs;

    if (project.coverImage?.src) return [project.coverImage];

    return [];
  }, [project.coverImage, project.images]);

  const [activeIndex, setActiveIndex] = useState(0);

  // Reset active image on project change
  useEffect(() => {
    setActiveIndex(0);
  }, [project.id]);

  const activeImage = gallery[activeIndex] ?? null;

  const titleId = `proj-title-${project.id}`;
  const descId = `proj-desc-${project.id}`;

  const liveUrl = normalizeUrl(project.href);
  const previewUrl = normalizeUrl(project.previewHref);
  const primaryUrl = liveUrl || previewUrl;

  const primaryKind: "live" | "preview" | null = liveUrl
    ? "live"
    : previewUrl
    ? "preview"
    : null;

  const secondaryUrl = normalizeUrl(project.secondaryHref);
  const secondaryLabel = normalizeUrl(project.secondaryLabel) || "View more";

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

  // Trap focus + ESC + gallery keyboard nav
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }

      // Gallery navigation
      if (gallery.length > 1) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setActiveIndex((i) => (i - 1 + gallery.length) % gallery.length);
          return;
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          setActiveIndex((i) => (i + 1) % gallery.length);
          return;
        }
      }

      const dialog = dialogRef.current;
      if (!dialog) return;
      trapTabKey(e, dialog);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closing, reducedMotion, gallery.length]);

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
      } catch {}
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

  async function copyPrimaryLink() {
    if (!primaryUrl) return;
    try {
      await navigator.clipboard.writeText(primaryUrl);
    } catch {}
  }

  const label = statusLabel(project.status);

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
          maximized
            ? "w-[min(1100px,calc(100%-1rem))]"
            : "w-[min(920px,calc(100%-1.5rem))]",
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
            transform: maximized
              ? "translate(0px, 0px)"
              : `translate(${pos.x}px, ${pos.y}px)`,
          }}
        >
          <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-cyan-400/12 via-fuchsia-500/10 to-purple-500/12 blur-md opacity-70" />

          <div
            ref={headerRef}
            className={[
              "relative flex items-center justify-between gap-3 border-b border-white/10 bg-black/45 px-4 py-3 select-none",
              maximized
                ? "cursor-default"
                : "md:cursor-grab active:md:cursor-grabbing",
            ].join(" ")}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <WindowControl tone="close" label="Close window" onClick={close} />
                <WindowControl
                  tone="min"
                  label="Minimize / center window"
                  onClick={() => {
                    setMaximized(false);
                    setPos({ x: 0, y: 0 });
                  }}
                />
                <WindowControl
                  tone="max"
                  label={maximized ? "Restore window" : "Maximize window"}
                  onClick={() => {
                    setMaximized((v) => !v);
                    setPos({ x: 0, y: 0 });
                  }}
                />
              </div>

              <div
                className={[
                  "hidden sm:flex items-center gap-2 rounded-full border px-2.5 py-1",
                  statusChipClass(project.status),
                ].join(" ")}
              >
                <StatusLed status={project.status} />
                <span className="text-xs font-semibold">
                  {statusLabel(project.status)}
                </span>
              </div>
            </div>

            <div className="min-w-0 flex-1 px-2">
              <div id={titleId} className="truncate text-sm font-semibold text-white">
                {project.title}
              </div>
              <div className="truncate text-xs text-white/55">
                {(project.client ?? "Internal") +
                  (project.year ? ` • ${project.year}` : "")}
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

          <div
            className={[
              "relative overflow-y-auto p-5",
              maximized ? "max-h-[84vh]" : "max-h-[72vh]",
            ].join(" ")}
          >
            <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
              <div className="grid gap-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs tracking-[0.25em] text-white/60">
                    CASE STUDY LITE
                  </div>

                  <p id={descId} className="mt-3 text-sm leading-relaxed text-white/75">
                    {project.summary}
                  </p>

                  {project.context ? (
                    <>
                      <div className="mt-4 text-sm font-semibold text-white">
                        Context
                      </div>
                      <p className="mt-2 text-sm text-white/75">{project.context}</p>
                    </>
                  ) : null}

                  {project.constraints?.length ? (
                    <>
                      <div className="mt-4 text-sm font-semibold text-white">
                        Constraints
                      </div>
                      <ul className="mt-2 grid gap-2 text-sm text-white/75">
                        {project.constraints.map((c) => (
                          <li
                            key={c}
                            className="rounded-lg border border-white/10 bg-black/25 px-3 py-2"
                          >
                            {c}
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
                          <li
                            key={o}
                            className="rounded-lg border border-white/10 bg-black/25 px-3 py-2"
                          >
                            {o}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}

                  {project.behindTheBuild ? (
                    <div className="mt-5 rounded-xl border border-white/10 bg-black/35 p-4">
                      <div className="text-xs tracking-[0.25em] text-white/60">
                        {project.behindTheBuild.title ?? "BEHIND THE BUILD"}
                      </div>
                      <p className="mt-3 text-sm text-white/75">
                        {project.behindTheBuild.body}
                      </p>

                      {project.behindTheBuild.notes?.length ? (
                        <ul className="mt-3 space-y-1 text-xs text-white/65 list-disc pl-4">
                          {project.behindTheBuild.notes.map((n) => (
                            <li key={n}>{n}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>

              <aside className="grid gap-4">
                <div className="overflow-hidden rounded-xl border border-white/10 bg-black/30">
                  <div className="px-4 py-3 text-xs tracking-[0.25em] text-white/60 border-b border-white/10 bg-black/35">
                    PREVIEW
                  </div>

                  {/* Main preview */}
                  {activeImage ? (
                    <div className="relative">
                      <div className="relative aspect-[16/10] w-full">
                        <Image
                          src={activeImage.src}
                          alt={activeImage.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 420px"
                          className="object-cover"
                          priority={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-black/10" />
                      </div>

                      {/* Thumbnails */}
                      {gallery.length > 1 ? (
                        <div className="border-t border-white/10 bg-black/45 px-3 py-3">
                          <div className="flex items-center justify-between">
                            <div className="text-[10px] tracking-[0.28em] text-white/60">
                              GALLERY
                            </div>
                            <div className="text-[10px] text-white/55">
                              <span className="text-white/80 font-semibold">
                                {activeIndex + 1}
                              </span>
                              /{gallery.length} • ← →
                            </div>
                          </div>

                          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
                            {gallery.map((img, i) => {
                              const active = i === activeIndex;
                              return (
                                <button
                                  key={img.src + i}
                                  type="button"
                                  onClick={() => setActiveIndex(i)}
                                  className={[
                                    "relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition",
                                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300/60",
                                    active
                                      ? "border-cyan-300/60 shadow-[0_0_0_1px_rgba(34,211,238,0.35),0_0_18px_rgba(217,70,239,0.18)]"
                                      : "border-white/10 opacity-80 hover:opacity-100",
                                  ].join(" ")}
                                  aria-label={`View image ${i + 1}`}
                                  aria-pressed={active}
                                >
                                  <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    sizes="80px"
                                    className="object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/10" />
                                  {active ? (
                                    <div className="absolute inset-0 ring-1 ring-cyan-300/35" />
                                  ) : null}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <PlaceholderPreview
                      title={project.title}
                      status={project.status}
                      reducedMotion={reducedMotion}
                    />
                  )}
                </div>

                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="text-xs tracking-[0.25em] text-white/60">
                    DETAILS
                  </div>

                  <div className="mt-3 grid gap-3 text-sm text-white/80">
                    <div>
                      <div className="text-xs text-white/55">Status</div>
                      <div
                        className={[
                          "mt-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold",
                          statusChipClass(project.status),
                        ].join(" ")}
                      >
                        <StatusLed status={project.status} />
                        {label}
                      </div>
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

                {primaryUrl ? (
                  <div className="grid gap-2">
                    <a
                      href={primaryUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={[
                        "rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-semibold text-white",
                        ctaClass(project.status),
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60",
                      ].join(" ")}
                    >
                      {defaultPrimaryLabel(project, primaryKind ?? "live")}
                    </a>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={copyPrimaryLink}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-xs font-semibold text-white/85 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
                      >
                        Copy link
                      </button>

                      {secondaryUrl ? (
                        <a
                          href={secondaryUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-center text-xs font-semibold text-white/85 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300/60"
                        >
                          {secondaryLabel}
                        </a>
                      ) : (
                        <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-center text-xs text-white/50">
                          Optional link
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-white/50">
                      {primaryKind === "live" ? "Live link" : "Preview link"}
                    </div>
                  </div>
                ) : project.status === "in-progress" ? (
                  <div className="rounded-xl border border-cyan-400/25 bg-cyan-400/8 p-4">
                    <div className="text-xs tracking-[0.25em] text-cyan-200/80">
                      LAUNCHING SOON
                    </div>
                    <p className="mt-2 text-sm text-white/70">
                      This build is currently in progress. Check back soon or reach
                      out if you want something similar.
                    </p>
                  </div>
                ) : project.status === "archived" ? (
                  <div className="rounded-xl border border-purple-400/25 bg-purple-400/8 p-4">
                    <div className="text-xs tracking-[0.25em] text-purple-200/80">
                      ARCHIVED
                    </div>
                    <p className="mt-2 text-sm text-white/70">
                      Older work kept for context and growth. The current standard
                      is reflected in Live projects.
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
            Tip: Press <span className="text-white/80">ESC</span> to close. Use{" "}
            <span className="text-white/80">←</span>{" "}
            <span className="text-white/80">→</span> for gallery.
          </div>
        </div>
      </div>
    </div>
  );
}
