import assert from "node:assert/strict";
import { test } from "node:test";

import {
  parseCategory,
  parsePost,
  parseRankingItem,
  parseSiteConfig,
  sortPostsByStatusLabel,
} from "./parsers.ts";
import type { RawPost, RawSiteConfig } from "./types.ts";

const rawPost = (overrides: Partial<RawPost>): RawPost => ({
  id: 1,
  category_id: 108,
  title: "Bài viết",
  slug: "bai-viet",
  image: null,
  desc: null,
  status: 1,
  status_label: "",
  created_at: "2026-11-16T04:05:19.000000Z",
  published_at: "16/11/2026 - 11:05:19",
  ...overrides,
});

test("parsePost đổi snake_case sang camelCase và parse category lồng nhau", () => {
  const post = parsePost(
    rawPost({
      id: 1828,
      status_label: "HOT",
      category: { id: 108, title: "Sự Kiện - Tin Tức", slug: "su-kien-tin-tuc" },
    }),
  );
  assert.equal(post.categoryId, 108);
  assert.equal(post.statusLabel, "HOT");
  assert.equal(post.createdAt, "2026-11-16T04:05:19.000000Z");
  assert.equal(post.category?.slug, "su-kien-tin-tuc");
});

test("parseCategory parse kèm danh sách bài của home-categories", () => {
  const category = parseCategory({
    id: 110,
    title: "Hướng Dẫn",
    slug: "huong-dan-10",
    posts: [rawPost({ id: 5 }), rawPost({ id: 6 })],
  });
  assert.deepEqual(
    category.posts.map((post) => post.id),
    [5, 6],
  );
});

test("sortPostsByStatusLabel đưa bài HOT lên trước và không sửa mảng gốc", () => {
  const posts = [
    parsePost(rawPost({ id: 1 })),
    parsePost(rawPost({ id: 2, status_label: "HOT" })),
    parsePost(rawPost({ id: 3 })),
  ];
  const sorted = sortPostsByStatusLabel(posts);
  assert.equal(sorted[0].id, 2);
  assert.deepEqual(
    posts.map((post) => post.id),
    [1, 2, 3],
  );
  assert.deepEqual([...sorted.map((post) => post.id)].sort(), [1, 2, 3]);
});

test("parseSiteConfig đọc link tải PC và bỏ qua custom_config không phải JSON", () => {
  const raw = {
    download_pc_link: "https://example.com/play",
    custom_config: "https://example.com/servermoi",
  } as RawSiteConfig;
  const config = parseSiteConfig(raw);
  assert.equal(config.downloadPcLink, "https://example.com/play");
  assert.deepEqual(config.customConfig, []);
});

test("parseRankingItem nhận cả key PascalCase lẫn camelCase", () => {
  assert.deepEqual(
    parseRankingItem({ Id: "1", Name: "A", Server: "S1", Power: 10 }),
    { id: "1", name: "A", server: "S1", power: 10 },
  );
  assert.deepEqual(
    parseRankingItem({ id: "2", name: "B", server: "S2", power: 20 }),
    { id: "2", name: "B", server: "S2", power: 20 },
  );
});
