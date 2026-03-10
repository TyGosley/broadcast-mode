"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useSettings } from "../../components/SettingsProvider";
import { StudioToggle } from "../../components/StudioToggle";
import type { VhsIntensity } from "../../lib/settings";

const KEY_BOOT_ENABLED = "broadcastMode_boot_enabled";
const VHS_LEVELS: VhsIntensity[] = ["low", "medium", "high"];
const FEEDBACK_MESSAGES = [
  "SIGNAL UPDATED",
  "SETTINGS APPLIED",
  "BROADCAST CONFIG UPDATED",
] as const;
const SIGNAL_BARS = [
  { color: "#00F3FF", low: 0.35, high: 0.95, duration: "6.4s", delay: "0s" },
  { color: "#65FAFF", low: 0.45, high: 0.88, duration: "5.8s", delay: "0.45s" },
  { color: "#FF0080", low: 0.3, high: 0.84, duration: "6.9s", delay: "0.8s" },
  { color: "#FFB800", low: 0.4, high: 0.92, duration: "5.4s", delay: "0.25s" },
  { color: "#00F3FF", low: 0.28, high: 0.82, duration: "7.2s", delay: "1.1s" },
  { color: "#FF0080", low: 0.38, high: 0.9, duration: "6.1s", delay: "0.6s" },
] as const;

function labelForIntensity(v: VhsIntensity) {
  if (v === "low") return "Low";
  if (v === "high") return "High";
  return "Medium";
}

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings();
  const [bootEnabled, setBootEnabled] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [calibrating, setCalibrating] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const feedbackIdxRef = useRef(0);
  const statusTimerRef = useRef<number | null>(null);
  const sweepTimerRef = useRef<number | null>(null);
  const reducedMotion = settings.reducedMotion || prefersReducedMotion;

  useEffect(() => {
    try {
      setBootEnabled(localStorage.getItem(KEY_BOOT_ENABLED) !== "0");
    } catch {
      setBootEnabled(true);
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setPrefersReducedMotion(mq.matches);

    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  useEffect(() => {
    return () => {
      if (statusTimerRef.current) window.clearTimeout(statusTimerRef.current);
      if (sweepTimerRef.current) window.clearTimeout(sweepTimerRef.current);
    };
  }, []);

  function triggerFeedback(opts?: { message?: string; allowSweep?: boolean; bypassReducedMotion?: boolean }) {
    const message = opts?.message ?? FEEDBACK_MESSAGES[feedbackIdxRef.current % FEEDBACK_MESSAGES.length];
    feedbackIdxRef.current += 1;

    if (statusTimerRef.current) window.clearTimeout(statusTimerRef.current);
    if (sweepTimerRef.current) window.clearTimeout(sweepTimerRef.current);

    setStatusMsg(message);
    statusTimerRef.current = window.setTimeout(() => setStatusMsg(null), 1100);

    const allowSweep = opts?.allowSweep ?? true;
    const canAnimate = !reducedMotion || !!opts?.bypassReducedMotion;
    if (canAnimate && allowSweep) {
      setCalibrating(true);
      sweepTimerRef.current = window.setTimeout(() => setCalibrating(false), 420);
    } else {
      setCalibrating(false);
    }
  }

  function setBootPreference(next: boolean) {
    setBootEnabled(next);
    try {
      localStorage.setItem(KEY_BOOT_ENABLED, next ? "1" : "0");
    } catch {
      // ignore storage failures
    }
    triggerFeedback();
  }

  return (
    <main className="min-h-dvh px-5 py-10">
      <header className="ui-section mt-0 text-center">
        <p className="ui-eyebrow">SETTINGS</p>
        <h1 className="page-title mt-2 text-white">
          Tune Your Broadcast
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 md:text-base">
          Control visual effects and playback behavior for the Broadcast Mode interface.
        </p>
      </header>

      <section className="ui-section !mt-8">
        <div className="ui-panel-strong relative overflow-hidden rounded-2xl p-5 md:p-6">
          <div
            aria-hidden="true"
            className={[
              "pointer-events-none absolute inset-0 overflow-hidden rounded-2xl",
              calibrating && !reducedMotion ? "calibrating" : "",
            ].join(" ")}
          >
            <span className="settings-calibration-line" />
          </div>

          <span className="pointer-events-none absolute left-3 top-3 h-2.5 w-2.5 rounded-full border border-white/20 bg-black/45 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_0_4px_rgba(0,0,0,0.45)]" />
          <span className="pointer-events-none absolute right-3 top-3 h-2.5 w-2.5 rounded-full border border-white/20 bg-black/45 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_0_4px_rgba(0,0,0,0.45)]" />
          <span className="pointer-events-none absolute left-3 bottom-3 h-2.5 w-2.5 rounded-full border border-white/20 bg-black/45 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_0_4px_rgba(0,0,0,0.45)]" />
          <span className="pointer-events-none absolute right-3 bottom-3 h-2.5 w-2.5 rounded-full border border-white/20 bg-black/45 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_0_4px_rgba(0,0,0,0.45)]" />

          <div className="ui-stack relative">
            <div className="ui-panel-inset rounded-xl p-3">
              <p className="ui-eyebrow text-white/55">SIGNAL MONITOR</p>
              <div className="mt-2 flex items-end justify-center gap-1.5" aria-hidden="true">
                {SIGNAL_BARS.map((bar, idx) => (
                  <span
                    key={`${bar.color}-${idx}`}
                    className={[
                      "settings-signal-bar",
                      !reducedMotion ? "settings-signal-animate" : "",
                    ].join(" ")}
                    style={
                      {
                        "--signal-low": bar.low,
                        "--signal-high": bar.high,
                        backgroundColor: bar.color,
                        animationDuration: bar.duration,
                        animationDelay: bar.delay,
                        transform: reducedMotion ? `scaleY(${bar.low})` : undefined,
                      } as CSSProperties
                    }
                  />
                ))}
              </div>
              <p
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className={[
                  "mt-2 font-tech text-[11px] tracking-[0.14em] text-[#00F3FF]/78",
                  statusMsg && !reducedMotion ? "settings-status-show" : "",
                ].join(" ")}
              >
                {statusMsg ?? "SYSTEM: STABLE"}
              </p>
            </div>

            <StudioToggle
              label="VHS Overlay"
              description="CRT noise, scanlines, and signal bleed effects"
              enabled={settings.vhsEnabled}
              onChange={(next) => {
                updateSettings({ vhsEnabled: next });
                triggerFeedback({ message: "SIGNAL UPDATED" });
              }}
            />

            <div className="ui-panel-inset rounded-xl p-4">
              <p className="ui-eyebrow text-white/55">VHS INTENSITY</p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                {VHS_LEVELS.map((level) => {
                  const active = settings.vhsIntensity === level;
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => {
                        updateSettings({ vhsIntensity: level });
                        triggerFeedback({ message: "BROADCAST CONFIG UPDATED" });
                      }}
                      className={[
                        "ui-btn-secondary rounded-xl px-4 py-2 text-xs font-semibold",
                        active
                          ? "bg-[#00F3FF]/22 text-white ring-1 ring-[#00F3FF]/60 shadow-[0_0_12px_rgba(0,243,255,0.24)]"
                          : "text-white/75 hover:bg-white/10",
                      ].join(" ")}
                      aria-pressed={active}
                    >
                      {labelForIntensity(level)}
                    </button>
                  );
                })}
              </div>
            </div>

            <StudioToggle
              label="Reduced Motion"
              description="Prefer calmer transitions and less motion-heavy behavior"
              enabled={settings.reducedMotion}
              onChange={(next) => {
                updateSettings({ reducedMotion: next });
                triggerFeedback({
                  message: "SETTINGS APPLIED",
                  allowSweep: !next,
                  bypassReducedMotion: !next && !prefersReducedMotion,
                });
              }}
            />

            <StudioToggle
              label="Home Boot Sequence"
              description="Play startup boot sequence when visiting Home"
              enabled={bootEnabled}
              onChange={setBootPreference}
            />
          </div>
        </div>
      </section>

      <style jsx>{`
        .settings-signal-bar {
          width: 4px;
          height: 22px;
          border-radius: 999px;
          transform-origin: bottom;
          opacity: 0.86;
          box-shadow: 0 0 8px currentColor;
        }

        .settings-signal-animate {
          animation-name: signal-bars;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .settings-calibration-line {
          position: absolute;
          left: 12px;
          right: 12px;
          top: -8px;
          height: 2px;
          opacity: 0;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(0, 243, 255, 0.25), rgba(255, 0, 128, 0.52), rgba(255, 184, 0, 0.25));
          box-shadow: 0 0 10px rgba(0, 243, 255, 0.35), 0 0 12px rgba(255, 0, 128, 0.25);
        }

        .calibrating .settings-calibration-line {
          animation: calibration-sweep 420ms ease-out 1;
        }

        .settings-status-show {
          animation: settings-status 1100ms ease-in-out 1;
        }

        @keyframes signal-bars {
          0%,
          100% {
            transform: scaleY(var(--signal-low));
            opacity: 0.72;
          }
          50% {
            transform: scaleY(var(--signal-high));
            opacity: 1;
          }
        }

        @keyframes calibration-sweep {
          0% {
            top: -8px;
            opacity: 0;
          }
          14% {
            opacity: 0.92;
          }
          100% {
            top: calc(100% + 8px);
            opacity: 0;
          }
        }

        @keyframes settings-status {
          0% {
            opacity: 0;
            transform: translateY(2px);
          }
          18% {
            opacity: 0.95;
            transform: translateY(0);
          }
          82% {
            opacity: 0.95;
          }
          100% {
            opacity: 0;
            transform: translateY(-2px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .settings-signal-animate,
          .calibrating .settings-calibration-line,
          .settings-status-show {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
