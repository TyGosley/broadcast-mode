import { TransmitForm } from "../../components/TransmitForm";

export default function ContactPage() {
  return (
    <main className="min-h-dvh px-5 py-8">
      <header className="ui-section mt-0 text-center">
        <p className="ui-eyebrow">CONTACT</p>
        <h1 className="page-title mt-2 text-white">
          Transmit
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-white/70">
          Drop a note. If you have a rough idea, that’s enough. We can shape it
          together.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="ui-pill px-3 text-[11px]">TX CHANNEL: OPEN</span>
          <span className="ui-pill px-3 text-[11px]">REPLY: PRIORITY</span>
        </div>
      </header>

      <section className="ui-section">
        <TransmitForm />
      </section>

      <section className="ui-section !mt-20">
        <div
          className={[
            "ui-panel-strong relative overflow-hidden rounded-3xl",
            "p-8 md:p-10",
          ].join(" ")}
        >
          <div
            className={[
              "absolute -inset-3 rounded-[2.2rem] blur-3xl opacity-42",
              "bg-gradient-to-br from-[#00F3FF]/22 via-[#FF0080]/20 to-[#5F368C]/24",
            ].join(" ")}
          />
          <div
            className={[
              "absolute -inset-1.5 rounded-[2rem] blur-2xl opacity-78",
              "bg-gradient-to-br from-[#00F3FF]/30 via-[#FF0080]/27 to-[#5F368C]/33",
              "motion-safe:animate-[ctaGlow_6s_ease-in-out_infinite]",
              "motion-reduce:animate-none",
            ].join(" ")}
          />

          <div className="relative text-center">
            <p className="ui-eyebrow text-white/42">
              READY WHEN YOU ARE
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
              Still exploring?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 md:text-base">
              If you want to see examples of work or get a feel for how
              projects come together, take a look at the builds.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/projects"
                className={[
                  "ui-btn-primary rounded-2xl px-6 py-3 text-sm tracking-wide",
                  "shadow-lg",
                  "transition hover:scale-[1.03] hover:shadow-xl",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0080]/75",
                ].join(" ")}
              >
                View Projects
              </a>

              <a
                href="/studio"
                className={[
                  "ui-btn-secondary rounded-2xl px-6 py-3 text-sm",
                  "transition hover:bg-white/10",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F3FF]/75",
                ].join(" ")}
              >
                Back to Studio
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
