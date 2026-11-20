import type { RawCategory } from "@/lib/vtvlive-sdk/index";

/**
 * MOCK DATA — chuyên mục tin (theo đúng thứ tự API thật trả về).
 * Khớp `data` của GET /website-api/api/frontend/home-categories?game_id=
 * (API thật trả kèm `posts` cho từng chuyên mục; phần đó được ghép trong mock-db.ts).
 *
 * Chuyên mục đầu tiên là tab mặc định ở cả trang chủ lẫn trang /tin-tuc.
 * (Slug của chuyên mục "Tân thủ" ở API thật có dấu gạch đầu, mock dùng `tan-thu` cho gọn.)
 */
export const MOCK_CATEGORIES: RawCategory[] = [
  { id: 96, title: "Tin tức", slug: "tin-tuc-13" },
  { id: 97, title: "Tân thủ", slug: "tan-thu" },
  { id: 98, title: "Sự Kiện", slug: "su-kien-7" },
];
