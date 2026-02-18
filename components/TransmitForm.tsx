"use client";

import { useMemo, useState } from "react";

type ProjectType =
  | "website"
  | "redesign"
  | "branding"
  | "maintenance"
  | "interactive"
  | "other";

type Timeline = "asap" | "2-4w" | "1-2m" | "3m+" | "exploring";

type FormState = {
  name: string;
  email: string;

  projectType: ProjectType | "";
  timeline: Timeline | "";

  message: string;
  company: string; // honeypot
};

type Status = "idle" | "sending" | "success" | "error";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/maqbaoey";

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function labelProjectType(v: ProjectType) {
  switch (v) {
    case "website":
      return "New Website";
    case "redesign":
      return "Website Redesign";
    case "branding":
      return "Branding / Visual System";
    case "maintenance":
      return "Maintenance / Updates";
    case "interactive":
      return "Interactive Experience";
    case "other":
      return "Other";
  }
}

function labelTimeline(v: Timeline) {
  switch (v) {
    case "asap":
      return "ASAP";
    case "2-4w":
      return "2–4 weeks";
    case "1-2m":
      return "1–2 months";
    case "3m+":
      return "3+ months";
    case "exploring":
      return "Just exploring";
  }
}

export function TransmitForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    projectType: "",
    timeline: "",
    message: "",
    company: "",
  });

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    if (!form.name.trim()) return false;
    if (!isValidEmail(form.email)) return false;
    if (!form.projectType) return false;
    if (!form.timeline) return false;
    if (form.message.trim().length < 10) return false;
    return true;
  }, [form]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (form.company) {
      setStatus("success");
      return;
    }

    if (!canSubmit) {
      setError("Check your inputs and try again.");
      return;
    }

    setStatus("sending");

    try {
      const payload = {
        name: form.name,
        email: form.email,
        projectType: labelProjectType(form.projectType as ProjectType),
        timeline: labelTimeline(form.timeline as Timeline),
        message: form.message,
        source: "Be Awesome Productions - Broadcast Mode",
      };

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = "Transmission failed. Please try again.";
        try {
          const data = await res.json();
          if (data?.errors?.[0]?.message) msg = data.errors[0].message;
        } catch {}
        throw new Error(msg);
      }

      setStatus("success");
      setForm({
        name: "",
        email: "",
        projectType: "",
        timeline: "",
        message: "",
        company: "",
      });
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Transmission failed. Please try again.");
    }
  }

  function reset() {
    setStatus("idle");
    setError(null);
    setForm({
      name: "",
      email: "",
      projectType: "",
      timeline: "",
      message: "",
      company: "",
    });
  }

  return (
    <div className="grid gap-5">
      {/* Status panel */}
      <div className="rounded-2xl border border-white/10 bg-black/35 p-4 backdrop-blur">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.25em] text-white/60">TRANSMISSION</p>
            <h2 className="mt-2 text-xl font-semibold text-white">
              {status === "success" ? "Signal received." : "Transmit a signal."}
            </h2>
            <p className="mt-2 text-sm text-white/70">
              {status === "success"
                ? "Message delivered. I’ll reply soon."
                : "Send a message through the neon ether. Fast reply, no spam."}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
      >
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
          className="hidden"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-xs tracking-wide text-white/70">Your name</span>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
              disabled={status === "sending"}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs tracking-wide text-white/70">Email</span>
            <input
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300/60"
              disabled={status === "sending"}
            />
          </label>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-xs tracking-wide text-white/70">
              Project type
            </span>
            <select
              value={form.projectType}
              onChange={(e) => update("projectType", e.target.value as any)}
              className="rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
            >
              <option value="">Select…</option>
              <option value="website">New Website</option>
              <option value="redesign">Website Redesign</option>
              <option value="branding">Branding / Visual System</option>
              <option value="maintenance">Maintenance / Updates</option>
              <option value="interactive">Interactive Experience</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-xs tracking-wide text-white/70">
              Timeline
            </span>
            <select
              value={form.timeline}
              onChange={(e) => update("timeline", e.target.value as any)}
              className="rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300/60"
            >
              <option value="">Select…</option>
              <option value="asap">ASAP</option>
              <option value="2-4w">2–4 weeks</option>
              <option value="1-2m">1–2 months</option>
              <option value="3m+">3+ months</option>
              <option value="exploring">Just exploring</option>
            </select>
          </label>
        </div>

        <label className="mt-4 grid gap-2">
          <span className="text-xs tracking-wide text-white/70">Message</span>
          <textarea
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            rows={6}
            className="resize-none rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-purple-300/60"
            disabled={status === "sending"}
          />
        </label>

        {error && (
          <div className="mt-4 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        )}

        {status === "success" && (
          <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-50">
            Signal received. I’ll reply soon.
          </div>
        )}

        <div className="mt-5 flex gap-3">
          <button
            type="submit"
            disabled={!canSubmit || status === "sending"}
            className="rounded-xl border border-white/10 bg-gradient-to-r from-cyan-400/25 via-fuchsia-500/20 to-purple-500/20 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            {status === "sending" ? "Transmitting…" : "Transmit"}
          </button>

          <button
            type="button"
            onClick={reset}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
