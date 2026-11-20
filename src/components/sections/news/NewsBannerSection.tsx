import { HeroSection } from "@/components/sections/home/HeroSection";

/**
 * SECTION/NEWS/NewsBannerSection — phần đầu của trang danh sách tin và chi tiết tin
 * (bản gốc: cùng component `Banner` với trang chủ).
 *
 * Block: giống HeroSection (hero-video, hero-title); chỉ khác tên section
 * (`news-banner`) để phân biệt với `hero` của trang chủ.
 */
export function NewsBannerSection() {
  return <HeroSection name="news-banner" />;
}
