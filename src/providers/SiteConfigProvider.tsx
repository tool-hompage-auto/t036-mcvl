"use client";

import { createContext, type ReactNode, useContext } from "react";

import { useAsyncData } from "@/hooks/useAsyncData";
import { getSdk } from "@/lib/sdk-client";
import type { SiteConfig } from "@/lib/vtvlive-sdk/index";

/**
 * SITE CONFIG PROVIDER — nạp cấu hình site MỘT LẦN (sdk.site.getConfig())
 * và chia sẻ cho mọi component.
 *
 * Thay cho hàm `buildSiteConfig()` của bản gốc (jQuery gán href theo class
 * `.btnFanpage`, `.btnNapThe`...). Ở đây component đọc trực tiếp bằng
 * `useSiteConfig()` hoặc dùng sẵn `<SiteLink linkKey="fbPageLink">`.
 *
 * Giá trị là `null` khi đang nạp hoặc nạp lỗi => các link giữ href="#".
 */
const SiteConfigContext = createContext<SiteConfig | null>(null);

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const { data } = useAsyncData("site-config", () => getSdk().site.getConfig());
  return <SiteConfigContext value={data}>{children}</SiteConfigContext>;
}

/** Cấu hình site từ API; `null` nếu chưa có. */
export function useSiteConfig(): SiteConfig | null {
  return useContext(SiteConfigContext);
}
