import "./globals.css";
import { Dock } from "../components/Dock";
import { BroadcastOverlay } from "../components/BroadcastOverlay";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-dvh">
        <div className="grid h-dvh grid-rows-[1fr_auto]">
          <div className="overflow-y-auto">{children}</div>

          {/* Dock row (desktop only) */}
          <div className="hidden md:block px-4 pb-4 pt-2">
            <Dock />
          </div>
        </div>

        {/* VHS overlay */}
        <BroadcastOverlay enabled allowEasterEgg />
      </body>
    </html>
  );
}
