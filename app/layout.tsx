import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";

import { Dock } from "../components/Dock";
import { MobileMiniDock } from "../components/MobileMiniDock";
import { SettingsProvider } from "../components/SettingsProvider";
import { SettingsGate } from "../components/SettingsGate";
import { EasterEggGate } from "../components/EasterEggGate";
import { OverlayController } from "../components/OverlayController";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
  weight: ["500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

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
      <body className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable} min-h-dvh`}>
        <SettingsProvider>
          <MobileMiniDock />
          <Dock />

          <SettingsGate>
            <EasterEggGate>
              <OverlayController />
              <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[5] site-canvas" />
              <div className="relative z-10 site-content">
                {children}
                <footer className="ui-section !mt-8 px-4 pb-3">
                  <p className="ui-eyebrow text-center text-white/40">
                    BROADCAST SIGNATURE • SIGNAL LOCKED • BAP SYSTEM
                  </p>
                </footer>
              </div>
            </EasterEggGate>
          </SettingsGate>
        </SettingsProvider>
      </body>
    </html>
  );
}
