import { ArrowRight, ChevronRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { OptimizedImage } from "../../../shared/ui/OptimizedImage";
import ActionLink from "../../../shared/ui/ActionLink";
import Container from "../../../shared/ui/Container";
import { contactDetails } from "../../../data/contact";
import { CLOUDINARY_BASE_URL } from "../../../utils/url";
import type { ServiceData } from "../data";

type ServiceHeroProps = {
  service: ServiceData;
};

const resolveServiceImage = (image: string) =>
  image.startsWith("/images/") ? image : `${CLOUDINARY_BASE_URL}${image}`;

function Breadcrumb({ title }: { title: string }) {
  return (
    <nav aria-label="Навигационна пътека" className="mb-6 flex min-w-0 items-center gap-2 overflow-hidden text-xs font-bold sm:mb-8 sm:text-sm">
      <Link to="/" className="shrink-0 text-gray-300 transition-colors duration-200 hover:text-amber-400">
        Начало
      </Link>
      <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-gray-500" />
      <span className="min-w-0 truncate font-bold text-white" aria-current="page">
        {title}
      </span>
    </nav>
  );
}

export default function ServiceHero({ service }: ServiceHeroProps) {
  return (
    <section className="relative isolate min-h-[620px] overflow-hidden sm:min-h-[680px] lg:min-h-[760px]">
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        {service.heroImageFit === "contain" && (
          <OptimizedImage
            url={resolveServiceImage(service.heroImage)}
            alt=""
            priority
            sizes="100vw"
            className="absolute inset-0 size-full scale-105 object-cover object-center opacity-70 blur-xl"
          />
        )}
        <OptimizedImage
          url={resolveServiceImage(service.heroImage)}
          alt=""
          priority
          sizes="100vw"
          className={`relative size-full object-center ${service.heroImageFit === "contain" ? "object-contain" : "object-cover"}`}
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gray-950/25" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-gray-950/90 via-gray-950/60 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-gray-950/50 to-transparent" />

      <Container
        padding="page"
        className="flex min-h-[620px] items-end pb-12 pt-28 sm:min-h-[680px] sm:pb-16 sm:pt-32 lg:min-h-[760px] lg:pb-20 lg:pt-36"
      >
        <div className="w-full max-w-4xl">
          <Breadcrumb title={service.title} />
          <h1 className="animate-fade-up max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.03em] text-white drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl">
            {service.title}
          </h1>
          <p className="animate-fade-up-delay mt-5 max-w-3xl text-lg font-semibold leading-7 text-white drop-shadow-lg sm:mt-6 sm:text-xl sm:leading-8 lg:text-2xl lg:leading-9">
            {service.subtitle}
          </p>
          <div className="relative mt-7 max-w-3xl border-l-2 border-amber-500 pl-5 sm:mt-8 sm:pl-6 lg:mt-9 lg:pl-7">
            <p className="text-base leading-7 text-gray-200 drop-shadow-lg sm:text-lg sm:leading-8 lg:text-xl lg:leading-9">
              {service.description}
            </p>
          </div>
          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <ActionLink
              to="/contact-us"
              className="w-full min-h-[54px] px-7 py-4 font-bold shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-amber-500/20 active:scale-[0.98] sm:w-auto"
              icon={<ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />}
            >
              Поискайте оферта
            </ActionLink>
            <ActionLink
              href={contactDetails.phoneHref}
              variant="secondary"
              className="w-full min-h-[54px] border-white/20 bg-black/20 px-7 py-4 font-bold shadow-xl shadow-black/10 hover:border-amber-500/50 hover:bg-black/30 active:scale-[0.98] sm:w-auto"
              icon={<Phone className="size-4 shrink-0 text-amber-500" />}
              iconPosition="start"
            >
              Обадете се
            </ActionLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
