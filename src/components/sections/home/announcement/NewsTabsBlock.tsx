import Link from "next/link";

import { API_LIMITS } from "@/config/api.config";
import { formatDate } from "@/lib/format";
import { buildNewsDetailPath } from "@/lib/urls";
import type { Category, Post } from "@/lib/vtvlive-sdk/index";

/**
 * BLOCK/announcement/NewsTabsBlock — tab chuyên mục + danh sách tin của tab đang chọn
 * (bản gốc: `news/NewsTabs.tsx` + `news/NewsList.tsx`).
 * Component thuần hiển thị: dữ liệu và tab đang chọn do AnnouncementSection quản lý.
 *
 * Block `news-tabs` gồm 2 element:
 *   - category-tabs: hàng nút chuyên mục (tab đang chọn màu vàng)
 *   - post-list    : tối đa 4 tin (tiêu đề 1 dòng + ngày giờ đăng)
 */
interface NewsTabsBlockProps {
  categories: Category[];
  activeSlug: string;
  onSelectCategory: (slug: string) => void;
  posts: Post[];
}

export function NewsTabsBlock({
  categories,
  activeSlug,
  onSelectCategory,
  posts,
}: NewsTabsBlockProps) {
  return (
    <div data-block="news-tabs">
      {/* ===== Element: category-tabs ===== */}
      <ul
        data-element="category-tabs"
        className="flex w-full items-center justify-between fs-18 lh-28 *:font-medium *:text-white"
      >
        {categories.map((category) => (
          <li key={category.id} className="relative">
            <button
              type="button"
              className={activeSlug === category.slug ? "text-gold" : ""}
              onClick={() => onSelectCategory(category.slug)}
            >
              {category.title}
            </button>
          </li>
        ))}
      </ul>

      {/* ===== Element: post-list ===== */}
      <div data-element="post-list" className="mt-20">
        <ul className="list-disc">
          {posts.slice(0, API_LIMITS.homeNews).map((post) => (
            <li
              data-element="post-item"
              className="border-b border-b-[#0000001A] py-20 last:border-b-0"
              key={post.id}
            >
              <Link
                href={buildNewsDetailPath(post)}
                className="line-clamp-1 fs-18 lh-28 text-body hover:text-primary"
              >
                <p>{post.title ?? ""}</p>
              </Link>
              <div className="flex items-center justify-between fs-14 lh-20">
                <span className="text-[#747474]">{formatDate(post.createdAt)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
