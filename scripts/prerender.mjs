import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dist = resolve(root, "dist");
const serverEntry = resolve(root, "dist-ssr", "entry-server.js");
const template = await readFile(resolve(dist, "index.html"), "utf8");
const { render, getRouteSeo, prerenderRoutes } = await import(pathToFileURL(serverEntry).href);
const siteUrl = (process.env.VITE_SITE_URL || "https://ivanovstroi.bg").replace(/\/$/, "");

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

function buildHead(seo) {
  const canonical = `${siteUrl}${seo.path === "/" ? "" : seo.path}`;
  const robots = seo.noIndex ? "noindex,follow" : "index,follow";
  const title = escapeHtml(seo.title);
  const description = escapeHtml(seo.description);
  const image = seo.image.startsWith("http") ? seo.image : `${siteUrl}${seo.image}`;

  return [
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="${robots}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
    ...(seo.noIndex ? [] : [`<link rel="canonical" href="${escapeHtml(canonical)}" />`]),
    `<title>${title}</title>`,
  ].join("\n    ");
}

for (const route of prerenderRoutes) {
  const seo = getRouteSeo(route);
  const appHtml = render(route);
  const html = template
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    .replace(
      /<!--seo-head-start-->[\s\S]*?<!--seo-head-end-->/,
      `<!--seo-head-start-->\n    ${buildHead(seo)}\n    <!--seo-head-end-->`,
    );
  const output = route === "/"
    ? resolve(dist, "index.html")
    : route === "/404"
      ? resolve(dist, "404.html")
      : resolve(dist, route.slice(1), "index.html");

  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html, "utf8");
}

await rm(resolve(root, "dist-ssr"), { recursive: true, force: true });
