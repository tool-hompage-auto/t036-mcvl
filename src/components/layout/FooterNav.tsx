import Link from "next/link";

import { SiteLink } from "@/components/ui/SiteLink";
import { FOOTER_NAV_ITEMS } from "@/content/navigation";
import { HOME_PATH } from "@/lib/urls";

/**
 * LAYOUT/FooterNav — dải link xám cuối trang: Trang chủ (vàng) · Fanpage · Cộng đồng · Sự kiện · Hỗ trợ.
 * Bản gốc: phần `<ul>` trong `layout/FooterWrapper.tsx`. Link động lấy từ API config.
 */
export function FooterNav() {
  return (
    <ul
      data-block="footer-nav"
      className="flex items-center justify-center gap-55 bg-ash py-20 fs-18 font-semibold pc:fs-16"
    >
      {FOOTER_NAV_ITEMS.map((item) => (
        <li key={item.label} className={item.href === HOME_PATH ? "text-gold" : "text-white"}>
          {item.linkKey ? (
            <SiteLink linkKey={item.linkKey}>{item.label}</SiteLink>
          ) : (
            <Link href={item.href ?? HOME_PATH}>{item.label}</Link>
          )}
        </li>
      ))}
    </ul>
  );
}
