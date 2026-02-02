"use client";

import { useEffect, useState } from "react";

export function BroadcastOverlay({
  enabled,
  allowEasterEgg = true,
}: {
  enabled: boolean;
  allowEasterEgg?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const [flicker, setFlicker] = useState(false);
  const [noiseSeed, setNoiseSeed] = useState<number | null>(null);

  // Ensure no SSR/client mismatch by rendering only after mount
  useEffect(() => {
    setMounted(true);
    setNoiseSeed(Math.floor(Math.random() * 1000));
  }, []);

  useEffect(() => {
    if (!enabled || !allowEasterEgg) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "b") {
        setFlicker(true);
        window.setTimeout(() => setFlicker(false), 250);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled, allowEasterEgg]);

  if (!enabled) return null;
  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      data-broadcast
      data-flicker={flicker ? "true" : "false"}
      style={
        noiseSeed === null
          ? undefined
          : ({ ["--noise-seed" as any]: String(noiseSeed) } as any)
      }
      className="pointer-events-none fixed inset-0 z-40"
    >
      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\"/></svg>')",
          animation: "noise 180ms steps(2) infinite",
        }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "100% 3px",
          animation: "scanlines 6s linear infinite",
        }}
      />

      {/* Color bleed */}
      <div
        className={["absolute inset-0 mix-blend-screen", flicker ? "opacity-25" : "opacity-10"].join(
          " "
        )}
        style={{
          background:
            "linear-gradient(90deg, rgba(255,0,255,0.25), rgba(0,255,255,0.25))",
          transform: flicker ? "translateX(-2px)" : "translateX(0)",
        }}
      />

      {/* Micro jitter */}
      <div
        className="absolute inset-0"
        style={{
          animation: flicker ? "jitter 120ms infinite" : "jitter 900ms infinite",
        }}
      />

      <style jsx>{`
        @keyframes noise {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(-1%, 1%);
          }
          50% {
            transform: translate(1%, -1%);
          }
          75% {
            transform: translate(-1%, -1%);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        @keyframes scanlines {
          from {
            background-position-y: 0;
          }
          to {
            background-position-y: 100%;
          }
        }

        @keyframes jitter {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(0.4px, -0.4px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        [data-flicker="true"] {
          animation: flickerFlash 120ms steps(2) infinite;
        }

        @keyframes flickerFlash {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.85;
          }
          100% {
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          div[style*="noise"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
