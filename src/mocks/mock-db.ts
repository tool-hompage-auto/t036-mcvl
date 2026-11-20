import { SDK_APP_ID } from "../config/api.config.ts";
import type { RawCategory, RawPost } from "@/lib/vtvlive-sdk/index";

import { MOCK_CATEGORIES } from "./data/categories.ts";
import { buildMockPostContent } from "./data/post-content.ts";
import { MOCK_POST_SEEDS, type MockPostSeed } from "./data/posts.ts";

/**
 * MOCK DB — các hàm truy vấn dữ liệu mock, mô phỏng xử lý phía server của Hub API.
 * Import tương đối có đuôi .ts để `node --test` chạy được file này (xem mock-data.test.ts).
 * Route handler trong src/app/(mock-api) chỉ đọc query rồi gọi các hàm này.
 */

/** Giới hạn mặc định của API thật khi không truyền `limit`. */
const DEFAULT_LIST_LIMIT = 100;
/** Số bài mỗi chuyên mục mà API home-categories trả kèm. */
const HOME_CATEGORY_POST_COUNT = 5;

/** Bổ sung các trường mà API danh sách luôn trả kèm. */
function toListItem(seed: MockPostSeed): RawPost {
  const category = MOCK_CATEGORIES.find((item) => item.id === seed.category_id);
  return { ...seed, desc: null, image: null, category };
}

/** Tham số truy vấn danh sách bài (khớp query của API thật; `page` tính từ 1). */
export interface FindPostsQuery {
  categoryId?: number;
  limit?: number;
  page?: number;
}

/** Danh sách bài, lọc theo chuyên mục (nếu có), cắt theo `limit` và `page` (mỗi trang `limit` bài). */
export function findPosts({ categoryId, limit, page }: FindPostsQuery = {}): RawPost[] {
  const seeds =
    categoryId === undefined
      ? MOCK_POST_SEEDS
      : MOCK_POST_SEEDS.filter((seed) => seed.category_id === categoryId);
  const size = limit ?? DEFAULT_LIST_LIMIT;
  const start = (Math.max(page ?? 1, 1) - 1) * size;
  return seeds.slice(start, start + size).map(toListItem);
}

/** Chuyên mục trang chủ, mỗi chuyên mục kèm vài bài mới nhất. */
export function findHomeCategories(): RawCategory[] {
  return MOCK_CATEGORIES.map((category) => ({
    ...category,
    posts: MOCK_POST_SEEDS.filter((seed) => seed.category_id === category.id)
      .slice(0, HOME_CATEGORY_POST_COUNT)
      .map((seed) => ({ ...seed, desc: null, image: null })),
  }));
}

/** Chi tiết một bài theo slug hoặc ID (kèm `content`). `null` nếu không có. */
export function findPostDetail(slugOrId: string): RawPost | null {
  const seed = MOCK_POST_SEEDS.find(
    (item) => String(item.id) === slugOrId || item.slug === slugOrId,
  );
  if (!seed) return null;
  return {
    ...toListItem(seed),
    game_id: SDK_APP_ID,
    content: buildMockPostContent(seed.title, seed.id),
    active: 1,
    meta_title: null,
    meta_desc: null,
    updated_at: seed.created_at,
  };
}
