# Quy ước đặt tên — T029

Theo quy chuẩn chung: [../../STANDARD.md](../../STANDARD.md). File này chỉ ghi bảng ánh xạ riêng của site (bản gốc → tên chuẩn, tên cũ → tên mới).

## 1. Route

| Bản gốc | Route bản gốc | Route chuẩn | File |
|---|---|---|---|
| `page/Home.tsx` | `/` | `/` | `src/app/page.tsx` |
| `page/Tintuc.tsx` + `tintuc/Contents.tsx` | `/tintuc` (tab chuyên mục là state Redux, URL không đổi) | `/tin-tuc` (chuyên mục đầu) | `src/app/tin-tuc/page.tsx` |
| (tab chuyên mục) | — | `/tin-tuc/danh-muc/{slug}`, phân trang `?page=N` | `src/app/tin-tuc/danh-muc/[category]/page.tsx` |
| `tintuc/Detail.tsx` | `/tintuc/{slug}` | `/tin-tuc/{slug}` | `src/app/tin-tuc/[slug]/page.tsx` |
| `page/Rank.tsx` | `/rank` | `/bang-xep-hang` | `src/app/bang-xep-hang/page.tsx` |
| `page/LandingH5/Choigame1..5.tsx` | `/choigame1..5` | **không port** (landing, ngoài phạm vi) | — |

## 2. Page / Section / Block / Element

### Page (`data-page`)

`home` · `news-list` (cả `/tin-tuc` và `/tin-tuc/danh-muc/{slug}`) · `news-detail` · `ranking`.

### Section (`data-section`, id = `section-{tên}`)

| Bản gốc | `data-section` | id cũ → id mới | Component |
|---|---|---|---|
| `home/Banner.tsx` (trang chủ) | `hero` | `banner` → `section-hero` | `HeroSection` |
| `home/Banner.tsx` (trang tin) | `news-banner` | `banner` → `section-news-banner` | `NewsBannerSection` (bọc `HeroSection`) |
| `home/Banner.tsx` (trang BXH) | `ranking-banner` | `banner` → `section-ranking-banner` | `RankingBannerSection` (bọc `HeroSection`) |
| `news/News.tsx` (+ `NewsDesktop`, `NewsMobile`) | `announcement` | `news` → `section-announcement` | `AnnouncementSection` |
| `home/Rank.tsx` | `ranking` | `rank` → `section-ranking` | `RankingSection` |
| `tintuc/Contents.tsx` | `news-list` | — → `section-news-list` | `NewsContentShell` + `NewsListSection` |
| `tintuc/Detail.tsx` | `news-detail` | — → `section-news-detail` | `NewsContentShell` + `NewsDetailSection` |

### Block (`data-block`)

| Bản gốc | `data-block` chuẩn | Component |
|---|---|---|
| `<video>` / ảnh nền trong `Banner` | `hero-video` | trong `HeroSection` |
| `<picture>` logo game trong `Banner` | `hero-title` | trong `HeroSection` |
| `news/NewsMainSlider.tsx` | `banner-slider` | `announcement/BannerSliderBlock` |
| `news/NewsDownloadPanel.tsx` | `download` | `announcement/DownloadBlock` (cũng dùng ở cột trái trang tin) |
| `news/NewsTabs.tsx` + `news/NewsList.tsx` | `news-tabs` (gồm element `category-tabs`, `post-list`) | `announcement/NewsTabsBlock` |
| `news/NewsActionButtons.tsx` | `quick-links` | `announcement/QuickLinksBlock` |
| `news/SliderPC.tsx` + `news/SliderMB.tsx` | `gallery-slider` | `announcement/GallerySliderBlock` |
| nút tab trong `Rank` | `ranking-tabs` | trong `RankingSection` |
| ảnh khung `home/rank/1920/bg-rank.png` | `ranking-board` | trong `RankingSection` |
| `<table>` trong `Rank` | `ranking-table` | `ranking/RankingTableBlock` |
| tab chuyên mục trang tin | `category-tabs` | trong `NewsListSection` |
| danh sách tin | `post-list` | trong `NewsListSection` |
| `components/Pagination.tsx` | `pagination` | `ui/Pagination` |
| breadcrumb | `breadcrumb` | trong `NewsDetailSection` |
| nội dung bài | `post-content` | trong `NewsDetailSection` |
| "Tin khác" | `related-posts` | trong `NewsDetailSection` |
| `layout/HeaderHome.tsx` | `mobile-header`, `mobile-menu` | `layout/MobileNavigation` |
| `layout/FloatHome.tsx` | `side-menu` | `layout/SideMenu` |
| `layout/FloatBxh.tsx` | `section-nav` | `layout/SectionNav` |
| `layout/Logo18.tsx` | `logo-age` | `layout/LogoAge` |
| `<ul>` trong `layout/FooterWrapper.tsx` | `footer-nav` | `layout/FooterNav` |
| widget trong `layout/Footer.tsx` | `site-footer` | `layout/SiteFooter` |

### Element (`data-element`)

`section-inner` (lớp nội dung phủ lên ảnh nền) · `content-panel` (khung ảnh của trang tin) · `post-item` · `section-title` (ảnh tiêu đề BXH) · `mobile-menu-overlay`.

## 3. Layout / UI / hook / config

| Bản gốc | Chuẩn |
|---|---|
| `components/ScaleLayout.tsx` | `layout/ScaleLayout` |
| bộ `HeaderHome` + `FloatHome` + `Logo18` + `FloatBxh` lặp ở từng page | `layout/SiteChrome` |
| `components/Pagination.tsx` | `ui/Pagination` |
| `useResize()` | `useViewport()` → `{ width, isDesktop }` |
| `getDevice()` | `lib/device.ts` → `getDeviceOs()` |
| `SlideHome` (`utils/constant.ts`) | `content/gallery-slides.ts` (`GALLERY_SLIDES`) |
| `KEY_ENV.VITE_APP_GAME_ID` | `SDK_APP_ID` (env `GAMEHUBID`) |
| `KEY_ENV.VITE_APP_CLIENT_ID` | `SDK_CLIENT_ID` (env `NEXT_PUBLIC_SDK_CLIENT_ID`) |
| `KEY_ENV.VITE_APP_HUB` / `VITE_APP_API_GAME_SERVICES` | `DEFAULT_ENVIRONMENTS` trong `lib/vtvlive-sdk/index.ts` |
| `siteConfig` (Redux `storeApp`) | `SiteConfigProvider` + `useSiteConfig()` + `SiteLink` |
| `getSiteConfig/getCategories/getpostNews/getSiteSlide/getDetailPost/getRanking` | `sdk.site.getConfig` · `sdk.news.getHomeCategories` · `getPosts` · `sdk.slides.getSlides` · `sdk.news.getPost` · `sdk.ranking.getRanking` |

## 4. CSS

| Bản gốc | Chuẩn |
|---|---|
| thang spacing mặc định Tailwind (1 đơn vị = 4px: `w-125`) | `--spacing: 1px` (`w-500`); mọi số trong class đã nhân 4 |
| breakpoint `md` (769px) / `xl` (1920px) | `pc:` / `float-scale` (mốc 769 → 0.65, từ 1024 → 0.85; `xl:scale-100` của bản gốc không có tác dụng trên live) |
| `sm:` (640px) trong header mobile | `header-compact:` |
| `text-sm/base/lg/xl/2xl` | `fs-14 lh-20` / `fs-16 lh-24` / `fs-18 lh-28` / `fs-20 lh-28` / `fs-24 lh-32` |
| `text-[Npx]` | `fs-N` |
| `.animation-laluot` | `shine-overlay` + `animate-shine` |
| `animate-title` (`title-animation`) | `animate-title-pop` (`@keyframes title-pop`) |
| `.btnMobileMenu` | `@utility btn-mobile-menu` |
| `.custom-scrollbar` | `@utility scrollbar-ranking` |
| `#slide-landing` (Swiper coverflow) | `styles/gallery-slider.css` (selector `[data-block="gallery-slider"]`) |
| `#970000` · `#faea05` · `#148D6F` · `#088967` · `#C32700` · `#6D6D6D` · `#1d1d1d` · `#818181` | `crimson` · `gold` · `primary` · `primary-active` · `link-hover` · `ash` · `body` · `muted` |
| `index.scss` + `ck5style.css` | `app/globals.css` + `styles/cms-content.css` |
| Google Fonts `@import` Inter | `next/font/google` Inter (trục `opsz`) trong `app/layout.tsx` |

## 5. Asset

Xem [ASSET-MAP.md](ASSET-MAP.md).
