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

  status: ProjectStatus;
  format: ProjectFormat;

  type: string[];

  role?: string;
  stack?: string[];
  highlights?: string[];
  outcomes?: string[];

  context?: string;
  constraints?: string[];

  href?: string;
  behindTheBuild?: BehindTheBuild;

  // ✅ NEW: optional cover image for cards/modals (served from /public)
  coverImage?: {
    src: string; // e.g. "/projects/tactic-app.jpg"
    alt: string; // accessible alt for the project thumbnail
  };
};

export const projects: Project[] = [
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
    coverImage: {
      src: "/projects/broadcast-mode.jpg",
      alt: "Broadcast Mode OS-style interface preview",
    },
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
    stack: ["React", "Prisma", "Tailwind"],
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
        "As part of the small team on Boldly Fine, LLC, I wore a lot of hats on this one. I led the project management and helped with web design. I also led daily and weekly updates to the client and coordinated with the backend developer to ensure the custom content structure worked seamlessly with the design.",
      notes: ["Typography and spacing first", "Animations used only as feedback"],
    },
    href: "https://app.tacticworksout.com/login",
    coverImage: {
      src: "/projects/tacticFitnessLogo.jpg",
      alt: "Tactic Fitness App dashboard preview",
    },
  },

  {
    id: "full-time-burgers",
    title: "Full Time Burgers",
    summary:
      "A vibrant restaurant website highlighting the Full Time Burgers brand, menu, and customer experience.",
    client: "Full Time Burgers",
    year: "2025",
    status: "live",
    format: "cassette",
    type: ["Restaurant Site", "Brand", "Responsive UI"],
    role: "Project Manager, Web Design + Build",
    stack: ["Squarespace", "HTML", "CSS", "JavaScript", "SEO Optimization"],
    context:
      "Full Time Burgers needed a website that captured their fun and vibrant brand while providing customers with easy access to their menu, locations, and online ordering.",
    constraints: ["Brand consistency with existing materials"],
    outcomes: [
      "Improved mobile layout and readability",
      "Gained experience implementing custom code on Squarespace",
      "Applied practical SEO best practices",
    ],
    behindTheBuild: {
      body:
        "This was my first project as a freelance web designer, and I learned a ton about responsive design, component thinking, and SEO best practices. I built the site on Squarespace to allow for easy content updates by the client, but I also customized it with custom HTML, CSS, and JavaScript to achieve the unique look and functionality they wanted.",
    },
    href: "https://www.fulltimeburgers.com/",
    coverImage: {
      src: "/projects/fullTimeBurgers.png",
      alt: "Full Time Burgers website preview",
    },
  },

  {
    id: "emergence-financial-corp",
    title: "Emergence Financial Corporation",
    summary:
      "A landing page for a financial corporation, showcasing their services, team, and contact information with a clean and professional design.",
    client: "Emergence Financial Corporation",
    year: "2025",
    status: "in-progress",
    format: "cd",
    type: ["Financial Site", "Brand", "Responsive UI"],
    role: "Project Manager, Web Design + Build",
    stack: ["Squarespace", "HTML", "CSS", "JavaScript", "SEO Optimization"],
    context:
      "Emergence Financial needed a website that captured their professional brand while providing customers with easy access to their services, team, and contact information.",
    constraints: [
      "Branding was created from scratch",
      "Clean and professional design with a modern touch",
      "Small team with limited bandwith for heavy assets or complex interactions",
    ],
    outcomes: [
      "Squarespace customization skills",
      "Experience working with a client with no existing branding",
      "Applied practical SEO best practices",
    ],
    behindTheBuild: {
      body:
        "This project is still in progress, but so far I've been responsible for project management, web design, and build. I'm building the site on Squarespace to allow for easy content updates by the client, but I'm also customizing it with custom HTML, CSS, and JavaScript to achieve the unique look and functionality they want. Since this client had no existing branding, I also created a new visual identity for them that reflects their values and target audience.",
    },
    href: "",
    coverImage: {
      src: "/projects/efcHP.png",
      alt: "Emergence Financial landing page preview",
    },
  },
];

export const PROJECTS = projects;
