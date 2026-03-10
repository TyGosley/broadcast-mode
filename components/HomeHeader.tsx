"use client";

import { useEffect, useMemo, useState } from "react";
import { BroadcastTicker } from "./BroadcastTicker";

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

function SignalBars({ active }: { active: boolean }) {
  const [levels, setLevels] = useState([0.35, 0.55, 0.75, 0.5]);
  const barPalette = ["#00F3FF", "#65FAFF", "#FF0080", "#FFB800"];

  useEffect(() => {
    if (!active) return;

    const tick = () => {
      setLevels([
        0.25 + Math.random() * 0.65,
        0.25 + Math.random() * 0.65,
        0.25 + Math.random() * 0.65,
        0.25 + Math.random() * 0.65,
      ]);
    };

    const id = window.setInterval(tick, 900);
    return () => window.clearInterval(id);
  }, [active]);

  return (
    <div className="flex items-end gap-1" aria-hidden="true">
      {levels.map((h, i) => (
        <span
          key={i}
          className="w-1 rounded-sm"
          style={{
            height: `${Math.round(h * 14) + 6}px`,
            backgroundColor: barPalette[i % barPalette.length],
            boxShadow: `0 0 10px ${barPalette[i % barPalette.length]}`,
          }}
        />
      ))}
    </div>
  );
}

export function HomeHeader() {
  const reducedMotion = usePrefersReducedMotion();

  const tagline = useMemo(
    () => "Web design + interactive builds with retro-future flavor.",
    []
  );

  return (
    <header className="ui-section mt-0 px-4 pt-6">
      <div className="ui-panel rounded-2xl p-5">
        <div className="flex flex-col items-center gap-4">
          <div className="flex min-w-0 flex-col items-center text-center">
            <div className="ui-eyebrow tracking-[0.35em]">
              BROADCAST MODE
            </div>

            <h1
              className="font-display page-title brand-sweep mt-2 text-white"
              data-text="Be Awesome Productions"
            >
              Be Awesome Productions
            </h1>

            <p className="mt-2 max-w-prose text-sm text-white/72">
              {tagline}
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="ui-pill px-3 text-xs font-medium text-white/75">
                Mobile-first
              </span>
              <span className="ui-pill px-3 text-xs font-medium text-white/75">
                React / Next.js
              </span>
              <span className="ui-pill px-3 text-xs font-medium text-white/75">
                Motion + UI systems
              </span>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-center gap-2">
            <div className="ui-pill gap-2 border-[#FFB800]/50 bg-[#0D1117]/68 px-3 text-[#FFB800]">
              <span className="h-2 w-2 rounded-full bg-[#FFB800] shadow-[0_0_18px_rgba(255,184,0,0.72)]" />
              <span className="font-tech text-xs font-semibold text-[#FFB800]">
                System ready
              </span>
            </div>

            <div className="font-tech flex items-center gap-2 text-xs text-[#00F3FF]/80">
              <span className="hidden sm:inline">Signal</span>
              <SignalBars active={!reducedMotion} />
            </div>
          </div>
        </div>
      </div>

      {/* Broadcast ticker */}
      <div className="mt-3">
        <BroadcastTicker />
      </div>
    </header>
  );
}
