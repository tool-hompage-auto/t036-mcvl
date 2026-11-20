"use client";

import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ClientOnly } from "@/components/ui/ClientOnly";
import { toSafeUrl } from "@/lib/urls";
import type { Slide } from "@/lib/vtvlive-sdk/index";

/**
 * BLOCK/announcement/BannerSliderBlock — slider banner tin (bản gốc: `news/NewsMainSlider.tsx`).
 * Dùng thư viện Swiper như bản gốc: 1 ảnh mỗi lần, lặp vòng, tự chạy 3 giây.
 *
 * Dữ liệu: toàn bộ slide từ sdk.slides.getSlides() (truyền qua prop).
 * Không có slide thì không render gì.
 * Element: các slide (ảnh có link) + hàng gạch phân trang ở đáy.
 *
 * Khác bản gốc: slider gọi swiper.update() mỗi khi khung chứa đổi kích thước (phòng
 * trường hợp khung co giãn sau khi khởi tạo). Đã đo trên bản live: kích thước slider
 * ở 360/414/600/768px khớp với live, kể cả khi ảnh tải trễ, nên logic này không gây lệch.
 */

const AUTO_PLAY_MS = 3000;
const SLIDE_GAP = 10;

interface BannerSliderBlockProps {
  slides: Slide[];
  /** Class của ảnh slide (khác nhau giữa bố cục desktop và mobile). */
  imageClassName: string;
}

export function BannerSliderBlock({ slides, imageClassName }: BannerSliderBlockProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const hasSlides = slides.length > 0;

  // Đo lại slider mỗi khi khung chứa đổi kích thước.
  useEffect(() => {
    const container = containerRef.current;
    if (!hasSlides || !container) return;
    const observer = new ResizeObserver(() => swiperRef.current?.update());
    observer.observe(container);
    return () => observer.disconnect();
  }, [hasSlides]);

  if (!hasSlides) return null;

  return (
    <div ref={containerRef} data-block="banner-slider" className="relative w-full">
      <ClientOnly>
        <Swiper
          initialSlide={0}
          autoplay={slides.length > 1 ? { delay: AUTO_PLAY_MS } : false}
          grabCursor
          className="h-full w-full overflow-hidden"
          loop={slides.length > 1}
          spaceBetween={SLIDE_GAP}
          slidesPerView={1}
          modules={[Autoplay]}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.image}>
              <a
                href={toSafeUrl(slide.link)}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block"
              >
                <img
                  className={imageClassName}
                  src={toSafeUrl(slide.image)}
                  alt={slide.title ?? ""}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </ClientOnly>

      {/* Gạch phân trang */}
      <div className="absolute bottom-16 left-1/2 z-10 flex w-full max-w-138 -translate-x-1/2 gap-10">
        {slides.map((slide, index) => (
          <button
            type="button"
            key={slide.image}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => swiperRef.current?.slideToLoop(index)}
            className={`block h-8 w-40 rounded-[20px] bg-white transition-all ${
              activeIndex === index ? "opacity-100" : "opacity-[0.7]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
