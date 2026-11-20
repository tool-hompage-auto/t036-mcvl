import DOMPurify from "dompurify";

/**
 * Làm sạch HTML bài viết từ CMS (CKEditor) trước khi chèn vào trang,
 * chặn script/thuộc tính nguy hiểm (XSS). Chỉ gọi ở phía trình duyệt.
 * Giữ lại iframe để nhúng video (YouTube...).
 */
export function sanitizeCmsHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling", "target"],
  });
}
