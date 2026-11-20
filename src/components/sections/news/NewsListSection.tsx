"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { use } from "react";

import { Pagination } from "@/components/ui/Pagination";
import { API_LIMITS } from "@/config/api.config";
import { useAsyncData } from "@/hooks/useAsyncData";
import { formatDate } from "@/lib/format";
import { getSdk } from "@/lib/sdk-client";
import {
  buildNewsCategoryPath,
  buildNewsDetailPath,
  buildPagePath,
  NEWS_LIST_PATH,
} from "@/lib/urls";

import { NewsContentShell } from "./NewsContentShell";

/**
 * SECTION/NEWS/NewsListSection — trang danh sách tin (bản gốc: `components/tintuc/Contents.tsx`).
 * Route: /tin-tuc (chuyên mục đầu tiên) và /tin-tuc/danh-muc/{slug}; phân trang bằng `?page=N`.
 *
 * Block (trong NewsContentShell):
 *   - category-tabs: tab chuyên mục (mỗi tab là link tới route chuyên mục; tab đang chọn màu vàng)
 *   - post-list    : 8 tin mỗi trang (tiêu đề tối đa 2 dòng + ngày giờ đăng)
 *   - pagination   : chỉ hiện khi có hơn 1 trang
 *
 * Luồng dữ liệu:
 *   1. sdk.news.getHomeCategories() -> tab; không có `categorySlug` thì chọn tab đầu tiên.
 *   2. sdk.news.getPosts({ categoryId, limit: 10000 }) -> nạp hết tin của chuyên mục,
 *      phân trang ngay trên trình duyệt (đổi trang chỉ đổi `?page`, không gọi lại API).
 */

interface NewsListSectionProps {
  /** Tham số route /tin-tuc/danh-muc/{category}; bỏ trống ở /tin-tuc. */
  params?: Promise<{ category: string }>;
}

export function NewsListSection({ params }: NewsListSectionProps) {
  const categorySlug = params ? use(params).category : undefined;
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: categoryData } = useAsyncData("home-categories", () =>
    getSdk().news.getHomeCategories(),
  );
  const categories = categoryData ?? [];
  const activeCategory = categorySlug
    ? categories.find((category) => category.slug === categorySlug)
    : categories[0];

  const { data: postData } = useAsyncData(
    activeCategory ? `news-posts:${activeCategory.id}` : null,
    () =>
      getSdk().news.getPosts({
        categoryId: activeCategory?.id,
        limit: API_LIMITS.newsListFetch,
      }),
  );
  const allPosts = postData ?? [];

  const pageSize = API_LIMITS.newsListPageSize;
  const totalPages = Math.max(1, Math.ceil(allPosts.length / pageSize));
  const requestedPage = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const page = Number.isNaN(requestedPage)
    ? 1
    : Math.min(Math.max(requestedPage, 1), totalPages);
  const pagePosts = allPosts.slice((page - 1) * pageSize, page * pageSize);

  const basePath = categorySlug ? buildNewsCategoryPath(categorySlug) : NEWS_LIST_PATH;

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    router.push(buildPagePath(basePath, nextPage), { scroll: false });
  };

  return (
    <NewsContentShell
      section="news-list"
      frameImage="frame-news-list"
      innerClassName="pc:flex pc:justify-center"
      frameClassName="w-full object-contain"
    >
      <div className="absolute top-0 left-24 pc:left-45">
        <ul
          data-block="category-tabs"
          className="flex items-center gap-40 pc:gap-240"
        >
          {categories.map((category) => (
            <li
              key={category.id}
              className="relative px-8 py-16 fs-20 lh-28 font-medium text-white"
            >
              <Link
                href={buildNewsCategoryPath(category.slug)}
                className={activeCategory?.slug === category.slug ? "text-gold" : ""}
              >
                {category.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-30 h-full">
          <ul data-block="post-list" className="ml-8 pc:ml-20">
            {pagePosts.map((post) => (
              <li
                data-element="post-item"
                className="list-disc border-b border-b-[#0000001A] pt-8 pb-20 last:border-b-0"
                key={post.id}
              >
                <Link
                  href={buildNewsDetailPath(post)}
                  className="line-clamp-2 fs-20 lh-28 text-black hover:text-link-hover"
                >
                  <p>{post.title ?? ""}</p>
                </Link>
                <div className="flex items-center justify-between fs-14 lh-20">
                  <span className="pt-8 pl-20 fs-16 lh-24 text-muted">
                    <span className="text-muted">{formatDate(post.createdAt)}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="absolute -bottom-80 flex w-full items-center justify-center">
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </NewsContentShell>
  );
}
