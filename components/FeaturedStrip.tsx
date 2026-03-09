"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "../lib/projects";

function getThumb(project: Project) {
  const fromImages = project.images?.[0]?.src;
  const fromCover = project.coverImage?.src;
  return fromImages || fromCover || null;
}

function statusPill(status: Project["status"]) {
  if (status === "live") return "bg-[#FF0080]/30 text-[#FFD8EA] border-[#FF0080]/70";
  if (status === "in-progress") return "bg-[#00F3FF]/32 text-[#DEE6FF] border-[#00F3FF]/70";
  return "bg-[#5F368C]/50 text-[#E9CCFF] border-[#5F368C]/80";
}

const HOME_CARD_THEME = [
  { variant: "card-pink", accent: "#FF0080", accentRgb: "255,0,128" },
  { variant: "card-cyan", accent: "#00F3FF", accentRgb: "0,243,255" },
  { variant: "card-amber", accent: "#FFB800", accentRgb: "255,184,0" },
  { variant: "card-cyan", accent: "#00F3FF", accentRgb: "0,243,255" },
] as const;

function homeThemeAt(index: number) {
  return HOME_CARD_THEME[index % HOME_CARD_THEME.length];
}

export function FeaturedStrip({
  projects,
  onOpen,
}: {
  projects: Project[];
  onOpen: (id: string) => void;
}) {
  if (!projects.length) return null;

  return (
    <section className="ui-section !mt-7">
      <div className="flex flex-col items-center gap-2">
        <div>
          <p className="ui-eyebrow">FEATURED</p>
          <h2 className="mt-2 text-lg font-bold text-white">
            Quick access to top work
          </h2>
        </div>

        <div className="text-xs text-white/55">
          Swipe or scroll →
        </div>
      </div>

      <div className="mt-4">
        <div className="relative">
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/60 to-black/0 md:hidden" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/60 to-black/0 md:hidden" />

          <div className="flex gap-3 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] md:justify-center md:overflow-visible md:pb-0">
            {projects.map((p, index) => {
              const thumb = getThumb(p);
              const tags = p.type.slice(0, 3);
              const theme = homeThemeAt(index);
              const cardVars: CSSProperties & { "--card-accent-rgb": string } = {
                "--card-accent-rgb": theme.accentRgb,
              };

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onOpen(p.id)}
                  style={cardVars}
                  className={[
                    "featured-module-card card-module group relative h-[420px] w-[260px] shrink-0 overflow-hidden rounded-2xl",
                    theme.variant,
                    "border border-white/12 bg-[#0D1117]/58 text-center backdrop-blur-2xl",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0080]/70",
                  ].join(" ")}
                >
                  <div
                    className="pointer-events-none absolute -inset-0.5 rounded-2xl blur-md opacity-75"
                    style={{
                      background: `radial-gradient(130% 90% at 50% 0%, ${theme.accent}55 0%, transparent 70%)`,
                    }}
                  />

                  <div className="relative flex h-full flex-col">
                    <div className="featured-thumb-scanline relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl border-b border-white/10 bg-black/45">
                      {thumb ? (
                        <>
                          <Image
                            src={thumb}
                            alt={`${p.title} preview`}
                            fill
                            sizes="260px"
                            className="object-cover opacity-[0.97] [filter:brightness(1.08)_contrast(1.04)_saturate(1.07)] transition duration-300 ease-out group-hover:scale-[1.03] group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/54 via-black/12 to-black/8" />
                        </>
                      ) : (
                        <>
                          {/* fallback mini static */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="/static/no-signal.png"
                            alt=""
                            className="h-full w-full object-cover opacity-[0.97] [filter:brightness(1.08)_contrast(1.04)_saturate(1.07)]"
                            draggable={false}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/54 via-black/12 to-black/8" />
                        </>
                      )}

                      <div className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.2em] backdrop-blur-sm">
                        <span className={["rounded-full border", statusPill(p.status)].join(" ")}>
                          <span className="px-2 py-0.5 inline-block">
                            {p.status === "live"
                              ? "LIVE"
                              : p.status === "in-progress"
                              ? "IN PROGRESS"
                              : "ARCHIVED"}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col justify-start p-4">
                      <div className="text-xs tracking-[0.25em] text-white/55">
                        {(p.client ?? "INTERNAL") + (p.year ? ` • ${p.year}` : "")}
                      </div>

                      <div className="font-display mt-2 truncate text-base font-bold text-white">
                        {p.title}
                      </div>

                      <p className="mt-2 min-h-[2.75rem] line-clamp-2 text-sm text-white/70">
                        {p.summary}
                      </p>

                      <div className="mt-3 grid grid-cols-2 justify-center gap-2">
                        {tags.map((t, i) => (
                          <span
                            key={t}
                            className={[
                              "ui-pill px-2.5 text-xs",
                              i === 2 ? "col-span-2 justify-self-center" : "",
                            ].join(" ")}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/*
          Dev note:
          Featured items are controlled by `featured: true` in `lib/projects.ts`.
        */}
      </div>
    </section>
  );
}
