import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  MessageCircle,
  Ruler,
} from "lucide-react";
import { contactDetails } from "../../../data/contact";
import { OptimizedImage } from "../../../shared/ui/OptimizedImage";
import ActionLink from "../../../shared/ui/ActionLink";
import Container from "../../../shared/ui/Container";
import SectionHeading from "../../../shared/ui/SectionHeading";
import { CLOUDINARY_BASE_URL } from "../../../utils/url";
import type { ServiceData } from "../data";
import ServiceHero from "./ServiceHero";

const processSteps = [
  {
    number: "01",
    title: "Разговор и оглед",
    description: "Уточняваме обхвата, приоритетите и реалните условия на обекта.",
    icon: MessageCircle,
  },
  {
    number: "02",
    title: "План за работа",
    description: "Подреждаме етапите, материалите и важните решения преди старта.",
    icon: ClipboardList,
  },
  {
    number: "03",
    title: "Работа по етапи",
    description: "Изпълняваме договорения обхват последователно и с контрол по време на работа.",
    icon: Ruler,
  },
];

const resolveServiceImage = (image: string) =>
  image.startsWith("/images/") ? image : `${CLOUDINARY_BASE_URL}${image}`;

export default function Service({ service }: { service: ServiceData }) {
  return (
    <>
      <ServiceHero service={service} />

      <section className="relative isolate overflow-hidden bg-gray-950 py-20 sm:py-28 lg:py-32">
        <div aria-hidden="true" className="absolute inset-0 -z-20">
          <OptimizedImage
            url={resolveServiceImage(service.detailImage)}
            alt=""
            width={1920}
            sizes="100vw"
            className="size-full object-cover object-center"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gray-950/78" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-gray-950/92 via-gray-950/72 to-gray-950/45" />
        <div aria-hidden="true" className="absolute -left-40 top-1/2 -z-10 size-[500px] -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl" />
        <Container size="content">
          <SectionHeading
            eyebrow="Какво получавате"
            lines="before"
            className="max-w-3xl"
            title={<>Решение според <span className="text-amber-500">вашето пространство</span></>}
            description={service.overview}
            titleClassName="text-3xl sm:text-4xl lg:text-5xl"
            descriptionClassName="mt-7 text-base text-gray-300 sm:text-lg"
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {service.includes.map((item, index) => (
              <article key={item} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-500/35 hover:bg-white/[0.05] sm:p-7">
                <span className="absolute right-5 top-3 text-6xl font-black text-white/[0.04] transition-colors group-hover:text-amber-500/10">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <CheckCircle2 className="size-7 text-amber-500" />
                <h3 className="mt-7 max-w-xs text-xl font-bold text-white sm:text-2xl">{item}</h3>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden border-y border-white/10 bg-[#070b14] py-20 sm:py-28 lg:py-32">
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_28%)]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:72px_72px]" />

        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-amber-500" />
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-500">Как работим</p>
              </div>
              <h2 className="mt-6 max-w-xl text-3xl font-black tracking-[-0.025em] text-white sm:text-4xl lg:text-5xl">
                Ясен процес за <span className="text-amber-500">{service.title.toLowerCase()}</span>
              </h2>
            </div>
            <p className="max-w-2xl border-l border-white/15 pl-6 text-base leading-8 text-gray-300 sm:text-lg">
              От първия разговор до завършването на обекта знаете какво предстои. Работим подредено, с ясни решения и контрол във всеки етап.
            </p>
          </div>

          <div className="relative mt-14 lg:mt-20">
            <div aria-hidden="true" className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-amber-500 via-amber-500/40 to-white/10 lg:left-0 lg:top-7 lg:h-px lg:w-full lg:bg-gradient-to-r" />
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-0">
              {processSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <article
                    key={step.number}
                    className={`group relative ml-14 border border-white/10 bg-gray-950/65 p-7 shadow-2xl shadow-black/20 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-amber-500/35 sm:p-8 lg:ml-0 lg:mt-14 ${index === 0 ? "rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none" : ""} ${index === processSteps.length - 1 ? "rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none" : "border-t-0 lg:border-l-0 lg:border-t"}`}
                  >
                    <div className="absolute -left-[4.05rem] top-7 flex size-12 items-center justify-center rounded-full border-4 border-[#070b14] bg-amber-500 text-gray-950 shadow-[0_0_0_1px_rgba(245,158,11,.3),0_0_28px_rgba(245,158,11,.2)] lg:-top-[3.75rem] lg:left-8">
                      <Icon className="size-5" strokeWidth={2.25} />
                    </div>
                    <div className="flex items-start justify-between gap-6">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">Етап {step.number}</p>
                      <span className="text-5xl font-black leading-none text-white/[0.05] transition-colors group-hover:text-amber-500/10 sm:text-6xl">{step.number}</span>
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-white sm:text-2xl">{step.title}</h3>
                    <p className="mt-4 max-w-sm text-sm leading-7 text-gray-300 sm:text-base">{step.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden py-20 sm:py-28 lg:py-32">
        <div aria-hidden="true" className="absolute inset-0 -z-20">
          {service.ctaImageFit === "contain" && (
            <OptimizedImage
              url={resolveServiceImage(service.ctaImage)}
              alt=""
              width={1920}
              sizes="100vw"
              className="absolute inset-0 size-full scale-105 object-cover object-center opacity-70 blur-xl"
            />
          )}
          <OptimizedImage
            url={resolveServiceImage(service.ctaImage)}
            alt=""
            width={1920}
            sizes="100vw"
            className={`relative size-full object-center ${service.ctaImageFit === "contain" ? "object-contain" : "object-cover"}`}
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gray-950/45" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-950/70 via-gray-950/20 to-gray-950/75" />
        <Container size="narrow" className="text-center">
          <div className="rounded-3xl border border-white/10 bg-gray-950/30 px-5 py-10 shadow-2xl shadow-black/20 backdrop-blur-[2px] sm:px-10 sm:py-12">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-amber-500/20 bg-gray-950/50 text-amber-500 backdrop-blur-sm">
              <ClipboardList className="size-6" />
            </div>
            <h2 className="mt-7 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Вашият проект за <span className="text-amber-500">{service.title.toLowerCase()}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-100 sm:text-lg">
              Споделете какво планирате и ще обсъдим най-подходящите следващи стъпки за вашия обект.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <ActionLink
                to="/contact-us"
                className="px-7 font-bold hover:-translate-y-0.5"
                icon={<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />}
              >
                Поискайте оферта
              </ActionLink>
              <ActionLink href={contactDetails.phoneHref} variant="secondary" className="bg-gray-950/50 px-7">
                {contactDetails.phone}
              </ActionLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
