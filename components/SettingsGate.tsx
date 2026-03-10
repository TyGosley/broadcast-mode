"use client";

import React from "react";
import { useSettings } from "./SettingsProvider";

type Props = {
  children: React.ReactNode;
};

export function SettingsGate({ children }: Props) {
  const { settings } = useSettings();

  const intensity = settings.vhsIntensity === "low"
    ? 20
    : settings.vhsIntensity === "high"
      ? 55
      : 35;

  return (
    <div
      data-settings
      data-vhs={settings.vhsEnabled ? "on" : "off"}
      data-reduced-motion={settings.reducedMotion ? "on" : "off"}
      style={
        {
          "--vhs-intensity": intensity,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
