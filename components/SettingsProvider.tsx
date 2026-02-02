"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_SETTINGS,
  SETTINGS_STORAGE_KEY,
  type Settings,
} from "../lib/settings";

type SettingsContextValue = {
  settings: Settings;
  setSettings: (next: Settings) => void;
  updateSettings: (patch: Partial<Settings>) => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

function readStoredSettings(): Settings | null {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);

    // Guard shape
    if (
      typeof parsed?.vhsEnabled !== "boolean" ||
      typeof parsed?.reducedMotion !== "boolean"
    ) {
      return null;
    }

    return parsed as Settings;
  } catch {
    return null;
  }
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettingsState] = useState<Settings>(DEFAULT_SETTINGS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Load from localStorage on mount
    const stored = readStoredSettings();
    const prm = prefersReducedMotion();

    // If user prefers reduced motion, default it ON (but allow them to override later)
    const base: Settings = stored ?? {
      ...DEFAULT_SETTINGS,
      reducedMotion: prm ? true : DEFAULT_SETTINGS.reducedMotion,
    };

    setSettingsState(base);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore storage failures
    }
  }, [settings, hydrated]);

  const api = useMemo<SettingsContextValue>(() => {
    return {
      settings,
      setSettings: (next) => setSettingsState(next),
      updateSettings: (patch) =>
        setSettingsState((prev) => ({ ...prev, ...patch })),
    };
  }, [settings]);

  return (
    <SettingsContext.Provider value={api}>{children}</SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return ctx;
}
