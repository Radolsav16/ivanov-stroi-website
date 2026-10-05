import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppContent } from "./App";
import { getRouteSeo } from "./components/seo/routes";
import { servicePaths } from "./data/serviceSlugs";

export const prerenderRoutes = [
  "/",
  "/gallery",
  "/about-us",
  "/contact-us",
  ...servicePaths,
  "/404",
];

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <AppContent />
    </StaticRouter>,
  );
}

export { getRouteSeo };
