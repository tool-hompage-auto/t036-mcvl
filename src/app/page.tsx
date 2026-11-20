import { ScaleLayout } from "@/components/layout/ScaleLayout";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { AnnouncementSection } from "@/components/sections/home/announcement/AnnouncementSection";
import { HOME_PATH } from "@/lib/urls";

/**
 * PAGE: TRANG CHỦ — route "/" (bản gốc: `page/Home.tsx`).
 *
 * Thứ tự section từ trên xuống (tất cả nằm trong ScaleLayout):
 *   1. HeroSection          banner: ảnh (mobile) / video (desktop) + logo game
 *   2. AnnouncementSection  banner-slider, khung tải game, tab tin tức, 4 nút nhanh, gallery-slider
 *   3. SiteFooter           dải link + footer chung của Vplay
 * Lớp nằm ngoài ScaleLayout (SiteChrome): header + menu mobile, side menu, nút BXH, logo 18+.
 * Bảng xếp hạng nằm ở trang riêng /bang-xep-hang.
 */
export default function HomePage() {
  return (
    <div data-page="home">
      <SiteChrome currentPath={HOME_PATH} />
      <ScaleLayout>
        <HeroSection />
        <AnnouncementSection />
        <section className="relative">
          <SiteFooter />
        </section>
      </ScaleLayout>
    </div>
  );
}
