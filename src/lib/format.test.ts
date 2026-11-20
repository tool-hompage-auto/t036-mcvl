import assert from "node:assert/strict";
import { test } from "node:test";

import { formatDate } from "./format.ts";

test("formatDate trả chuỗi rỗng khi không có giá trị", () => {
  assert.equal(formatDate(""), "");
  assert.equal(formatDate(null), "");
  assert.equal(formatDate(undefined), "");
});

test("formatDate hiểu timestamp giây và mili-giây như nhau", () => {
  const seconds = 1778049125;
  assert.equal(formatDate(seconds), formatDate(seconds * 1000));
  assert.equal(formatDate(String(seconds)), formatDate(seconds));
  assert.match(formatDate(seconds), /^\d{2}-\d{2}-2026 \d{2}:\d{2}$/);
});

test("formatDate định dạng chuỗi ISO theo dd-MM-yyyy HH:mm", () => {
  const local = new Date(2026, 4, 6, 14, 32, 5);
  assert.equal(formatDate(local.toISOString()), "06-05-2026 14:32");
});

test("formatDate trả nguyên văn khi không parse được", () => {
  assert.equal(formatDate("không phải ngày"), "không phải ngày");
});
