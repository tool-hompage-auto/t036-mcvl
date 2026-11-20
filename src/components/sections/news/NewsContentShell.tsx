import type { ReactNode } from "react";

import { DownloadBlock } from "@/components/sections/home/announcement/DownloadBlock";

/**
 * SECTION/NEWS/NewsContentShell — khung chung của trang danh sách tin và chi tiết tin
 * (bản gốc: phần bao ngoài giống nhau trong `tintuc/Contents.tsx` và `tintuc/Detail.tsx`).
 *
 * Bố cục:
 *   - Ảnh nền quyết định chiều cao section (desktop dùng chung ảnh với section announcement).
 *   - Lớp phủ: [ download (chỉ desktop) ] [ khung nội dung ]; khung nội dung = ảnh khung
 *     (`frameImage`) quyết định kích thước, `children` phủ lên trên.
 * `id="section-{section}"` là đích của anchor.
 */
const NEWS_DIR = "/assets/images/news";
const COMMON_DIR = "/assets/images/common";

interface NewsContentShellProps {
  /** Tên section: "news-list" hoặc "news-detail" (ghi ra `data-section` và id). */
  section: "news-list" | "news-detail";
  /** Tên file ảnh khung (không kèm đuôi và hậu tố --mb), vd: "frame-news-list". */
  frameImage: "frame-news-list" | "frame-news-detail";
  /** Class riêng của lớp phủ (hai trang khác nhau ở cách canh ngang). */
  innerClassName: string;
  /** Class của ảnh khung (trang danh sách dùng object-contain). */
  frameClassName?: string;
  children: ReactNode;
}

export function NewsContentShell({
  section,
  frameImage,
  innerClassName,
  frameClassName = "w-full",
  children,
}: NewsContentShellProps) {
  return (
    <section id={`section-${section}`} data-section={section} className="relative">
      <picture>
        <source media="(max-width: 768px)" srcSet={`${NEWS_DIR}/bg-news--mb.png`} />
        <source media="(min-width: 769px)" srcSet={`${COMMON_DIR}/bg-news.png`} />
        <img data-edit-id="news-content-shell.bg-news--mb" data-edit-mode="scale" src={`${COMMON_DIR}/bg-news.png`} className="w-full object-contain" alt="banner" />
      </picture>

      <div data-edit-id="news-content-shell.data-news-dir" data-edit-source="api"
        data-element="section-inner"
        className={`absolute top-42 left-64 pc:left-241 pc:gap-33 ${innerClassName}`}
      >
        <div className="relative hidden pc:block">
          <DownloadBlock />
        </div>

        <div data-element="content-panel" className="relative">
          <picture>
            <source media="(max-width: 768px)" srcSet={`${NEWS_DIR}/${frameImage}--mb.png`} />
            <source media="(min-width: 769px)" srcSet={`${NEWS_DIR}/${frameImage}.png`} />
            <img src={`${NEWS_DIR}/${frameImage}.png`} className={frameClassName} alt="banner" />
          </picture>
          {children}
        </div>
      </div>
    </section>
  );
}
