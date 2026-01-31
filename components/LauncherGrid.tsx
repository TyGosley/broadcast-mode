import { APPS } from "@/lib/apps";
import { AppIcon } from "@/components/AppIcon";

export function LauncherGrid() {
  return (
    <section
      aria-label="Application Launcher"
      className="w-full"
    >
      <div
        className={[
          "grid grid-cols-2 gap-4",
          "sm:grid-cols-2",
          "md:grid-cols-4",
        ].join(" ")}
      >
        {APPS.map((app) => (
          <AppIcon key={app.id} app={app} />
        ))}
      </div>
    </section>
  );
}
