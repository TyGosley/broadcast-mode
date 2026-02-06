"use client";

import { useEffect, useMemo, useState } from "react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

const LINES = [
  "TUNING SIGNAL...",
  "LOCKING FREQUENCY...",
  "SYNCING COLOR BURST...",
  "CALIBRATING SCANLINES...",
  "LOADING MODULES...",
  "BROADCAST INITIALIZED",
];

export function BootSequence({
  onDone,
  onDisableNextTime,
  brand = "Be Awesome Productions",
}: {
  onDone: () => void;
  onDisableNextTime?: () => void;
  brand?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  const totalSteps = LINES.length;
  const stepMs = useMemo(() => (reducedMotion ? 120 : 360), [reducedMotion]);

  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (reducedMotion) {
      setProgress(100);
      setIdx(totalSteps - 1);
      const t = window.setTimeout(() => onDone(), 220);
      return () => window.clearTimeout(t);
    }

    const interval = window.setInterval(() => {
      setIdx((v) => Math.min(totalSteps - 1, v + 1));
    }, stepMs);

    return () => window.clearInterval(interval);
  }, [mounted, reducedMotion, stepMs, totalSteps, onDone]);

  useEffect(() => {
    const next = Math.round(((idx + 1) / totalSteps) * 100);
    setProgress(next);

    if (idx === totalSteps - 1) {
      const t = window.setTimeout(() => onDone(), reducedMotion ? 0 : 520);
      return () => window.clearTimeout(t);
    }
  }, [idx, totalSteps, onDone, reducedMotion]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") onDone();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 bg-black" />

      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(34,211,238,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(217,70,239,0.16),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(168,85,247,0.12),transparent_55%)]" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "100% 3px",
        }}
      />

      <div className="relative mx-auto flex h-dvh w-full max-w-3xl flex-col justify-center px-6">
        <div className="rounded-2xl border border-white/10 bg-black/55 p-6 backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.7)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs tracking-[0.35em] text-white/55">BOOT SEQUENCE</div>
              <div className="mt-2 text-xl font-semibold text-white">{brand}</div>
              <div className="mt-1 text-sm text-white/70">Broadcast Mode</div>
            </div>

            <div className="flex items-center gap-2">
              {onDisableNextTime ? (
                <button
                  type="button"
                  onClick={onDisableNextTime}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/75 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
                >
                  Disable boot
                </button>
              ) : null}

              <button
                type="button"
                onClick={onDone}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/85 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
              >
                Skip
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-black/35 p-4">
            <div className="text-xs tracking-[0.25em] text-white/55">STATUS</div>
            <div className="mt-3 font-mono text-sm text-white/85">
              {LINES[Math.min(idx, totalSteps - 1)]}
              <span className="inline-block w-3 animate-pulse text-white/60">▌</span>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-white/55">
                <span>Signal</span>
                <span>{progress}%</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400/70 via-fuchsia-500/60 to-purple-500/70 transition-[width] duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mt-4 text-xs text-white/50">
              Tip: Press <span className="text-white/75">Enter</span> or{" "}
              <span className="text-white/75">Esc</span> to skip.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
