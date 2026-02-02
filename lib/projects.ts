export type ProjectStatus = "active" | "shipped" | "archived";
export type ProjectFormat = "cassette" | "cd";

export type Project = {
  id: string;
  title: string;
  client?: string;
  year?: string;
  status: ProjectStatus;
  format: ProjectFormat;
  type: string[]; // tags like ["web", "branding"]
  summary: string;
  href?: string; // optional live link
  caseStudyHref?: string; // optional internal case study route
};

export const PROJECTS: Project[] = [
  {
    id: "tf-web",
    title: "Tactic Fitness Web App",
    client: "Tactic Fitness",
    year: "2025",
    status: "active",
    format: "cassette",
    type: ["web", "app", "dashboard"],
    summary:
      "Admin + client experience with calendar-driven content, movement library, and scalable UI patterns.",
    href: "",
    caseStudyHref: "",
  },
  {
    id: "be-awesome",
    title: "Be Awesome Productions",
    client: "Internal",
    year: "2026",
    status: "active",
    format: "cd",
    type: ["web", "brand", "interactive"],
    summary:
      "Neon OS / Broadcast Mode portfolio with VHS overlay, easter eggs, and a project library.",
  },
  {
    id: "squarespace-build",
    title: "Squarespace Build: Restaurant",
    client: "Client Example",
    year: "2024",
    status: "shipped",
    format: "cassette",
    type: ["web", "squarespace"],
    summary:
      "Mobile-first marketing site with custom code blocks, performance tuning, and SEO foundations.",
  },
  {
    id: "brand-kit",
    title: "Retro Brand Kit",
    client: "Client Example",
    year: "2024",
    status: "archived",
    format: "cd",
    type: ["branding", "design"],
    summary:
      "Visual system, typography, palette, and social templates with a neon retro vibe.",
  },
];
