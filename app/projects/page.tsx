"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PROJECTS, ProjectStatus } from "../../lib/projects";
import { ProjectFilters } from "../../components/ProjectFilters";
import { ProjectCard } from "../../components/ProjectCard";
import { ProjectModal } from "../../components/ProjectModal";

export default function ProjectsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ProjectStatus | "all">("all");
  const [tag, setTag] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    PROJECTS.forEach((p) => p.type.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return PROJECTS.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        (p.client ?? "").toLowerCase().includes(q);

      const matchesStatus = status === "all" ? true : p.status === status;
      const matchesTag = tag === "all" ? true : p.type.includes(tag);

      return matchesQuery && matchesStatus && matchesTag;
    });
  }, [query, status, tag]);

  // Deep-link: /projects?p=project-id
  useEffect(() => {
    const p = searchParams.get("p");
    if (p && PROJECTS.some((x) => x.id === p)) setOpenId(p);
  }, [searchParams]);

  function openProject(id: string) {
    setOpenId(id);
    const sp = new URLSearchParams(searchParams.toString());
    sp.set("p", id);
    router.replace(`/projects?${sp.toString()}`);
  }

  function closeProject() {
    setOpenId(null);
    const sp = new URLSearchParams(searchParams.toString());
    sp.delete("p");
    const qs = sp.toString();
    router.replace(qs ? `/projects?${qs}` : "/projects");
  }

  const activeProject = openId ? PROJECTS.find((p) => p.id === openId) : null;

  return (
    <main className="min-h-dvh px-5 py-8 pb-10">
      <header className="mx-auto max-w-5xl">
        <p className="text-xs tracking-[0.25em] text-white/60">
          PROJECTS LIBRARY
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
          Live + In Progress + Archive
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-white/70">
          A Broadcast Mode collection of live builds, works-in-progress, and legacy experiments.
        </p>

        <div className="mt-6">
          <ProjectFilters
            query={query}
            setQuery={setQuery}
            status={status}
            setStatus={setStatus}
            tag={tag}
            setTag={setTag}
            allTags={allTags}
          />
        </div>
      </header>

      <section className="mx-auto mt-8 max-w-5xl">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-white/70">
            No projects match that filter yet.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={openProject} />
            ))}
          </div>
        )}
      </section>

      {activeProject ? (
        <ProjectModal project={activeProject} onClose={closeProject} />
      ) : null}
    </main>
  );
}
