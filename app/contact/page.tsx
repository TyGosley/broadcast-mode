import { TransmitForm } from "../../components/TransmitForm";

export default function ContactPage() {
  return (
    <main className="min-h-dvh px-5 py-8">
      <header className="ui-section mt-0">
        <p className="ui-eyebrow">CONTACT</p>
        <h1 className="page-title mt-2 text-white">
          Transmit
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-white/70">
          Drop a note. If you have a rough idea, that’s enough. We can shape it
          together.
        </p>
      </header>

      <section className="ui-section">
        <TransmitForm />
      </section>
    </main>
  );
}
