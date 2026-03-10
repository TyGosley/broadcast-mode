"use client";

import { BroadcastOverlay } from "./BroadcastOverlay";
import { useSettings } from "./SettingsProvider";

export function OverlayController() {
  const { settings } = useSettings();

  return (
    <BroadcastOverlay
      enabled={settings.vhsEnabled}
      intensity={settings.vhsIntensity}
      reducedMotion={settings.reducedMotion}
      allowEasterEgg
    />
  );
}
