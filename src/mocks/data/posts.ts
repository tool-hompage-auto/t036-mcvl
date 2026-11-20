/**
 * MOCK DATA — danh sách bài viết của 3 chuyên mục.
 *
 * Hình dạng mỗi phần tử khớp với item mà Hub API thật trả về ở
 *   GET /website-api/api/frontend/posts
 * (snake_case, chưa qua parser của SDK). Các trường `desc`, `image`, `category`
 * được bổ sung tự động trong `src/mocks/mock-db.ts`.
 *
 * Thay nội dung mảng này để đổi dữ liệu demo; KHÔNG cần sửa khi chuyển sang API thật.
 */
export interface MockPostSeed {
  id: number;
  category_id: number;
  title: string;
  slug: string;
  status: number;
  /** "HOT" => được đưa lên đầu danh sách. */
  status_label: string;
  created_at: string;
  published_at: string;
}

/** Bài lấy từ site thật (bỏ emoji khỏi tiêu đề, slug chuẩn hoá khi slug thật có ký tự lạ). */
const HAND_WRITTEN_SEEDS: MockPostSeed[] = [
  { id: 1711, category_id: 96, title: "ĐUA TOP LỰC CHIẾN CỤM MỚI: Đệ Nhất Chiến Thần Mùa 2", slug: "dua-top-luc-chien-cum-moi-de-nhat-chien-than-mua-2", status: 1, status_label: "HOT", created_at: "2026-09-23T04:08:42.000000Z", published_at: "23/09/2026 - 11:08:42" },
  { id: 1536, category_id: 96, title: "THIÊN THƯ KHAI MỞ – LỘ TRÌNH RA MẮT PHƯỢNG HOÀNG TRU TIÊN", slug: "thien-thu-khai-mo-lo-trinh-ra-mat-phuong-hoang-tru-tien", status: 1, status_label: "HOT", created_at: "2026-06-15T10:17:08.000000Z", published_at: "15/06/2026 - 17:17:08" },
  { id: 1524, category_id: 96, title: "RA MẮT ĐẠI DIỆN TRUYỀN THÔNG", slug: "ra-mat-dai-dien-truyen-thong", status: 1, status_label: "HOT", created_at: "2026-06-05T08:50:21.000000Z", published_at: "05/06/2026 - 15:50:21" },
  { id: 1548, category_id: 96, title: "CHECK-IN SKYLED - SĂN QUÀ + CODE CỰC CHẤT, THAM GIA LÀ CÓ", slug: "check-in-skyled-san-qua-code-cuc-chat-tham-gia-la-co", status: 0, status_label: "", created_at: "2026-06-18T10:07:20.000000Z", published_at: "18/06/2026 - 17:07:20" },
  { id: 1540, category_id: 96, title: "GIỚI THIỆU HỆ THỐNG KÊNH SOCIAL CHÍNH THỨC - FOLLOW NGAY", slug: "gioi-thieu-he-thong-kenh-social-chinh-thuc---follow-ngay", status: 0, status_label: "", created_at: "2026-06-15T10:45:11.000000Z", published_at: "15/06/2026 - 17:45:11" },
  { id: 1532, category_id: 97, title: "[Hướng Dẫn] Tính năng Kỳ Thú", slug: "huong-dan-tinh-nang-ky-thu", status: 0, status_label: "", created_at: "2026-06-15T02:33:38.000000Z", published_at: "15/06/2026 - 09:33:38" },
  { id: 1523, category_id: 97, title: "HƯỚNG DẪN NẠP ONG QUA CHUYỂN KHOẢN NGÂN HÀNG", slug: "huong-dan-nap-ong-qua-chuyen-khoan-ngan-hang-3", status: 0, status_label: "", created_at: "2026-06-05T08:47:31.000000Z", published_at: "05/06/2026 - 15:47:31" },
  { id: 1522, category_id: 97, title: "NHẬP GIFTCODE", slug: "nhap-giftcode", status: 0, status_label: "", created_at: "2026-06-05T08:08:16.000000Z", published_at: "05/06/2026 - 15:08:16" },
  { id: 1521, category_id: 97, title: "HƯỚNG DẪN GỬI YÊU CẦU HỖ TRỢ", slug: "huong-dan-gui-yeu-cau-ho-tro", status: 0, status_label: "", created_at: "2026-06-05T03:44:07.000000Z", published_at: "05/06/2026 - 10:44:07" },
  { id: 1538, category_id: 98, title: "CÔNG BỐ NGÀY RA MẮT - 10H00 NGÀY 23/06/2026", slug: "cong-bo-ngay-ra-mat-10h00-ngay-23062026", status: 2, status_label: "NEW", created_at: "2026-06-15T10:33:30.000000Z", published_at: "15/06/2026 - 17:33:30" },
  { id: 1553, category_id: 98, title: "ĐUA TOP LỰC CHIẾN ALL SERVER - RINH SAMSUNG GALAXY Z FOLD 7", slug: "dua-top-luc-chien-all-server", status: 1, status_label: "HOT", created_at: "2026-06-23T01:19:52.000000Z", published_at: "23/06/2026 - 08:19:52" },
  { id: 1549, category_id: 98, title: "SỰ KIỆNVOTE APP 5 SAO - TRAO NGAY CODE XỊN", slug: "su-kienvote-app-5-sao-trao-ngay-code-xin", status: 0, status_label: "", created_at: "2026-06-18T10:10:05.000000Z", published_at: "18/06/2026 - 17:10:05" },
  { id: 1542, category_id: 98, title: "CHIÊU MỘ FAN CỨNG - HỨNG QUÀ ĐIÊU ĐỨNG", slug: "chieu-mo-fan-cung---hung-qua-dieu-dung", status: 0, status_label: "", created_at: "2026-06-15T10:52:58.000000Z", published_at: "15/06/2026 - 17:52:58" },
  { id: 1539, category_id: 98, title: "LIKE PAGE LIỀN TAY - NHẬN NGAY CODE ĐỈNH", slug: "like-page", status: 0, status_label: "", created_at: "2026-06-15T10:37:12.000000Z", published_at: "15/06/2026 - 17:37:12" },
];

/* ------------------------- Bài sinh tự động (tất định) ------------------------- */

/** Nhãn xoay vòng cho bài sinh ra: xen kẽ HOT / NEW / không nhãn. */
const GENERATED_LABELS = ["NEW", "", "HOT"] as const;
/** Id bài sinh ra của chuyên mục đầu tiên (giảm dần, thấp hơn mọi id viết tay; mỗi chuyên mục cách 100). */
const GENERATED_ID_START = 1500;

/** Tiêu đề bài sinh thêm cho từng chuyên mục (gồm vài tiêu đề dài để thấy cắt 2 dòng). */
const GENERATED_TITLES: Record<number, string[]> = {
  96: [
    "THÔNG BÁO BẢO TRÌ ĐỊNH KỲ VÀ BỒI THƯỜNG CHO TOÀN BỘ MÁY CHỦ",
    "CẬP NHẬT PHIÊN BẢN MỚI: THÊM TÍNH NĂNG CHIẾN TRƯỜNG LIÊN SERVER",
    "KHAI MỞ MÁY CHỦ MỚI - NHẬN NGAY QUÀ TÂN BINH",
    "TỔNG HỢP ĐIỂM MỚI TRONG BẢN CẬP NHẬT THÁNG NÀY",
    "THÔNG BÁO ĐIỀU CHỈNH CÂN BẰNG MÔN PHÁI VÀ KỸ NĂNG",
    "CÔNG BỐ DANH SÁCH TOP LỰC CHIẾN CỤM SERVER ĐẦU TIÊN",
    "RA MẮT THỜI TRANG MỚI: PHƯỢNG HOÀNG LƯU QUANG",
    "NHÌN LẠI HÀNH TRÌNH MỘT THÁNG CÙNG PHƯỢNG HOÀNG TRU TIÊN",
    "THÔNG BÁO XỬ LÝ TÀI KHOẢN VI PHẠM VÀ SỬ DỤNG PHẦN MỀM THỨ BA",
    "CẢM ƠN CỘNG ĐỒNG: TỔNG KẾT SỰ KIỆN ĐUA TOP THÁNG VÀ TRAO GIẢI CHO CÁC CAO THỦ XUẤT SẮC NHẤT",
    "ĐIỀU CHỈNH TỈ LỆ RƠI VẬT PHẨM TRONG BÍ CẢNH",
    "GIẢI ĐẤU LIÊN SERVER MÙA ĐẦU TIÊN CHÍNH THỨC MỞ ĐĂNG KÝ",
    "THÔNG BÁO THAY ĐỔI HỆ THỐNG THÀNH TỰU",
    "HƯỚNG DẪN ĐỔI QUÀ ĐIỂM TÍCH LŨY TẠI CỬA HÀNG VPLAY",
    "PHẢN HỒI CỦA NHÀ PHÁT HÀNH VỀ CÁC GÓP Ý CỦA NGƯỜI CHƠI",
    "LỊCH TRÌNH SỰ KIỆN CUỐI TUẦN: SĂN BOSS THẾ GIỚI X2 PHẦN THƯỞNG",
    "THÔNG BÁO NÂNG CẤP HỆ THỐNG THANH TOÁN VÀ ƯU ĐÃI NẠP",
    "BẢN TIN TUẦN: NHỮNG ĐIỀU CẦN BIẾT TRƯỚC KHI CHINH PHẠT TIÊN ĐẠO",
    "KHAI MỞ BÍ CẢNH MỚI VÀ BỘ TRANG BỊ HUYỀN THOẠI",
    "THÔNG BÁO MỞ THÊM CỤM MÁY CHỦ KIM PHƯỢNG",
  ],
  97: [
    "[Hướng Dẫn] Cách tạo nhân vật và chọn môn phái phù hợp",
    "[Hướng Dẫn] Nhận quà đăng nhập hằng ngày",
    "HƯỚNG DẪN TẢI VÀ CÀI ĐẶT GAME TRÊN ĐIỆN THOẠI",
    "[Hướng Dẫn] Tính năng Treo Máy và nhận thưởng ngoại tuyến",
    "HƯỚNG DẪN LIÊN KẾT TÀI KHOẢN FACEBOOK, GOOGLE",
    "[Hướng Dẫn] Cách nâng cấp trang bị và cường hóa nhanh cho tân thủ mới vào game",
    "HƯỚNG DẪN SỬ DỤNG KHO ĐỒ VÀ HÒM THƯ",
    "[Hướng Dẫn] Hệ thống Thú Cưỡi và cách nhận miễn phí",
    "HƯỚNG DẪN THAM GIA BANG HỘI VÀ NHẬN PHÚC LỢI",
    "[Hướng Dẫn] Săn Boss thế giới: lịch, thưởng và mẹo đánh",
    "HƯỚNG DẪN ĐỔI TÊN NHÂN VẬT VÀ CHUYỂN SERVER",
    "[Hướng Dẫn] Lộ trình lên cấp nhanh từ 1 đến 60",
    "HƯỚNG DẪN NẠP QUA VÍ ĐIỆN TỬ, THẺ NGÂN HÀNG VÀ THẺ CÀO TRÊN CỔNG VPLAY DÀNH CHO NGƯỜI MỚI",
    "[Hướng Dẫn] Thiết lập đồ họa cho máy cấu hình thấp",
    "HƯỚNG DẪN BẬT THÔNG BÁO SỰ KIỆN",
    "[Hướng Dẫn] Hệ thống Pháp Bảo và cách ghép",
    "HƯỚNG DẪN KHÔI PHỤC MẬT KHẨU TÀI KHOẢN",
    "[Hướng Dẫn] Tham gia PK PVP và nhận thưởng xếp hạng",
    "HƯỚNG DẪN LIÊN HỆ HỖ TRỢ KHÁCH HÀNG",
    "[Hướng Dẫn] Mẹo tiết kiệm tài nguyên trong tuần đầu",
  ],
  98: [
    "SỰ KIỆN ĐĂNG NHẬP 7 NGÀY - NHẬN QUÀ TÂN THỦ",
    "ĐUA TOP LỰC CHIẾN CỤM SERVER - NHẬN PHẦN THƯỞNG KHỦNG",
    "MINIGAME ĐOÁN LINH THÚ TRÚNG QUÀ HẤP DẪN",
    "SỰ KIỆN GIÁNG SINH: ĐỔI QUÀ NÓN TUẦN LỘC VÀ TRANG PHỤC GIỚI HẠN",
    "TRI ÂN NGƯỜI CHƠI - TẶNG GIFTCODE GIỚI HẠN",
    "SỰ KIỆN MỜI BẠN CÙNG CHƠI - NHẬN QUÀ KHÔNG GIỚI HẠN",
    "SỰ KIỆN NẠP LẦN ĐẦU - NHẬN THÚ CƯỠI HUYỀN THOẠI",
    "ĐUA TOP LIÊN MINH - PHẦN THƯỞNG CUỐI TUẦN",
    "SĂN BOSS THẾ GIỚI MỖI TỐI - NHÂN ĐÔI PHẦN THƯỞNG",
    "SỰ KIỆN CỘNG ĐỒNG: CHIA SẺ KHOẢNH KHẮC ĂN QUÀ",
    "TUẦN LỄ VÀNG: NẠP TÍCH LŨY NHẬN THƯỞNG SIÊU LỚN DÀNH RIÊNG CHO MÁY CHỦ MỚI VỪA KHAI MỞ",
    "SỰ KIỆN QUAY SỐ MAY MẮN CUỐI THÁNG",
    "ĐUA TOP CÔNG THÀNH CHIẾN LIÊN SERVER",
    "SỰ KIỆN THÁNG: THU THẬP MẢNH PHÁP BẢO",
    "SỰ KIỆN CHÀO MỪNG PHIÊN BẢN MỚI - TẶNG VÉ TRIỆU HỒI",
    "BÌNH CHỌN LINH THÚ ĐƯỢC YÊU THÍCH NHẤT",
    "SỰ KIỆN ĐĂNG NHẬP TÍCH LŨY NHẬN THỜI TRANG",
    "MINIGAME GIẢI ĐỐ TIÊN GIỚI - TRÚNG GIFTCODE",
    "TỔNG KẾT SỰ KIỆN THÁNG VÀ CÔNG BỐ NGƯỜI THẮNG",
    "SỰ KIỆN ĐUA TOP TIÊU PHÍ - RINH QUÀ CÔNG NGHỆ",
  ],
};

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function slugify(title: string): string {
  return title
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Chuẩn hoá thời điểm sang `created_at` (UTC) và `published_at` (giờ VN, UTC+7) như API thật. */
function toTimestamps(utcMs: number): Pick<MockPostSeed, "created_at" | "published_at"> {
  const utc = new Date(utcMs);
  const vn = new Date(utcMs + 7 * 3_600_000);
  const created = `${utc.getUTCFullYear()}-${pad(utc.getUTCMonth() + 1)}-${pad(utc.getUTCDate())}T${pad(utc.getUTCHours())}:${pad(utc.getUTCMinutes())}:${pad(utc.getUTCSeconds())}.000000Z`;
  const published = `${pad(vn.getUTCDate())}/${pad(vn.getUTCMonth() + 1)}/${vn.getUTCFullYear()} - ${pad(vn.getUTCHours())}:${pad(vn.getUTCMinutes())}:${pad(vn.getUTCSeconds())}`;
  return { created_at: created, published_at: published };
}

/** Bài sinh thêm của một chuyên mục, cũ hơn mọi bài viết tay (cách nhau 31 giờ). */
function buildGeneratedSeeds(
  categoryId: number,
  existing: MockPostSeed[],
  idStart: number,
): MockPostSeed[] {
  const titles = GENERATED_TITLES[categoryId] ?? [];
  const oldest = Math.min(...existing.map((seed) => Date.parse(seed.created_at)));
  return titles.map((title, index) => ({
    id: idStart - index,
    category_id: categoryId,
    title,
    slug: slugify(title),
    status: 1,
    status_label: GENERATED_LABELS[index % GENERATED_LABELS.length],
    ...toTimestamps(oldest - (index + 1) * 31 * 3_600_000),
  }));
}

function buildAllSeeds(): MockPostSeed[] {
  const categoryIds = Object.keys(GENERATED_TITLES).map(Number);
  const generated = categoryIds.flatMap((categoryId, categoryIndex) =>
    buildGeneratedSeeds(
      categoryId,
      HAND_WRITTEN_SEEDS.filter((seed) => seed.category_id === categoryId),
      GENERATED_ID_START - categoryIndex * 100,
    ),
  );
  return [...HAND_WRITTEN_SEEDS, ...generated].sort(
    (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at),
  );
}

/** Toàn bộ bài mock, mới nhất trước (viết tay + sinh thêm). */
export const MOCK_POST_SEEDS: MockPostSeed[] = buildAllSeeds();
