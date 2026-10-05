import { services } from "../../pages/service/data";

const SITE_NAME = "IvanovStroi";
const DEFAULT_IMAGE =
  "https://res.cloudinary.com/rwyghcuy/image/upload/f_auto,q_auto,w_1200/v1690000000/hero-img.jpg";

export type RouteSeo = {
  title: string;
  description: string;
  path: string;
  image: string;
  noIndex?: boolean;
};

const pages: Record<string, Omit<RouteSeo, "path" | "image">> = {
  "/": {
    title: `Строителни и ремонтни услуги в София | ${SITE_NAME}`,
    description:
      "IvanovStroi предлага строителни, ремонтни и довършителни услуги в София и околностите.",
  },
  "/gallery": {
    title: `Галерия със строителни и ремонтни дейности | ${SITE_NAME}`,
    description:
      "Разгледайте галерия със строителни, ремонтни и довършителни дейности.",
  },
  "/about-us": {
    title: `За IvanovStroi: строителство и ремонти в София | ${SITE_NAME}`,
    description:
      "Научете повече за подхода на IvanovStroi към строителството, ремонтите и довършителните услуги в София и околностите.",
  },
  "/contact-us": {
    title: `Контакти за ремонт и строителство в София | ${SITE_NAME}`,
    description:
      "Свържете се с IvanovStroi за оглед и оферта за строителни, ремонтни и довършителни услуги в София и околностите.",
  },
};

export function getRouteSeo(pathname: string): RouteSeo {
  const normalizedPath = pathname !== "/" ? pathname.replace(/\/$/, "") : pathname;
  const page = pages[normalizedPath];

  if (page) {
    return { ...page, path: normalizedPath, image: DEFAULT_IMAGE };
  }

  const serviceMatch = normalizedPath.match(/^\/services\/([^/]+)$/);
  const service = serviceMatch
    ? services[serviceMatch[1] as keyof typeof services]
    : undefined;

  if (service) {
    return {
      title: `${service.title} в София | ${SITE_NAME}`,
      description: service.overview,
      path: normalizedPath,
      image: service.heroImage.startsWith("/images/")
        ? service.heroImage
        : `https://res.cloudinary.com/rwyghcuy/image/upload/f_auto,q_auto,w_1200${service.heroImage}`,
    };
  }

  return {
    title: `Страницата не е намерена | ${SITE_NAME}`,
    description: "Страницата, която търсите, не съществува или е преместена.",
    path: "/404",
    image: DEFAULT_IMAGE,
    noIndex: true,
  };
}
