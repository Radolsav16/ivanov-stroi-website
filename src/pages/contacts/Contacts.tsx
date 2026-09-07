import {
  ArrowUpRightIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { lazy, Suspense } from "react";
import ContactRequestForm from "../../components/contact-form/ContactRequestForm";
import { OptimizedImage } from "../../components/image/OptimizedImage";
import Seo from "../../components/seo/Seo";
import Container from "../../components/ui/Container";
import DeferredSection from "../../components/ui/DeferredSection";
import { contactDetails } from "../../data/contact";
import Layout from "../../Layout";
import { CLOUDINARY_BASE_URL } from "../../utils/url";

const Reviews = lazy(() => import("../../components/reviews/Reviews"));

const contactCards = [
  {
    label: "Обадете ни се",
    title: contactDetails.phone,
    description: "Понеделник – Петък · 08:00 – 18:00",
    href: contactDetails.phoneHref,
    Icon: PhoneIcon,
  },
];

function ContactsHero() {
  return (
    <section className="relative isolate min-h-[520px] overflow-hidden py-24 sm:min-h-[560px] sm:py-32 lg:min-h-[600px] lg:py-36">
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <OptimizedImage
          url={`${CLOUDINARY_BASE_URL}/v1788383386/working-img-46.jpg`}
          alt=""
          width={1920}
          priority
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-950/90 via-gray-950/65 to-gray-950 sm:bg-gradient-to-r sm:from-gray-950/90 sm:via-gray-950/65 sm:to-gray-950/20" />
      <div aria-hidden="true" className="absolute -right-40 top-1/2 -z-10 hidden size-[450px] -translate-y-1/2 rounded-full bg-amber-500/10 blur-[100px] sm:block lg:size-[600px] lg:blur-[140px]" />
      <Container padding="page" className="flex min-h-[360px] items-center sm:min-h-[400px] lg:min-h-[440px]">
        <div className="w-full max-w-3xl">
          <div className="mb-4 flex items-center gap-3 sm:mb-5">
            <span className="h-px w-8 bg-amber-500 sm:w-10" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500 sm:text-xs sm:tracking-[0.25em]">Свържете се с нас</span>
          </div>
          <h1 className="animate-fade-up text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Да обсъдим <span className="text-amber-500">вашия проект</span>
          </h1>
          <p className="animate-fade-up-delay mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg">
            Планирате ремонт или строителна дейност? Свържете се с нас, за да обсъдим обхвата, сроковете и възможните решения.
          </p>
        </div>
      </Container>
    </section>
  );
}

function ContactInfoCard({
  label,
  title,
  description,
  href,
  Icon,
}: (typeof contactCards)[number]) {
  return (
    <a href={href} className="group block rounded-2xl border border-white/10 bg-gray-950/80 p-6 shadow-xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/30 hover:bg-gray-950/95 sm:rounded-3xl sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20 sm:size-12">
          <Icon aria-hidden="true" className="size-5 sm:size-6" />
        </span>
        <ArrowUpRightIcon aria-hidden="true" className="size-5 shrink-0 text-gray-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-amber-500" />
      </div>
      <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 sm:mt-6 sm:text-xs">{label}</p>
      <p className="mt-2 break-words text-2xl font-black text-white sm:text-3xl">{title}</p>
      <p className="mt-2 text-sm leading-6 text-gray-500">{description}</p>
    </a>
  );
}

function LocationCard() {
  return (
    <div className="group min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-gray-950/80 shadow-xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/30 sm:rounded-3xl">
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20 sm:size-12">
            <MapPinIcon aria-hidden="true" className="size-5 sm:size-6" />
          </span>
          <ArrowUpRightIcon aria-hidden="true" className="size-5 shrink-0 text-gray-600" />
        </div>
        <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 sm:mt-6 sm:text-xs">Нашата локация</p>
        <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">София, България</h3>
        <p className="mt-2 text-sm leading-6 text-gray-500">Работим в {contactDetails.serviceArea}.</p>
      </div>
      <div className="relative aspect-[16/9] min-h-[220px] overflow-hidden border-t border-white/10 sm:min-h-[250px]">
        <iframe
          title="IVANOV STROI - София"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93836.37954469488!2d23.241374288250867!3d42.695528666755244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8682cb317bf5%3A0x400a01269bf5e60!2sSofia!5e0!3m2!1sen!2sbg!4v1787930044869!5m2!1sen!2sbg"
          className="absolute inset-0 h-full w-full border-0 grayscale-[0.7] opacity-75 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a href="https://www.google.com/maps/search/?api=1&query=Sofia,Bulgaria" target="_blank" rel="noopener noreferrer" className="flex min-h-[52px] items-center justify-between gap-4 border-t border-white/10 px-6 py-4 text-sm font-bold text-amber-500 transition-colors hover:bg-white/[0.03] sm:px-8">
        <span>Виж в Google Maps</span>
        <ArrowUpRightIcon aria-hidden="true" className="size-5 shrink-0" />
      </a>
    </div>
  );
}

function ContactContent() {
  return (
    <section className="relative isolate overflow-visible pb-20 pt-4 sm:pb-28 sm:pt-10 lg:pb-32 lg:pt-16">
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <OptimizedImage url={`${CLOUDINARY_BASE_URL}/v1788383386/working-img-45.jpg`} alt="" width={1920} className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gray-950/88" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-950 via-gray-950/90 to-gray-950" />
      <div aria-hidden="true" className="absolute -left-60 top-1/3 -z-10 size-[450px] rounded-full bg-amber-500/5 blur-[120px] sm:size-[600px]" />
      <div aria-hidden="true" className="absolute -right-60 bottom-0 -z-10 size-[450px] rounded-full bg-amber-500/5 blur-[120px] sm:size-[600px]" />

      <Container padding="page" className="relative">
        <div className="grid grid-cols-1 items-start gap-6 md:gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-10 xl:gap-14">
          <div className="relative min-w-0 rounded-2xl border border-white/10 bg-gray-950/85 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:rounded-3xl sm:p-7 md:p-8 lg:mt-8 lg:p-10">
            <div aria-hidden="true" className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-70 sm:left-8 sm:right-8" />
            <div className="mb-7 sm:mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500 sm:text-xs">Запитване</p>
              <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl">Разкажете ни за вашия проект</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">Опишете накратко какво искате да направим и ще се свържем с вас.</p>
            </div>
            <ContactRequestForm idPrefix="page-contact" variant="page" />
          </div>
          <div className="flex min-w-0 flex-col gap-5 lg:pt-8">
            {contactCards.map((card) => <ContactInfoCard key={card.href} {...card} />)}
            <LocationCard />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function Contacts() {
  return (
    <Layout>
      <main className="min-h-screen overflow-hidden bg-gray-950 text-white">
        <Seo title="Контакти за ремонт и строителство в София" description="Свържете се с IVANOV STROI за оглед и оферта за строителни, ремонтни и довършителни услуги в София и околностите." path="/contact-us" />
        <ContactsHero />
        <ContactContent />
      <DeferredSection placeholderClassName="min-h-[820px] bg-gray-950 sm:min-h-[900px]">
          <Suspense fallback={null}>
            <Reviews />
          </Suspense>
        </DeferredSection>
      </main>
    </Layout>
  );
}
