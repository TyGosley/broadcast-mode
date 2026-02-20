import type { Metadata, Viewport } from "next";
import "./globals.css";

import { Dock } from "../components/Dock";
import { MobileMiniDock } from "../components/MobileMiniDock";
import { SettingsProvider } from "../components/SettingsProvider";
import { SettingsGate } from "../components/SettingsGate";
import { EasterEggGate } from "../components/EasterEggGate";
import { BroadcastOverlay } from "../components/BroadcastOverlay";

export const metadata: Metadata = {
  metadataBase: new URL("https://beawesomeproductions.com"),
  title: {
    default: "Be Awesome Productions",
    template: "%s | Be Awesome Productions",
  },
  description:
    "Be Awesome Productions designs and builds premium, mobile-first websites and interactive experiences with a neon-retro Broadcast Mode aesthetic.",
  applicationName: "Broadcast Mode",
  creator: "Be Awesome Productions",
  publisher: "Be Awesome Productions",
  keywords: [
    "Be Awesome Productions",
    "web design",
    "web development",
    "Next.js",
    "React",
    "Squarespace",
    "interactive websites",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Be Awesome Productions",
    title: "Be Awesome Productions",
    description:
      "Premium web design + builds with a neon-retro Broadcast Mode aesthetic. Mobile-first, fast, and conversion-focused.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Broadcast Mode" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Be Awesome Productions",
    description:
      "Premium web design + builds with a neon-retro Broadcast Mode aesthetic. Mobile-first, fast, and conversion-focused.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-dvh">
        <SettingsProvider>
          <MobileMiniDock />
          <Dock />

          <SettingsGate>
            <EasterEggGate>
              <BroadcastOverlay enabled allowEasterEgg />
              <div className="relative z-10">{children}</div>
            </EasterEggGate>
          </SettingsGate>
        </SettingsProvider>
      </body>
    </html>
  );
}