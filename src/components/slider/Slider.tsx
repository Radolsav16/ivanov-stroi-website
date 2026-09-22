import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { images } from "../../data/images";
import { CLOUDINARY_BASE_URL } from "../../utils/url";
import { OptimizedImage } from "../../shared/ui/OptimizedImage";
import Container from "../../shared/ui/Container";

type SliderProps = {
  showGalleryLink?: boolean;
};

const SWIPE_THRESHOLD_PX = 45;

export default function Slider({ showGalleryLink = true }: SliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStartX = useRef<number | null>(null);
  const activeImage = images[activeIndex];

  const showImage = (index: number) => {
    setActiveIndex((index + images.length) % images.length);
  };

  const finishSwipe = (clientX: number) => {
    if (pointerStartX.current === null) return;
    const distance = clientX - pointerStartX.current;
    pointerStartX.current = null;

    if (Math.abs(distance) < SWIPE_THRESHOLD_PX) return;
    showImage(activeIndex + (distance < 0 ? 1 : -1));
  };

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
          className="relative h-[320px] touch-pan-y overflow-hidden rounded-3xl border border-white/10 bg-gray-950/80 shadow-2xl shadow-black/30 sm:h-[480px] lg:h-[620px]"
          role="region"
          aria-roledescription="карусел"
          aria-label="Галерия"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") showImage(activeIndex - 1);
            if (event.key === "ArrowRight") showImage(activeIndex + 1);
          }}
          onPointerDown={(event) => {
            pointerStartX.current = event.clientX;
          }}
          onPointerUp={(event) => finishSwipe(event.clientX)}
          onPointerCancel={() => {
            pointerStartX.current = null;
          }}
        >
          <figure className="relative h-full w-full overflow-hidden">
            <OptimizedImage
              key={activeImage.id}
              url={`${CLOUDINARY_BASE_URL}${activeImage.image}`}
              alt={activeImage.alt}
              width={1536}
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="h-full w-full object-contain object-center"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/10 to-transparent" />
            <figcaption className="sr-only">
              Снимка {activeIndex + 1} от {images.length}: {activeImage.alt}
            </figcaption>
          </figure>

          <button
            type="button"
            aria-label="Предишна снимка"
            onClick={() => showImage(activeIndex - 1)}
            className="absolute left-3 top-1/2 z-30 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-amber-500/30 bg-gray-950/90 text-amber-500 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-amber-500 hover:bg-amber-500 hover:text-gray-950 sm:left-5 sm:size-12"
          >
            <ChevronLeft aria-hidden="true" className="size-5 sm:size-6" />
          </button>
          <button
            type="button"
            aria-label="Следваща снимка"
            onClick={() => showImage(activeIndex + 1)}
            className="absolute right-3 top-1/2 z-30 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-amber-500/30 bg-gray-950/90 text-amber-500 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-amber-500 hover:bg-amber-500 hover:text-gray-950 sm:right-5 sm:size-12"
          >
            <ChevronRight aria-hidden="true" className="size-5 sm:size-6" />
          </button>

          <div className="absolute inset-x-0 bottom-4 z-30 flex justify-center gap-2" aria-label="Избор на снимка">
            {images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                aria-label={`Покажи снимка ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => showImage(index)}
                className={`h-2 rounded-full bg-amber-500 transition-[width,opacity] ${
                  index === activeIndex ? "w-6 opacity-100" : "w-2 opacity-40 hover:opacity-75"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
