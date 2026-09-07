import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { OptimizedImage } from "../image/OptimizedImage";
import { CLOUDINARY_BASE_URL } from "../../utils/url";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { reviews } from "./data";

export default function Reviews() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-950 py-24 sm:py-32">
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <OptimizedImage
          url={`${CLOUDINARY_BASE_URL}/v1787401113/working-img-39.jpg`}
          alt=""
          width={1920}
          sizes="100vw"
          className="size-full object-cover object-center"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-950/95 via-gray-950/88 to-gray-950/95"
      />
      <div
        aria-hidden="true"
        className="
          absolute
          left-1/2
          top-0
          -z-10
          size-[500px]
          -translate-x-1/2
          rounded-full
          bg-amber-500/5
          blur-3xl
        "
      />

      <Container>
        <SectionHeading
          eyebrow="Отзиви от клиенти"
          lines="both"
          align="center"
          className="mx-auto max-w-3xl"
          title={<>Клиентите за <span className="text-amber-500">работата ни</span></>}
          description="Реалните впечатления са най-добрият ориентир при избора на екип."
          descriptionClassName="text-gray-300"
        />

        <div className="mt-16">
          <Swiper
            modules={[Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="reviews-swiper !pb-14"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <article
                  className="
                    group
                    relative
                    flex
                    h-full
                    min-h-[340px]
                    flex-col
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/10
                    bg-gray-950/75
                    shadow-2xl
                    shadow-black/25
                    backdrop-blur-sm
                    p-8
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-amber-500/30
                  "
                >
                  <div
                    className="
                      absolute
                      right-6
                      top-4
                      text-7xl
                      leading-none
                      text-amber-500/10
                      transition-colors
                      duration-300
                      group-hover:text-amber-500/20
                    "
                  >
                    “
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, index) => (
                      <span key={index} className="text-lg text-amber-500">
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Review */}
                  <blockquote
                    className="
                      mt-6
                      flex-1
                      text-base
                      leading-7
                      text-gray-300
                    "
                  >
                    “{review.review}”
                  </blockquote>
                  <div className="my-6 h-px bg-white/10" />
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm font-bold text-white">
                        {review.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {review.project}
                      </p>
                    </div>
                  </div>
                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      h-0.5
                      w-0
                      bg-amber-500
                      transition-all
                      duration-500
                      group-hover:w-full
                    "
                  />
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
}
