"use client";

import { useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ClientOnly } from "@/components/ui/ClientOnly";
import { pickGallerySlides } from "@/content/gallery-slides";
import type { Slide } from "@/lib/vtvlive-sdk/index";

/**
 * BLOCK/announcement/GallerySliderBlock — slider ảnh ở đáy section announcement
 * (bản gốc: `news/SliderPC.tsx` và `news/SliderMB.tsx`; 5 ảnh gắn cứng ở `content/gallery-slides.ts`).
 *   - desktop: coverflow, ảnh giữa rõ, ảnh hai bên mờ/xám, hai nút prev/next ngoài mép, tự chạy 10 giây
 *   - mobile : 1 ảnh mỗi lần, chấm tròn phân trang ở đáy, tự chạy 3 giây
 */

const ASSET_DIR = "/assets/images/home/announcement";
const DESKTOP_INITIAL_SLIDE = 2;
/** Coverflow 1.3 slide/lần + căn giữa: Swiper cần >= 6 slide mới lặp vòng đúng (ít hơn thì cảnh báo), nên dưới ngưỡng này tắt loop. */
const DESKTOP_LOOP_MIN_SLIDES = 6;

export function GallerySliderBlock({ variant, slides = [] }: { variant: "desktop" | "mobile"; slides?: Slide[] }) {
  const items = pickGallerySlides(slides);
  const itemsKey = items.map((item) => item.image).join("|");
  const desktopInitialSlide = Math.min(DESKTOP_INITIAL_SLIDE, items.length - 1);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(variant === "desktop" ? desktopInitialSlide : 0);
  const lastIndex = items.length - 1;

  const slideTo = (index: number) => {
    swiperRef.current?.slideToLoop(index);
    setActiveIndex(index);
  };

  if (variant === "mobile") {
    return (
      <div data-block="gallery-slider">
        <ClientOnly>
          <Swiper
            key={itemsKey}
            initialSlide={0}
            autoplay={items.length > 1 ? { delay: 3000 } : false}
            grabCursor
            className="h-full w-full overflow-hidden"
            loop={items.length > 1}
            spaceBetween={10}
            slidesPerView={1}
            modules={[Autoplay]}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {items.map(({ id, image }, index) => (
              <SwiperSlide key={id}>
                <div>
                  <img data-edit-id="gallery-slider-block.data-image" data-edit-mode="scale" data-edit-source="api"
                    src={image}
                    className="object-contain"
                    alt="art"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </ClientOnly>

        <div className="absolute -bottom-10 left-1/2 z-10 flex w-full max-w-145 -translate-x-1/2 gap-10">
          {items.map(({ id }, index) => (
            <button
              type="button"
              key={id}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => swiperRef.current?.slideToLoop(index)}
              className={`block h-15 w-15 rounded-[50px] transition-all ${
                activeIndex === index ? "bg-primary-active" : "bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div data-block="gallery-slider" data-variant="desktop">
      <ClientOnly>
        <Swiper
          key={itemsKey}
          modules={[Autoplay, EffectCoverflow]}
          className="h-full w-full overflow-hidden"
          loop={items.length >= DESKTOP_LOOP_MIN_SLIDES}
          cssMode={false}
          grabCursor
          autoplay={{ delay: 10000 }}
          centeredSlides
          slidesPerView={1.3}
          spaceBetween={0}
          initialSlide={desktopInitialSlide}
          effect="coverflow"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          coverflowEffect={{ rotate: 0, stretch: 343, depth: 293, modifier: 1, slideShadows: false }}
        >
          {items.map(({ id, image }, index) => (
            <SwiperSlide
              key={id}
              className={`w-585 ${
                activeIndex === index ? "opacity-100" : "opacity-60"
              } transition-opacity duration-300`}
            >
              <div>
                <img data-edit-id="gallery-slider-block.data-image~2" data-edit-mode="scale" data-edit-source="api"
                  src={image}
                  className="object-contain"
                  alt="art"
                  loading={index === activeIndex ? "eager" : "lazy"}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </ClientOnly>

      <div className="absolute top-1/2 -right-100 -left-100 z-10 flex -translate-y-1/2 justify-between">
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => slideTo(activeIndex === 0 ? lastIndex : activeIndex - 1)}
          aria-label="Previous slide"
        >
          <img data-edit-id="gallery-slider-block.btn-slider-prev" data-edit-mode="scale"
            src={`${ASSET_DIR}/btn-slider-prev.png`}
            className="aspect-102/76 object-contain"
            alt=""
            loading="lazy"
          />
        </button>
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => slideTo(activeIndex === lastIndex ? 0 : activeIndex + 1)}
          aria-label="Next slide"
        >
          <img data-edit-id="gallery-slider-block.btn-slider-next" data-edit-mode="scale"
            src={`${ASSET_DIR}/btn-slider-next.png`}
            className="aspect-102/76 object-contain"
            alt=""
            loading="lazy"
          />
        </button>
      </div>
    </div>
  );
}
