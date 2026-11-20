"use client";

import type { ComponentProps, MouseEvent } from "react";

import { toSafeUrl } from "@/lib/urls";
import type { SiteConfig } from "@/lib/vtvlive-sdk/index";
import { useSiteConfig } from "@/providers/SiteConfigProvider";

/**
 * Các khoá link lấy từ API config (trường gốc trong JSON ở cột phải):
 *   fbPageLink          fb_page_link           Fanpage
 *   fbGroupLink         fb_group_link          Group cộng đồng
 *   pagePaymentUrl      page_payment_url       Nạp
 *   pageGiftcodeUrl     page_giftcode_url      Giftcode
 *   pageSupportUrl      page_support_url       CSKH
 *   downloadPcLink      download_pc_link       Bản PC
 *   downloadIosLink     download_ios_link      App Store
 *   downloadAndroidLink download_android_link  Google Play
 *   downloadApkLink     download_apk_link      File APK
 */
export type SiteLinkKey = {
  [Key in keyof SiteConfig]: SiteConfig[Key] extends string ? Key : never;
}[keyof SiteConfig];

/** Thông báo của bản gốc khi link chưa được cấu hình. */
const MISSING_LINK_MESSAGE = "coming soon";

interface SiteLinkProps extends Omit<ComponentProps<"a">, "href"> {
  /** Trường trong API config chứa URL đích. */
  linkKey: SiteLinkKey;
  /**
   * Bật hành vi `handleClickLink` của bản gốc: nếu config chưa có link thì chặn
   * điều hướng và báo "coming soon".
   */
  hasComingSoonAlert?: boolean;
}

/**
 * UI/SiteLink — thẻ <a> có href lấy từ API config.
 * Khi config chưa nạp xong hoặc không có giá trị, href là "#".
 * URL có scheme không an toàn (javascript:, data:...) cũng bị thay bằng "#".
 */
export function SiteLink({
  linkKey,
  hasComingSoonAlert = false,
  onClick,
  children,
  ...anchorProps
}: SiteLinkProps) {
  const config = useSiteConfig();
  const link = config?.[linkKey];

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (!hasComingSoonAlert || link) return;
    event.preventDefault();
    window.alert(MISSING_LINK_MESSAGE);
  };

  return (
    <a href={toSafeUrl(link)} onClick={handleClick} {...anchorProps}>
      {children}
    </a>
  );
}
