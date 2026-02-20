import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://beawesomeproductions.com"; // ✅ change when live

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}