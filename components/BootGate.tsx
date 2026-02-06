"use client";

import { useEffect, useState } from "react";
import { BootSequence } from "./BootSequence";

const KEY_SESSION_BOOTED = "broadcastMode_booted_session_v1"; // session-only
const KEY_BOOT_ENABLED = "broadcastMode_boot_enabled"; // local toggle: "0" disables

export function BootGate({
  children,
  brand,
}: {
  children: React.ReactNode;
  brand?: string;
}) {
  const [ready, setReady] = useState(false);
  const [showBoot, setShowBoot] = useState(false);
  const [bootEnabled, setBootEnabled] = useState(true);

  useEffect(() => {
    try {
      const enabled = localStorage.getItem(KEY_BOOT_ENABLED) !== "0";
      setBootEnabled(enabled);

      const bootedThisSession = sessionStorage.getItem(KEY_SESSION_BOOTED) === "1";

      // Show boot only if enabled AND not already shown in this session
      setShowBoot(enabled && !bootedThisSession);
    } catch {
      // safest fallback: show it once
      setBootEnabled(true);
      setShowBoot(true);
    } finally {
      setReady(true);
    }
  }, []);

  const finish = () => {
    try {
      sessionStorage.setItem(KEY_SESSION_BOOTED, "1");
    } catch {
      // ignore
    }
    setShowBoot(false);
  };

  const disableBoot = () => {
    try {
      localStorage.setItem(KEY_BOOT_ENABLED, "0");
      sessionStorage.setItem(KEY_SESSION_BOOTED, "1");
    } catch {
      // ignore
    }
    setBootEnabled(false);
    setShowBoot(false);
  };

  if (!ready) return null;

  return (
    <>
      {showBoot && bootEnabled ? (
        <BootSequence brand={brand} onDone={finish} onDisableNextTime={disableBoot} />
      ) : null}
      {children}
    </>
  );
}
