import "./globals.css";
import { Dock } from "../components/Dock";
import { BroadcastOverlay } from "../components/BroadcastOverlay";
import { MobileMiniDock } from "../components/MobileMiniDock";
import { SettingsProvider } from "../components/SettingsProvider";
import { SettingsGate } from "../components/SettingsGate";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-dvh">
        <SettingsProvider>
          <div className="grid h-dvh grid-rows-[1fr_auto]">
            <div className="overflow-y-auto">{children}</div>

            {/* Dock row (desktop only) */}
            <div className="hidden md:block px-4 pb-4 pt-2">
              <Dock />
            </div>
          </div>

          {/* Mobile mini dock */}
          <MobileMiniDock />

          {/* Gate reads settings and renders overlay accordingly */}
          <SettingsGate />
        </SettingsProvider>
      </body>
    </html>
  );
}
