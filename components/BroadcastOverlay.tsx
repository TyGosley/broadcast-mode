"use client";

import { useEffect, useMemo, useState } from "react";
import type { VhsIntensity } from "../lib/settings";

type Props = {
  enabled: boolean;
  intensity: VhsIntensity;
  allowEasterEgg?: boolean;
};

export function BroadcastOverlay({
  enabled,
  intensity,
  allowEasterEgg = true,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [flicker, setFlicker] = useState(false);

  const config = useMemo(() => {
    if (intensity === "low") {
      return {
        noiseOpacity: "0.07",
        scanOpacity: "0.10",
        scanSize: "4px",
        bleedOpacity: "0.07",
        jitterMs: 1200,
        noiseMs: 260,
      };
    }
    if (intensity === "high") {
      return {
        noiseOpacity: "0.18",
        scanOpacity: "0.24",
        scanSize: "2.5px",
        bleedOpacity: "0.16",
        jitterMs: 700,
        noiseMs: 140,
      };
    }
    return {
      noiseOpacity: "0.12",
      scanOpacity: "0.18",
      scanSize: "3px",
      bleedOpacity: "0.10",
      jitterMs: 900,
      noiseMs: 180,
    };
  }, [intensity]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!enabled) return;

    const burst = (ms: number) => {
      setFlicker(true);
      window.setTimeout(() => setFlicker(false), ms);
    };

    const onBurst = (e: Event) => {
      // optional strength tuning
      const detail = (e as CustomEvent)?.detail as { strength?: "low" | "medium" | "high" } | undefined;
      const strength = detail?.strength ?? "medium";
      burst(strength === "high" ? 380 : strength === "low" ? 180 : 260);
    };

    window.addEventListener("broadcast:burst", onBurst as EventListener);
    return () => window.removeEventListener("broadcast:burst", onBurst as EventListener);
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !allowEasterEgg) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "b") {
        window.dispatchEvent(new CustomEvent("broadcast:burst", { detail: { strength: "medium" } }));
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
      className="pointer-events-none fixed inset-0 z-40"
      style={
        {
          ["--noise-opacity" as any]: config.noiseOpacity,
          ["--scan-opacity" as any]: config.scanOpacity,
          ["--scan-size" as any]: config.scanSize,
          ["--bleed-opacity" as any]: config.bleedOpacity,
          ["--jitter-ms" as any]: `${config.jitterMs}ms`,
          ["--noise-ms" as any]: `${config.noiseMs}ms`,
        } as any
      }
    >
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          opacity: "var(--noise-opacity)",
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\"/></svg>')",
          animation: "noise var(--noise-ms) steps(2) infinite",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          opacity: "var(--scan-opacity)",
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "100% var(--scan-size)",
          animation: "scanlines 6s linear infinite",
        }}
      />

      <div
        className="absolute inset-0 mix-blend-screen"
        style={{
          opacity: flicker ? "calc(var(--bleed-opacity) + 0.10)" : "var(--bleed-opacity)",
          background:
            "linear-gradient(90deg, rgba(255,0,255,0.25), rgba(0,255,255,0.25))",
          transform: flicker ? "translateX(-2px)" : "translateX(0)",
        }}
      />

      {allowEasterEgg ? (
        <div
          className="absolute inset-0"
          style={{
            animation: flicker ? "jitter 120ms infinite" : "jitter var(--jitter-ms) infinite",
          }}
        />
      ) : null}

      <style jsx>{`
        @keyframes noise {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-1%, 1%); }
          50% { transform: translate(1%, -1%); }
          75% { transform: translate(-1%, -1%); }
          100% { transform: translate(0, 0); }
        }

        @keyframes scanlines {
          from { background-position-y: 0; }
          to { background-position-y: 100%; }
        }

        @keyframes jitter {
          0% { transform: translate(0, 0); }
          50% { transform: translate(0.4px, -0.4px); }
          100% { transform: translate(0, 0); }
        }

        [data-flicker="true"] {
          animation: flickerFlash 120ms steps(2) infinite;
        }

        @keyframes flickerFlash {
          0% { opacity: 1; }
          50% { opacity: 0.86; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
