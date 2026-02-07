export type ProjectStatus = "live" | "in-progress" | "archived";
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
    id: "tactic-app",
    title: "Tactic Fitness App",
    summary:
      "An interactive fitness platform providing members with daily workouts, video instructions, and progress tracking through a streamlined dashboard.",
    client: "Tactic Fitness",
    year: "2025",
    status: "live",
    format: "cd",
    type: ["Fitness Site", "Brand", "Responsive UI"],

    role: "Project Manager, Web Design + Build",
    stack: ["React", "Prisma","Tailwind"],

    context:
      "Tactic needed a web presence that reflected their energetic brand and provided members with easy access to workouts and progress tracking.",
    constraints: [
      "Build a completely new and custom app that allowed for their unique content structure and fitness programming",
      "Existing brand palette had to remain recognizable",
      "Small team with limited bandwith for heavy assets or complex interactions",
    ],
    outcomes: [
      "Clearer navigation and page structure",
      "Improved mobile layout and readability",
      "Unique backend system for managing workouts and member progress",
    ],

    behindTheBuild: {
      body:
        "As part of the small team on Boldly Fine, LLC, I wore a lot of hats on this one. I led the project management and helped withweb design. I also led daily and weekly updated to the client and coordinated with the backend developer to ensure the custom content structure worked seamlessly with the design.",
      notes: ["Typography and spacing first", "Animations used only as feedback"],
    },

    href: "https://app.tacticworksout.com/login",
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
