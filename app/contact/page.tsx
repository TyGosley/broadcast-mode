import { TransmitForm } from "../../components/TransmitForm";

export default function ContactPage() {
  return (
    <main className="min-h-dvh px-5 py-8 pb-10">
      <header className="mx-auto max-w-5xl">
        <p className="text-xs tracking-[0.25em] text-white/60">CONTACT</p>
        <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
          Transmit
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-white/70">
          Drop a note. If you have a rough idea, that’s enough. We can shape it
          together.
        </p>
      </header>

      <section className="mx-auto mt-8 max-w-5xl">
        <TransmitForm />
      </section>
    </main>
  );
}
