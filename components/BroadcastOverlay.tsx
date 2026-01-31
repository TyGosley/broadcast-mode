"use client";

import { useEffect, useState } from "react";

type BroadcastOverlayProps = {
  enabled?: boolean;
  allowEasterEgg?: boolean;
};

export function BroadcastOverlay({
  enabled = true,
  allowEasterEgg = true,
}: BroadcastOverlayProps) {
  const [flicker, setFlicker] = useState(false);
  const [seed, setSeed] = useState<number | null>(null);

  // Generate any variable input only after mount to avoid hydration mismatch
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 1000));
  }, []);

  useEffect(() => {
    if (!allowEasterEgg) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "b") {
        setFlicker(true);
        window.setTimeout(() => setFlicker(false), 650);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [allowEasterEgg]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      data-broadcast
      data-flicker={flicker ? "true" : "false"}
      // Only set the CSS variable once we have a client seed
      style={seed === null ? undefined : ({ ["--noise-seed" as any]: seed } as any)}
      className="pointer-events-none fixed inset-0 z-40"
    />
  );
}
