import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { servicePaths } from "./src/data/serviceSlugs.ts";

const routes = [
  "/",
  "/gallery",
  "/about-us",
  "/contact-us",
  ...servicePaths,
];

function createSeoFiles(siteUrl: string | undefined): Plugin {
  return {
    name: "production-seo-files",
    apply: "build",
    closeBundle() {
      const robots = siteUrl
        ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl.replace(/\/$/, "")}/sitemap.xml\n`
        : "User-agent: *\nAllow: /\n";

      writeFileSync(resolve("dist/robots.txt"), robots, "utf8");

      if (!siteUrl) {
        console.warn(
          "VITE_SITE_URL is not set. Canonical links and sitemap.xml will not be generated; robots.txt allows public crawling without a sitemap reference.",
        );
        return;
      }

      const baseUrl = siteUrl.replace(/\/$/, "");
      const urls = routes
        .map((route) => `  <url><loc>${baseUrl}${route}</loc></url>`)
        .join("\n");
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

      writeFileSync(resolve("dist/sitemap.xml"), sitemap, "utf8");
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss(), createSeoFiles(env.VITE_SITE_URL)],
  };
});
