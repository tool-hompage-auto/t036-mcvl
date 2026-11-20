/**
 * URLS — dựng đường dẫn nội bộ và kiểm tra URL từ nguồn ngoài (API config / CMS).
 * Mọi đường dẫn trong component phải đi qua các hàm ở đây, không viết chuỗi route tay.
 */

/** Trang chủ. */
export const HOME_PATH = "/";

/** Trang danh sách tin (chuyên mục mặc định = chuyên mục đầu tiên). */
export const NEWS_LIST_PATH = "/tin-tuc";

/** Trang bảng xếp hạng (bản gốc: "/rank"). */
export const RANKING_PATH = "/bang-xep-hang";

/** Scheme được phép với URL lấy từ API config. */
const SAFE_URL_PROTOCOLS = ["http:", "https:", "mailto:", "tel:"];
/** Gốc giả để phân tích URL tương đối. */
const RELATIVE_URL_BASE = "http://relative.invalid";

/**
 * Trả lại URL nếu an toàn để gắn vào `href`/`src`, ngược lại trả "#".
 * Chặn các scheme có thể chạy script như `javascript:` hoặc `data:`.
 * Chấp nhận: http(s), mailto, tel, đường dẫn tương đối, anchor "#...".
 */
export function toSafeUrl(url: string | null | undefined): string {
  if (!url) return "#";
  const trimmed = url.trim();
  try {
    const { protocol } = new URL(trimmed, RELATIVE_URL_BASE);
    return SAFE_URL_PROTOCOLS.includes(protocol) ? trimmed : "#";
  } catch {
    return "#";
  }
}

/** Đường dẫn danh sách tin theo chuyên mục: /tin-tuc/danh-muc/{slug}. */
export function buildNewsCategoryPath(categorySlug: string): string {
  return `${NEWS_LIST_PATH}/danh-muc/${encodeURIComponent(categorySlug)}`;
}

/** Đường dẫn trang chi tiết tin: /tin-tuc/{slug}. */
export function buildNewsDetailPath(post: { slug?: string | null }): string {
  return `${NEWS_LIST_PATH}/${encodeURIComponent(post.slug ?? "")}`;
}

/** Thêm phân trang `?page=N` vào đường dẫn (trang 1 không ghi). */
export function buildPagePath(path: string, page: number): string {
  return page > 1 ? `${path}?page=${page}` : path;
}

/**
 * Anchor tới một section: `#section-{tên-section}`.
 * Truyền `path` để ghép thành link đầy đủ (vd: "/tin-tuc#section-news-list").
 */
export function buildSectionAnchor(section: string, path = ""): string {
  return `${path}#section-${section}`;
}
