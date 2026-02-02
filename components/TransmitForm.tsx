"use client";

import { useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
  company: string; // honeypot
};

type Status = "idle" | "sending" | "success" | "error";

// ✅ Replace this with your real Formspree endpoint
const FORMSPREE_ENDPOINT = "https://formspree.io/f/maqbaoey";

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export function TransmitForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
    company: "",
  });

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    if (!form.name.trim()) return false;
    if (!isValidEmail(form.email)) return false;
    if (form.message.trim().length < 10) return false;
    return true;
  }, [form]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Honeypot: bots often fill hidden fields
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
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          source: "Be Awesome Productions - Broadcast Mode",
        }),
      });

      if (!res.ok) {
        // Try to surface a helpful message when Formspree returns JSON
        let msg = "Transmission failed. Please try again.";
        try {
          const data = await res.json();
          if (data?.errors?.[0]?.message) msg = data.errors[0].message;
        } catch {
          // ignore
        }
        throw new Error(msg);
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "", company: "" });
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Transmission failed. Please try again.");
    }
  }

  function reset() {
    setStatus("idle");
    setError(null);
    setForm({ name: "", email: "", message: "", company: "" });
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

        {/* Signal meter */}
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
        {/* Honeypot */}
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
              autoComplete="name"
              className="rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
              placeholder="Ty"
              disabled={status === "sending"}
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
              disabled={status === "sending"}
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
            disabled={status === "sending"}
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

        {status === "success" && (
          <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-50">
            Signal received. I’ll reply soon.
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={!canSubmit || status === "sending"}
            className="rounded-xl border border-white/10 bg-gradient-to-r from-cyan-400/25 via-fuchsia-500/20 to-purple-500/20 px-5 py-3 text-sm font-semibold text-white transition hover:from-cyan-400/30 hover:via-fuchsia-500/25 hover:to-purple-500/25 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
          >
            {status === "sending" ? "Transmitting…" : "Transmit"}
          </button>

          <button
            type="button"
            onClick={reset}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
