import {
  ArrowRight,
  CheckIcon,
  Phone,
  Hammer,
} from "lucide-react";
import { lazy, Suspense } from "react";
import { CLOUDINARY_BASE_URL } from "../../utils/url";
import Seo from "../seo/Seo";
import { OptimizedImage } from "../../shared/ui/OptimizedImage";
import HowWeWork from "../how-we-work/HowWeWork";
import Layout from "../../Layout";
import { contactDetails } from "../../data/contact";
import ActionLink from "../../shared/ui/ActionLink";
import Container from "../../shared/ui/Container";
import DeferredSection from "../../shared/ui/DeferredSection";

const Reviews = lazy(() => import("../reviews/Reviews"));

const AboutUs = () => {
  return (
    <Layout>
      <main className="overflow-hidden bg-gray-950 text-white">
        <Seo
          title="За IVANOV STROI: строителство и ремонти в София"
          description="Научете повече за подхода на IVANOV STROI към строителството, ремонтите и довършителните услуги в София и околностите."
          path="/about-us"
        />
        <section className="relative isolate min-h-[680px] overflow-hidden sm:min-h-[720px] lg:min-h-[780px]">
          <div className="absolute inset-0 -z-20">
            <OptimizedImage
              url="/images/ivanov-stroi-craft-hero.jpg"
              alt="Интериорен детайл с естествен камък и дърво"
              width={1920}
              height={1080}
              priority
              className="size-full object-cover object-center"
            />
          </div>

          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gray-950 via-gray-950/90 to-gray-950/30" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-950 via-transparent to-gray-950/20" />

          <Container className="flex min-h-[680px] items-center py-24 sm:min-h-[720px] lg:min-h-[780px]">
            <div className="max-w-3xl">
              <h1 className="animate-fade-up max-w-5xl text-5xl font-black leading-[0.98] tracking-tight text-white drop-shadow-2xl sm:text-6xl md:text-7xl lg:text-7xl">
                Създаваме пространства
                <span className="mt-2 block text-amber-500 sm:mt-3">
                  в които си струва да живееш
                </span>
              </h1>

              <p className="animate-fade-up-delay mt-8 max-w-2xl text-lg leading-8 text-gray-300 sm:text-xl">
                IVANOV STROI превръща идеите за дома в добре организирани ремонти
                и строителни решения — от малката промяна до цялостния проект
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ActionLink
                  to="/contact-us"
                  className="font-bold"
                  icon={<ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />}
                >
                  Направи запитване
                </ActionLink>

                <ActionLink
                  href={contactDetails.phoneHref}
                  variant="secondary"
                  className="bg-white/10 hover:bg-white/15"
                  icon={<Phone className="size-4" />}
                  iconPosition="start"
                >
                  Обади се
                </ActionLink>
              </div>

              <div className="mt-12 flex flex-wrap gap-x-7 gap-y-4 border-t border-white/10 pt-6 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckIcon className="size-4 text-amber-500" />
                  Качествени материали
                </div>

                <div className="flex items-center gap-2">
                  <CheckIcon className="size-4 text-amber-500" />
                  Коректност
                </div>

                <div className="flex items-center gap-2">
                  <CheckIcon className="size-4 text-amber-500" />
                  Индивидуален подход
                </div>
              </div>
            </div>
          </Container>
        </section>
        <section className="relative py-20 sm:py-28 lg:py-32">
          <Container>
            <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
              <div className="relative mx-auto w-full max-w-xl lg:mx-0">
                <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10">
                  <OptimizedImage
                    url={`${CLOUDINARY_BASE_URL}/v1787867342/service-img-13.jpg`}
                    alt="IVANOV STROI в процес на работа"
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="size-full object-cover transition duration-700 hover:scale-105"
                  />
                </div>

                <div className="absolute -bottom-10 -right-5 z-20 hidden w-44 overflow-hidden rounded-2xl border-8 border-gray-950 shadow-2xl sm:block sm:w-52 md:-right-8 lg:-right-12">
                  <div className="aspect-[3/4]">
                    <OptimizedImage
                      url={`${CLOUDINARY_BASE_URL}/v1787591081/service-img-1.jpg`}
                      alt="IVANOV STROI в процес на работа"
                      sizes="208px"
                      className="size-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
                  Създаваме пространство за вашия живот
                </p>

                <p className="mt-7 text-base leading-8 text-gray-300 sm:text-lg">
                  Започваме с разговор, за да разберем как ще използвате
                  пространството и какъв резултат очаквате. След това подреждаме
                  работата, избираме подходящите решения и изпълняваме проекта
                  последователно. Целта ни не е просто добре изглеждащ интериор,
                  а функционално пространство, което ви е удобно всеки ден и
                  запазва стойността си във времето.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <HowWeWork />
      <DeferredSection placeholderClassName="min-h-[820px] bg-gray-950 sm:min-h-[900px]">
          <Suspense fallback={null}>
            <Reviews />
          </Suspense>
        </DeferredSection>

        <section className="relative isolate overflow-hidden border-t border-white/10 py-20 sm:py-28 lg:py-36">
          <div className="absolute inset-0 -z-20">
            <OptimizedImage
              url={`${CLOUDINARY_BASE_URL}/v1787864650/service-img-12.jpg`}
              alt="Завършен строителен проект на IvanStroi"
              width={1920}
              className="size-full object-cover"
            />
          </div>

          {/* Dark overlays */}
          <div className="absolute inset-0 -z-10 bg-gray-950/85" />

          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gray-950 via-gray-950/75 to-gray-950/60" />

          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-950 via-transparent to-gray-950/70" />

          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 size-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[120px] sm:size-[600px]"
          />

          <Container size="narrow" className="text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-amber-500/20 bg-gray-950/60 text-amber-500 shadow-2xl backdrop-blur-md sm:size-16">
              <Hammer className="size-6 sm:size-7" />
            </div>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-amber-500 sm:text-sm">
              Вашият проект започва тук
            </p>

            {/* Heading */}
            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Готови за следващата стъпка
            </h2>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg sm:leading-8">
              Разкажете ни за вашата идея и нека заедно превърнем пространството
              ви в нещо, с което ще се гордеете.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <ActionLink
                to="/contact-us"
                className="px-7 font-bold shadow-xl shadow-amber-500/10 hover:-translate-y-0.5 hover:shadow-amber-500/20"
                icon={<ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />}
              >
                Направи запитване
              </ActionLink>

              <ActionLink
                href={contactDetails.phoneHref}
                variant="secondary"
                className="bg-gray-950/60 px-7 shadow-xl hover:-translate-y-0.5"
                icon={<Phone className="size-4" />}
                iconPosition="start"
              >
                {contactDetails.phone}
              </ActionLink>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-gray-400 sm:text-sm">
              <span className="flex items-center gap-2">
                <CheckIcon className="size-4 text-amber-500" />
                Коректност
              </span>

              <span className="hidden h-4 w-px bg-white/10 sm:block" />

              <span className="flex items-center gap-2">
                <CheckIcon className="size-4 text-amber-500" />
                Качествено изпълнение
              </span>

              <span className="hidden h-4 w-px bg-white/10 sm:block" />

              <span className="flex items-center gap-2">
                <CheckIcon className="size-4 text-amber-500" />
                Индивидуален подход
              </span>
            </div>
          </Container>
        </section>
      </main>
    </Layout>
  );
};

export default AboutUs;
