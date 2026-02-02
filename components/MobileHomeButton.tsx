import Link from "next/link";

export function MobileHomeButton() {
  return (
    <Link
      href="/"
      aria-label="Return to Home"
      className={[
        "fixed z-50 md:hidden",
        "right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))]",
        "flex h-12 w-12 items-center justify-center rounded-full",
        "border border-white/12 bg-black/60 backdrop-blur",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_18px_50px_rgba(0,0,0,0.7)]",
        "text-white/90",
        "transition-transform duration-200 active:scale-95",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70",
      ].join(" ")}
    >
      <span className="text-base font-bold" aria-hidden="true">
        ⌂
      </span>
    </Link>
  );
}
