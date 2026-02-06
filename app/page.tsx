import { BootGate } from "../components/BootGate";
import { LauncherGrid } from "../components/LauncherGrid";

export default function HomePage() {
  return (
    <BootGate brand="Be Awesome Productions">
      <main className="min-h-[calc(100dvh-88px)] px-4 pt-6 pb-24">
        <div className="mx-auto w-full max-w-5xl">
          <LauncherGrid />
        </div>
      </main>
    </BootGate>
  );
}
