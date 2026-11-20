"use client";

import Link from "next/link";
import { use, useMemo } from "react";

import { API_LIMITS } from "@/config/api.config";
import { useAsyncData } from "@/hooks/useAsyncData";
import { formatDate } from "@/lib/format";
import { sanitizeCmsHtml } from "@/lib/sanitize-html";
import { getSdk } from "@/lib/sdk-client";
import { buildNewsCategoryPath, buildNewsDetailPath, HOME_PATH, NEWS_LIST_PATH } from "@/lib/urls";
import type { Post } from "@/lib/vtvlive-sdk/index";

import { NewsContentShell } from "./NewsContentShell";

/**
 * SECTION/NEWS/NewsDetailSection — trang chi tiết tin (bản gốc: `components/tintuc/Detail.tsx`).
 * Route: /tin-tuc/{slug}
 *
 * Block (trong NewsContentShell):
 *   - breadcrumb   : "Trang chủ > tên chuyên mục" trên mép trên khung
 *   - post-content : tiêu đề, ngày đăng, nội dung HTML từ CMS (vùng này tự cuộn khi dài)
 *   - related-posts: "Tin khác" — tối đa 3 tin cùng chuyên mục, không gồm tin đang xem
 *
 * Luồng dữ liệu:
 *   1. sdk.news.getPost(slug) -> bài viết
 *   2. sdk.news.getPosts({ categoryId, limit: 4 }) -> lọc bỏ bài đang xem, lấy 3 bài
 * Không tìm thấy bài thì phần thân để trống (giống bản gốc).
 */

interface PostWithRelated {
  post: Post;
  related: Post[];
}

interface NewsDetailSectionProps {
  /** Tham số route: `slug` của bài viết. */
  params: Promise<{ slug: string }>;
}

/** Nạp bài viết và danh sách "Tin khác". Trả `null` nếu không có bài. */
async function loadPostWithRelated(slug: string): Promise<PostWithRelated | null> {
  const sdk = getSdk();
  const post = await sdk.news.getPost(slug);
  if (!post) return null;

  const categoryPosts = await sdk.news
    .getPosts({
      categoryId: post.categoryId,
      limit: API_LIMITS.newsDetailRelatedFetch,
    })
    .catch(() => []);
  const related = categoryPosts
    .filter((item) => item.id !== post.id)
    .slice(0, API_LIMITS.newsDetailRelatedShow);
  return { post, related };
}

export function NewsDetailSection({ params }: NewsDetailSectionProps) {
  const { slug } = use(params);

  const { data } = useAsyncData(`news-detail:${slug}`, () => loadPostWithRelated(slug));
  const post = data?.post ?? null;
  const relatedPosts = data?.related ?? [];

  const rawContent = post?.content ?? "";
  const contentHtml = useMemo(
    () => (rawContent ? sanitizeCmsHtml(rawContent) : ""),
    [rawContent],
  );

  const categoryPath = post?.category?.slug
    ? buildNewsCategoryPath(post.category.slug)
    : NEWS_LIST_PATH;

  return (
    <NewsContentShell
      section="news-detail"
      frameImage="frame-news-detail"
      innerClassName="flex justify-center gap-33"
    >
      <div
        data-block="breadcrumb"
        className="absolute top-6 left-20 flex items-center justify-center gap-10"
      >
        <Link className="fs-20 lh-28 text-white" href={HOME_PATH}>
          Trang chủ
        </Link>
        <span className="fs-20 lh-28 text-white">&gt;</span>
        <Link className="fs-20 lh-28 text-white" href={categoryPath}>
          {post?.category?.title ?? ""}
        </Link>
      </div>

      <div className="absolute top-40 left-0 h-full">
        <div className="flex h-[90%] w-full flex-col p-40">
          {post && (
            <div data-block="post-content" className="flex-1 overflow-auto text-left">
              <h1 className="fs-30 font-bold text-black">{post.title}</h1>
              <p className="my-34 fs-16 text-muted">{formatDate(post.createdAt)}</p>
              {/* Nội dung HTML từ CMS, đã làm sạch bằng sanitizeCmsHtml(). */}
              <div
                className="ck-content fs-16 text-body"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </div>
          )}

          {relatedPosts.length > 0 && (
            <div data-block="related-posts" className="mt-40">
              <h3 className="mb-16 border-b border-[#0000001A] pb-8 fs-20 font-bold text-black uppercase">
                Tin khác
              </h3>
              {relatedPosts.map((item) => (
                <ul
                  key={item.id}
                  className="list-disc border-b border-[#e5e5e5] py-16 pl-16 last:border-b-0"
                >
                  <li>
                    <Link
                      href={buildNewsDetailPath(item)}
                      className="line-clamp-2 fs-20 text-black hover:text-link-hover"
                    >
                      <p>{item.title ?? ""}</p>
                    </Link>
                  </li>
                  <div className="mt-8 pl-20 fs-18 text-muted">
                    <span>{formatDate(item.createdAt)}</span>
                  </div>
                </ul>
              ))}
            </div>
          )}
        </div>
      </div>
    </NewsContentShell>
  );
}
