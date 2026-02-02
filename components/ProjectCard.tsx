import Link from "next/link";
import type { Project } from "../lib/projects";

function StatusPill({ status }: { status: Project["status"] }) {
  const cls =
    status === "active"
      ? "bg-cyan-400/15 text-cyan-200 border-cyan-300/20"
      : status === "shipped"
      ? "bg-emerald-400/15 text-emerald-200 border-emerald-300/20"
      : "bg-purple-400/15 text-purple-200 border-purple-300/20";

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs ${cls}`}>
      {status}
    </span>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const isCassette = project.format === "cassette";

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_18px_44px_rgba(0,0,0,0.45)]",
        "transition-transform duration-200 md:hover:-translate-y-1",
      ].join(" ")}
    >
      {/* glow */}
      <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-cyan-400/10 via-fuchsia-500/8 to-purple-500/10 blur-md opacity-60" />

      <div className="relative p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-white">{project.title}</h3>
            <p className="mt-1 text-xs text-white/55">
              {project.client ? project.client : "Internal"}
              {project.year ? ` • ${project.year}` : ""}
            </p>
          </div>

          <StatusPill status={project.status} />
        </div>

        {/* cassette / cd face */}
        <div className="mt-4">
          {isCassette ? (
            <div className="relative h-28 w-full rounded-xl border border-white/10 bg-black/30">
              <div className="absolute left-4 top-4 h-10 w-10 rounded-full border border-white/10 bg-white/5" />
              <div className="absolute right-4 top-4 h-10 w-10 rounded-full border border-white/10 bg-white/5" />
              <div className="absolute left-4 bottom-4 right-4 h-8 rounded-lg border border-white/10 bg-white/5" />
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/10" />
            </div>
          ) : (
            <div className="relative h-28 w-full rounded-xl border border-white/10 bg-black/30">
              <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5" />
              <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/50" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/8 via-transparent to-fuchsia-500/8" />
            </div>
          )}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-white/70">
          {project.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.type.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-black/35 px-2.5 py-1 text-xs text-white/75"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {project.href ? (
            <Link
              href={project.href}
              target="_blank"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/85 hover:bg-white/10"
            >
              Live
            </Link>
          ) : null}

          {project.caseStudyHref ? (
            <Link
              href={project.caseStudyHref}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/85 hover:bg-white/10"
            >
              Case study
            </Link>
          ) : (
            <span className="text-xs text-white/40">Case study soon</span>
          )}
        </div>
      </div>
    </article>
  );
}
