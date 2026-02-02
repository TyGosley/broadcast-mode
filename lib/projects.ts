export type ProjectStatus = "active" | "shipped" | "archived";
export type ProjectFormat = "cassette" | "cd";

export type Project = {
  id: string;
  title: string;
  client?: string;
  year?: string;
  status: ProjectStatus;
  format: ProjectFormat;
  type: string[];
  summary: string;

  // Case-study-lite fields
  role?: string;
  stack?: string[];
  highlights?: string[];
  outcomes?: string[];

  href?: string; // optional live link
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
    role: "Product + UI Engineering",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Supabase"],
    highlights: [
      "Calendar admin view with consistent styling and workout states",
      "Movement library filtering patterns for scale",
      "Component-driven UI for future content expansion",
    ],
    outcomes: [
      "Faster admin workflow via unified calendar controls",
      "Cleaner UI system for future data integration",
    ],
  },
  {
    id: "broadcast-mode",
    title: "Be Awesome Productions: Broadcast Mode",
    client: "Internal",
    year: "2026",
    status: "active",
    format: "cd",
    type: ["web", "brand", "interactive"],
    summary:
      "Neon OS portfolio with VHS overlay, OS-style navigation, and hidden easter eggs.",
    role: "Design + Frontend",
    stack: ["Next.js", "React", "TypeScript", "Tailwind"],
    highlights: [
      "Mobile mini-dock for fast navigation",
      "Studio page as Settings hub with persisted toggles",
      "VHS overlay with intensity levels",
    ],
    outcomes: ["Distinct brand experience that feels like a product"],
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
    role: "Web Design + Build",
    stack: ["Squarespace", "Custom CSS", "Light JS"],
    highlights: [
      "Custom sections via code injection",
      "Performance pass (images, fonts, layout stability)",
      "SEO essentials: metadata, structure, internal linking",
    ],
    outcomes: ["Better speed + clearer conversion path"],
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
    role: "Brand + Visual Design",
    stack: ["Figma"],
    highlights: [
      "Color system designed for dark-mode neon palettes",
      "Typography pairing for retro-future tone",
      "Reusable social components",
    ],
    outcomes: ["Consistent brand system across channels"],
  },
];
