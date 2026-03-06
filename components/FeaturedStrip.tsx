"use client";

import Image from "next/image";
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
      <div className="flex flex-col items-center gap-2">
        <div>
          <p className="text-xs tracking-[0.25em] text-white/60">FEATURED</p>
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
            {projects.map((p) => {
              const thumb = getThumb(p);
              const tags = p.type.slice(0, 3);

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onOpen(p.id)}
                  className={[
                    "group relative h-[420px] w-[260px] shrink-0 overflow-hidden rounded-2xl",
                    "panel-glass text-center",
                    "transition hover:border-white/15",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0080]/70",
                  ].join(" ")}
                >
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-[#00F3FF]/36 via-[#FF0080]/28 to-[#5F368C]/38 blur-md opacity-70" />

                  <div className="relative flex h-full flex-col">
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
                              "rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/75",
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

        <div className="mt-2 text-xs text-white/50">
          Tip: Featured is controlled by <span className="text-white/75 font-semibold">featured: true</span> in <span className="text-white/75">lib/projects.ts</span>.
        </div>
      </div>
    </section>
  );
}
