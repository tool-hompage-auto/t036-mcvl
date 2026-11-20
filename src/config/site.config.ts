/**
 * SITE CONFIG — thông tin tĩnh của site (tên game, SEO, footer, tracking).
 *
 * Khi dùng project này làm template cho game khác: sửa file này + `.env`
 * + nội dung trong `src/content` + asset trong `public/assets`.
 * (Các link động như fanpage, nạp thẻ, tải game... đến từ API config,
 *  xem `src/providers/SiteConfigProvider.tsx`.)
 */

/** URL gốc của site, dùng cho Open Graph. */
export const SITE_URL =
  process.env.APP_URL || "https://phuonghoangtrutien.vplay.vn";

export const SITE = {
  /** Tên game hiển thị (bản gốc ghi "Tru Tiên" ở header mobile). */
  name: "Phượng Hoàng Tru Tiên",
  /** Số tổng đài CSKH trong menu mobile (bản gốc gắn cứng). */
  supportPhoneHref: "tel:1900866666",
  /** Ảnh chia sẻ mạng xã hội (bản gốc trỏ tới CDN, giữ nguyên). */
  shareImage: "https://website-assets-cdn.vtvlive.vn/website_assets/t029/homepage/poster.png",
} as const;

/**
 * Khung thiết kế (site scale): chiều rộng khung dựng ở từng chế độ màn hình.
 * Khớp với `#transformWrapper` trong src/styles/scale-layout.css.
 */
export const DESIGN = {
  mobileWidth: 768,
  desktopWidth: 1920,
  wideWidth: 2560,
  /** Chiều rộng cơ sở để tính tỉ lệ scale (bản gốc: scale = vw / khung). */
  scaleBase: { mobile: 768, desktop: 1920, wide: 2560 },
  /** Chiều rộng màn hình tối đa của chế độ mobile / desktop. */
  screenMax: { mobile: 768, desktop: 1920 },
} as const;

/** Thẻ meta dùng chung cho mọi trang (giữ nguyên nội dung từ `index.html` gốc). */
export const PAGE_META = {
  title: "Phượng Hoàng Tru Tiên - Game MMORPG Tiên Hiệp Thế hệ mới 2026",
  description:
    "Phượng Hoàng Tru Tiên - Tựa game HOT nhất 2026, Đón đầu xu hướng với trải nghiệm gameplay thế hệ mới, nơi bạn có thể dễ dàng cân mọi kèo PK hay săn Boss đỉnh cao chỉ bằng một tay ngay cả khi bận rộn nhất.",
} as const;

/** Google Tag Manager ID. Rỗng = không nhúng (bản gốc: GTM-TJ8HWKX7, tắt ở chế độ mock). */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

/**
 * Video nền hero (desktop) — file nặng nằm trên CDN của Vplay, giữ nguyên như bản gốc.
 */
export const STATIC_LINKS = {
  heroVideo: "/assets/_uploads/external.023ab7ab0850-homepage.mp4",
} as const;

/**
 * Widget footer dùng chung của Vplay (script ngoài tự render vào thẻ
 * `<div data-vplay-widget="footer">`). Các thuộc tính data-* giữ nguyên bản gốc.
 */
export const VPLAY_FOOTER = {
  enabled: process.env.NEXT_PUBLIC_VPLAY_FOOTER_ENABLED !== "false",
  loaderSrc: "https://website-assets-cdn.vtvlive.vn/sdk-web-vplay/loader.min.js",
  licenseNumber:
    "Quyết định phát hành trò chơi điện tử G1 trên mạng số 267/QĐ-PTTH&TTĐT cấp ngày 20 tháng 05 năm 2026",
  licenseLink: "https://giayphep.abei.gov.vn/g1/132093",
  platform: "landingGame",
} as const;
