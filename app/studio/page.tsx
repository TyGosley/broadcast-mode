"use client";

import { useState } from "react";
import { StudioSection } from "../../components/StudioSection";
import { StudioToggle } from "../../components/StudioToggle";
import { STUDIO_PROCESS, STUDIO_STACK } from "../../lib/studioConfig";

export default function StudioPage() {
  const [vhsEnabled, setVhsEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  return (
    <main className="min-h-dvh px-5 py-8 pb-12">
      <header className="mx-auto max-w-5xl">
        <p className="text-xs tracking-[0.25em] text-white/60">STUDIO</p>
        <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
          System Settings
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-white/70">
          Configure the experience and learn how Be Awesome Productions works.
        </p>
      </header>

      <div className="mx-auto mt-8 grid max-w-5xl gap-6">
        {/* System Status */}
        <StudioSection title="System Status">
          <ul className="grid gap-2 text-sm text-white/80">
            <li>Broadcast Mode: Active</li>
            <li>Signal Strength: Stable</li>
            <li>Environment: Production-ready</li>
          </ul>
        </StudioSection>

        {/* Visual Settings */}
        <StudioSection
          title="Visual Settings"
          description="Optional effects. Toggle at will."
        >
          <div className="grid gap-3">
            <StudioToggle
              label="VHS Overlay"
              description="CRT noise, scanlines, broadcast artifacts"
              enabled={vhsEnabled}
              onChange={setVhsEnabled}
            />

            <StudioToggle
              label="Reduced Motion"
              description="Limit animation and flicker effects"
              enabled={reducedMotion}
              onChange={setReducedMotion}
            />
          </div>
        </StudioSection>

        {/* Process */}
        <StudioSection title="Process">
          <div className="grid gap-4 md:grid-cols-2">
            {STUDIO_PROCESS.map((step) => (
              <div
                key={step.title}
                className="rounded-xl border border-white/10 bg-black/30 p-4"
              >
                <div className="text-sm font-semibold text-white">
                  {step.title}
                </div>
                <p className="mt-1 text-xs text-white/70">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </StudioSection>

        {/* Stack */}
        <StudioSection title="Stack">
          <ul className="flex flex-wrap gap-2">
            {STUDIO_STACK.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/80"
              >
                {tech}
              </li>
            ))}
          </ul>
        </StudioSection>

        {/* Operator */}
        <StudioSection title="Operator">
          <p className="text-sm text-white/75">
            Be Awesome Productions is a small, focused studio building modern
            web experiences with personality. Fewer buzzwords. More intention.
          </p>
        </StudioSection>
      </div>
    </main>
  );
}
