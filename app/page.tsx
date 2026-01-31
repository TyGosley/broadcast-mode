import { LauncherGrid } from "@/components/LauncherGrid";

export default function HomePage() {
  return (
    <main className="min-h-dvh px-5 py-8">
      <header className="mx-auto mb-7 max-w-5xl">
        <p className="text-xs tracking-[0.25em] text-white/60">
          BE AWESOME PRODUCTIONS
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
          Broadcast Mode
        </h1>

        <p className="mt-2 max-w-xl text-sm text-white/70">
          Neon OS launcher. Choose an app.
        </p>
      </header>

      <section className="mx-auto max-w-5xl">
        <LauncherGrid />
      </section>

      <footer className="mx-auto mt-10 max-w-5xl text-xs text-white/50">
        Tip: Desktop hover adds lift. Mobile is tap-first.
      </footer>
    </main>
  );
}
