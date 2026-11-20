import { Suspense } from "react";

import { NewsPageFrame } from "@/components/layout/NewsPageFrame";
import { NewsContentShell } from "@/components/sections/news/NewsContentShell";
import { NewsListSection } from "@/components/sections/news/NewsListSection";

/**
 * PAGE: DANH SÁCH TIN THEO CHUYÊN MỤC — route "/tin-tuc/danh-muc/{slug-chuyên-mục}".
 * Cùng giao diện với /tin-tuc, khác ở chuyên mục được chọn; phân trang `?page=N`.
 * `params` được truyền xuống NewsListSection (trong <Suspense>) để đọc slug chuyên mục.
 */
export default function NewsCategoryPage({
  params,
}: PageProps<"/tin-tuc/danh-muc/[category]">) {
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
        <NewsListSection params={params} />
      </Suspense>
    </NewsPageFrame>
  );
}
