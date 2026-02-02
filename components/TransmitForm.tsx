"use client";

import { useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type Status = "idle" | "sending" | "success" | "error";

const DEFAULT_EMAIL = "hello@beawesomeproductions.com"; // change to your real email

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export function TransmitForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const canSubmit = useMemo(() => {
    if (!form.name.trim()) return false;
    if (!isValidEmail(form.email)) return false;
    if (form.message.trim().length < 10) return false;
    return true;
  }, [form]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(DEFAULT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // no-op, clipboard can fail in some browsers/contexts
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!canSubmit) {
      setError("Check your inputs and try again.");
      return;
    }

    setStatus("sending");

    // Backend-free "works now" approach:
    // open mailto with a structured message.
    // Later you can swap this to a real API route (Resend, SendGrid, etc.).
    try {
      const subject = encodeURIComponent("Broadcast Mode Transmission");
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}\n`
      );

      // Simulate a short "transmitting..." moment for delight
      await new Promise((r) => setTimeout(r, 650));

      window.location.href = `mailto:${DEFAULT_EMAIL}?subject=${subject}&body=${body}`;

      // Show success state anyway (user action confirms intent)
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError("Transmission failed. Try again or use the email fallback.");
    }
  }

  function reset() {
    setStatus("idle");
    setError(null);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div className="grid gap-5">
      {/* Top status panel */}
      <div className="rounded-2xl border border-white/10 bg-black/35 p-4 backdrop-blur">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.25em] text-white/60">TRANSMISSION</p>
            <h2 className="mt-2 text-xl font-semibold text-white">
              {status === "success" ? "Signal received." : "Transmit a signal."}
            </h2>
            <p className="mt-2 text-sm text-white/70">
              {status === "success"
                ? "Your message is queued. If your mail app didn’t open, use the email fallback below."
                : "Send a message through the neon ether. Fast reply, no spam."}
            </p>
          </div>

          <div className="hidden sm:block">
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75">
              Status:{" "}
              <span className="font-semibold text-white">
                {status === "idle"
                  ? "ready"
                  : status === "sending"
                  ? "transmitting"
                  : status === "success"
                  ? "received"
                  : "error"}
              </span>
            </div>
          </div>
        </div>

        {/* "Signal meter" */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-white/55">
            <span>Signal strength</span>
            <span>
              {status === "idle"
                ? "stable"
                : status === "sending"
                ? "locking…"
                : status === "success"
                ? "confirmed"
                : "interference"}
            </span>
          </div>

          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className={[
                "h-full rounded-full transition-all duration-500",
                status === "idle"
                  ? "w-3/4 bg-gradient-to-r from-cyan-400/60 via-fuchsia-500/55 to-purple-500/55"
                  : status === "sending"
                  ? "w-full bg-gradient-to-r from-cyan-400/70 via-fuchsia-500/65 to-purple-500/65"
                  : status === "success"
                  ? "w-full bg-gradient-to-r from-emerald-400/60 via-cyan-400/50 to-fuchsia-500/50"
                  : "w-1/3 bg-gradient-to-r from-red-400/60 via-fuchsia-500/40 to-purple-500/40",
              ].join(" ")}
            />
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-xs tracking-wide text-white/70">Your name</span>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              autoComplete="name"
              className="rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
              placeholder="Ty"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs tracking-wide text-white/70">Email</span>
            <input
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              autoComplete="email"
              inputMode="email"
              className="rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300/60"
              placeholder="you@domain.com"
            />
          </label>
        </div>

        <label className="mt-4 grid gap-2">
          <span className="text-xs tracking-wide text-white/70">Message</span>
          <textarea
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            rows={6}
            className="resize-none rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus-visible:ring-2 focus-visible:ring-purple-300/60"
            placeholder="Tell me what you’re building, the vibe, scope, timeline…"
          />
          <span className="text-xs text-white/45">
            Minimum 10 characters. {form.message.trim().length}/10
          </span>
        </label>

        {error && (
          <div className="mt-4 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={!canSubmit || status === "sending"}
            className={[
              "rounded-xl px-5 py-3 text-sm font-semibold",
              "border border-white/10",
              "bg-gradient-to-r from-cyan-400/25 via-fuchsia-500/20 to-purple-500/20",
              "text-white hover:from-cyan-400/30 hover:via-fuchsia-500/25 hover:to-purple-500/25",
              "transition",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70",
            ].join(" ")}
          >
            {status === "sending" ? "Transmitting…" : status === "success" ? "Sent" : "Transmit"}
          </button>

          <button
            type="button"
            onClick={reset}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
          >
            Reset
          </button>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={copyEmail}
              className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm font-semibold text-white/85 hover:bg-black/40 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
            >
              {copied ? "Copied" : "Copy email"}
            </button>
          </div>
        </div>

        <div className="mt-4 text-xs text-white/55">
          Fallback: email{" "}
          <a
            className="text-white/80 underline decoration-white/30 hover:text-white"
            href={`mailto:${DEFAULT_EMAIL}`}
          >
            {DEFAULT_EMAIL}
          </a>
        </div>
      </form>

      {/* Post-success helper */}
      {status === "success" && (
        <div className="rounded-2xl border border-emerald-400/15 bg-emerald-500/10 p-4 text-sm text-emerald-50">
          If your mail client didn’t open automatically, use the copy email button
          above or tap the email fallback link.
        </div>
      )}
    </div>
  );
}
