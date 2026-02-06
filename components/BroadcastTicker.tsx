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

const SESSION_KEY = "broadcastMode_ticker_msgs_v1";

type TickerMsg = {
  id: string;
  text: string;
  tone?: "info" | "hint" | "egg";
};

const DEFAULT_MSGS: TickerMsg[] = [
  { id: "sys-ready", text: "SYSTEM: READY • SIGNAL: STABLE • MODE: BROADCAST", tone: "info" },
  { id: "nav-projects", text: "TIP: OPEN PROJECTS TO BROWSE CURRENT + PAST WORK", tone: "hint" },
  { id: "nav-contact", text: "TIP: USE CONTACT TO START A BUILD OR REQUEST A QUOTE", tone: "hint" },
  { id: "dock", text: "SHORTCUT: DOCK ICONS = FAST NAVIGATION BETWEEN MODULES", tone: "hint" },
  { id: "egg-press", text: "EASTER EGG: LONG PRESS A CASSETTE/CD FOR A SIGNAL BURST", tone: "egg" },
  { id: "egg-konami", text: "ANOMALY DETECTED… TRY ↑ ↑ ↓ ↓ ← → ← → B A", tone: "egg" },
  { id: "egg-max", text: "HIDDEN PANEL: TRIPLE-CLICK MAXIMIZE INSIDE A PROJECT WINDOW", tone: "egg" },
];

function pickSessionMessages(all: TickerMsg[], includeEggs: boolean) {
  const pool = includeEggs ? all : all.filter((m) => m.tone !== "egg");

  // Small rotation set so it feels curated per session.
  // Client-only selection, stored in sessionStorage to stay stable (no hydration mismatch).
  const shuffled = [...pool].sort(() => Math.random() - 0.5);

  // Keep a mix: at least 1 info + 2 hints + optional 1 egg
  const info = shuffled.find((m) => m.tone === "info") ?? pool[0];
  const hints = shuffled.filter((m) => m.tone === "hint").slice(0, 2);
  const eggs = includeEggs ? shuffled.filter((m) => m.tone === "egg").slice(0, 1) : [];

  return [info, ...hints, ...eggs].filter(Boolean);
}

export function BroadcastTicker({
  includeEggHints = true,
  cycleMs = 9000,
}: {
  includeEggHints?: boolean;
  cycleMs?: number;
}) {
  const reducedMotion = usePrefersReducedMotion();

  const [paused, setPaused] = useState(false);
  const [msgs, setMsgs] = useState<TickerMsg[]>([]);
  const [idx, setIdx] = useState(0);

  // Load or pick session messages (client-only)
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as TickerMsg[];
        if (Array.isArray(parsed) && parsed.length) {
          setMsgs(parsed);
          return;
        }
      }
    } catch {
      // ignore
    }

    const picked = pickSessionMessages(DEFAULT_MSGS, includeEggHints);

    setMsgs(picked);
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(picked));
    } catch {
      // ignore
    }
  }, [includeEggHints]);

  // Cycle
  useEffect(() => {
    if (paused) return;
    if (!msgs.length) return;

    const id = window.setInterval(() => {
      setIdx((v) => (v + 1) % msgs.length);
    }, cycleMs);

    return () => window.clearInterval(id);
  }, [paused, msgs.length, cycleMs]);

  const current = msgs[idx]?.text ?? "SYSTEM: READY • MODE: BROADCAST";

  const toneClass = useMemo(() => {
    const t = msgs[idx]?.tone ?? "info";
    if (t === "egg") return "text-fuchsia-200/85";
    if (t === "hint") return "text-cyan-100/85";
    return "text-white/75";
  }, [msgs, idx]);

  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      <div className="rounded-2xl border border-white/10 bg-black/35 backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Left: CH + LED */}
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.5)]" />
            <span className="text-[11px] font-semibold tracking-[0.2em] text-white/70">
              CH-99
            </span>
          </div>

          {/* Middle: ticker text */}
          <div className="relative flex-1 overflow-hidden">
            {/* Reduced motion: no scrolling, just swap text */}
            {reducedMotion ? (
              <div
                className={["text-xs font-semibold tracking-[0.18em]", toneClass].join(" ")}
                aria-live="polite"
              >
                {current}
              </div>
            ) : (
              <div className="relative">
                <div
                  className={[
                    "ticker-track text-xs font-semibold tracking-[0.18em] whitespace-nowrap",
                    toneClass,
                    paused ? "ticker-paused" : "",
                  ].join(" ")}
                  aria-live="polite"
                >
                  {/* Duplicate for seamless loop */}
                  <span className="ticker-item">{current} • {current} • {current}</span>
                </div>
              </div>
            )}
          </div>

          {/* Right: controls */}
          <button
            type="button"
            onClick={() => setPaused((v) => !v)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-semibold text-white/80 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
            aria-pressed={paused}
          >
            {paused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>

      {/* Local component styles (no tailwind config required) */}
      <style jsx>{`
        .ticker-track {
          display: inline-block;
          will-change: transform;
          animation: ticker 12s linear infinite;
        }
        .ticker-item {
          display: inline-block;
          padding-right: 3rem;
        }
        .ticker-paused {
          animation-play-state: paused;
        }
        @keyframes ticker {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
