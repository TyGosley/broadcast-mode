"use client";

import { useEffect } from "react";

export function DiagnosticsModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Broadcast Diagnostics">
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close diagnostics"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Window */}
      <div className="absolute left-1/2 top-1/2 w-[min(860px,calc(100%-1.5rem))] -translate-x-1/2 -translate-y-1/2">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_26px_90px_rgba(0,0,0,0.75)] backdrop-blur">
          <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-cyan-400/12 via-fuchsia-500/10 to-purple-500/12 blur-md opacity-70" />

          <div className="relative flex items-center justify-between border-b border-white/10 bg-black/45 px-4 py-3">
            <div>
              <div className="text-sm font-semibold text-white">Broadcast Diagnostics</div>
              <div className="text-xs text-white/55">Hidden system panel</div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/85 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
            >
              Close
            </button>
          </div>

          <div className="relative max-h-[72vh] overflow-y-auto p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <div className="text-xs tracking-[0.25em] text-white/60">SYSTEM</div>
                <ul className="mt-3 grid gap-2 text-sm text-white/75">
                  <li>Mode: Broadcast</li>
                  <li>Overlay: VHS enabled</li>
                  <li>Navigation: Dock + Mini Dock</li>
                </ul>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <div className="text-xs tracking-[0.25em] text-white/60">EASTER EGGS</div>
                <ul className="mt-3 grid gap-2 text-sm text-white/75">
                  <li>Konami Code: Diagnostics window</li>
                  <li>Triple Maximize: Behind the Build</li>
                  <li>Long Press: Signal Burst</li>
                </ul>
              </div>

              <div className="md:col-span-2 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs tracking-[0.25em] text-white/60">NOTE</div>
                <p className="mt-3 text-sm text-white/70">
                  This site is intentionally playful. If you found this panel, you’re the target audience.
                </p>
              </div>
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
