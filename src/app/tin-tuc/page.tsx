import { Suspense } from "react";

import { NewsPageFrame } from "@/components/layout/NewsPageFrame";
import { NewsContentShell } from "@/components/sections/news/NewsContentShell";
import { NewsListSection } from "@/components/sections/news/NewsListSection";

/**
 * PAGE: DANH SÁCH TIN — route "/tin-tuc" (bản gốc: `page/Tintuc.tsx`).
 * Hiện chuyên mục đầu tiên; chuyên mục khác ở /tin-tuc/danh-muc/{slug}, phân trang `?page=N`.
 * Mở kèm anchor (/tin-tuc#section-news-list) thì trang tự cuộn qua banner tới khung tin.
 *
 * NewsListSection đọc query `?page` nên được bọc <Suspense>; trong lúc chờ hiện khung rỗng.
 */
export default function NewsListPage() {
  return (
    <NewsPageFrame page="news-list">
      <Suspense
        fallback={
          <NewsContentShell
            section="news-list"
            frameImage="frame-news-list"
            innerClassName="pc:flex pc:justify-center"
          >
            {null}
          </NewsContentShell>
        }
      >
        <NewsListSection />
      </Suspense>
    </NewsPageFrame>
  );
}
