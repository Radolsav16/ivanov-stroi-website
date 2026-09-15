import { useEffect } from "react";

const SITE_NAME = "IVANOV STROI";
const DEFAULT_TITLE = "Строителни и ремонтни услуги в София | IVANOV STROI";
const DEFAULT_DESCRIPTION =
  "IVANOV STROI предлага строителни, ремонтни и довършителни услуги в София и околностите.";
const DEFAULT_IMAGE =
  "https://res.cloudinary.com/rwyghcuy/image/upload/f_auto,q_auto,w_1200/v1690000000/hero-img.jpg";

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
  noIndex?: boolean;
};

const updateMeta = (selector: string, attribute: "name" | "property", value: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, selector.match(/\[.*?=['"](.*?)['"]/i)?.[1] ?? "");
    document.head.appendChild(element);
  }

  element.content = value;
};

export default function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_IMAGE,
  structuredData,
  noIndex = false,
}: SeoProps) {
  useEffect(() => {
    const fullTitle = title === DEFAULT_TITLE ? title : `${title} | ${SITE_NAME}`;
    const siteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
    const verificationToken = import.meta.env.VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION;

    document.title = fullTitle;
    updateMeta('meta[name="description"]', "name", description);
    updateMeta('meta[name="robots"]', "name", noIndex ? "noindex,follow" : "index,follow");
    updateMeta('meta[property="og:title"]', "property", fullTitle);
    updateMeta('meta[property="og:description"]', "property", description);
    updateMeta('meta[property="og:type"]', "property", "website");
    updateMeta('meta[property="og:image"]', "property", image);
    updateMeta('meta[name="twitter:card"]', "name", "summary_large_image");
    updateMeta('meta[name="twitter:title"]', "name", fullTitle);
    updateMeta('meta[name="twitter:description"]', "name", description);
    updateMeta('meta[name="twitter:image"]', "name", image);

    const existingVerification = document.head.querySelector<HTMLMetaElement>(
      'meta[name="google-site-verification"]',
    );

    if (verificationToken) {
      updateMeta(
        'meta[name="google-site-verification"]',
        "name",
        verificationToken,
      );
    } else {
      existingVerification?.remove();
    }

    const existingCanonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );

    if (siteUrl && !noIndex) {
      const canonical = existingCanonical ?? document.createElement("link");
      canonical.rel = "canonical";
      canonical.href = `${siteUrl}${path === "/" ? "" : path}`;
      updateMeta('meta[property="og:url"]', "property", canonical.href);

      if (!existingCanonical) {
        document.head.appendChild(canonical);
      }
    } else {
      existingCanonical?.remove();
    }
  }, [description, image, noIndex, path, title]);

  if (!structuredData) {
    return null;
  }

  return (
    <script type="application/ld+json">
      {JSON.stringify(structuredData)}
    </script>
  );
}
