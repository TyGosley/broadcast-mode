"use client";

import Image from "next/image";
import type { Project } from "../lib/projects";

function getThumb(project: Project) {
  const fromImages = project.images?.[0]?.src;
  const fromCover = project.coverImage?.src;
  return fromImages || fromCover || null;
}

function statusPill(status: Project["status"]) {
  if (status === "live") return "bg-emerald-400/18 text-emerald-200 border-emerald-400/30";
  if (status === "in-progress") return "bg-cyan-400/18 text-cyan-200 border-cyan-400/30";
  return "bg-purple-400/18 text-purple-200 border-purple-400/30";
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
    <section className="mx-auto mt-7 max-w-5xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.25em] text-white/60">FEATURED</p>
          <h2 className="mt-2 text-lg font-bold text-white">
            Quick access to top work
          </h2>
        </div>

        <div className="hidden sm:block text-xs text-white/55">
          Swipe or scroll →
        </div>
      </div>

      <div className="mt-4">
        <div className="relative">
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/60 to-black/0" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/60 to-black/0" />

          <div className="flex gap-3 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
            {projects.map((p) => {
              const thumb = getThumb(p);

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onOpen(p.id)}
                  className={[
                    "group relative w-[260px] shrink-0 overflow-hidden rounded-2xl",
                    "border border-white/10 bg-black/35 text-left",
                    "shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_18px_55px_rgba(0,0,0,0.55)]",
                    "transition hover:bg-black/45 hover:border-white/15",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/70",
                  ].join(" ")}
                >
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-cyan-400/10 via-fuchsia-500/10 to-purple-500/10 blur-md opacity-70" />

                  <div className="relative">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                      {thumb ? (
                        <>
                          <Image
                            src={thumb}
                            alt={`${p.title} preview`}
                            fill
                            sizes="260px"
                            className="object-cover opacity-95 transition group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />
                        </>
                      ) : (
                        <>
                          {/* fallback mini static */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="/static/no-signal.png"
                            alt=""
                            className="h-full w-full object-cover opacity-95"
                            draggable={false}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />
                        </>
                      )}

                      <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.2em] backdrop-blur-sm">
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

                    <div className="p-4">
                      <div className="text-xs tracking-[0.25em] text-white/55">
                        {(p.client ?? "INTERNAL") + (p.year ? ` • ${p.year}` : "")}
                      </div>

                      <div className="mt-2 truncate text-base font-bold text-white">
                        {p.title}
                      </div>

                      <p className="mt-2 line-clamp-2 text-sm text-white/70">
                        {p.summary}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.type.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/75"
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

        <div className="mt-2 text-xs text-white/50">
          Tip: Featured is controlled by <span className="text-white/75 font-semibold">featured: true</span> in <span className="text-white/75">lib/projects.ts</span>.
        </div>
      </div>
    </section>
  );
}
