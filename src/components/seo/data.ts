import { contactDetails } from "../../data/contact";

const siteUrl = (import.meta.env.VITE_SITE_URL || "https://ivanovstroi.bg").replace(/\/$/, "");
const businessName = "IvanovStroi";
const businessDescription =
  "IvanovStroi предлага строителни, ремонтни и довършителни услуги в София и околностите.";
const logoPath = "/ivanovstroi_exact_favicon.png";

const absoluteUrl = (path: string) =>
  siteUrl ? `${siteUrl}${path === "/" ? "" : path}` : undefined;

const businessSchema = {
  "@type": ["LocalBusiness", "GeneralContractor"],
  "@id": absoluteUrl("/") ? `${absoluteUrl("/")}#business` : "#business",
  name: businessName,
  description: businessDescription,
  ...(absoluteUrl("/") ? { url: absoluteUrl("/") } : {}),
  ...(absoluteUrl(logoPath) ? { logo: absoluteUrl(logoPath) } : {}),
  image:
    "https://res.cloudinary.com/rwyghcuy/image/upload/f_auto,q_auto,w_1200/v1690000000/hero-img.jpg",
  telephone: contactDetails.phoneHref.replace("tel:", ""),
  email: contactDetails.email,
  areaServed: [
    { "@type": "City", name: "София" },
    { "@type": "AdministrativeArea", name: contactDetails.serviceArea },
  ],
  knowsLanguage: "bg",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: contactDetails.phoneHref.replace("tel:", ""),
    email: contactDetails.email,
    contactType: "customer service",
    availableLanguage: "Bulgarian",
    areaServed: "BG",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Строителни и ремонтни услуги",
    itemListElement: [
      "Ремонт на баня",
      "Ремонт на апартаменти и къщи",
      "ВиК инсталации",
      "Електроинсталации",
      "Гипсокартон",
      "Шпакловане и боядисване",
      "Лепене на плочки и естествен камък",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
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
      name: "Строителни и ремонтни услуги в София",
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
  faq?: readonly { question: string; answer: string }[];
};

export function createServiceSchema({
  title,
  description,
  path,
  faq = [],
}: ServiceSchemaInput) {
  const serviceUrl = absoluteUrl(path);
  const homeUrl = absoluteUrl("/");

  return {
    "@context": "https://schema.org",
    "@graph": [
      businessSchema,
      {
        "@type": "Service",
        "@id": serviceUrl ? `${serviceUrl}#service` : undefined,
        name: title,
        description,
        areaServed: [
          { "@type": "City", name: "София" },
          { "@type": "AdministrativeArea", name: contactDetails.serviceArea },
        ],
        provider: { "@id": businessSchema["@id"] },
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
      ...(faq.length > 0
        ? [{
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }]
        : []),
    ],
  };
}
