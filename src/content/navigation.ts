import type { SiteLinkKey } from "@/components/ui/SiteLink";
import { SITE } from "@/config/site.config";
import { HOME_PATH, RANKING_PATH } from "@/lib/urls";

import type { MenuIconName } from "./mobile-menu-icons";

/**
 * CONTENT/NAVIGATION — dữ liệu tĩnh của menu mobile (bản gốc: `layout/HeaderHome.tsx`).
 * Mỗi mục có `href` (link cố định) HOẶC `linkKey` (URL lấy từ API config).
 */
export interface MobileMenuItem {
  label: string;
  icon: MenuIconName;
  /** Link cố định. */
  href?: string;
  /** Khoá URL trong API config (xem SiteLink). */
  linkKey?: SiteLinkKey;
  /** Đường dẫn mà khi đang ở đó mục này được tô màu vàng. */
  activePath?: string;
  /** Canh giữa icon với chữ theo chiều dọc (bản gốc chỉ mục "Nạp" có). */
  isIconCentered?: boolean;
}

export const MOBILE_MENU_ITEMS: MobileMenuItem[] = [
  { label: "Trang chủ", icon: "home", href: HOME_PATH, activePath: HOME_PATH },
  { label: "Fanpage", icon: "fanpage", linkKey: "fbPageLink" },
  { label: "Cộng đồng", icon: "community", linkKey: "fbGroupLink" },
  { label: "Nạp", icon: "payment", linkKey: "pagePaymentUrl", isIconCentered: true },
  { label: "BXH", icon: "ranking", href: RANKING_PATH, activePath: RANKING_PATH },
  { label: "CSKH", icon: "support", href: SITE.supportPhoneHref },
];

/** Dải link cuối trang (bản gốc: `layout/FooterWrapper.tsx`); mục đầu là trang chủ, được tô vàng. */
export const FOOTER_NAV_ITEMS: ReadonlyArray<{ label: string; href?: string; linkKey?: SiteLinkKey }> = [
  { label: "Trang chủ", href: HOME_PATH },
  { label: "Official Facebook Page", linkKey: "fbPageLink" },
  { label: "Cộng đồng", linkKey: "fbGroupLink" },
  { label: "Sự kiện", linkKey: "pageGiftcodeUrl" },
  { label: "Hỗ trợ", linkKey: "pageSupportUrl" },
];
