import type {
  Category,
  Post,
  RankingEntry,
  RawCategory,
  RawPost,
  RawRankingItem,
  RawSiteConfig,
  SiteConfig,
} from "./types.ts";

/**
 * Parser: chuyển JSON thô (snake_case) của API thành object camelCase.
 */

export function parsePost(post: RawPost): Post {
  return {
    id: post.id,
    gameId: post.game_id,
    categoryId: post.category_id,
    title: post.title,
    slug: post.slug,
    image: post.image,
    desc: post.desc,
    content: post.content,
    status: post.status,
    statusLabel: post.status_label,
    active: post.active,
    metaTitle: post.meta_title,
    metaDesc: post.meta_desc,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
    publishedAt: post.published_at,
    category: post.category ? parseCategory(post.category) : undefined,
  };
}

export function parseCategory(category: RawCategory): Category {
  return {
    id: category.id,
    gameId: category.game_id,
    title: category.title,
    slug: category.slug,
    posts: category.posts?.map(parsePost) ?? [],
  };
}

export function parseSiteConfig(config: RawSiteConfig): SiteConfig {
  let customConfig: unknown[] = [];
  try {
    if (config.custom_config) customConfig = JSON.parse(config.custom_config);
  } catch {
    // custom_config không phải JSON hợp lệ (site này lưu một URL) -> coi như không có.
  }
  return {
    siteName: config.site_name,
    homeMetaTitle: config.home_meta_title,
    homeMetaDesc: config.home_meta_desc,
    homeMetaKeywords: config.home_meta_keywords,
    shareTitle: config.share_title,
    shareDesc: config.share_desc,
    shareThumb: config.share_thumb,
    gaCode: config.ga_code,
    googleSiteVerification: config.google_site_verification,
    fbPageId: config.fb_page_id,
    fbPageLink: config.fb_page_link,
    fbGroupLink: config.fb_group_link,
    pageEventUrl: config.page_event_url,
    pageSupportUrl: config.page_support_url,
    pagePaymentUrl: config.page_payment_url,
    pageGiftcodeUrl: config.page_giftcode_url,
    introYoutubeEmbedLink: config.intro_youtube_embed_link,
    downloadIosLink: config.download_ios_link,
    downloadAndroidLink: config.download_android_link,
    downloadApkLink: config.download_apk_link,
    downloadPcLink: config.download_pc_link,
    qrcodeImgLink: config.qrcode_img_link,
    customConfig,
    siteLogoUrl: config.site_logo_url,
    tiktokLink: config.tiktok_link,
  };
}

/** Game Services trả key PascalCase hoặc camelCase tuỳ phiên bản -> gộp về một dạng. */
export function parseRankingItem(item: RawRankingItem): RankingEntry {
  return {
    id: item.Id || item.id,
    name: item.Name || item.name,
    server: item.Server || item.server,
    power: item.Power || item.power,
  };
}

/**
 * Sắp xếp tin theo nhãn, giữ NGUYÊN phép so sánh của bản gốc
 * (reducer `getpostNews.fulfilled` trong `store/storeApi.tsx`):
 *   - bài "HOT" đứng trước;
 *   - bài "NEW" bị đẩy ra sau;
 *   - còn lại giữ thứ tự API trả về.
 * Trả về mảng mới, không sửa mảng đầu vào.
 */
export function sortPostsByStatusLabel(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => {
    if (a.statusLabel === "HOT") return -1;
    if (b.statusLabel === "NEW") return 1;
    return 0;
  });
}
