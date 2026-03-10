"use client";

import { useEffect, useMemo, useState } from "react";

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
const TERMINAL_SEND_STEPS = [
  "Establishing uplink...",
  "Transmitting packet...",
  "Awaiting signal lock...",
] as const;

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
  const [sendStep, setSendStep] = useState(0);

  const canSubmit = useMemo(() => {
    if (!form.name.trim()) return false;
    if (!isValidEmail(form.email)) return false;
    if (!form.projectType) return false;
    if (!form.timeline) return false;
    if (form.message.trim().length < 10) return false;
    return true;
  }, [form]);

  const messageLength = form.message.trim().length;
  const messageTooShort = form.message.length > 0 && messageLength < 10;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  useEffect(() => {
    if (status !== "sending") {
      setSendStep(0);
      return;
    }

    const id = window.setInterval(() => {
      setSendStep((prev) => (prev + 1) % TERMINAL_SEND_STEPS.length);
    }, 700);

    return () => window.clearInterval(id);
  }, [status]);

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
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Transmission failed. Please try again.");
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
    <div className="ui-stack-lg">
      {/* Status panel */}
      <div className="ui-panel-strong relative rounded-2xl p-4 md:p-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl border border-white/14 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_0_16px_rgba(0,243,255,0.08)]"
        />

        <div className="relative flex min-h-[8.25rem] flex-col items-center justify-center text-center">
          <p className="ui-eyebrow">TRANSMISSION</p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            {status === "success" ? "Signal received." : "Transmit a signal."}
          </h2>
          <p className="mt-1.5 max-w-xl text-sm text-white/70">
            {status === "success"
              ? "Message delivered. I’ll reply soon."
              : "Send a message through the neon ether. Fast reply, no spam."}
          </p>

          {status === "sending" ? (
            <p
              className="mt-3 inline-flex w-fit items-center gap-2 rounded-lg border border-[#00F3FF]/30 bg-[#00F3FF]/8 px-3 py-1.5 font-tech text-[11px] tracking-[0.12em] text-[#00F3FF]/88"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#00F3FF] shadow-[0_0_10px_rgba(0,243,255,0.75)]"
              />
              {TERMINAL_SEND_STEPS[sendStep]}
            </p>
          ) : null}

          {status === "success" ? (
            <p className="mt-3 font-tech text-[11px] tracking-[0.12em] text-[#FFB800]/90">
              Signal locked.
            </p>
          ) : null}
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={onSubmit}
        className="ui-panel mt-1 rounded-2xl p-5 text-center md:mt-1.5 md:p-6"
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
              className="ui-panel-inset rounded-xl px-4 py-3 text-center text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-[#00F3FF]/70"
              disabled={status === "sending"}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs tracking-wide text-white/70">Email</span>
            <input
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="ui-panel-inset rounded-xl px-4 py-3 text-center text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-[#FF0080]/70"
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
              onChange={(e) =>
                update("projectType", e.target.value as FormState["projectType"])
              }
              className="ui-panel-inset rounded-xl px-4 py-3 text-center text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-[#00F3FF]/70"
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
              onChange={(e) =>
                update("timeline", e.target.value as FormState["timeline"])
              }
              className="ui-panel-inset rounded-xl px-4 py-3 text-center text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-[#FF0080]/70"
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
            className="ui-panel-inset resize-none rounded-xl px-4 py-3 text-center text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-[#00F3FF]/70"
            disabled={status === "sending"}
          />
          <span
            className={[
              "text-[11px] font-tech tracking-[0.12em] transition-colors",
              messageTooShort ? "text-[#FF9AAE]/85" : "text-white/45",
            ].join(" ")}
          >
            {messageLength}/10 characters
          </span>
        </label>

        {error && (
          <div className="mt-4 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        )}

        {status === "success" && (
          <div className="mt-4 rounded-xl border border-[#FFB800]/35 bg-[#FFB800]/12 px-4 py-3 text-sm text-[#FFE2BF]">
            Signal received. I’ll reply soon.
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
          <button
            type="submit"
            disabled={!canSubmit || status === "sending"}
            className="ui-btn-primary rounded-xl px-5 py-3 text-sm disabled:opacity-50"
          >
            {status === "sending" ? "Transmitting…" : "Transmit"}
          </button>

          <button
            type="button"
            onClick={reset}
            className="ui-btn-secondary rounded-xl px-4 py-3 text-sm text-white/85"
          >
            Reset
          </button>
        </div>

        <p className="mt-3 font-tech text-[11px] tracking-[0.12em] text-white/52">
          RESPONSE WINDOW: &lt; 24H
        </p>
      </form>
    </div>
  );
}
