import Script from "next/script";

import { VPLAY_FOOTER } from "@/config/site.config";

import { FooterNav } from "./FooterNav";

/**
 * LAYOUT/SiteFooter — chân trang nằm cuối ScaleLayout: dải link `footer-nav` + footer dùng chung của Vplay.
 * Bản gốc: `layout/FooterWrapper.tsx` + `layout/Footer.tsx`.
 *
 * Footer Vplay KHÔNG nằm trong project: script loader của Vplay (CDN) tự tìm thẻ
 * `<div data-vplay-widget="footer">` và render nội dung (logo, giấy phép...) vào đó.
 * Tắt bằng NEXT_PUBLIC_VPLAY_FOOTER_ENABLED=false khi cần chạy hoàn toàn offline.
 */
export function SiteFooter() {
  return (
    <div className="w-full bg-white">
      <FooterNav />
      {VPLAY_FOOTER.enabled && (
        <div data-block="site-footer">
          <div
            data-vplay-widget="footer"
            data-license-number={VPLAY_FOOTER.licenseNumber}
            data-license-link={VPLAY_FOOTER.licenseLink}
            data-platform={VPLAY_FOOTER.platform}
            suppressHydrationWarning
          />
          <Script src={VPLAY_FOOTER.loaderSrc} strategy="afterInteractive" />
        </div>
      )}
    </div>
  );
}
