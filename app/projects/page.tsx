"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
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

const DESKTOP_PROJECTS_PER_PAGE = 4;
const MOBILE_PROJECTS_PER_PAGE = 3;
const MAX_FEATURED_PROJECTS = 3;
type ThumbVariant = "clean" | "classic";

function SearchParamsBridge({
  onParamsChange,
}: {
  onParamsChange: (next: string) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    onParamsChange(searchParams.toString());
  }, [searchParams, onParamsChange]);

  return null;
}

export default function ProjectsPage() {
  const router = useRouter();
  const isMobile = useIsMobile();

  const perPage = isMobile ? MOBILE_PROJECTS_PER_PAGE : DESKTOP_PROJECTS_PER_PAGE;
  const columns = isMobile ? 1 : 2;
  const [searchParamsRaw, setSearchParamsRaw] = useState("");
  const searchParams = useMemo(
    () => new URLSearchParams(searchParamsRaw),
    [searchParamsRaw]
  );
  const handleParamsChange = useCallback((next: string) => {
    setSearchParamsRaw((prev) => (prev === next ? prev : next));
  }, []);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ProjectStatus | "all">("all");
  const [tag, setTag] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [thumbVariant, setThumbVariant] = useState<ThumbVariant>("clean");
  const [pageInput, setPageInput] = useState<string>("1");

  // ✅ Move 11 enhancement: remember what they last opened (for CTA personalization)
  const [lastOpened, setLastOpened] = useState<Project | null>(null);

  const [page, setPage] = useState<number>(1);

  const featuredProjectIds = useMemo(() => {
    return new Set(
      PROJECTS.filter((p) => p.featured)
        .slice(0, MAX_FEATURED_PROJECTS)
        .map((p) => p.id)
    );
  }, []);

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
      const af = featuredProjectIds.has(a.id) ? 1 : 0;
      const bf = featuredProjectIds.has(b.id) ? 1 : 0;
      if (bf !== af) return bf - af;

      const sr = statusRank(a.status) - statusRank(b.status);
      if (sr !== 0) return sr;

      const yd = safeYearNum(b.year) - safeYearNum(a.year);
      if (yd !== 0) return yd;

      return a.title.localeCompare(b.title);
    });
  }, [query, status, tag, featuredProjectIds]);

  // ✅ Featured shelf matches current filters
  const featured = useMemo(() => {
    return filteredSorted
      .filter((p) => featuredProjectIds.has(p.id))
      .slice(0, MAX_FEATURED_PROJECTS);
  }, [filteredSorted, featuredProjectIds]);

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
    const normalized = Math.round(nextPage);
    const clamped = Math.min(Math.max(1, normalized), totalPages);
    setPage(clamped);
    replaceParams({ page: String(clamped) });
  }

  function commitPageInput() {
    const parsed = Number(pageInput);
    if (!Number.isFinite(parsed)) {
      setPageInput(String(page));
      return;
    }
    goToPage(parsed);
  }

  // Sync page state to URL back/forward
  useEffect(() => {
    const p = Number(searchParams.get("page") ?? "1");
    if (Number.isFinite(p) && p > 0 && p !== page) setPage(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    setPageInput(String(page));
  }, [page]);

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
    <main className="min-h-dvh px-5 py-8">
      <Suspense fallback={null}>
        <SearchParamsBridge onParamsChange={handleParamsChange} />
      </Suspense>

      <header className="ui-section mt-0 ui-stack">
        <p className="ui-eyebrow">PROJECTS</p>
        <h1 className="page-title mt-2 text-white">
          Live, In Progress, Archived
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-white/70">
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

        <div className="mt-4 flex flex-col items-center gap-2 text-xs text-white/55 md:flex-row md:justify-center md:gap-8">
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

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="ui-eyebrow text-white/55">CARD STYLE</span>
          <div className="ui-panel-inset inline-flex p-1">
            <button
              type="button"
              onClick={() => setThumbVariant("clean")}
              aria-pressed={thumbVariant === "clean"}
              className={[
                "min-h-10 rounded-lg px-3 py-1.5 transition",
                thumbVariant === "clean"
                  ? "bg-white/15 text-white"
                  : "text-white/65 hover:text-white/85",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F3FF]/70",
              ].join(" ")}
            >
              Clean
            </button>
            <button
              type="button"
              onClick={() => setThumbVariant("classic")}
              aria-pressed={thumbVariant === "classic"}
              className={[
                "min-h-10 rounded-lg px-3 py-1.5 transition",
                thumbVariant === "classic"
                  ? "bg-white/15 text-white"
                  : "text-white/65 hover:text-white/85",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0080]/70",
              ].join(" ")}
            >
              Classic CD/Cassette
            </button>
          </div>
        </div>
      </header>

      {/* Great Move 10B: Featured strip */}
      <FeaturedStrip projects={featured} onOpen={openProject} />

      <section className="ui-section">
        {paged.length === 0 ? (
          <div className="ui-panel p-6 text-white/70">
            No projects match that filter yet.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {paged.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onOpen={openProject}
                thumbVariant={thumbVariant}
              />
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => goToPage(1)}
            disabled={page <= 1}
            className={[
              "ui-btn-secondary rounded-xl px-3 text-xs font-semibold",
              "text-white/80 hover:bg-white/10",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB800]/70",
            ].join(" ")}
          >
            First
          </button>

          <button
            type="button"
            onClick={() => goToPage(page - 1)}
            disabled={page <= 1}
            className={[
              "ui-btn-secondary rounded-xl px-3 text-xs font-semibold",
              "text-white/80 hover:bg-white/10",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F3FF]/70",
            ].join(" ")}
          >
            Prev
          </button>

          <label className="ui-panel-inset inline-flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 text-xs text-white/70">
            <span className="whitespace-nowrap">Page</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              onBlur={commitPageInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  commitPageInput();
                }
              }}
              className="w-16 rounded-md border border-white/10 bg-black/45 px-2 py-1 text-center text-xs text-white outline-none focus-visible:ring-2 focus-visible:ring-[#00F3FF]/70"
              aria-label="Go to page number"
            />
            <span className="whitespace-nowrap">/ {totalPages}</span>
          </label>

          <button
            type="button"
            onClick={() => goToPage(page + 1)}
            disabled={page >= totalPages}
            className={[
              "ui-btn-secondary rounded-xl px-3 text-xs font-semibold",
              "text-white/80 hover:bg-white/10",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0080]/70",
            ].join(" ")}
          >
            Next
          </button>
        </div>
      </section>

      {/* ========================= */}
      {/* Move 11 — Conversion CTA  */}
      {/* ========================= */}
      <section className="ui-section !mt-16">
        <div
          className={[
            "ui-panel-strong relative overflow-hidden rounded-3xl",
            "p-8 md:p-10",
          ].join(" ")}
        >
          {/* Neon ambient glow (motion-safe) */}
          <div
            className={[
              "absolute -inset-0.5 rounded-3xl blur-xl opacity-80",
              "bg-gradient-to-br from-[#00F3FF]/34 via-[#FF0080]/30 to-[#5F368C]/38",
              "motion-safe:animate-[ctaGlow_6s_ease-in-out_infinite]",
              "motion-reduce:animate-none",
            ].join(" ")}
          />

          <div className="relative text-center">
            <p className="ui-eyebrow text-white/55">
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
                  "ui-btn-primary rounded-2xl px-6 py-3 text-sm tracking-wide",
                  "shadow-lg",
                  "transition hover:scale-[1.03] hover:shadow-xl",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0080]/75",
                ].join(" ")}
              >
                Start a Project
              </a>

              <a
                href="/studio"
                className={[
                  "ui-btn-secondary rounded-2xl px-6 py-3 text-sm",
                  "transition hover:bg-white/10",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F3FF]/75",
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
