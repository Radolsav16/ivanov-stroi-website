import { Mail, Phone } from "lucide-react";
import { contactDetails } from "../../data/contact";
import Container from "../../shared/ui/Container";

const contactMethods = [
  {
    label: "Обадете ни се",
    value: contactDetails.phone,
    href: contactDetails.phoneHref,
    Icon: Phone,
  },
  {
    label: "Пишете ни",
    value: contactDetails.email,
    href: contactDetails.emailHref,
    Icon: Mail,
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
            Контакти
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Да обсъдим вашия проект
        </h2>
        <p className="mt-5 text-sm leading-7 text-gray-400 sm:mt-6 sm:text-base">
          Свържете се директно с нас по телефон или имейл, за да обсъдим проекта и следващите стъпки.
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
          <div className="grid overflow-hidden rounded-3xl lg:grid-cols-2 lg:rounded-[2rem]">
            <ContactIntroduction />
            <div className="flex min-w-0 flex-col justify-center p-6 sm:p-10 lg:p-14">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
                Директна връзка
              </p>
              <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                Изберете удобен начин за контакт
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
                За най-бърз отговор се обадете. Можете да изпратите и имейл с кратко описание на планираните дейности.
              </p>
              <div className="mt-8 grid gap-4">
                {contactMethods.map(({ label, value, href, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    className="group flex min-h-20 items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-amber-500/40 hover:bg-amber-500/[0.06] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-gray-950">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-gray-500">{label}</span>
                      <span className="mt-1 block break-all text-sm font-bold text-white group-hover:text-amber-500 sm:text-base">
                        {value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
