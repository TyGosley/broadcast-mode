"use client";

export function StudioSections() {
  return (
    <div className="grid gap-6">
      {/* Intro */}
      <section className="rounded-2xl border border-white/10 bg-black/35 p-6 backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
        <p className="text-xs tracking-[0.35em] text-white/55">STUDIO</p>
        <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
          Built for brands that want something memorable
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-white/70">
          Be Awesome Productions designs and builds mobile-first websites and interactive UI
          systems with a retro-future edge. I care about clarity, responsiveness, and the small
          details that make people feel something.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
            Web Design
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
            React / Next.js
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
            UI Systems
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
            Motion + Interaction
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
            Accessibility-minded
          </span>
        </div>
      </section>

      {/* Process */}
      <section className="rounded-2xl border border-white/10 bg-black/35 p-6 backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.35em] text-white/55">PROCESS</p>
            <h2 className="mt-2 text-2xl font-bold text-white">A simple 3-step build</h2>
          </div>
          <p className="hidden md:block text-xs text-white/55">
            Designed to keep scope clear and shipping predictable.
          </p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs tracking-[0.3em] text-cyan-200/80">01 DISCOVER</p>
            <h3 className="mt-2 text-lg font-semibold text-white">Align on the problem</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>• Goals, audience, and success criteria</li>
              <li>• Content + sitemap sanity check</li>
              <li>• Moodboard and direction lock</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs tracking-[0.3em] text-fuchsia-200/80">02 DESIGN</p>
            <h3 className="mt-2 text-lg font-semibold text-white">Make it clear and bold</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>• Mobile-first layout + type scale</li>
              <li>• Component system (reusable UI)</li>
              <li>• Interaction moments that support intent</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs tracking-[0.3em] text-emerald-200/80">03 BUILD</p>
            <h3 className="mt-2 text-lg font-semibold text-white">Ship something solid</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>• Responsive implementation</li>
              <li>• Performance + accessibility checks</li>
              <li>• Deploy + handoff (or iterate)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Values / principles */}
      <section className="rounded-2xl border border-white/10 bg-black/35 p-6 backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
        <p className="text-xs tracking-[0.35em] text-white/55">PRINCIPLES</p>
        <h2 className="mt-2 text-2xl font-bold text-white">
          Retro style, modern standards
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <h3 className="text-lg font-semibold text-white">Clarity wins</h3>
            <p className="mt-2 text-sm text-white/70">
              Your users should instantly understand what you do and what to do next. Style is a
              multiplier, not a substitute.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <h3 className="text-lg font-semibold text-white">Mobile-first always</h3>
            <p className="mt-2 text-sm text-white/70">
              The experience is designed on small screens first, then scaled up. No cramped desktop
              layouts stuffed into mobile.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <h3 className="text-lg font-semibold text-white">Accessible by default</h3>
            <p className="mt-2 text-sm text-white/70">
              Motion respects reduced-motion settings. Tap targets are generous. Keyboard paths
              matter. Good UX includes everyone.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <h3 className="text-lg font-semibold text-white">Ship, then iterate</h3>
            <p className="mt-2 text-sm text-white/70">
              We aim for a strong v1 quickly, then refine. It keeps momentum and prevents endless
              redesign cycles.
            </p>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="rounded-2xl border border-white/10 bg-black/35 p-6 backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.35em] text-white/55">STACK</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Tools I like to build with</h2>
          </div>
          <p className="hidden md:block text-xs text-white/55">
            Chosen for speed, maintainability, and clean UI.
          </p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <h3 className="text-sm font-semibold text-white/85">Core</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {["React", "Next.js", "TypeScript", "Node.js"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <h3 className="text-sm font-semibold text-white/85">UI + Motion</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Tailwind", "CSS", "Framer Motion", "Shadcn/UI"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <h3 className="text-sm font-semibold text-white/85">3D / Visual</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Three.js", "R3F", "WebGL"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/12 via-fuchsia-500/10 to-purple-500/12 p-6 backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
        <p className="text-xs tracking-[0.35em] text-white/55">NEXT STEP</p>
        <h2 className="mt-2 text-2xl font-bold text-white">Want to build something?</h2>
        <p className="mt-2 max-w-2xl text-sm text-white/70">
          If you have a website that needs a stronger identity, cleaner UX, or a modern rebuild, I’m
          down. Send a message and tell me what you’re aiming for.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="/contact"
            className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
          >
            Go to Contact
          </a>
          <a
            href="/projects"
            className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm font-semibold text-white/85 hover:bg-black/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300/60"
          >
            Browse Projects
          </a>
        </div>
      </section>
    </div>
  );
}
