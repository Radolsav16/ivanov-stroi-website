import { contactDetails } from "../../data/contact";

const siteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
const businessName = "IVANOV STROI";
const businessDescription =
  "IVANOV STROI предлага строителни, ремонтни и довършителни услуги в София и околностите.";

const absoluteUrl = (path: string) =>
  siteUrl ? `${siteUrl}${path === "/" ? "" : path}` : undefined;

const businessSchema = {
  "@type": "ProfessionalService",
  name: businessName,
  description: businessDescription,
  telephone: contactDetails.phoneHref.replace("tel:", ""),
  email: contactDetails.email,
  areaServed: ["София", contactDetails.serviceArea],
  address: {
    "@type": "PostalAddress",
    addressLocality: "София",
    addressCountry: "BG",
  },
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    businessSchema,
    {
      "@type": "WebSite",
      name: businessName,
      description: businessDescription,
      inLanguage: "bg",
      ...(absoluteUrl("/") ? { url: absoluteUrl("/") } : {}),
    },
    {
      "@type": "WebPage",
      name: "Строителна фирма в София",
      description: businessDescription,
      inLanguage: "bg",
      ...(absoluteUrl("/") ? { url: absoluteUrl("/") } : {}),
    },
  ],
};

type ServiceSchemaInput = {
  title: string;
  description: string;
  path: string;
};

export function createServiceSchema({
  title,
  description,
  path,
}: ServiceSchemaInput) {
  const serviceUrl = absoluteUrl(path);
  const homeUrl = absoluteUrl("/");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: title,
        description,
        areaServed: ["София", contactDetails.serviceArea],
        provider: businessSchema,
        ...(serviceUrl ? { url: serviceUrl } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Начало",
            ...(homeUrl ? { item: homeUrl } : {}),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: title,
            ...(serviceUrl ? { item: serviceUrl } : {}),
          },
        ],
      },
    ],
  };
}
