export type VhsIntensity = "low" | "medium" | "high";

export type Settings = {
  vhsEnabled: boolean;
  vhsIntensity: VhsIntensity;
  reducedMotion: boolean;
};

export const DEFAULT_SETTINGS: Settings = {
  vhsEnabled: true,
  vhsIntensity: "medium",
  reducedMotion: false,
};

export const SETTINGS_STORAGE_KEY = "broadcast-mode:settings";
