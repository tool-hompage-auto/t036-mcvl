import type { ReactNode } from "react";

import { NewsBannerSection } from "@/components/sections/news/NewsBannerSection";
import { NEWS_LIST_PATH } from "@/lib/urls";

import { ScaleLayout } from "./ScaleLayout";
import { SiteChrome } from "./SiteChrome";
import { SiteFooter } from "./SiteFooter";

/**
 * LAYOUT/NewsPageFrame — khung chung của trang danh sách tin và chi tiết tin
 * (bản gốc: phần giống nhau của `page/Tintuc.tsx` và `tintuc/Detail.tsx`):
 *   SiteChrome + ScaleLayout [ news-banner + (nội dung trang) + footer ].
 */
interface NewsPageFrameProps {
  /** Giá trị `data-page` của trang. */
  page: "news-list" | "news-detail";
  children: ReactNode;
}

export function NewsPageFrame({ page, children }: NewsPageFrameProps) {
  return (
    <div data-page={page}>
      <SiteChrome currentPath={NEWS_LIST_PATH} isNavFirst />
      <ScaleLayout>
        <NewsBannerSection />
        {children}
        <SiteFooter />
      </ScaleLayout>
    </div>
  );
}
