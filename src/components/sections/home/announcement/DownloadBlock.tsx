"use client";

import { ShineImage } from "@/components/ui/ShineImage";
import { SiteLink, type SiteLinkKey } from "@/components/ui/SiteLink";
import { toSafeUrl } from "@/lib/urls";
import { useSiteConfig } from "@/providers/SiteConfigProvider";

/**
 * BLOCK/announcement/DownloadBlock — khung dọc "tải game" (bản gốc: `news/NewsDownloadPanel.tsx`).
 * Dùng ở section announcement trang chủ và ở cột trái của trang tin / chi tiết tin (desktop).
 *
 * Element: khung nền, logo game có vệt sáng, 4 nút đặt theo toạ độ trên khung:
 *   iOS (trên trái) | Android (trên phải) | APK (dưới trái) | PC (dưới phải).
 * Nút chưa có link trong API config sẽ báo "coming soon".
 */

const ASSET_DIR = "/assets/images/home/announcement";
/** Logo dùng khi API config chưa có `site_logo_url`. */
const FALLBACK_LOGO = "/assets/images/common/logo-game.png";
/** Cạnh logo trong khung (px thiết kế). */
const LOGO_SIZE = 207;

interface PlatformButton {
  linkKey: SiteLinkKey;
  image: string;
  alt: string;
  /** Vị trí trên khung (px thiết kế). */
  positionClass: string;
}

const PLATFORM_BUTTONS: PlatformButton[] = [
  { linkKey: "downloadIosLink", image: "btn-ios.png", alt: "iOS", positionClass: "left-24 top-225" },
  { linkKey: "downloadAndroidLink", image: "btn-android.png", alt: "Android", positionClass: "left-135 top-225" },
  { linkKey: "downloadApkLink", image: "btn-apk.png", alt: "APK", positionClass: "left-24 top-350" },
  { linkKey: "downloadPcLink", image: "btn-pc.png", alt: "PC", positionClass: "left-135 top-350" },
];

export function DownloadBlock() {
  const config = useSiteConfig();
  const logoSrc = config?.siteLogoUrl ? toSafeUrl(config.siteLogoUrl) : FALLBACK_LOGO;

  return (
    <div data-block="download" className="relative">
      <img data-edit-id="download-block.frame-download" data-edit-mode="scale"
        className="aspect-250/450 object-contain"
        src={`${ASSET_DIR}/frame-download.png`}
        alt=""
        loading="lazy"
      />

      <div data-edit-id="download-block.data-image" data-edit-source="api" className="absolute -top-4 flex w-full flex-col items-center justify-center gap-15">
        {/* Bản gốc dùng thẻ h1 cho logo game. */}
        <h1 className="relative">
          <ShineImage
            className="aspect-207/207 object-contain"
            src={logoSrc}
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            alt=""
            isLazy
          />
        </h1>

        {PLATFORM_BUTTONS.map((button) => (
          <SiteLink
            key={button.alt}
            linkKey={button.linkKey}
            hasComingSoonAlert
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute ${button.positionClass}`}
          >
            <img src={`${ASSET_DIR}/${button.image}`} alt={button.alt} loading="lazy" />
          </SiteLink>
        ))}
      </div>
    </div>
  );
}
