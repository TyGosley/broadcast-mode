"use client";

import { useEffect, useRef, useState } from "react";
import { DiagnosticsModal } from "./DiagnosticsModal";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

export function EasterEggGate() {
  const [open, setOpen] = useState(false);

  // useRef avoids state updates per keystroke
  const idxRef = useRef(0);

  useEffect(() => {
    const isTypingTarget = (target: EventTarget | null) => {
      const el = target as HTMLElement | null;
      if (!el) return false;
      return Boolean(el.closest("input, textarea, select, [contenteditable='true']"));
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;

      const code = e.code;
      const current = idxRef.current;

      // compute next index without setState updater
      let next = 0;

      if (code === KONAMI[current]) {
        next = current + 1;
      } else if (code === KONAMI[0]) {
        next = 1;
      } else {
        next = 0;
      }

      // completed
      if (next === KONAMI.length) {
        idxRef.current = 0;

        // side effects happen safely, outside any render/updater
        setOpen(true);

        requestAnimationFrame(() => {
          window.dispatchEvent(
            new CustomEvent("broadcast:burst", { detail: { strength: "medium" } })
          );
        });

        return;
      }

      idxRef.current = next;
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return <>{open ? <DiagnosticsModal onClose={() => setOpen(false)} /> : null}</>;
}
