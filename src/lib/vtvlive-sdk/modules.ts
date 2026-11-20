import { ApiError } from "./errors.ts";
import type { HttpClient } from "./http-client.ts";
import {
  parseCategory,
  parsePost,
  parseRankingItem,
  parseSiteConfig,
  sortPostsByStatusLabel,
} from "./parsers.ts";
import type {
  Category,
  GetPostsOptions,
  GetRankingParams,
  Post,
  RankingEntry,
  RawCategory,
  RawPost,
  RawRankingItem,
  RawSiteConfig,
  SdkConfig,
  SiteConfig,
  Slide,
} from "./types.ts";

/**
 * Các module nghiệp vụ của SDK. Endpoint và tham số giữ nguyên theo
 * `src/services/index.ts` của source gốc.
 *
 * BẢNG ENDPOINT (mock tương ứng nằm ở src/app/(mock-api)):
 *   sdk.site.getConfig()            GET {hub}/website-api/api/frontend/config?game_id=&language_name=
 *   sdk.news.getHomeCategories()    GET {hub}/website-api/api/frontend/home-categories?game_id=&language_name=
 *   sdk.news.getPosts()             GET {hub}/website-api/api/frontend/posts?game_id=&category_id=&limit=&language_name=
 *   sdk.news.getPost(slugOrId)     GET {hub}/website-api/api/frontend/posts/{slugOrId}?game_id=&language_name=
 *   sdk.slides.getSlides()          GET {hub}/website-api/api/frontend/slides?game_id=&language_name=
 *   sdk.ranking.getRanking(params) GET {gameServices}Ranking/GetRanking?gameId=&mode=&scope=
 */

const HUB = "/website-api/api/frontend";

/** Tham số chung của mọi request tới CMS Hub. */
function hubParams(config: SdkConfig): {
  game_id: number;
  language_name: string;
} {
  return { game_id: config.appId, language_name: config.language };
}

/* --------------------------------- site ---------------------------------- */

export class SiteModule {
  private cachedConfig: SiteConfig | null = null;

  constructor(
    private readonly config: SdkConfig,
    private readonly http: HttpClient,
  ) {}

  /** Cấu hình site (logo, link fanpage, nạp, tải game...). Có cache trong phiên. */
  async getConfig(forceRefresh = false): Promise<SiteConfig> {
    if (!forceRefresh && this.cachedConfig) return this.cachedConfig;
    const data = await this.http.hubApi<RawSiteConfig>(`${HUB}/config`, {
      params: hubParams(this.config),
    });
    this.cachedConfig = parseSiteConfig(data);
    return this.cachedConfig;
  }
}

/* --------------------------------- news ---------------------------------- */

export class NewsModule {
  constructor(
    private readonly config: SdkConfig,
    private readonly http: HttpClient,
  ) {}

  /** Danh sách chuyên mục hiển thị ở trang chủ (kèm vài bài mới nhất mỗi chuyên mục). */
  async getHomeCategories(): Promise<Category[]> {
    const data = await this.http.hubApi<RawCategory[]>(
      `${HUB}/home-categories`,
      { params: hubParams(this.config) },
    );
    return data.map(parseCategory);
  }

  /** Danh sách bài theo chuyên mục, đã sắp theo nhãn HOT/NEW như bản gốc. */
  async getPosts(options: GetPostsOptions = {}): Promise<Post[]> {
    const { categoryId, limit = 3 } = options;
    const data = await this.http.hubApi<RawPost[]>(`${HUB}/posts`, {
      params: {
        ...hubParams(this.config),
        category_id: categoryId,
        limit,
      },
    });
    return sortPostsByStatusLabel(data.map(parsePost));
  }

  /**
   * Chi tiết một bài theo slug hoặc id (kèm `content`). Trả `null` khi không có bài (HTTP 404);
   * các lỗi khác (mạng, 5xx) được ném ra để hook ghi log và component hiển thị trạng thái lỗi.
   */
  async getPost(slugOrId: string): Promise<Post | null> {
    const path = `${HUB}/posts/${encodeURIComponent(slugOrId)}`;
    try {
      const data = await this.http.hubApi<RawPost>(path, {
        params: hubParams(this.config),
      });
      return parsePost(data);
    } catch (error) {
      if (error instanceof ApiError && error.statusCode === 404) return null;
      throw error;
    }
  }
}

/* -------------------------------- slides --------------------------------- */

export class SlidesModule {
  private cachedSlides: Slide[] | null = null;

  constructor(
    private readonly config: SdkConfig,
    private readonly http: HttpClient,
  ) {}

  /** Toàn bộ slide/banner của game (site này dùng tất cả cho slider tin trang chủ). */
  async getSlides(forceRefresh = false): Promise<Slide[]> {
    if (!forceRefresh && this.cachedSlides) return this.cachedSlides;
    const data = await this.http.hubApi<Slide[]>(`${HUB}/slides`, {
      params: hubParams(this.config),
    });
    this.cachedSlides = data;
    return data;
  }
}

/* -------------------------------- ranking -------------------------------- */

export class RankingModule {
  constructor(
    private readonly config: SdkConfig,
    private readonly http: HttpClient,
  ) {}

  /**
   * Bảng xếp hạng từ Game Services.
   * @param params.mode  "user"
   * @param params.scope "all" (toàn server) | "area" (theo cụm)
   * Lỗi KHÔNG bị nuốt (khác T030): bản gốc cần phân biệt "lỗi" với "chưa có dữ liệu"
   * để hiện đúng thông báo.
   */
  async getRanking(params: GetRankingParams): Promise<RankingEntry[]> {
    const data = await this.http.requestGameServices<RawRankingItem[]>(
      "Ranking/GetRanking",
      { params: { gameId: this.config.appId, mode: params.mode, scope: params.scope } },
    );
    return Array.isArray(data) ? data.map(parseRankingItem) : [];
  }
}
