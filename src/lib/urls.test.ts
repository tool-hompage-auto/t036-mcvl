import assert from "node:assert/strict";
import { test } from "node:test";

import {
  buildNewsCategoryPath,
  buildNewsDetailPath,
  buildPagePath,
  buildSectionAnchor,
  toSafeUrl,
} from "./urls.ts";

test("toSafeUrl giữ nguyên URL http(s), mailto, tel, tương đối và anchor", () => {
  for (const url of [
    "https://facebook.com/phuonghoangtrutienvplay",
    "http://example.com/a?b=1",
    "mailto:hotro@example.com",
    "tel:1900866666",
    "/tin-tuc",
    "/assets/mock/config/site-logo.png",
    "#section-news-list",
  ]) {
    assert.equal(toSafeUrl(url), url);
  }
});

test("toSafeUrl chặn scheme chạy được script và giá trị rỗng", () => {
  assert.equal(toSafeUrl("javascript:alert(1)"), "#");
  assert.equal(toSafeUrl("  JavaScript:alert(1)"), "#");
  assert.equal(toSafeUrl("data:text/html,<script>alert(1)</script>"), "#");
  assert.equal(toSafeUrl(""), "#");
  assert.equal(toSafeUrl(null), "#");
  assert.equal(toSafeUrl(undefined), "#");
});

test("buildNewsDetailPath dựng /tin-tuc/{slug} và mã hoá ký tự đặc biệt", () => {
  assert.equal(
    buildNewsDetailPath({ slug: "co-che-doi-hinh" }),
    "/tin-tuc/co-che-doi-hinh",
  );
  assert.equal(buildNewsDetailPath({ slug: "a/b?c#d" }), "/tin-tuc/a%2Fb%3Fc%23d");
  assert.equal(buildNewsDetailPath({ slug: null }), "/tin-tuc/");
});

test("buildNewsCategoryPath dựng /tin-tuc/danh-muc/{slug}", () => {
  assert.equal(buildNewsCategoryPath("tan-thu-11"), "/tin-tuc/danh-muc/tan-thu-11");
  assert.equal(buildNewsCategoryPath("a/b"), "/tin-tuc/danh-muc/a%2Fb");
});

test("buildPagePath không ghi ?page cho trang 1", () => {
  assert.equal(buildPagePath("/tin-tuc", 1), "/tin-tuc");
  assert.equal(
    buildPagePath("/tin-tuc/danh-muc/tan-thu-11", 3),
    "/tin-tuc/danh-muc/tan-thu-11?page=3",
  );
});

test("buildSectionAnchor dựng #section-{tên} và ghép được với đường dẫn", () => {
  assert.equal(buildSectionAnchor("ranking"), "#section-ranking");
  assert.equal(buildSectionAnchor("news-list", "/tin-tuc"), "/tin-tuc#section-news-list");
});
