"use client";

import { BroadcastOverlay } from "./BroadcastOverlay";
import { useSettings } from "./SettingsProvider";

export function SettingsGate() {
  const { settings } = useSettings();

  return (
    <BroadcastOverlay
      enabled={settings.vhsEnabled}
      allowEasterEgg={!settings.reducedMotion}
    />
  );
}
