import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { GoogleTagManager } from "@/components/layout/GoogleTagManager";
import { PAGE_META, SITE, SITE_URL } from "@/config/site.config";
import { SiteConfigProvider } from "@/providers/SiteConfigProvider";

// CSS của thư viện Swiper (banner-slider, gallery-slider).
import "swiper/css";
import "./globals.css";

/** Font Inter (có trục opsz như bản gốc). CSS gọi thẳng tên "Inter" để không chèn font dự phòng "Inter Fallback". */
const inter = Inter({
  subsets: ["latin", "latin-ext", "vietnamese"],
  axes: ["opsz"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * ROOT LAYOUT — khung HTML chung của mọi trang (bản gốc: `index.html` + `homeApp.tsx`).
 *
 * - Khai báo thẻ meta / Open Graph dùng chung.
 * - Nhúng Google Tag Manager nếu có cấu hình.
 * - Bọc toàn site trong SiteConfigProvider để mọi component đọc được link từ API config
 *   (thay cho Redux store `siteConfig` của bản gốc).
 *
 * SiteChrome (header mobile, side menu...), ScaleLayout, footer do từng trang tự ghép (xem src/app/page.tsx).
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: PAGE_META.title,
  description: PAGE_META.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: PAGE_META.title,
    description: PAGE_META.description,
    images: [{ url: SITE.shareImage, width: 800, height: 450 }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={inter.variable}>
      <body><link id="__ve_css" data-ve-installed="1" data-base="/ve/layout-overrides.css" rel="stylesheet" href="/ve/layout-overrides.css" />
        <GoogleTagManager />
        <SiteConfigProvider>{children}</SiteConfigProvider>
      </body>
    </html>
  );
}
