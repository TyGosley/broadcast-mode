export type ProjectStatus = "live" | "in-progress" | "archived";
export type ProjectFormat = "cassette" | "cd";

export type BehindTheBuild = {
  title?: string;
  body: string;
  notes?: string[];
};

export type ProjectCoverImage = {
  src: string; // must live inside /public
  alt: string;
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

  // Primary URLs
  href?: string;         // Production live site
  previewHref?: string;  // Staging / demo / prototype

  // Optional button override
  ctaLabel?: string;

  // Optional secondary link
  secondaryHref?: string;
  secondaryLabel?: string;

  // Image support
  coverImage?: ProjectCoverImage; // legacy single image
  images?: ProjectCoverImage[];   // gallery support (preferred)

  featured?: boolean;

  behindTheBuild?: BehindTheBuild;
};

export const projects: Project[] = [

  /*
  ─────────────────────────────────────────────
  GOLD TEMPLATE — Copy & Paste For New Projects
  ─────────────────────────────────────────────

  {
    id: "project-id",
    title: "Project Title",
    summary: "One sentence explaining what it is and why it matters.",

    client: "Client Name",
    year: "2026",
    status: "live", // "live" | "in-progress" | "archived"
    format: "cd",   // "cd" | "cassette"
    type: ["Tag 1", "Tag 2", "Tag 3"],

    featured: false,

    role: "Your role(s)",
    stack: ["Next.js", "React", "Tailwind"],

    context: "What was the goal or problem?",
    constraints: [
      "Constraint 1",
      "Constraint 2",
      "Constraint 3",
    ],
    outcomes: [
      "Outcome 1",
      "Outcome 2",
      "Outcome 3",
    ],

    // Preferred image method
    images: [
      { src: "/projects/project-id/cover.jpg", alt: "Main preview image" },
      { src: "/projects/project-id/shot-1.jpg", alt: "Secondary screen" },
      { src: "/projects/project-id/shot-2.jpg", alt: "Another screen" },
    ],

    // OR single image fallback
    // coverImage: {
    //   src: "/projects/project-id/cover.jpg",
    //   alt: "Preview image",
    // },

    // ─── Primary Links ───

    // For Live projects
    // href: "https://live-site.com",

    // For In Progress projects with demo
    // previewHref: "https://preview.vercel.app",

    // Optional CTA override
    // ctaLabel: "Visit Site",
    // ctaLabel: "Open Demo",
    // ctaLabel: "View Prototype",

    // ─── Optional Secondary Link ───
    // secondaryHref: "https://github.com/username/project",
    // secondaryLabel: "GitHub",

    behindTheBuild: {
      title: "Behind the Build",
      body: "What you learned, design decisions, tradeoffs.",
      notes: [
        "Key decision 1",
        "Key decision 2",
        "Key decision 3",
      ],
    },
  },

  */


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

    // featured: true,

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

    // Preferred gallery approach
    // images: [
    //   { src: "/projects/broadcast-mode/cover.jpg", alt: "Home screen" },
    //   { src: "/projects/broadcast-mode/shot-1.jpg", alt: "Projects modal" },
    //   { src: "/projects/broadcast-mode/shot-2.jpg", alt: "Project details modal" },
    // ],

    // previewHref: "/projects/broadcast-mode/preview.jpg",
    // ctaLabel: "Open Preview",

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
  },


  {
    id: "tactic-app",
    title: "Tactic Fitness App",
    summary:
      "An interactive fitness platform providing members with daily workouts, video instructions, and progress tracking.",

    client: "Tactic Fitness",
    year: "2025",
    status: "live",
    format: "cd",
    type: ["Fitness Site", "Brand", "Responsive UI"],

    featured: true,

    role: "Project Manager, Web Design + Build",
    stack: ["React", "Prisma", "Tailwind"],

    context:
      "Tactic needed a web presence that reflected their energetic brand and provided members with easy access to workouts.",
    constraints: [
      "Custom content structure",
      "Existing brand palette maintained",
      "Small team bandwidth",
    ],
    outcomes: [
      "Clear navigation system",
      "Improved mobile layout",
      "Custom backend management system",
    ],

    // Preferred gallery approach
    images: [
      { src: "/projects/tactic-app/tacticFitnessLogo.jpg", alt: "Tactic Fitness Logo" },
      // { src: "/projects/tactic-app/shot-1.jpg", alt: "Dashboard" },
      // { src: "/projects/tactic-app/shot-2.jpg", alt: "Workout detail" },
    ],

    // previewHref: "/projects/tactic-app/preview.jpg",
    href: "https://app.tacticworksout.com/login",

    // ctaLabel: "Open App",
    // secondaryHref: "https://github.com/your-repo",
    // secondaryLabel: "GitHub",

    behindTheBuild: {
      body:
        "Led project management and design coordination. Ensured frontend and backend alignment for workout programming structure.",
      notes: [
        "Typography hierarchy focus",
        "Animations used only as feedback",
      ],
    },
  },


  {
    id: "full-time-burgers",
    title: "Full Time Burgers",
    summary:
      "A vibrant restaurant website highlighting brand personality, menu, and customer experience.",

    client: "Full Time Burgers",
    year: "2025",
    status: "live",
    format: "cassette",
    type: ["Restaurant Site", "Brand", "Responsive UI"],
    featured: true,

    role: "Project Manager, Web Design + Build",
    stack: ["Squarespace", "HTML", "CSS", "JavaScript"],

    context:
      "Needed a fun, energetic site aligned with brand personality.",
    constraints: [
      "Brand consistency",
    ],
    outcomes: [
      "Responsive layout improvements",
      "SEO optimization",
    ],

    // Preferred gallery approach
    images: [
      { src: "/projects/full-time-burgers/fullTimeBurgers.png", alt: "Full Time Burgers Logo" },
      { src: "/projects/full-time-burgers/shot-1.jpg", alt: "Menu section" },
      { src: "/projects/full-time-burgers/shot-2.jpg", alt: "Mobile layout" },
    ],

    previewHref: "/projects/full-time-burgers/ftPrevHref.png",
    href: "https://www.fulltimeburgers.com/",
    ctaLabel: "Visit Site",

    behindTheBuild: {
      body:
        "Built on Squarespace for client flexibility, extended with custom HTML/CSS/JS for unique styling and interactivity.",
    },
  },

  {
    id: "emergence-financial-corp",
    title: "Emergence Financial Corporation",
    summary:
      "A landing page for a financial firm, showcasing services, team, and contact information with a clean, professional design.",

    client: "Emergence Financial Corporation",
    year: "2025",
    status: "in-progress",
    format: "cd",
    type: ["Financial Site", "Brand", "Responsive UI"],
    // featured: true,

    role: "Project Manager, Web Design + Build",
    stack: ["Squarespace", "HTML", "CSS", "JavaScript", "SEO Optimization"],

    context:
      "Emergence needed a modern web presence to communicate trust, services, and a clear path to contact.",
    constraints: [
      "Branding created from scratch",
      "Professional tone with a modern touch",
      "Small team with limited bandwidth for heavy assets",
    ],
    outcomes: [
      "Responsive layout improvements",
      "Squarespace customization experience",
      "SEO best practices applied",
      "Created a new visual identity",
    ],

    // Preferred gallery approach
    images: [
      { src: "/projects/emergence-financial-corp/efcHP.png", alt: "Landing page hero" },
      { src: "/projects/emergence-financial-corp/shot-1.jpg", alt: "Services section" },
      { src: "/projects/emergence-financial-corp/shot-2.jpg", alt: "Contact section" },
    ],

    // Optional preview link if you have it
    // previewHref: "/projects/emergence-financial-corp/preview.jpg",
    // ctaLabel: "Open Preview",

    behindTheBuild: {
      body:
        "This project is still in progress. I’m leading project management, design, and build. The site is Squarespace for easy updates, plus custom code for interaction and layout control. Since the client had no existing branding, I created a new visual identity aligned with their values and audience.",
    },

    href: "",
  },

  {
    id: "cpg-rentals",
    title: "CPG Rentals",
    summary:
      "A rental-focused website designed to showcase inventory, streamline inquiries, and convert visitors into booked clients.",

    client: "CPG Rentals",
    year: "2026",
    status: "in-progress",
    format: "cassette",
    type: ["Rental Site", "Brand", "Responsive UI"],
    // featured: true,

    role: "Project Manager, Web Design + Build",
    stack: ["Next.js", "React", "Tailwind"],

    context:
      "CPG needed a modern web presence with clear service categories and an easy way for customers to request rentals.",
    constraints: [
      "Fast browsing for equipment categories",
      "Mobile-first inquiry flow",
      "Content updates needed to stay simple",
    ],
    outcomes: [
      "Cleaner rental discovery experience",
      "Improved inquiry funnel structure",
      "Scalable layout for future inventory growth",
    ],

    // Preferred gallery approach
    images: [
      { src: "/projects/cpg-rentals/cover.jpg", alt: "CPG Rentals homepage" },
      { src: "/projects/cpg-rentals/shot-1.jpg", alt: "Inventory categories" },
      { src: "/projects/cpg-rentals/shot-2.jpg", alt: "Inquiry form flow" },
    ],

    // previewHref: "/projects/cpg-rentals/preview.jpg",
    // ctaLabel: "Open Preview",

    behindTheBuild: {
      body:
        "Focused on balancing visual clarity with conversion: inventory should be quick to scan and contacting the team should feel effortless on mobile and desktop.",
    },

    href: "",
  },

  {
    id: "3d-portfolio",
    title: "3D Portfolio",
    summary:
      "An interactive portfolio concept blending 3D presentation and modern UI to create an immersive case-study browsing experience.",

    client: "Be Awesome Productions",
    year: "2026",
    status: "live",
    format: "cd",
    type: ["Portfolio", "3D", "Interactive"],
    // featured: true,

    role: "Design + Frontend Engineering",
    stack: ["Next.js", "React", "Three.js", "TypeScript"],

    context:
      "The goal was to experiment with spatial storytelling while keeping navigation understandable and performance-friendly.",
    constraints: [
      "Maintain smooth interaction on mid-range devices",
      "Keep motion purposeful and accessible",
      "Preserve clear project hierarchy despite 3D effects",
    ],
    outcomes: [
      "Interactive visual direction validated",
      "Reusable 3D scene patterns established",
      "Balanced immersion with usability",
    ],

    // Preferred gallery approach
    images: [
      { src: "/projects/built-by-tyler-3DPort/welcomesecss.png", alt: "3D portfolio home scene" },
      // { src: "/projects/3d-portfolio/shot-1.jpg", alt: "Case study transition" },
      // { src: "/projects/3d-portfolio/shot-2.jpg", alt: "3D interaction detail" },
    ],

    previewHref: "/projects/built-by-tyler-3DPort/3DPortPrevHref.png",
    // ctaLabel: "Open Preview",

    behindTheBuild: {
      body:
        "This build explores how 3D can support narrative, not distract from it. The architecture prioritizes graceful degradation and strong mobile behavior.",
    },

    href: "https://built-by-tyler3d.vercel.app/",
  },

  {
    id: "tactic-website",
    title: "Tactic Website",
    summary:
      "A public-facing marketing site for Tactic focused on brand clarity, offer positioning, and conversion to onboarding.",

    client: "Tactic Fitness",
    year: "2026",
    status: "live",
    format: "cassette",
    type: ["Marketing Site", "Brand", "Responsive UI"],
    featured: true,

    role: "Project Manager, Web Design + Build",
    stack: ["Next.js", "React", "Tailwind", "CMS Integration"],

    context:
      "Tactic needed a marketing site that clearly communicates value and directs visitors into the product signup journey.",
    constraints: [
      "Differentiate from the app experience",
      "Support frequent content updates",
      "Maintain high conversion clarity above the fold",
    ],
    outcomes: [
      "Stronger first-touch brand messaging",
      "Improved path from marketing page to app signup",
      "Flexible sections for campaigns and updates",
    ],

    // Preferred gallery approach
    images: [
      { src: "/projects/tactic-website/tacticFitness.png", alt: "Tactic website homepage" },
      // { src: "/projects/tactic-website/shot-1.jpg", alt: "Programs section" },
      // { src: "/projects/tactic-website/shot-2.jpg", alt: "Mobile CTA section" },
    ],

    previewHref: "/projects/tactic-website/tfWebPrevHref.png",
    // ctaLabel: "Open Preview",

    behindTheBuild: {
      body:
        "The site is structured to tell the brand story quickly and then guide users into action with minimal friction. Layout decisions emphasize hierarchy and speed.",
    },

    href: "https://www.tacticworksout.com/",
  },

];

// Backwards-compatible alias
export const PROJECTS = projects;
