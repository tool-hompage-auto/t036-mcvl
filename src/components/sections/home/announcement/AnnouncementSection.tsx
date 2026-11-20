"use client";

import Link from "next/link";
import { useState } from "react";

import { useAsyncData } from "@/hooks/useAsyncData";
import { API_LIMITS } from "@/config/api.config";
import { useViewport } from "@/hooks/useViewport";
import { getSdk } from "@/lib/sdk-client";
import { NEWS_LIST_PATH } from "@/lib/urls";
import { pickBannerSlides } from "@/content/gallery-slides";

import { BannerSliderBlock } from "./BannerSliderBlock";
import { DownloadBlock } from "./DownloadBlock";
import { GallerySliderBlock } from "./GallerySliderBlock";
import { NewsTabsBlock } from "./NewsTabsBlock";
import { QuickLinksBlock } from "./QuickLinksBlock";

/**
 * SECTION/HOME/AnnouncementSection — khu tin tức + tải game (bản gốc: `components/news/News.tsx`,
 * `id="news"`, kèm `NewsDesktop.tsx` / `NewsMobile.tsx`).
 *
 * Bố cục desktop (> 768px):
 *   [ banner-slider ] [ download ] [ khung tin: news-tabs + "Xem thêm" ]
 *   [ quick-links: 4 nút ngang ]
 *   [ gallery-slider coverflow ở đáy section ]
 * Bố cục mobile (<= 768px), xếp dọc:
 *   quick-links -> banner-slider -> khung tin -> gallery-slider
 *
 * Dữ liệu:
 *   sdk.news.getHomeCategories()  -> tab chuyên mục (tab đầu tiên được chọn sẵn)
 *   sdk.slides.getSlides()        -> slide đầu cho banner-slider, các slide còn lại cho gallery-slider
 *   sdk.news.getPosts({ categoryId, limit: 4 }) -> tin của tab đang chọn
 */

const ASSET_DIR = "/assets/images/home/announcement";
const COMMON_DIR = "/assets/images/common";

export function AnnouncementSection() {
  const { isDesktop } = useViewport();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const { data: categoryData } = useAsyncData("home-categories", () =>
    getSdk().news.getHomeCategories(),
  );
  const { data: slideData, status: slideStatus } = useAsyncData("slides", () => getSdk().slides.getSlides());
  // Chờ Hub trả lời rồi mới dựng slider coverflow: không để ảnh mặc định chớp lên rồi mới đổi sang slide thật.
  const slidesReady = slideStatus !== "loading";

  const categories = categoryData ?? [];
  const slides = slideData ?? [];
  const bannerSlides = pickBannerSlides(slides);
  const activeCategory =
    categories.find((category) => category.slug === selectedSlug) ?? categories[0];

  const { data: postData } = useAsyncData(
    activeCategory ? `home-posts:${activeCategory.id}` : null,
    () =>
      getSdk().news.getPosts({
        categoryId: activeCategory?.id,
        limit: API_LIMITS.homeNews,
      }),
  );

  const tabsProps = {
    categories,
    activeSlug: activeCategory?.slug ?? "",
    onSelectCategory: setSelectedSlug,
    posts: postData ?? [],
  };

  return (
    <section id="section-announcement" data-section="announcement" className="relative">
      <picture>
        <source media="(max-width: 768px)" srcSet={`${ASSET_DIR}/bg-announcement--mb.png`} />
        <source media="(min-width: 769px)" srcSet={`${COMMON_DIR}/bg-news.png`} />
        <img data-edit-id="announcement-section.bg-announcement--mb" data-edit-mode="scale"
          src={`${COMMON_DIR}/bg-news.png`}
          className="w-full"
          alt="news banner"
          loading="eager"
          fetchPriority="high"
        />
      </picture>

      {isDesktop ? (
        <>
          <div data-edit-id="announcement-section.frame-news-tabs"
            data-element="section-inner"
            className="absolute top-0 left-0 flex w-full flex-col items-center justify-center"
          >
            <picture data-edit-id="announcement-section.frame-announcement" className="absolute -top-240">
              <img
                src={`${ASSET_DIR}/frame-announcement.png`}
                className="object-contain"
                alt=""
                loading="lazy"
              />
            </picture>

            <div className="relative flex w-full items-center justify-center gap-35">
              <div className="relative">
                <div className="w-full max-w-560">
                  <BannerSliderBlock
                    slides={bannerSlides}
                    imageClassName="aspect-560/450 object-contain"
                  />
                </div>
              </div>

              <DownloadBlock />

              {/* Khung tin: ảnh khung quyết định kích thước, nội dung phủ lên trên */}
              <div className="relative mt-32">
                <img src={`${ASSET_DIR}/frame-news-tabs.png`} alt="" loading="lazy" />
                <div className="absolute top-0 left-0 h-full w-full px-32 py-16">
                  <NewsTabsBlock {...tabsProps} />
                </div>
                <Link
                  href={NEWS_LIST_PATH}
                  className="relative bottom-50 left-[75%] p-8 fs-18 lh-28 text-black hover:text-primary"
                >
                  Xem thêm
                </Link>
              </div>
            </div>

            <QuickLinksBlock variant="desktop" />
          </div>

          <div className="absolute bottom-80 left-1/2 max-w-1323 -translate-x-1/2">
            {slidesReady && <GallerySliderBlock variant="desktop" slides={slides} />}
          </div>
        </>
      ) : (
        <div data-edit-id="announcement-section.frame-news-tabs--mb" data-element="section-inner" className="absolute top-32 left-0">
          <QuickLinksBlock variant="mobile" />

          <div className="relative mx-auto mt-32 w-full max-w-640">
            <BannerSliderBlock slides={bannerSlides} imageClassName="aspect-640/543 object-contain" />
          </div>

          <div className="relative mx-auto mt-32 max-w-640">
            <img src={`${ASSET_DIR}/frame-news-tabs--mb.png`} alt="" loading="lazy" />
            <div className="absolute top-0 left-0 h-full w-full px-32 py-16">
              <NewsTabsBlock {...tabsProps} />
            </div>
            <Link
              href={NEWS_LIST_PATH}
              className="relative bottom-48 left-[75%] p-8 fs-18 lh-28 text-black hover:text-primary"
            >
              Xem thêm
            </Link>
          </div>

          <div className="relative mx-auto mt-32 w-full max-w-640">
            {slidesReady && <GallerySliderBlock variant="mobile" slides={slides} />}
          </div>
        </div>
      )}
    </section>
  );
}
