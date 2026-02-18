"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PROJECTS, ProjectStatus, Project } from "../../lib/projects";
import { ProjectFilters } from "../../components/ProjectFilters";
import { ProjectCard } from "../../components/ProjectCard";
import { ProjectModal } from "../../components/ProjectModal";
import { FeaturedStrip } from "../../components/FeaturedStrip";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(!!mq.matches);
    update();

    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  return isMobile;
}

function statusRank(s: ProjectStatus) {
  if (s === "live") return 0;
  if (s === "in-progress") return 1;
  return 2;
}

function safeYearNum(y?: string) {
  const n = Number(y);
  return Number.isFinite(n) ? n : 0;
}

export default function ProjectsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();

  const perPage = isMobile ? 6 : 8;
  const columns = isMobile ? 1 : 2;

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ProjectStatus | "all">("all");
  const [tag, setTag] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  // ✅ Move 11 enhancement: remember what they last opened (for CTA personalization)
  const [lastOpened, setLastOpened] = useState<Project | null>(null);

  const pageFromUrl = Number(searchParams.get("page") ?? "1");
  const [page, setPage] = useState<number>(
    Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1
  );

  const allTags = useMemo(() => {
    const set = new Set<string>();
    PROJECTS.forEach((p) => p.type.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const filteredSorted = useMemo(() => {
    const q = query.trim().toLowerCase();

    const list = PROJECTS.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        (p.client ?? "").toLowerCase().includes(q);

      const matchesStatus = status === "all" ? true : p.status === status;
      const matchesTag = tag === "all" ? true : p.type.includes(tag);

      return matchesQuery && matchesStatus && matchesTag;
    });

    return list.sort((a, b) => {
      const af = a.featured ? 1 : 0;
      const bf = b.featured ? 1 : 0;
      if (bf !== af) return bf - af;

      const sr = statusRank(a.status) - statusRank(b.status);
      if (sr !== 0) return sr;

      const yd = safeYearNum(b.year) - safeYearNum(a.year);
      if (yd !== 0) return yd;

      return a.title.localeCompare(b.title);
    });
  }, [query, status, tag]);

  // ✅ Featured shelf matches current filters
  const featured = useMemo(() => {
    return filteredSorted.filter((p) => p.featured).slice(0, 10);
  }, [filteredSorted]);

  const total = filteredSorted.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages, perPage]);

  const paged = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredSorted.slice(start, start + perPage);
  }, [filteredSorted, page, perPage]);

  // Deep-link modal: /projects?p=project-id
  useEffect(() => {
    const p = searchParams.get("p");
    if (p && PROJECTS.some((x) => x.id === p)) setOpenId(p);
  }, [searchParams]);

  function replaceParams(next: Record<string, string | null>) {
    const sp = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([k, v]) => {
      if (!v) sp.delete(k);
      else sp.set(k, v);
    });

    const qs = sp.toString();
    router.replace(qs ? `/projects?${qs}` : "/projects");
  }

  function openProject(id: string) {
    const p = PROJECTS.find((x) => x.id === id) ?? null;
    if (p) setLastOpened(p);

    setOpenId(id);
    replaceParams({ p: id, page: String(page) });
  }

  function closeProject() {
    setOpenId(null);
    replaceParams({ p: null, page: String(page) });
  }

  function goToPage(nextPage: number) {
    const clamped = Math.min(Math.max(1, nextPage), totalPages);
    setPage(clamped);
    replaceParams({ page: String(clamped) });
  }

  // Sync page state to URL back/forward
  useEffect(() => {
    const p = Number(searchParams.get("page") ?? "1");
    if (Number.isFinite(p) && p > 0 && p !== page) setPage(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const activeProject: Project | null = openId
    ? PROJECTS.find((p) => p.id === openId) ?? null
    : null;

  // ✅ Great Move 10A: keyboard nav + Space Quick Look (grid only)
  useEffect(() => {
    if (openId) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement as HTMLElement | null;
      if (!active) return;
      if (!active.matches?.("[data-project-card]")) return;

      const cards = Array.from(
        document.querySelectorAll<HTMLElement>("[data-project-card]")
      );
      const idx = cards.indexOf(active);
      if (idx === -1) return;

      if (e.key === " ") {
        e.preventDefault();
        const id = active.getAttribute("data-project-id");
        if (id) openProject(id);
        return;
      }

      let nextIdx = idx;

      if (e.key === "ArrowRight") nextIdx = idx + 1;
      if (e.key === "ArrowLeft") nextIdx = idx - 1;
      if (e.key === "ArrowDown") nextIdx = idx + columns;
      if (e.key === "ArrowUp") nextIdx = idx - columns;

      if (nextIdx !== idx) {
        e.preventDefault();
        nextIdx = Math.min(Math.max(0, nextIdx), cards.length - 1);
        cards[nextIdx]?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openId, columns]);

  // ✅ Move 11 enhancement logic
  const personalized =
    lastOpened && lastOpened.status === "live" ? lastOpened : null;

  const ctaHeadline = personalized
    ? `Want something like “${personalized.title}”?`
    : "Let’s create something this polished for your brand.";

  const ctaSub = personalized
    ? "Same energy, your brand. I’ll design and build a fast, modern site that’s memorable and conversion-focused."
    : "I help businesses design and build modern, conversion-focused websites that feel intentional, fast, and memorable.";

  return (
    <main className="min-h-dvh px-5 py-8 pb-10">
      <header className="mx-auto max-w-5xl">
        <p className="text-xs tracking-[0.25em] text-white/60">PROJECTS</p>
        <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
          Live, In Progress, Archived
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-white/70">
          Tip: Tab to a card, press <span className="text-white/85">Space</span>{" "}
          to Quick Look. Use{" "}
          <span className="text-white/85">arrow keys</span> to move between cards.
        </p>

        <div className="mt-6">
          <ProjectFilters
            query={query}
            setQuery={(v) => {
              setQuery(v);
              goToPage(1);
            }}
            status={status}
            setStatus={(v) => {
              setStatus(v);
              goToPage(1);
            }}
            tag={tag}
            setTag={(v) => {
              setTag(v);
              goToPage(1);
            }}
            allTags={allTags}
          />
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-white/55">
          <div>
            Showing{" "}
            <span className="text-white/80 font-semibold">
              {total === 0 ? 0 : (page - 1) * perPage + 1}
            </span>
            {"–"}
            <span className="text-white/80 font-semibold">
              {Math.min(page * perPage, total)}
            </span>{" "}
            of <span className="text-white/80 font-semibold">{total}</span>
          </div>

          <div className="text-white/60">
            Page <span className="text-white/80 font-semibold">{page}</span> /{" "}
            <span className="text-white/80 font-semibold">{totalPages}</span>
          </div>
        </div>
      </header>

      {/* Great Move 10B: Featured strip */}
      <FeaturedStrip projects={featured} onOpen={openProject} />

      <section className="mx-auto mt-8 max-w-5xl">
        {paged.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-white/70">
            No projects match that filter yet.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {paged.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={openProject} />
            ))}
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => goToPage(page - 1)}
            disabled={page <= 1}
            className={[
              "rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold",
              "bg-white/5 text-white/80 hover:bg-white/10",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60",
            ].join(" ")}
          >
            Prev
          </button>

          <div className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/70">
            {page} / {totalPages}
          </div>

          <button
            type="button"
            onClick={() => goToPage(page + 1)}
            disabled={page >= totalPages}
            className={[
              "rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold",
              "bg-white/5 text-white/80 hover:bg-white/10",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300/60",
            ].join(" ")}
          >
            Next
          </button>
        </div>
      </section>

      {/* ========================= */}
      {/* Move 11 — Conversion CTA  */}
      {/* ========================= */}
      <section className="mx-auto mt-16 max-w-5xl">
        <div
          className={[
            "relative overflow-hidden rounded-3xl border border-white/10",
            "bg-gradient-to-br from-black via-black/80 to-black/60",
            "p-8 md:p-10",
            "shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_40px_100px_rgba(0,0,0,0.75)]",
          ].join(" ")}
        >
          {/* Neon ambient glow (motion-safe) */}
          <div
            className={[
              "absolute -inset-0.5 rounded-3xl blur-xl opacity-80",
              "bg-gradient-to-br from-cyan-500/18 via-fuchsia-500/18 to-purple-500/18",
              "motion-safe:animate-[ctaGlow_6s_ease-in-out_infinite]",
              "motion-reduce:animate-none",
            ].join(" ")}
          />

          <div className="relative text-center">
            <p className="text-xs tracking-[0.3em] text-white/55">
              READY TO BUILD?
            </p>

            <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
              {ctaHeadline}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70 md:text-base">
              {ctaSub}
            </p>

            {personalized ? (
              <p className="mx-auto mt-4 max-w-2xl text-xs text-white/55">
                Recently viewed:{" "}
                <span className="text-white/80 font-semibold">
                  {personalized.title}
                </span>{" "}
                {personalized.client ? (
                  <>
                    <span className="text-white/40">•</span>{" "}
                    <span className="text-white/70">{personalized.client}</span>
                  </>
                ) : null}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
                href="/studio"
                className={[
                  "rounded-2xl border border-white/15 px-6 py-3 text-sm font-semibold",
                  "bg-white/5 text-white",
                  "transition hover:bg-white/10",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70",
                ].join(" ")}
              >
                See My Process
              </a>
            </div>
          </div>

          <style jsx>{`
            @keyframes ctaGlow {
              0% {
                transform: translate3d(0, 0, 0) scale(1);
                opacity: 0.75;
                filter: blur(22px);
              }
              50% {
                transform: translate3d(0, -2px, 0) scale(1.02);
                opacity: 0.95;
                filter: blur(26px);
              }
              100% {
                transform: translate3d(0, 0, 0) scale(1);
                opacity: 0.75;
                filter: blur(22px);
              }
            }
          `}</style>
        </div>
      </section>

      {activeProject ? (
        <ProjectModal project={activeProject} onClose={closeProject} />
      ) : null}
    </main>
  );
}
