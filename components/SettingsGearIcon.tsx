import type { CSSProperties } from "react";

export function SettingsGearIcon({
  className = "h-4 w-4",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3.4" />
      <path d="M12 2.4v2.1" />
      <path d="M12 19.5v2.1" />
      <path d="M21.6 12h-2.1" />
      <path d="M4.5 12H2.4" />
      <path d="m18.9 5.1-1.5 1.5" />
      <path d="m6.6 17.4-1.5 1.5" />
      <path d="m18.9 18.9-1.5-1.5" />
      <path d="m6.6 6.6-1.5-1.5" />
    </svg>
  );
}
