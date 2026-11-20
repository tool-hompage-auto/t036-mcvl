import assert from "node:assert/strict";
import { test } from "node:test";

import { MOCK_CATEGORIES } from "./data/categories.ts";
import { MOCK_RANKING_ALL, MOCK_RANKING_AREA } from "./data/ranking.ts";
import { findHomeCategories, findPostDetail, findPosts } from "./mock-db.ts";

const MIN_POSTS_PER_CATEGORY = 24;
const RELATED_MIN = 5;

test("mỗi chuyên mục có ít nhất 24 bài, đủ để phân trang", () => {
  for (const category of MOCK_CATEGORIES) {
    const posts = findPosts({ categoryId: category.id, limit: 10000 });
    assert.ok(posts.length >= MIN_POSTS_PER_CATEGORY, `${category.slug}: ${posts.length}`);
    assert.ok(posts.length - 1 >= RELATED_MIN, "đủ Tin khác");
  }
});

test("slug và id bài là duy nhất, ngày giảm dần trong từng chuyên mục", () => {
  const all = findPosts({ limit: 10000 });
  assert.equal(new Set(all.map((post) => post.slug)).size, all.length);
  assert.equal(new Set(all.map((post) => post.id)).size, all.length);
  for (const category of MOCK_CATEGORIES) {
    const dates = findPosts({ categoryId: category.id, limit: 10000 }).map((post) =>
      Date.parse(post.created_at),
    );
    for (let i = 1; i < dates.length; i++) assert.ok(dates[i - 1] >= dates[i]);
  }
});

test("nhãn xen kẽ HOT / NEW / không nhãn và có tiêu đề dài", () => {
  const all = findPosts({ limit: 10000 });
  for (const label of ["HOT", "NEW", ""]) {
    assert.ok(all.some((post) => post.status_label === label), `thiếu nhãn "${label}"`);
  }
  assert.ok(all.some((post) => post.title.length > 70), "thiếu tiêu đề dài");
});

test("mọi slug và id đều mở được chi tiết, có content", () => {
  for (const post of findPosts({ limit: 10000 })) {
    for (const key of [post.slug, String(post.id)]) {
      const detail = findPostDetail(key);
      assert.ok(detail, key);
      assert.equal(detail?.id, post.id);
      assert.ok(detail?.content?.includes(post.title));
    }
  }
  assert.equal(findPostDetail("khong-ton-tai"), null);
});

test("limit và page cắt danh sách đúng như API", () => {
  const id = MOCK_CATEGORIES[0].id;
  const all = findPosts({ categoryId: id, limit: 10000 });
  assert.equal(findPosts({ categoryId: id, limit: 8 }).length, 8);
  assert.deepEqual(
    findPosts({ categoryId: id, limit: 8, page: 2 }).map((post) => post.id),
    all.slice(8, 16).map((post) => post.id),
  );
  assert.deepEqual(findPosts({ categoryId: id, limit: 8, page: 99 }), []);
});

test("trang chủ trả kèm vài bài mỗi chuyên mục", () => {
  for (const category of findHomeCategories()) assert.ok((category.posts?.length ?? 0) >= 4);
});

test("mỗi bảng xếp hạng có 100 dòng, id duy nhất, lực chiến giảm dần", () => {
  for (const table of [MOCK_RANKING_ALL, MOCK_RANKING_AREA]) {
    assert.equal(table.length, 100);
    assert.equal(new Set(table.map((row) => row.id)).size, 100);
    for (let i = 1; i < table.length; i++) assert.ok((table[i - 1]?.power ?? 0) > (table[i]?.power ?? 0));
  }
});
