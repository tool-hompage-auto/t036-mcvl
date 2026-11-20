/**
 * API CONFIG — toàn bộ cấu hình kết nối dữ liệu của site.
 *
 * Đây là NƠI DUY NHẤT cần đổi khi chuyển từ mock sang API thật
 * (thực tế chỉ cần đổi biến môi trường, xem `.env` và `.env.example`).
 *
 * Luồng gọi dữ liệu:
 *   Component -> hook (src/hooks) -> getSdk() (src/lib/sdk-client.ts)
 *     -> VTVLiveWebSDK (src/lib/vtvlive-sdk) -> fetch()
 *        - API_MODE = "mock": fetch tới chính origin của site, khớp các route
 *          trong src/app/(mock-api) (đường dẫn y hệt API thật).
 *        - API_MODE = "real": fetch tới host thật trong SDK (DEFAULT_ENVIRONMENTS).
 *
 * Bản gốc (Vite + Redux + axios) gọi thẳng các endpoint này trong
 * `src/services/index.ts`; ở template chúng được gom vào SDK với cùng đường dẫn
 * và cùng tham số.
 */

export type ApiMode = "mock" | "real";
export type SdkEnvName = "dev" | "prod";

/** Chế độ dữ liệu. Mặc định "mock" để site chạy độc lập. */
export const API_MODE: ApiMode =
  process.env.NEXT_PUBLIC_API_MODE === "real" ? "real" : "mock";

/** true khi site đang dùng dữ liệu mock. */
export const IS_MOCK_API = API_MODE === "mock";

/** Môi trường API thật (chỉ có tác dụng khi API_MODE = "real"). */
export const SDK_ENV: SdkEnvName =
  process.env.NEXT_PUBLIC_SDK_ENV === "dev" ? "dev" : "prod";

/** ID game trên CMS Hub (bản gốc: VITE_APP_GAME_ID = 35). */
export const SDK_APP_ID = Number(process.env.GAMEHUBID || 35);

/**
 * Hub CMS của môi trường triển khai (env HUB_API_URL, vd https://dev.vplay.vn/website-api). Để trống = SDK dùng host mặc định theo
 * SDK_ENV. Chỉ có tác dụng khi API_MODE = "real".
 */
export const HUB_API_URL: string = (process.env.HUB_API_URL ?? "").trim().replace(/\/+$/, "");

/** Client ID công khai của SDK (bản gốc: VITE_APP_CLIENT_ID). */
export const SDK_CLIENT_ID =
  process.env.NEXT_PUBLIC_SDK_CLIENT_ID ?? "97158af7fd8e46f8";

/** Bật log request/response của SDK. */
export const SDK_DEBUG = process.env.NEXT_PUBLIC_SDK_DEBUG === "true";

/** Ngôn ngữ nội dung gửi kèm mọi request tới CMS Hub (`language_name`). */
export const SDK_LANGUAGE = process.env.NEXT_PUBLIC_SDK_LANGUAGE ?? "vi";

/** Số bản ghi cho từng lời gọi / từng khối hiển thị (giữ nguyên theo bản gốc). */
export const API_LIMITS = {
  /** Số tin nạp và hiển thị ở khối tin trang chủ. */
  homeNews: 4,
  /** Số tin nạp cho trang danh sách /tin-tuc (nạp hết rồi phân trang phía trình duyệt). */
  newsListFetch: 10000,
  /** Số tin mỗi trang ở /tin-tuc. */
  newsListPageSize: 8,
  /** Số tin cùng chuyên mục nạp ở trang chi tiết. */
  newsDetailRelatedFetch: 4,
  /** Số "Tin khác" tối đa hiển thị ở trang chi tiết. */
  newsDetailRelatedShow: 3,
} as const;

/** Tham số của bảng xếp hạng: bản gốc luôn gọi mode "user"; tab 0 = scope "all", tab 1 = "area". */
export const RANKING_MODE = "user";
