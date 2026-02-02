"use client";

import { StudioSection } from "../../components/StudioSection";
import { StudioToggle } from "../../components/StudioToggle";
import { STUDIO_PROCESS, STUDIO_STACK } from "../../lib/studioConfig";
import { useSettings } from "../../components/SettingsProvider";
import type { VhsIntensity } from "../../lib/settings";

function IntensityPill({
  value,
  current,
  onChange,
  disabled,
}: {
  value: VhsIntensity;
  current: VhsIntensity;
  onChange: (v: VhsIntensity) => void;
  disabled?: boolean;
}) {
  const active = value === current;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(value)}
      className={[
        "flex-1 rounded-xl border px-3 py-2 text-xs font-semibold transition",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60",
        disabled ? "cursor-not-allowed opacity-50" : "",
        active
          ? "border-white/15 bg-white/12 text-white"
          : "border-white/10 bg-black/30 text-white/75 hover:bg-black/40 hover:text-white",
      ].join(" ")}
    >
      {value === "low" ? "Low" : value === "medium" ? "Medium" : "High"}
    </button>
  );
}

export default function StudioPage() {
  const { settings, updateSettings } = useSettings();

  const setIntensity = (v: VhsIntensity) => updateSettings({ vhsIntensity: v });

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
        <StudioSection title="System Status">
          <ul className="grid gap-2 text-sm text-white/80">
            <li>Broadcast Mode: Active</li>
            <li>Signal Strength: Stable</li>
            <li>Environment: Production-ready</li>
          </ul>
        </StudioSection>

        <StudioSection
          title="Visual Settings"
          description="Optional effects. Toggle at will."
        >
          <div className="grid gap-3">
            <StudioToggle
              label="VHS Overlay"
              description="CRT noise, scanlines, broadcast artifacts"
              enabled={settings.vhsEnabled}
              onChange={(v) => updateSettings({ vhsEnabled: v })}
            />

            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-white">VHS Intensity</div>
                  <div className="text-xs text-white/60">
                    Controls noise + scanlines. Recommended: Medium.
                  </div>
                </div>
                <div className="text-xs text-white/60">
                  {settings.vhsIntensity.toUpperCase()}
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <IntensityPill
                  value="low"
                  current={settings.vhsIntensity}
                  onChange={setIntensity}
                  disabled={!settings.vhsEnabled}
                />
                <IntensityPill
                  value="medium"
                  current={settings.vhsIntensity}
                  onChange={setIntensity}
                  disabled={!settings.vhsEnabled}
                />
                <IntensityPill
                  value="high"
                  current={settings.vhsIntensity}
                  onChange={setIntensity}
                  disabled={!settings.vhsEnabled}
                />
              </div>

              {!settings.vhsEnabled ? (
                <p className="mt-2 text-xs text-white/45">
                  Enable VHS Overlay to preview intensity.
                </p>
              ) : null}
            </div>

            <StudioToggle
              label="Reduced Motion"
              description="Limit animation and flicker effects"
              enabled={settings.reducedMotion}
              onChange={(v) => updateSettings({ reducedMotion: v })}
            />
          </div>

          <p className="mt-3 text-xs text-white/50">
            Tip: Reduced Motion disables flicker and jitter.
          </p>
        </StudioSection>

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

        <StudioSection title="Operator">
          <p className="text-sm text-white/75">
            Be Awesome Productions is a small, focused studio building modern web
            experiences with personality. Fewer buzzwords. More intention.
          </p>
        </StudioSection>
      </div>
    </main>
  );
}
