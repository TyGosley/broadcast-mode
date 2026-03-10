import { BootGate } from "../components/BootGate";
import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { HomeHeader } from "../components/HomeHeader";
import { LauncherGrid } from "../components/LauncherGrid";
import { PROJECTS, type Project } from "../lib/projects";

function getFeaturedAccent(project: Project) {
  const signal = `${project.id} ${project.title} ${project.type.join(" ")}`.toLowerCase();

  if (signal.includes("restaurant") || signal.includes("burger") || signal.includes("food")) {
    return { hex: "#FFB800", rgb: "255,184,0" };
  }

  if (signal.includes("fitness") || signal.includes("workout") || signal.includes("health")) {
    return { hex: "#00F3FF", rgb: "0,243,255" };
  }

  return { hex: "#FF0080", rgb: "255,0,128" };
}

function getFeaturedPreview(project: Project) {
  return project.images?.[0] ?? project.coverImage ?? null;
}

export default function HomePage() {
  const featuredProject =
    PROJECTS.find((p) => p.featured && p.status === "live") ??
    PROJECTS.find((p) => p.featured) ??
    null;
  const featuredAccent = featuredProject ? getFeaturedAccent(featuredProject) : null;
  const featuredPreview = featuredProject ? getFeaturedPreview(featuredProject) : null;

  return (
    <BootGate brand="Be Awesome Productions">
      <main className="homepage-shell min-h-[calc(100dvh-88px)]">
        <HomeHeader />
        <section className="ui-section !mt-4 px-4">
          <div className="ui-panel-inset rounded-xl p-3">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="ui-pill px-3 text-[11px]">SYSTEM: ONLINE</span>
              <span className="ui-pill px-3 text-[11px]">SIGNAL: STRONG</span>
              <span className="ui-pill px-3 text-[11px]">MODE: BROADCAST</span>
            </div>
          </div>
        </section>
        <div className="ui-section mt-0 px-4 pt-6">
          <LauncherGrid />
        </div>

        <section className="ui-section ui-stack !mt-10 px-4">
          <div className="ui-panel rounded-2xl p-5 text-center">
            <p className="ui-eyebrow">PATH TO LAUNCH</p>
            <h2 className="mt-2 text-xl font-bold text-white md:text-2xl">
              Studio to Projects to Launch
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-white/70">
              Start with process, review live work, then send your build goals.
              The path is clear and fast.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <Link href="/studio" className="ui-pill px-3 text-xs">
                1 • Studio
              </Link>
              <span className="text-xs text-white/45">→</span>
              <Link href="/projects" className="ui-pill px-3 text-xs">
                2 • Projects
              </Link>
              <span className="text-xs text-white/45">→</span>
              <Link href="/contact" className="ui-pill px-3 text-xs">
                3 • Contact
              </Link>
            </div>
          </div>

          {featuredProject ? (
            <div className="ui-panel-inset relative overflow-hidden rounded-2xl p-5 text-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2 rounded-[22px] blur-2xl"
                style={{
                  background: `radial-gradient(58% 42% at 50% 0%, rgba(${featuredAccent?.rgb ?? "0,243,255"},0.2) 0%, rgba(${featuredAccent?.rgb ?? "0,243,255"},0.08) 38%, transparent 78%)`,
                }}
              />

              <div className="relative mx-auto flex w-fit items-center gap-2">
                <span aria-hidden="true" className="h-px w-5 bg-white/24" />
                <p className="ui-eyebrow tracking-[0.32em] text-white/78">FEATURED BUILD</p>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/42" />
              </div>

              {featuredPreview ? (
                <Link
                  href={`/projects?p=${featuredProject.id}`}
                  className="group relative mx-auto mt-4 block w-full max-w-[220px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F3FF]/70"
                  aria-label={`Open ${featuredProject.title}`}
                >
                    <div className="featured-thumb-scanline relative aspect-[16/10] overflow-hidden rounded-xl border border-white/15 bg-black/35 shadow-[0_10px_24px_rgba(0,0,0,0.45),0_0_16px_rgba(var(--featured-accent-rgb),0.16)] [--featured-accent-rgb:0,243,255] transition duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-[1.02] group-hover:shadow-[0_14px_30px_rgba(0,0,0,0.52),0_0_20px_rgba(var(--featured-accent-rgb),0.24)]"
                    style={
                      { "--featured-accent-rgb": featuredAccent?.rgb ?? "0,243,255" } as CSSProperties
                    }
                  >
                    <Image
                      src={featuredPreview.src}
                      alt={featuredPreview.alt}
                      fill
                      sizes="(max-width: 640px) 55vw, 220px"
                      className="object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: `linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(13,17,23,0.1) 45%, rgba(13,17,23,0.34) 100%), radial-gradient(90% 70% at 50% 0%, ${featuredAccent?.hex ?? "#00F3FF"}33 0%, transparent 76%)`,
                      }}
                    />
                  </div>
                </Link>
              ) : null}

              <h3 className="mt-2 text-lg font-bold text-white md:text-xl">
                {featuredProject.title}
              </h3>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-white/70">
                {featuredProject.summary}
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {featuredProject.type.slice(0, 3).map((tag) => (
                  <span key={tag} className="ui-pill px-3 text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href={`/projects?p=${featuredProject.id}`}
                  className="ui-btn-secondary rounded-2xl px-5 py-3 text-sm"
                >
                  Quick Look
                </Link>
                <Link
                  href="/projects"
                  className="ui-btn-secondary rounded-2xl px-5 py-3 text-sm"
                >
                  Browse All Projects
                </Link>
              </div>
            </div>
          ) : null}
        </section>

        <section className="ui-section !mt-10 px-4 pb-8">
          <div className="ui-panel-strong relative overflow-hidden rounded-3xl p-7 text-center md:p-9">
            <div className="pointer-events-none absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-[#00F3FF]/28 via-[#FF0080]/24 to-[#5F368C]/32 blur-xl opacity-70" />

            <div className="relative">
              <p className="ui-eyebrow text-white/55">READY TO BUILD?</p>
              <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                Let’s build your next website.
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-white/72 md:text-base">
                If you want a site that feels premium, performs fast, and
                converts, send the signal and we’ll scope it quickly.
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="ui-btn-primary rounded-2xl px-6 py-3 text-sm tracking-wide shadow-lg"
                >
                  Start a Project
                </Link>
                <Link
                  href="/studio"
                  className="ui-btn-secondary rounded-2xl px-6 py-3 text-sm"
                >
                  See the Process
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </BootGate>
  );
}
