import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { A11y, Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { images } from "../../data/images";
import { CLOUDINARY_BASE_URL } from "../../utils/url";
import { OptimizedImage } from "../../shared/ui/OptimizedImage";
import Container from "../../shared/ui/Container";

type SliderProps = {
  showGalleryLink?: boolean;
};

const AUTOPLAY_INTERVAL_MS = 1000;

export default function Slider({ showGalleryLink = true }: SliderProps) {
  return (
    <section className="overflow-hidden bg-gray-950 py-24 sm:py-32">
      <Container>
        <h2 className="sr-only">Галерия със строителни и ремонтни дейности</h2>
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-amber-500" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500">
                Примери от дейности
              </span>
            </div>
            <p className="mt-4 max-w-2xl text-gray-400">
              Разгледайте примери от строителни, ремонтни и довършителни дейности.
            </p>
          </div>

          {showGalleryLink && (
            <Link
              to="/gallery"
              className="group hidden shrink-0 items-center gap-2 text-sm font-bold text-amber-500 sm:inline-flex"
            >
              Виж цялата галерия
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          )}
        </div>

        <div
          className="relative h-[320px] overflow-hidden rounded-3xl border border-white/10 bg-gray-950/80 shadow-2xl shadow-black/30 sm:h-[480px] lg:h-[620px]"
          role="region"
          aria-roledescription="карусел"
          aria-label="Галерия"
        >
          <Swiper
            modules={[A11y, Autoplay, Keyboard, Navigation, Pagination]}
            className="project-slider h-full w-full"
            loop={images.length > 1}
            speed={700}
            autoplay={{
              delay: AUTOPLAY_INTERVAL_MS,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            keyboard={{ enabled: true, onlyInViewport: true }}
            navigation={{
              prevEl: ".project-slider-prev",
              nextEl: ".project-slider-next",
            }}
            pagination={{ clickable: true }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={image.id}>
                <figure className="relative h-full w-full overflow-hidden">
                  <OptimizedImage
                    url={`${CLOUDINARY_BASE_URL}${image.image}`}
                    alt={image.alt}
                    width={1536}
                    sizes="(min-width: 1280px) 1280px, 100vw"
                    className="h-full w-full object-contain object-center"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/10 to-transparent"
                  />
                  <figcaption className="sr-only">
                    Снимка {index + 1} от {images.length}: {image.alt}
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            aria-label="Предишна снимка"
            className="project-slider-prev absolute left-3 top-1/2 z-30 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-amber-500/30 bg-gray-950/90 text-amber-500 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-amber-500 hover:bg-amber-500 hover:text-gray-950 sm:left-5 sm:size-12"
          >
            <ChevronLeft aria-hidden="true" className="size-5 sm:size-6" />
          </button>
          <button
            type="button"
            aria-label="Следваща снимка"
            className="project-slider-next absolute right-3 top-1/2 z-30 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-amber-500/30 bg-gray-950/90 text-amber-500 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-amber-500 hover:bg-amber-500 hover:text-gray-950 sm:right-5 sm:size-12"
          >
            <ChevronRight aria-hidden="true" className="size-5 sm:size-6" />
          </button>
        </div>
      </Container>
    </section>
  );
}
