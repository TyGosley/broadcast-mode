"use client";

import { AppIcon } from "./AppIcon";
import type { AppDefinition } from "../lib/apps";

const APPS: AppDefinition[] = [
  {
    id: "projects",
    label: "Projects",
    subtitle: "Live + in progress",
    href: "/projects",
  },
  {
    id: "studio",
    label: "Studio",
    subtitle: "Process + stack",
    href: "/studio",
  },
  {
    id: "archive",
    label: "Archive",
    subtitle: "Legacy work",
    href: "/archive",
  },
  {
    id: "contact",
    label: "Contact",
    subtitle: "Transmit a message",
    href: "/contact",
  },
];

export function LauncherGrid() {
  return (
    <section aria-label="Launcher" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {APPS.map((app) => (
        <AppIcon key={app.id} app={app} />
      ))}
    </section>
  );
}
