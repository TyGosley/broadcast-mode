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
      <div className="panel-glass relative overflow-hidden rounded-3xl p-7 md:p-9">
        <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-[#00F3FF]/26 via-[#FF0080]/24 to-[#5F368C]/34 blur-xl opacity-70" />

        <div className="relative text-center">
          <p className="font-tech text-xs tracking-[0.25em] text-white/60">TRUST SIGNAL</p>
          <h2 className="mt-2 text-xl font-bold text-white md:text-2xl">
            {brandLine}
          </h2>

          {/* Brands */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {brands.map((b) => (
              <span
                key={b}
                className="font-tech rounded-md border border-white/15 bg-black/45 px-3 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-white/82 shadow-[0_1px_0_rgba(0,0,0,0.85)]"
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
                className="panel-inset rounded-2xl p-4 text-center"
              >
                <div className="text-lg font-bold text-white">{s.value}</div>
                <div className="font-tech mt-1 text-xs tracking-[0.12em] text-white/60">
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
                className="panel-inset rounded-2xl p-5 text-center"
              >
                <blockquote className="text-sm text-white/75">
                  “{t.quote}”
                </blockquote>
                <figcaption className="font-tech mt-4 text-xs tracking-[0.08em] text-white/60">
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
