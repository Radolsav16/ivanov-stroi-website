import { Link } from "react-router-dom";
import { CLOUDINARY_BASE_URL } from "../../utils/url";
import { OptimizedImage } from "../../shared/ui/OptimizedImage";
import Container from "../../shared/ui/Container";
import SectionHeading from "../../shared/ui/SectionHeading";
import { services } from "./data";

export default function Services() {
  return (
    <section className="relative overflow-hidden bg-gray-950 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="
          absolute
          left-1/2
          top-0
          -z-10
          size-[600px]
          -translate-x-1/2
          rounded-full
          bg-amber-500/5
          blur-3xl
        "
      />

      <Container>
        <div className="flex flex-col items-end gap-8">
          <SectionHeading
            eyebrow="Дейности и услуги"
            lines="after"
            align="right"
            className="max-w-3xl"
            title={<>Всичко за <span className="text-amber-500">вашия проект</span></>}
            description="От малка промяна до цялостен ремонт — получавате организирана работа и единна отговорност."
          />
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.id}
              to={service.href}
              className="
                group
                relative
                min-h-[420px]
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-gray-900
              "
            >
              <OptimizedImage
                url={`${CLOUDINARY_BASE_URL}${service.image}`}
                alt=""
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="
                  absolute
                  inset-0
                  size-full
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
              />
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-gray-950
                  via-gray-950/70
                  to-gray-950/10
                "
              />
              <div
                className="
                  absolute
                  inset-0
                  bg-amber-500/0
                  transition-colors
                  duration-500
                  group-hover:bg-amber-500/5
                "
              />

              <span
                className="
                  absolute
                  right-6
                  top-5
                  text-5xl
                  font-black
                  text-white/10
                  transition-colors
                  duration-300
                  group-hover:text-amber-500/30
                "
              >
                {service.number}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-7">
                <div
                  className="
                    mb-5
                    flex
                    size-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-amber-500
                    text-gray-950
                    shadow-lg
                    shadow-black/20
                  "
                >
                  {service.icon}
                </div>

                <h3
                  className="
                    text-2xl
                    font-bold
                    tracking-tight
                    text-white
                  "
                >
                  {service.title}
                </h3>

                <p
                  className="
                    mt-3
                    max-w-sm
                    text-sm
                    leading-6
                    text-gray-300
                  "
                >
                  {service.description}
                </p>
              </div>
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  h-1
                  w-0
                  bg-amber-500
                  transition-all
                  duration-500
                  group-hover:w-full
                "
              />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
