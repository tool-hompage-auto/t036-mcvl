/**
 * VTVLive Web SDK — kiểu dữ liệu.
 *
 * Quy ước:
 *  - `Raw*`  : đúng hình dạng JSON API trả về (snake_case). Mock data cũng dùng kiểu này.
 *  - Không có tiền tố: dữ liệu đã qua parser, component sử dụng (camelCase).
 */

/* ----------------------------- Cấu hình SDK ------------------------------ */

export interface SdkOptions {
  /** ID game trên CMS Hub. Bắt buộc. */
  appId: number;
  /** Client ID của ứng dụng. Bắt buộc. */
  clientId: string;
  /** URL callback đăng nhập (giữ để tương thích chữ ký SDK gốc). Bắt buộc. */
  redirectUri: string;
  env?: "dev" | "prod";
  /** Ghi đè host Hub API (dùng để trỏ về mock). */
  hubUrl?: string;
  /** Ghi đè host Game Services API (dùng để trỏ về mock). */
  gameServicesUrl?: string;
  /** Ngôn ngữ nội dung (`language_name`). Mặc định "vi". */
  language?: string;
  debug?: boolean;
}

export interface SdkConfig {
  appId: number;
  clientId: string;
  redirectUri: string;
  env: "dev" | "prod";
  hubUrl: string;
  gameServicesUrl: string;
  language: string;
  debug: boolean;
}

export interface RequestOptions {
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string | number | undefined>;
}

/** Phong bì chung của Hub API. */
export interface HubEnvelope<T> {
  success: boolean;
  messages: string;
  statusCode: number;
  data: T;
}

/* ------------------------------- Dữ liệu thô ------------------------------ */

export interface RawCategory {
  id: number;
  game_id?: number;
  title: string;
  slug: string;
  sort?: number;
  active?: number;
  meta_title?: string | null;
  meta_desc?: string | null;
  posts?: RawPost[];
}

export interface RawPost {
  id: number;
  game_id?: number;
  category_id: number;
  title: string;
  slug: string;
  image: string | null;
  desc: string | null;
  /** HTML từ CKEditor — chỉ có ở API chi tiết bài viết. */
  content?: string;
  status: number;
  status_label: string;
  active?: number;
  meta_title?: string | null;
  meta_desc?: string | null;
  created_at: string;
  updated_at?: string;
  published_at: string;
  category?: RawCategory;
}

export interface RawSiteConfig {
  site_name: string;
  site_logo_url: string;
  home_meta_title: string;
  home_meta_desc: string;
  home_meta_keywords: string;
  share_title: string;
  share_desc: string;
  share_thumb: string;
  ga_code: string;
  google_site_verification: string;
  fb_page_id: string;
  fb_page_link: string;
  fb_group_link: string;
  page_event_url: string;
  page_support_url: string;
  page_payment_url: string;
  page_giftcode_url: string;
  intro_youtube_embed_link: string;
  download_ios_link: string;
  download_android_link: string;
  download_apk_link: string;
  download_pc_link: string;
  qrcode_img_link: string;
  /** Chuỗi JSON tuỳ biến; rỗng nếu không dùng. */
  custom_config: string;
  tiktok_link: string;
  [extraKey: string]: unknown;
}

/** Slide/banner. `title` đóng vai trò vị trí: "top" | "bottom" | ... */
export interface Slide {
  title: string;
  image: string;
  link: string;
  altText?: string;
}

export interface RawRankingItem {
  id?: string;
  Id?: string;
  name?: string;
  Name?: string;
  server?: string;
  Server?: string;
  power?: number;
  Power?: number;
}

/* --------------------------- Dữ liệu đã chuẩn hoá -------------------------- */

export interface Category {
  id: number;
  gameId?: number;
  title: string;
  slug: string;
  posts: Post[];
}

export interface Post {
  id: number;
  gameId?: number;
  categoryId: number;
  title: string;
  slug: string;
  image: string | null;
  desc: string | null;
  content?: string;
  status: number;
  statusLabel: string;
  active?: number;
  metaTitle?: string | null;
  metaDesc?: string | null;
  createdAt: string;
  updatedAt?: string;
  publishedAt: string;
  category?: Category;
}

export interface SiteConfig {
  siteName: string;
  homeMetaTitle: string;
  homeMetaDesc: string;
  homeMetaKeywords: string;
  shareTitle: string;
  shareDesc: string;
  shareThumb: string;
  gaCode: string;
  googleSiteVerification: string;
  fbPageId: string;
  fbPageLink: string;
  fbGroupLink: string;
  pageEventUrl: string;
  pageSupportUrl: string;
  pagePaymentUrl: string;
  pageGiftcodeUrl: string;
  introYoutubeEmbedLink: string;
  downloadIosLink: string;
  downloadAndroidLink: string;
  downloadApkLink: string;
  downloadPcLink: string;
  qrcodeImgLink: string;
  customConfig: unknown[];
  siteLogoUrl: string;
  tiktokLink: string;
}

export interface RankingEntry {
  id: string | undefined;
  name: string | undefined;
  server: string | undefined;
  power: number | undefined;
}

export interface GetRankingParams {
  /** Loại bảng xếp hạng: "user" (theo nhân vật). */
  mode: string;
  /** "all" (toàn server) | "area" (theo cụm). */
  scope: string;
}

export interface GetPostsOptions {
  categoryId?: number;
  limit?: number;
}
