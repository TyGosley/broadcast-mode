type Testimonial = {
  quote: string;
  name: string;
  title?: string;
  company?: string;
};

type Props = {
  brandLine?: string;
  brands?: string[];
  testimonials?: Testimonial[];
  stats?: { label: string; value: string }[];
};

export function TrustPack({
  brandLine = "Trusted by teams and small businesses",
  brands = ["Tactic Fitness", "Full Time Burgers", "Boldly Fine, LLC"],
  testimonials = [
    {
      quote:
        "Ty kept the project moving, communicated clearly, and delivered a site that looks premium and works flawlessly on mobile.",
      name: "Client",
      title: "Owner",
      company: "Small Business",
    },
    {
      quote:
        "Design decisions were thoughtful and the build quality was solid. The OS-style experience makes the work feel memorable.",
      name: "Collaborator",
      title: "Developer",
    },
  ],
  stats = [
    { value: "10+ ", label: "projects delivered" },
    { value: "Mobile-first", label: "build approach" },
    { value: "Fast", label: "feedback + iteration" },
  ],
}: Props) {
  return (
    <section className="mx-auto mt-12 max-w-5xl">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/35 p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_80px_rgba(0,0,0,0.7)] md:p-9">
        <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-cyan-500/12 via-fuchsia-500/12 to-purple-500/12 blur-xl opacity-70" />

        <div className="relative">
          <p className="text-xs tracking-[0.25em] text-white/60">TRUST SIGNAL</p>
          <h2 className="mt-2 text-xl font-bold text-white md:text-2xl">
            {brandLine}
          </h2>

          {/* Brands */}
          <div className="mt-5 flex flex-wrap gap-2">
            {brands.map((b) => (
              <span
                key={b}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80"
              >
                {b}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-black/30 p-4"
              >
                <div className="text-lg font-bold text-white">{s.value}</div>
                <div className="mt-1 text-xs tracking-wide text-white/60">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {testimonials.map((t, idx) => (
              <figure
                key={idx}
                className="rounded-2xl border border-white/10 bg-black/30 p-5"
              >
                <blockquote className="text-sm text-white/75">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 text-xs text-white/60">
                  <span className="font-semibold text-white/80">{t.name}</span>
                  {t.title ? ` • ${t.title}` : ""}
                  {t.company ? ` • ${t.company}` : ""}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
