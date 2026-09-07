import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  MessageCircle,
  Ruler,
} from "lucide-react";
import { contactDetails } from "../../../data/contact";
import { OptimizedImage } from "../../../components/image/OptimizedImage";
import ActionLink from "../../../components/ui/ActionLink";
import Container from "../../../components/ui/Container";
import SectionHeading from "../../../components/ui/SectionHeading";
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

export default function Service({ service }: { service: ServiceData }) {
  return (
    <>
      <ServiceHero service={service} />

      <section className="relative overflow-hidden bg-gray-950 py-20 sm:py-28 lg:py-32">
        <div aria-hidden="true" className="absolute -left-40 top-1/2 -z-10 size-[500px] -translate-y-1/2 rounded-full bg-amber-500/5 blur-3xl" />
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

      <section className="relative isolate overflow-hidden border-y border-white/10 py-20 sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-20">
          <OptimizedImage
            url={`${CLOUDINARY_BASE_URL}${service.detailImage}`}
            alt=""
            width={1920}
            sizes="100vw"
            className="size-full object-cover object-center"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gray-950/90" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-gray-950/95 via-gray-950/80 to-gray-950/65" />
        <Container>
          <SectionHeading
            eyebrow="Как работим"
            className="max-w-2xl"
            title="Ясен план, сигурен резултат"
            titleClassName="text-2xl sm:whitespace-nowrap sm:text-4xl lg:text-5xl"
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {processSteps.map((step) => {
              const Icon = step.icon;

              return (
                <article key={step.number} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gray-950/80 p-7 shadow-2xl shadow-black/20 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-amber-500/30 sm:p-8">
                  <span className="absolute right-6 top-4 text-6xl font-black tracking-tight text-white/[0.06] transition-colors group-hover:text-amber-500/15">{step.number}</span>
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20 transition group-hover:bg-amber-500 group-hover:text-gray-950">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-7 text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-gray-300">{step.description}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden py-20 sm:py-28 lg:py-32">
        <div aria-hidden="true" className="absolute inset-0 -z-20">
          <OptimizedImage
            url={`${CLOUDINARY_BASE_URL}${service.ctaImage}`}
            alt=""
            width={1920}
            sizes="100vw"
            className="size-full object-cover object-center"
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
