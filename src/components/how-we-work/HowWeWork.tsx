import { CLOUDINARY_BASE_URL } from "../../utils/url";
import Container from "../../shared/ui/Container";
import ImageFrame from "../../shared/ui/ImageFrame";
import SectionHeading from "../../shared/ui/SectionHeading";
import { workSteps } from "./data";

export default function HowWeWork() {
  return (
    <section className="relative overflow-hidden bg-gray-950 py-24 sm:py-32">
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
        <SectionHeading
          eyebrow="Как работим"
          title={<>От идея до <span className="text-amber-500">готов проект</span></>}
          description="Следваме ясен ред на работа, за да знаете какво предстои на всеки етап."
          align="center"
          className="mx-auto max-w-3xl"
        />
        <div className="mt-20 grid items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          <div className="relative">
            <div
              aria-hidden="true"
              className="
                absolute
                left-5
                top-5
                bottom-5
                w-px
                bg-gradient-to-b
                from-amber-500
                via-white/10
                to-transparent
              "
            />

            <div className="space-y-8">
              {workSteps.map((step) => (
                <div key={step.number} className="group relative flex gap-6">
                  <div
                    className="
                      relative
                      z-10
                      flex
                      size-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-amber-500/30
                      bg-gray-950
                      text-xs
                      font-bold
                      text-amber-500
                      transition-all
                      duration-300
                      group-hover:border-amber-500
                      group-hover:bg-amber-500
                      group-hover:text-gray-950
                    "
                  >
                    {step.number}
                  </div>
                  <div className="pb-2">
                    <h3 className="text-xl font-bold text-white">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ImageFrame
            url={`${CLOUDINARY_BASE_URL}/v1787399614/bathroom-1.jpg`}
            alt="Проект на IVAN STROI баня"
            sizes="(min-width: 1024px) 45vw, 100vw"
            glowClassName="absolute -inset-5 rounded-[2rem] bg-amber-500/10 blur-2xl"
            imageClassName="aspect-[4/5] w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            overlayClassName="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent"
          />
        </div>
      </Container>
    </section>
  );
}
