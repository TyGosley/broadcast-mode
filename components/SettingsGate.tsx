"use client";

import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type Settings = {
  vhsEnabled: boolean;
  vhsIntensity: number; // 0..100
  bootOnVisit: boolean;
};

const DEFAULTS: Settings = {
  vhsEnabled: true,
  vhsIntensity: 35,
  bootOnVisit: true,
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function SettingsGate({ children }: Props) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("broadcast-settings");
      if (!raw) return;

      const parsed = JSON.parse(raw);

      setSettings({
        vhsEnabled:
          typeof parsed?.vhsEnabled === "boolean"
            ? parsed.vhsEnabled
            : DEFAULTS.vhsEnabled,
        vhsIntensity:
          typeof parsed?.vhsIntensity === "number"
            ? clamp(parsed.vhsIntensity, 0, 100)
            : DEFAULTS.vhsIntensity,
        bootOnVisit:
          typeof parsed?.bootOnVisit === "boolean"
            ? parsed.bootOnVisit
            : DEFAULTS.bootOnVisit,
      });
    } catch {
      // keep defaults
    }
  }, []);

  return (
    <div
      data-settings
      data-vhs={settings.vhsEnabled ? "on" : "off"}
      style={
        {
          "--vhs-intensity": settings.vhsIntensity,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}