"use client";

import { ProjectStatus } from "../lib/projects";

type Props = {
  query: string;
  setQuery: (v: string) => void;
  status: ProjectStatus | "all";
  setStatus: (v: ProjectStatus | "all") => void;
  tag: string;
  setTag: (v: string) => void;
  allTags: string[];
};

export function ProjectFilters({
  query,
  setQuery,
  status,
  setStatus,
  tag,
  setTag,
  allTags,
}: Props) {
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-center">
      {/* Search */}
      <label className="block">
        <span className="sr-only">Search projects</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects..."
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
        />
      </label>

      {/* Status filter */}
      <label className="block">
        <span className="sr-only">Filter by status</span>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ProjectStatus | "all")}
          className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
        >
          <option value="all">All projects</option>
          <option value="active">Live</option>
          <option value="in-progress">In Progress</option>
          <option value="archived">Archived</option>
        </select>
      </label>

      {/* Tag filter */}
      <label className="block">
        <span className="sr-only">Filter by tag</span>
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300/60"
        >
          <option value="all">All tags</option>
          {allTags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
