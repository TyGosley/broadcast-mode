import { TrustPack } from "../../components/TrustPack";

export default function StudioPage() {
  return (
    <main className="min-h-dvh px-5 py-10 pb-14">
      <header className="mx-auto max-w-5xl">
        <p className="text-xs tracking-[0.25em] text-white/60">STUDIO</p>

        <h1 className="mt-2 text-3xl font-bold text-white md:text-5xl">
          Design + build that feels premium and converts.
        </h1>

        <p className="mt-4 max-w-2xl text-sm text-white/70 md:text-base">
          Be Awesome Productions builds modern websites and interactive
          experiences with a clear system, fast delivery, and a vibe you can’t
          get from templates.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            href="/contact"
            className={[
              "rounded-2xl px-6 py-3 text-sm font-semibold tracking-wide",
              "bg-gradient-to-r from-cyan-400 to-fuchsia-500",
              "text-black shadow-lg",
              "transition hover:scale-[1.03] hover:shadow-xl",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/70",
            ].join(" ")}
          >
            Start a Project
          </a>

          <a
            href="/projects"
            className={[
              "rounded-2xl border border-white/15 px-6 py-3 text-sm font-semibold",
              "bg-white/5 text-white",
              "transition hover:bg-white/10",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70",
            ].join(" ")}
          >
            See Work
          </a>
        </div>
      </header>

      {/* SERVICES */}
      <section className="mx-auto mt-14 max-w-5xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.25em] text-white/60">SERVICES</p>
            <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
              What I can build for you
            </h2>
          </div>
          <p className="hidden md:block text-xs text-white/55">
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
            tone="purple"
          />
        </div>
      </section>

      {/* PROCESS */}
      <section className="mx-auto mt-14 max-w-5xl">
        <p className="text-xs tracking-[0.25em] text-white/60">PROCESS</p>
        <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
          A clean system that keeps projects moving
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-white/70">
          You’ll always know what’s happening, what’s next, and what decisions
          you need to make. No chaos. No ghosting.
        </p>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <ProcessStep
            number="01"
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
      <section className="mx-auto mt-14 max-w-5xl">
        <p className="text-xs tracking-[0.25em] text-white/60">DELIVERABLES</p>
        <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
          What you get
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <DeliverableCard
            title="A site that looks expensive"
            desc="Clean UI, strong hierarchy, and a branded system that doesn’t feel templated."
          />
          <DeliverableCard
            title="A site that loads fast"
            desc="Optimized images, best practices, and a mobile-first build approach."
          />
          <DeliverableCard
            title="A site that converts"
            desc="Clear CTAs, trust signals, and sections that guide users toward action."
          />
        </div>
      </section>

      {/* TRUST PACK */}
      <TrustPack />

      {/* CTA */}
      <section className="mx-auto mt-16 max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/45 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_40px_100px_rgba(0,0,0,0.75)] md:p-10">
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-cyan-500/15 via-fuchsia-500/15 to-purple-500/15 blur-xl opacity-70" />

          <div className="relative">
            <p className="text-xs tracking-[0.3em] text-white/55">
              READY WHEN YOU ARE
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
              Tell me what you’re building.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-white/70 md:text-base">
              If you want a website that feels different, looks premium, and
              respects performance, let’s talk.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className={[
                  "rounded-2xl px-6 py-3 text-sm font-semibold tracking-wide",
                  "bg-gradient-to-r from-cyan-400 to-fuchsia-500",
                  "text-black shadow-lg",
                  "transition hover:scale-[1.03] hover:shadow-xl",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/70",
                ].join(" ")}
              >
                Start a Project
              </a>

              <a
                href="/projects"
                className={[
                  "rounded-2xl border border-white/15 px-6 py-3 text-sm font-semibold",
                  "bg-white/5 text-white",
                  "transition hover:bg-white/10",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70",
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

function ServiceCard({
  title,
  sub,
  bullets,
  tone,
}: {
  title: string;
  sub: string;
  bullets: string[];
  tone: "cyan" | "fuchsia" | "purple";
}) {
  const glow =
    tone === "cyan"
      ? "from-cyan-400/14 via-cyan-400/05 to-fuchsia-500/10"
      : tone === "fuchsia"
      ? "from-fuchsia-500/14 via-fuchsia-500/06 to-purple-500/10"
      : "from-purple-500/14 via-purple-500/06 to-cyan-400/10";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_55px_rgba(0,0,0,0.55)]">
      <div
        className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-br ${glow} blur-xl opacity-80`}
      />

      <div className="relative">
        <p className="text-xs tracking-[0.25em] text-white/55">{sub}</p>
        <h3 className="mt-2 text-lg font-bold text-white">{title}</h3>

        <ul className="mt-4 grid gap-2 text-sm text-white/75">
          {bullets.map((b) => (
            <li
              key={b}
              className="rounded-xl border border-white/10 bg-black/30 px-3 py-2"
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
  title,
  desc,
  items,
}: {
  number: string;
  title: string;
  desc: string;
  items: string[];
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_55px_rgba(0,0,0,0.55)]">
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-fuchsia-500/10 to-purple-500/10 blur-xl opacity-70" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="text-xs tracking-[0.25em] text-white/55">
            STEP {number}
          </div>
          <div className="text-xs text-white/50">Broadcast System</div>
        </div>

        <h3 className="mt-2 text-lg font-bold text-white">{title}</h3>
        <p className="mt-2 text-sm text-white/70">{desc}</p>

        <ul className="mt-4 grid gap-2 text-sm text-white/75">
          {items.map((i) => (
            <li
              key={i}
              className="rounded-xl border border-white/10 bg-black/30 px-3 py-2"
            >
              {i}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DeliverableCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/35 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_55px_rgba(0,0,0,0.55)]">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm text-white/70">{desc}</p>
    </div>
  );
}
