import type { Slide } from "@/lib/vtvlive-sdk/index";

/**
 * MOCK DATA — slide/banner của banner-slider trang chủ.
 * Khớp `data` của GET /website-api/api/frontend/slides?game_id=
 * Site này hiển thị TẤT CẢ slide trả về (không lọc theo `title`). Số lượng và ảnh như live (3 slide).
 */
const MOCK_SLIDE_DIR = "/assets/images/mock/slides";

export const MOCK_SLIDES: Slide[] = [
  {
    title: "top",
    image: `${MOCK_SLIDE_DIR}/slide-01.png`,
    link: "https://www.facebook.com/share/p/1GkAH2qTH6/",
  },
  {
    title: "top",
    image: `${MOCK_SLIDE_DIR}/slide-02.png`,
    link: "https://www.facebook.com/share/p/17yPMAanXu/",
  },
  {
    title: "top",
    image: `${MOCK_SLIDE_DIR}/slide-03.png`,
    link: "https://www.facebook.com/share/p/1AnKpnEit5/",
  },
];
