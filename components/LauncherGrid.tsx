import { APPS } from "../lib/apps";
import { AppIcon } from "./AppIcon";

export function LauncherGrid() {
  return (
    <section aria-label="Application Launcher" className="w-full">
      <div
        className={[
          "grid grid-cols-2 gap-5",
          "md:grid-cols-4 md:gap-6",
        ].join(" ")}
      >
        {APPS.map((app) => (
          <AppIcon key={app.id} app={app} />
        ))}
      </div>
    </section>
  );
}
