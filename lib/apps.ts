export type AppDefinition = {
  id: string;
  label: string;
  subtitle?: string;
  href: string;
};

export const APPS: AppDefinition[] = [
  {
    id: "home",
    label: "Home",
    subtitle: "Launcher",
    href: "/",
  },
  {
    id: "projects",
    label: "Projects",
    subtitle: "Work Library",
    href: "/projects",
  },
  {
    id: "studio",
    label: "Studio",
    subtitle: "About + Process",
    href: "/studio",
  },
  {
    id: "archive",
    label: "Archive",
    subtitle: "Experiments",
    href: "/archive",
  },
  {
    id: "contact",
    label: "Contact",
    subtitle: "Transmit",
    href: "/contact",
  },
];
