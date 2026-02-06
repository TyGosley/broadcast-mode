import { BootGate } from "../components/BootGate";
import { HomeHeader } from "../components/HomeHeader";
import { LauncherGrid } from "../components/LauncherGrid";

export default function HomePage() {
  return (
    <BootGate brand="Be Awesome Productions">
      <main className="min-h-[calc(100dvh-88px)] pb-24">
        <HomeHeader />
        <div className="mx-auto w-full max-w-5xl px-4 pt-6">
          <LauncherGrid />
        </div>
      </main>
    </BootGate>
  );
}
