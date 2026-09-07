import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { contactDetails } from "../../data/contact";
import Container from "../ui/Container";
import ContactRequestForm from "./ContactRequestForm";

const contactMethods = [
  {
    label: "Обадете ни се",
    value: contactDetails.phone,
    href: contactDetails.phoneHref,
    Icon: PhoneIcon,
  },
  {
    label: "Пишете ни",
    value: contactDetails.email,
    href: contactDetails.emailHref,
    Icon: EnvelopeIcon,
  },
];

function ContactIntroduction() {
  return (
    <div className="relative overflow-hidden border-b border-white/10 bg-gray-900 p-6 sm:p-10 lg:border-b-0 lg:border-r lg:p-14">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 size-72 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="relative">
        <div className="mb-5 flex items-center gap-3 sm:mb-6">
          <span className="h-px w-8 bg-amber-500 sm:w-10" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-500 sm:text-xs sm:tracking-[0.25em]">
            Направете запитване
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Да обсъдим вашия проект
        </h2>
        <p className="mt-5 text-sm leading-7 text-gray-400 sm:mt-6 sm:text-base">
          Опишете накратко какво планирате и ние ще се свържем с вас, за да обсъдим проекта и следващите стъпки.
        </p>
        <div className="mt-9 space-y-5 sm:mt-12 sm:space-y-6">
          {contactMethods.map(({ label, value, href, Icon }) => (
            <a key={href} href={href} className="group flex min-w-0 items-center gap-3 sm:gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20 transition-colors group-hover:bg-amber-500 group-hover:text-gray-950 sm:size-11">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-gray-500">{label}</span>
                <span className="mt-1 block truncate text-sm font-semibold text-white transition-colors group-hover:text-amber-500 sm:text-base">{value}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ContactForm() {
  return (
    <section id="contact" className="relative overflow-hidden bg-gray-950 py-20 sm:py-24 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-1/2 -z-10 size-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-amber-500/10 blur-3xl" />
      <Container padding="compact">
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] shadow-2xl shadow-black/30 sm:rounded-[2rem]">
          <div className="grid overflow-hidden rounded-3xl lg:grid-cols-[0.8fr_1.2fr] lg:rounded-[2rem]">
            <ContactIntroduction />
            <div className="min-w-0 p-6 sm:p-10 lg:p-14">
              <ContactRequestForm idPrefix="home-contact" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
