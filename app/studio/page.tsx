import type { CSSProperties } from "react";
import { TrustPack } from "../../components/TrustPack";

export default function StudioPage() {
  return (
    <main className="min-h-dvh px-5 py-10">
      <header className="ui-section mt-0 text-center">
        <p className="ui-eyebrow">STUDIO</p>

        <h1 className="page-title mt-2 text-white">
          Design + build that feels premium and converts.
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70 md:text-base">
          Be Awesome Productions builds modern websites and interactive
          experiences with a clear system, fast delivery, and a vibe you can’t
          get from templates.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/contact"
            className={[
              "ui-btn-primary rounded-2xl px-6 py-3 text-sm tracking-wide",
              "shadow-lg",
              "transition hover:scale-[1.03] hover:shadow-xl",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0080]/75",
            ].join(" ")}
          >
            Start a Project
          </a>

          <a
            href="/projects"
            className={[
              "ui-btn-secondary rounded-2xl px-6 py-3 text-sm",
              "transition hover:bg-white/10",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F3FF]/75",
            ].join(" ")}
          >
            See Work
          </a>
        </div>
      </header>

      {/* SERVICES */}
      <section className="ui-section !mt-14">
        <div className="text-center">
          <p className="ui-eyebrow">SERVICES</p>
          <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
            What I can build for you
          </h2>
          <p className="mt-3 text-xs text-white/55">
            Mobile-first. Accessible. Fast.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <ServiceCard
            title="Web Design + Build"
            sub="Marketing sites + custom UI"
            bullets={[
              "Homepage + core pages",
              "Responsive layout system",
              "Brand-forward visuals",
              "Modern performance patterns",
            ]}
            tone="cyan"
          />

          <ServiceCard
            title="Squarespace Customization"
            sub="Best of both worlds"
            bullets={[
              "Custom CSS + JS upgrades",
              "Template refinements",
              "Speed + layout cleanup",
              "Content editing system",
            ]}
            tone="fuchsia"
          />

          <ServiceCard
            title="Interactive Experiences"
            sub="The fun stuff (done right)"
            bullets={[
              "Three.js / motion UI",
              "Micro-interactions",
              "Easter eggs + delight",
              "Still readable + fast",
            ]}
            tone="amber"
          />
        </div>
      </section>

      <section className="ui-section !mt-10">
        <div className="ui-panel-inset rounded-xl p-3">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="ui-eyebrow text-white/55">PIPELINE STATUS</span>
            <span className="ui-pill px-3 text-[11px]">QUEUE: STABLE</span>
            <span className="ui-pill px-3 text-[11px]">BUILD FLOW: LIVE</span>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="ui-section !mt-14 relative overflow-hidden rounded-3xl px-3 py-2">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.08]">
          <div className="absolute -left-10 top-16 h-56 w-56 rounded-full border border-white/35" />
          <div className="absolute left-5 top-[7.5rem] h-24 w-24 rounded-full border border-white/30" />
          <div className="absolute right-[-2rem] top-14 h-64 w-64 rounded-full border border-white/35" />
          <div className="absolute right-16 top-32 h-28 w-28 rounded-full border border-white/30" />
          <div className="absolute left-20 right-20 top-1/2 h-[2px] -translate-y-1/2 bg-white/18" />
        </div>

        <div className="relative z-10 text-center">
          <p className="ui-eyebrow">PROCESS</p>
          <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
            A clean system that keeps projects moving
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70">
            You’ll always know what’s happening, what’s next, and what decisions
            you need to make. No chaos. No ghosting.
          </p>
        </div>

        <div className="relative z-10 mt-7 grid gap-5 md:grid-cols-2">
          <ProcessStep
            number="01"
            tone="cyan"
            title="Discovery"
            desc="Goals, audience, scope. I gather content needs and identify what will move the needle."
            items={[
              "Project intake + requirements",
              "Content + page map",
              "Success metrics",
            ]}
          />

          <ProcessStep
            number="02"
            tone="fuchsia"
            title="Design System"
            desc="A clear UI direction that matches your brand and creates trust."
            items={[
              "Typography + spacing system",
              "Color + component style",
              "Key layout prototypes",
            ]}
          />

          <ProcessStep
            number="03"
            tone="amber"
            title="Build"
            desc="Fast, responsive implementation with performance and accessibility baked in."
            items={[
              "Component buildout",
              "Mobile-first responsiveness",
              "SEO + metadata structure",
            ]}
          />

          <ProcessStep
            number="04"
            tone="cyan"
            title="Launch + Support"
            desc="Deploy, test, and ship. Then iterate if needed."
            items={[
              "QA pass + fixes",
              "Launch checklist",
              "Post-launch enhancements",
            ]}
          />
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="ui-section !mt-14">
        <div className="text-center">
          <p className="ui-eyebrow">DELIVERABLES</p>
          <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
            What you get
          </h2>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <DeliverableCard
            tone="cyan"
            title="A site that looks expensive"
            desc="Clean UI, strong hierarchy, and a branded system that doesn’t feel templated."
          />
          <DeliverableCard
            tone="fuchsia"
            title="A site that loads fast"
            desc="Optimized images, best practices, and a mobile-first build approach."
          />
          <DeliverableCard
            tone="amber"
            title="A site that converts"
            desc="Clear CTAs, trust signals, and sections that guide users toward action."
          />
        </div>
      </section>

      {/* TRUST PACK */}
      <TrustPack />

      {/* CTA */}
      <section className="ui-section !mt-16">
        <div className="ui-panel-strong relative overflow-hidden rounded-3xl p-8 md:p-10">
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-[#00F3FF]/30 via-[#FF0080]/28 to-[#5F368C]/34 blur-xl opacity-70" />

          <div className="relative text-center">
            <p className="ui-eyebrow text-white/55">
              READY WHEN YOU ARE
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
              Tell me what you’re building.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 md:text-base">
              If you want a website that feels different, looks premium, and
              respects performance, let’s talk.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/contact"
                className={[
                  "ui-btn-primary rounded-2xl px-6 py-3 text-sm tracking-wide",
                  "shadow-lg",
                  "transition hover:scale-[1.03] hover:shadow-xl",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0080]/75",
                ].join(" ")}
              >
                Start a Project
              </a>

              <a
                href="/projects"
                className={[
                  "ui-btn-secondary rounded-2xl px-6 py-3 text-sm",
                  "transition hover:bg-white/10",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F3FF]/75",
                ].join(" ")}
              >
                Browse Projects
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ------------------ components (local) ------------------ */

type ModuleTone = "cyan" | "fuchsia" | "amber";

function moduleTheme(tone: ModuleTone) {
  if (tone === "cyan") {
    return { variant: "card-cyan", accent: "#00F3FF", accentRgb: "0,243,255" };
  }
  if (tone === "fuchsia") {
    return { variant: "card-pink", accent: "#FF0080", accentRgb: "255,0,128" };
  }
  return { variant: "card-amber", accent: "#FFB800", accentRgb: "255,184,0" };
}

function dymoVariant(tone: ModuleTone) {
  if (tone === "cyan") return "dymo-teal";
  if (tone === "fuchsia") return "dymo-pink";
  return "dymo-amber";
}

function ServiceCard({
  title,
  sub,
  bullets,
  tone,
}: {
  title: string;
  sub: string;
  bullets: string[];
  tone: ModuleTone;
}) {
  const theme = moduleTheme(tone);
  const cardVars: CSSProperties & { "--card-accent-rgb": string } = {
    "--card-accent-rgb": theme.accentRgb,
  };

  return (
    <div
      className={[
        "card-module relative overflow-hidden rounded-2xl border border-white/12 bg-[#0D1117]/58 p-6 pl-8 backdrop-blur-2xl",
        theme.variant,
      ].join(" ")}
      style={cardVars}
    >
      <div
        className="pointer-events-none absolute -inset-0.5 rounded-2xl blur-md opacity-75"
        style={{
          background: `radial-gradient(130% 90% at 50% 0%, ${theme.accent}55 0%, transparent 70%)`,
        }}
      />
      <span className="pointer-events-none absolute inset-y-2 left-2 w-1 rounded-full bg-gradient-to-b from-white/30 via-white/10 to-white/25 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)]" />
      <span className="pointer-events-none absolute inset-y-2 left-4 w-[1px] bg-white/14" />

      <div className="relative">
        <div className="flex justify-center">
          <p className={["dymo-label", dymoVariant(tone)].join(" ")}>
            {sub}
          </p>
        </div>
        <h3 className="mt-2 text-lg font-bold text-white">{title}</h3>

        <ul className="mt-4 grid gap-2 text-sm text-white/75">
          {bullets.map((b) => (
            <li
              key={b}
              className="ui-panel-inset rounded-xl px-3 py-2"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProcessStep({
  number,
  tone,
  title,
  desc,
  items,
}: {
  number: string;
  tone: ModuleTone;
  title: string;
  desc: string;
  items: string[];
}) {
  const theme = moduleTheme(tone);
  const cardVars: CSSProperties & { "--card-accent-rgb": string } = {
    "--card-accent-rgb": theme.accentRgb,
  };

  return (
    <div
      className={[
        "card-module relative overflow-hidden rounded-2xl border border-white/12 bg-[#0D1117]/58 p-6 backdrop-blur-2xl",
        theme.variant,
      ].join(" ")}
      style={cardVars}
    >
      <div
        className="pointer-events-none absolute -inset-0.5 rounded-2xl blur-md opacity-75"
        style={{
          background: `radial-gradient(130% 90% at 50% 0%, ${theme.accent}52 0%, transparent 72%)`,
        }}
      />
      <span className="pointer-events-none absolute left-3 top-3 h-2.5 w-2.5 rounded-full border border-white/20 bg-black/45 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_0_4px_rgba(0,0,0,0.45)]" />
      <span className="pointer-events-none absolute right-3 top-3 h-2.5 w-2.5 rounded-full border border-white/20 bg-black/45 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_0_4px_rgba(0,0,0,0.45)]" />
      <span className="pointer-events-none absolute left-3 bottom-3 h-2.5 w-2.5 rounded-full border border-white/20 bg-black/45 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_0_4px_rgba(0,0,0,0.45)]" />
      <span className="pointer-events-none absolute right-3 bottom-3 h-2.5 w-2.5 rounded-full border border-white/20 bg-black/45 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_0_4px_rgba(0,0,0,0.45)]" />

      <div className="relative">
        <div className="flex items-center">
          <div className={["dymo-label", "dymo-step", dymoVariant(tone)].join(" ")}>
            STEP {number}
          </div>
        </div>

        <h3 className="mt-2 text-lg font-bold text-white">{title}</h3>
        <p className="mt-2 text-sm text-white/70">{desc}</p>

        <ul className="mt-4 grid gap-2 text-sm text-white/75">
          {items.map((i) => (
            <li
              key={i}
              className="ui-panel-inset rounded-xl px-3 py-2"
            >
              {i}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DeliverableCard({
  tone,
  title,
  desc,
}: {
  tone: ModuleTone;
  title: string;
  desc: string;
}) {
  const theme = moduleTheme(tone);
  const cardVars: CSSProperties & { "--card-accent-rgb": string } = {
    "--card-accent-rgb": theme.accentRgb,
  };

  return (
    <div
      className={[
        "card-module relative overflow-hidden rounded-2xl border border-white/12 bg-[#0D1117]/58 p-6 pl-8 backdrop-blur-2xl",
        theme.variant,
      ].join(" ")}
      style={cardVars}
    >
      <div
        className="pointer-events-none absolute -inset-0.5 rounded-2xl blur-md opacity-70"
        style={{
          background: `radial-gradient(120% 88% at 40% 0%, ${theme.accent}4d 0%, transparent 74%)`,
        }}
      />
      <span className="pointer-events-none absolute inset-y-2 left-2 w-1 rounded-full bg-gradient-to-b from-white/30 via-white/10 to-white/25 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)]" />
      <span className="pointer-events-none absolute inset-y-2 left-4 w-[1px] bg-white/14" />

      <div className="relative">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="mt-2 text-sm text-white/70">{desc}</p>
      </div>
    </div>
  );
}
