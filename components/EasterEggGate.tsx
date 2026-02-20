"use client";

import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export function EasterEggGate({ children }: Props) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Example: Shift + E triggers a flicker burst
      if (e.shiftKey && e.key.toLowerCase() === "e") {
        window.dispatchEvent(new Event("broadcast:flicker"));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return <>{children}</>;
}