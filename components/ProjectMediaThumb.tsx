"use client";

import Image from "next/image";
import type { Project } from "../lib/projects";

function MediaBase({
  src,
  alt,
  children,
}: {
  src?: string;
  alt?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/35 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_18px_60px_rgba(0,0,0,0.55)]">
      <div className="relative aspect-[16/10] w-full">
        {/* Artwork */}
        <div className="absolute inset-0">
          {src ? (
            <>
              <Image
                src={src}
                alt={alt ?? "Project cover"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-85"
                priority={false}
              />
              {/* Light darken for readability, not heavy */}
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-black/10" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-fuchsia-500/8 to-purple-500/10" />
              <div className="absolute inset-0 bg-black/25" />
            </>
          )}
        </div>

        {/* Frame details */}
        <div className="absolute inset-0">{children}</div>

        {/* Subtle edge glow only */}
        <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-cyan-400/10 via-fuchsia-500/8 to-purple-500/10 blur-md opacity-35" />
      </div>
    </div>
  );
}

function CassetteFrame({
  src,
  alt,
}: {
  src?: string;
  alt?: string;
}) {
  return (
    <MediaBase src={src} alt={alt}>
      {/* Cassette overlay, simplified */}
      <div className="absolute inset-0">
        {/* Label window */}
        <div className="absolute left-4 right-4 top-4 h-[46%] rounded-xl border border-white/10 bg-black/18 backdrop-blur-[2px]" />

        {/* Spool panel */}
        <div className="absolute bottom-4 left-4 right-4 h-[34%] rounded-xl border border-white/10 bg-black/22 backdrop-blur-[2px]">
          <div className="absolute left-6 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/20" />
          <div className="absolute right-6 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/20" />
          <div className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white/8" />
          <div className="absolute right-6 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white/8" />
          <div className="absolute left-1/2 top-1/2 h-5 w-[36%] -translate-x-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-black/22" />
        </div>

        {/* Tiny format tag */}
        <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/35 px-2.5 py-1 text-[10px] font-semibold tracking-[0.22em] text-white/65">
          CASSETTE
        </div>
      </div>
    </MediaBase>
  );
}

function CdFrame({
  src,
  alt,
}: {
  src?: string;
  alt?: string;
}) {
  return (
    <MediaBase src={src} alt={alt}>
      <div className="absolute inset-0">
        {/* Jewel bezel */}
        <div className="absolute inset-3 rounded-xl border border-white/10 bg-white/0" />
        <div className="absolute inset-4 rounded-xl border border-white/10 bg-black/10" />

        {/* Disc hint */}
        <div className="absolute bottom-4 right-4 h-20 w-20 rounded-full border border-white/10 bg-black/18 backdrop-blur-[2px]">
          <div className="absolute inset-3 rounded-full border border-white/10 bg-black/14" />
          <div className="absolute inset-8 rounded-full bg-white/8" />
        </div>

        {/* Tiny format tag */}
        <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/35 px-2.5 py-1 text-[10px] font-semibold tracking-[0.22em] text-white/65">
          CD
        </div>
      </div>
    </MediaBase>
  );
}

export function ProjectMediaThumb({ project }: { project: Project }) {
  const src = project.coverImage?.src;
  const alt = project.coverImage?.alt;

  return project.format === "cassette" ? (
    <CassetteFrame src={src} alt={alt} />
  ) : (
    <CdFrame src={src} alt={alt} />
  );
}
