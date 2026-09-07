import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { images } from "../../data/images";
import { CLOUDINARY_BASE_URL } from "../../utils/url";
import { OptimizedImage } from "../image/OptimizedImage";
import { Link } from "react-router-dom";
import Container from "../ui/Container";

type SliderProps = {
  showGalleryLink?: boolean;
};

export default function Slider({ showGalleryLink = true }: SliderProps) {
  return (
    <section className="overflow-hidden bg-gray-950 py-24 sm:py-32">
      <Container>
        <h2 className="sr-only">Галерия от реализирани проекти</h2>
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-amber-500" />

              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500">
                Нашата работа
              </span>
            </div>

            <p className="mt-4 max-w-2xl text-gray-400">
              Разгледайте част от реализираните ни ремонти и строителни решения.
            </p>
          </div>

          {showGalleryLink && (
            <Link
              to="/gallery"
              className="
          group
          hidden
          shrink-0
          items-center
          gap-2
          text-sm
          font-bold
          text-amber-500
          sm:inline-flex
        "
            >
              Виж всички проекти
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          )}
        </div>
      </Container>

      <Container>
        <div className="gallery-swiper relative overflow-hidden rounded-3xl border border-white/10 bg-gray-950/80 shadow-2xl shadow-black/30">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: ".gallery-prev",
              nextEl: ".gallery-next",
            }}
            pagination={{
              clickable: true,
            }}
            loop
            slidesPerView={1}
            spaceBetween={0}
            className="h-[320px] sm:h-[480px] lg:h-[620px]"
          >
            {images.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="relative h-full w-full overflow-hidden">
                  <OptimizedImage
                    url={`${CLOUDINARY_BASE_URL}${item.image}`}
                    alt={item.alt}
                    sizes="(min-width: 1280px) 1280px, 100vw"
                    className="
                          h-full
                          w-full
                          object-contain
                          object-center
                          transition-transform
                          duration-[4000ms]
                        "
                  />

                  {/* Image overlay */}
                  <div
                    className="
                          pointer-events-none
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-gray-950/80
                          via-gray-950/10
                          to-transparent
                        "
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            type="button"
            aria-label="Предишна снимка"
            className="
                  gallery-prev
                  absolute
                  left-3
                  top-1/2
                  z-30
                  flex
                  size-10
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-amber-500/30
                  bg-gray-950/90
                  text-amber-500
                  shadow-xl
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:scale-110
                  hover:border-amber-500
                  hover:bg-amber-500
                  hover:text-gray-950
                  sm:left-5
                  sm:size-12
                "
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-5 sm:size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 18l-6-6 6-6"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Следваща снимка"
            className="
                  gallery-next
                  absolute
                  right-3
                  top-1/2
                  z-30
                  flex
                  size-10
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-amber-500/30
                  bg-gray-950/90
                  text-amber-500
                  shadow-xl
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:scale-110
                  hover:border-amber-500
                  hover:bg-amber-500
                  hover:text-gray-950
                  sm:right-5
                  sm:size-12
                "
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-5 sm:size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 18l6-6-6-6"
              />
            </svg>
          </button>
        </div>
      </Container>
    </section>
  );
}
