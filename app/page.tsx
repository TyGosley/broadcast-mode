import { BootGate } from "../components/BootGate";
import { HomeHeader } from "../components/HomeHeader";
import { LauncherGrid } from "../components/LauncherGrid";

export default function HomePage() {
  return (
    <BootGate brand="Be Awesome Productions">
      <main className="homepage-shell min-h-[calc(100dvh-88px)]">
        <HomeHeader />
        <div className="ui-section mt-0 px-4 pt-6">
          <LauncherGrid />
        </div>
      </main>
    </BootGate>
  );
}
