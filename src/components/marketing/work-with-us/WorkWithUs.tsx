import { CLOUDINARY_BASE_URL } from "../../../utils/url";
import { contactDetails } from "../../../data/contact";
import ActionLink from "../../../shared/ui/ActionLink";
import Container from "../../../shared/ui/Container";
import ImageFrame from "../../../shared/ui/ImageFrame";

export default function WorkWithUs() {
  return (
    <section className="relative overflow-hidden bg-gray-950 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="
          absolute
          -right-40
          top-1/2
          size-[500px]
          -translate-y-1/2
          rounded-full
          bg-amber-500/5
          blur-3xl
        "
      />

      <Container>
        <div
          className="
            grid
            items-center
            gap-14
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-20
          "
        >
          <div>
            <h2
              className="
                text-5xl
                font-bold
                tracking-tight
                text-white
                sm:text-6xl
                lg:text-7xl
              "
            >
              Имате идея
              <br />
              <span className="text-amber-500">Нека я изградим</span>
            </h2>
            <p
              className="
                mt-8
                max-w-xl
                text-lg
                leading-8
                text-gray-400
                sm:text-xl
              "
            >
              Независимо дали планирате ремонт, обновяване или ново строителство,
              ще ви помогнем да превърнете идеята в ясно реализиран проект.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ActionLink
                href={contactDetails.phoneHref}
                variant="secondary"
                className="border-white/10 bg-white/[0.03] hover:border-amber-500/30 hover:bg-white/[0.06]"
              >
                Обади се сега
              </ActionLink>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="flex size-9 items-center justify-center rounded-full border-2 border-gray-950 bg-gray-800 text-xs text-amber-500">
                  ★
                </div>

                <div className="flex size-9 items-center justify-center rounded-full border-2 border-gray-950 bg-gray-800 text-xs text-gray-400">
                  ✓
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  От идея до готово пространство
                </p>

                <p className="text-xs text-gray-500">
                  С ясен процес на всяка стъпка
                </p>
              </div>
            </div>
          </div>

          <ImageFrame
            url={`${CLOUDINARY_BASE_URL}/v1787399641/bathroom-2.jpg`}
            alt="Завършен проект на IVANOV STROI (баня) 2"
            sizes="(min-width: 1024px) 50vw, 100vw"
            glowClassName="absolute -inset-5 rounded-[2rem] bg-amber-500/10 blur-2xl"
            frameClassName="shadow-black/50"
            imageClassName="aspect-[4/3] w-full object-cover object-center transition-transform duration-[1200ms] group-hover:scale-105"
            overlayClassName="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent"
          />
        </div>
      </Container>
    </section>
  );
}
