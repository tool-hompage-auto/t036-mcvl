import { Suspense } from "react";

import { NewsPageFrame } from "@/components/layout/NewsPageFrame";
import { NewsContentShell } from "@/components/sections/news/NewsContentShell";
import { NewsDetailSection } from "@/components/sections/news/NewsDetailSection";

/**
 * PAGE: CHI TIẾT TIN — route "/tin-tuc/{slug}" (bản gốc: `components/tintuc/Detail.tsx`).
 *
 * NewsDetailSection đọc tham số URL nên được bọc <Suspense>; trong lúc chờ hiện
 * khung nội dung rỗng để chiều cao trang không đổi.
 */
export default function NewsDetailPage({ params }: PageProps<"/tin-tuc/[slug]">) {
  return (
    <NewsPageFrame page="news-detail">
      <Suspense
        fallback={
          <NewsContentShell
            section="news-detail"
            frameImage="frame-news-detail"
            innerClassName="flex justify-center gap-33"
          >
            {null}
          </NewsContentShell>
        }
      >
        <NewsDetailSection params={params} />
      </Suspense>
    </NewsPageFrame>
  );
}
