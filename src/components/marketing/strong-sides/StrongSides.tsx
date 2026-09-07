import { CLOUDINARY_BASE_URL } from "../../../utils/url";
import { features } from "./data";
import Container from "../../ui/Container";
import ImageFrame from "../../ui/ImageFrame";
import SectionHeading from "../../ui/SectionHeading";

export default function StrongSides() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-950 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="
          absolute
          -left-40
          top-1/2
          -z-10
          size-[500px]
          -translate-y-1/2
          rounded-full
          bg-amber-500/5
          blur-3xl
        "
      />
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <ImageFrame
            url={`${CLOUDINARY_BASE_URL}/v1787401298/bathroom-3.jpg`}
            alt="Снимка на завършен проект на IVANOV STROI (баня)"
            sizes="(min-width: 1024px) 50vw, 100vw"
            glowClassName="absolute -inset-4 rounded-[2rem] bg-amber-500/10 blur-2xl"
            imageClassName="aspect-[4/5] w-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            overlayClassName="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/10 to-transparent"
          />

          <div>
            <SectionHeading
              eyebrow="Защо да изберете нас"
              lines="before"
              title={<>Качество, което <span className="text-amber-500">се вижда</span></>}
              description="Планираме внимателно, работим организирано и предаваме пространство, което служи добре всеки ден."
              descriptionClassName="max-w-xl"
            />

            <div className="mt-10 space-y-3">
              {features.map((feature, index) => (
                <div
                  key={feature.name}
                  className="
                    group
                    flex
                    items-start
                    gap-4
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.02]
                    p-5
                    transition-all
                    duration-300
                    hover:border-amber-500/30
                    hover:bg-white/[0.04]
                  "
                >
                  <div
                    className="
                      flex
                      size-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-amber-500/10
                      text-xs
                      font-bold
                      text-amber-500
                      ring-1
                      ring-amber-500/20
                      transition-all
                      duration-300
                      group-hover:bg-amber-500
                      group-hover:text-gray-950
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="pt-1">
                    <feature.icon
                      aria-hidden="true"
                      className="
                        size-5
                        text-gray-500
                        transition-colors
                        duration-300
                        group-hover:text-amber-500
                      "
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">
                      {feature.name}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
