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

function SignalBars({ active }: { active: boolean }) {
  // Random-ish but stable enough per mount: we keep it subtle
  const [levels, setLevels] = useState([0.35, 0.55, 0.75, 0.5]);

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
          className="w-1 rounded-sm bg-white/70"
          style={{ height: `${Math.round(h * 14) + 6}px` }}
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
    <header className="mx-auto w-full max-w-5xl px-4 pt-6">
      <div className="rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs tracking-[0.35em] text-white/55">
              BROADCAST MODE
            </div>

            <h1 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
              Be Awesome Productions
            </h1>

            <p className="mt-2 max-w-prose text-sm text-white/70">
              {tagline}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
                Mobile-first
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
                React / Next.js
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
                Motion + UI systems
              </span>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.55)]" />
              <span className="text-xs font-semibold text-white/75">
                System ready
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-white/55">
              <span className="hidden sm:inline">Signal</span>
              <SignalBars active={!reducedMotion} />
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-black/30 p-3 text-xs text-white/65">
            Tip: Open <span className="text-white/80">Projects</span> to browse current work.
          </div>
          <div className="rounded-xl border border-white/10 bg-black/30 p-3 text-xs text-white/65">
            Tip: Use the dock to jump between pages fast.
          </div>
        </div>
      </div>
    </header>
  );
}
