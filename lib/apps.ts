export type AppId = "projects" | "studio" | "archive" | "contact";

export type AppDefinition = {
  id: AppId;
  label: string;
  href: `/${string}` | "/";
  subtitle?: string;
};

export const APPS: AppDefinition[] = [
  {
    id: "projects",
    label: "Projects",
    href: "/projects",
    subtitle: "Active work",
  },
  {
    id: "studio",
    label: "Studio",
    href: "/studio",
    subtitle: "How I work",
  },
  {
    id: "archive",
    label: "Archive",
    href: "/archive",
    subtitle: "Past work",
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
    subtitle: "Transmit",
  },
];
