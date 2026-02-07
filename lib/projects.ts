export type ProjectStatus = "active" | "in-progress" | "archived";
export type ProjectFormat = "cassette" | "cd";

export type BehindTheBuild = {
  title?: string;
  body: string;
  notes?: string[];
};

export type Project = {
  id: string;
  title: string;
  summary: string;

  client?: string;
  year?: string;

  // ✅ Status model
  status: ProjectStatus;

  // visual format you’re using for cards
  format: ProjectFormat;

  // tags shown on cards / modal
  type: string[];

  // optional metadata shown in modal
  role?: string;
  stack?: string[];
  highlights?: string[];
  outcomes?: string[];

  // credibility pass fields
  context?: string;
  constraints?: string[];

  // link (usually only for Live)
  href?: string;

  // easter egg content (per project)
  behindTheBuild?: BehindTheBuild;
};

export const projects: Project[] = [
  // Replace these with your real projects
  {
    id: "broadcast-mode",
    title: "Broadcast Mode",
    summary:
      "An OS-inspired portfolio experience with VHS overlays, docks, and interactive project windows built mobile-first.",
    client: "Be Awesome Productions",
    year: "2026",
    status: "in-progress",
    format: "cassette",
    type: ["Portfolio", "UI System", "Interactive"],

    role: "Design + Frontend Engineering",
    stack: ["Next.js", "React", "TypeScript", "Tailwind"],

    context:
      "I wanted a portfolio that demonstrates system thinking and interaction design instead of static pages.",
    constraints: [
      "Mobile-first from day one",
      "Keep effects lightweight and readable",
      "Avoid hydration mismatches from dynamic visuals",
    ],
    outcomes: [
      "Consistent OS metaphor across navigation",
      "Discoverable interaction patterns and easter eggs",
      "Modular structure for future pages and content growth",
    ],

    behindTheBuild: {
      title: "Design Intent",
      body:
        "This is an interface, not a page. The OS metaphor reduces friction for browsing work and lets personality show up through subtle effects instead of heavy animation.",
      notes: [
        "Session-based boot sequence",
        "Dock + mini dock navigation",
        "Reduced-motion support for accessibility",
      ],
    },

    href: "",
  },

  {
    id: "client-site-1",
    title: "Client Website Refresh",
    summary:
      "A modern, responsive marketing site refresh focused on clarity, speed, and conversion-friendly layout.",
    client: "Client Name",
    year: "2025",
    status: "active",
    format: "cd",
    type: ["Marketing Site", "Brand", "Responsive UI"],

    role: "Web Design + Build",
    stack: ["Next.js", "React", "Tailwind"],

    context:
      "Client needed a cleaner visual system and a structure that made services and next steps obvious.",
    constraints: [
      "Tight timeline",
      "Existing brand palette had to remain recognizable",
      "Content provided was inconsistent and needed hierarchy",
    ],
    outcomes: [
      "Clearer navigation and page structure",
      "Improved mobile layout and readability",
      "Reusable components for future updates",
    ],

    behindTheBuild: {
      body:
        "I prioritized hierarchy and scanning: strong section rhythm, predictable spacing, and interactions that support navigation instead of distracting from content.",
      notes: ["Typography and spacing first", "Animations used only as feedback"],
    },

    href: "https://example.com",
  },

  {
    id: "school-project-1",
    title: "School Project Archive",
    summary:
      "A legacy project that shows early experimentation with layout systems and component structure.",
    client: "School / Personal",
    year: "2022",
    status: "archived",
    format: "cassette",
    type: ["Archive", "Learning", "UI"],

    role: "Student Project",
    stack: ["HTML", "CSS", "JavaScript"],

    context:
      "Built during school as an early exploration of responsive layout and basic UI states.",
    constraints: ["Limited time", "Early-stage skills", "Basic tooling"],
    outcomes: ["Learned responsive layout fundamentals", "Improved component thinking"],

    behindTheBuild: {
      body:
        "This one is here to show the trajectory. The approach is simpler, but it highlights growth in structure and consistency over time.",
    },

    href: "",
  },
];

// ✅ Backwards-compatible alias for existing imports
export const PROJECTS = projects;
