export type Settings = {
  vhsEnabled: boolean;
  reducedMotion: boolean;
};

export const DEFAULT_SETTINGS: Settings = {
  vhsEnabled: true,
  reducedMotion: false,
};

export const SETTINGS_STORAGE_KEY = "broadcast-mode:settings";
