/**
 * SECTION/HOME/HeroSection — banner đầu trang (bản gốc: `components/home/Banner.tsx`, `id="banner"`).
 * Dùng ở trang chủ (section `hero`) và, qua NewsBannerSection / RankingBannerSection, ở đầu
 * các trang tin và trang bảng xếp hạng (section `news-banner` / `ranking-banner`).
 *
 * Block:
 *   - hero-video: mobile (< 769px) là ảnh tĩnh; desktop là video tự phát (file nặng trên CDN của Vplay)
 *   - hero-title: logo game nảy lên một lần khi vào trang (chỉ mobile)
 * Nút "play" vô hình của bản gốc (không có hành vi) không được port.
 */

import { STATIC_LINKS } from "@/config/site.config";

const HERO_DIR = "/assets/images/home/hero";

interface HeroSectionProps {
  /** Tên section: "hero" ở trang chủ, "news-banner" / "ranking-banner" ở các trang khác. */
  name?: "hero" | "news-banner" | "ranking-banner";
}

export function HeroSection({ name = "hero" }: HeroSectionProps) {
  return (
    <section id={`section-${name}`} data-section={name} className="relative">
      <div data-block="hero-video">
        <img data-edit-id="hero-section.bg-hero--mb" data-edit-mode="scale" src={`${HERO_DIR}/bg-hero--mb.jpg`} className="w-full pc:hidden" alt="banner" />
        <video data-edit-id="hero-section.data-hero-video" data-edit-mode="scale" data-edit-source="api"
          className="hidden w-full object-contain pc:block"
          autoPlay
          controls={false}
          muted
          loop
          playsInline
          tabIndex={-1}
        >
          <source src={STATIC_LINKS.heroVideo} type="video/mp4" />
        </video>
      </div>

      <picture data-edit-id="hero-section.logo-game"
        data-block="hero-title"
        className="absolute top-0 left-1/2 -translate-x-1/2 animate-title-pop pc:hidden!"
      >
        <img src={`${HERO_DIR}/logo-game.png`} alt="logo-game" />
      </picture>
    </section>
  );
}
