import type { Slide } from "@/lib/vtvlive-sdk/index";

/**
 * CONTENT/gallery-slides — 5 ảnh của slider coverflow cuối section announcement.
 * Bản gốc gắn cứng (`SlideHome` trong `utils/constant.ts`), ảnh nằm trên CDN của Vplay: giữ nguyên.
 */
const GALLERY_CDN = "https://website-assets-cdn.vtvlive.vn/website_assets/t029";

export const GALLERY_SLIDES: ReadonlyArray<{ id: string; image: string }> = [1, 2, 3, 4, 5].map(
  (index) => ({ id: `gallery-slide-${index}`, image: `${GALLERY_CDN}/slide-${index}.jpg` }),
);

/**
 * Slide Hub: slide đầu -> slider banner; các slide còn lại -> slider coverflow (tiêu đề `title` do CMS đặt tự do theo từng
 * game nên không lọc theo tên).
 *
 * Quy tắc (yêu cầu 2026-11-20): chỉ cần Hub có >= 1 slide thì slider coverflow BẮT BUỘC dùng ảnh slide thật, lặp vòng cho đủ
 * mọi ô (ít nhất `GALLERY_SLIDES.length` ô). Hub chỉ có 1 slide thì slide đó vừa là banner vừa lặp ở coverflow. Chỉ khi Hub
 * không có slide nào (0, hoặc không đọc được) mới dùng 5 ảnh mặc định ở trên.
 */
export const pickBannerSlides = (hubSlides: Slide[]): Slide[] => hubSlides.slice(0, 1);

export function pickGallerySlides(hubSlides: Slide[]): ReadonlyArray<{ id: string; image: string }> {
  const real = hubSlides.filter((slide) => typeof slide.image === "string" && slide.image.length > 0);
  if (real.length === 0) return GALLERY_SLIDES;
  const source = real.length > 1 ? real.slice(1) : real;
  const count = Math.max(source.length, GALLERY_SLIDES.length);
  return Array.from({ length: count }, (_, index) => ({
    id: `hub-slide-${index}`,
    image: source[index % source.length].image,
  }));
}
