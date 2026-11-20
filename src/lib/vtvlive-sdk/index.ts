import { ConfigError } from "./errors.ts";
import { HttpClient } from "./http-client.ts";
import {
  NewsModule,
  RankingModule,
  SiteModule,
  SlidesModule,
} from "./modules.ts";
import type { SdkConfig, SdkOptions } from "./types.ts";

/**
 * VTVLiveWebSDK — lớp gọi API của template (cùng cấu trúc với SDK ở t030-giang-ho-ky-ngo).
 *
 * Source gốc của site này gọi API bằng axios + Redux thunk trong `src/services/index.ts`;
 * ở đây các lời gọi đó được gom vào 4 module: site, news, slides, ranking,
 * giữ nguyên endpoint và tham số. Phần đăng nhập / sự kiện của trang landing không port.
 *
 * Cách dùng giống hệt bản gốc:
 *   const sdk = new VTVLiveWebSDK({ appId, clientId, redirectUri, env });
 *   const config = await sdk.site.getConfig();
 *
 * Trong project này KHÔNG khởi tạo trực tiếp — hãy dùng `getSdk()` ở
 * `src/lib/sdk-client.ts` để dùng chung một instance và tự chọn mock/real.
 */

/** Host mặc định theo môi trường (giống ENVIRONMENTS trong sdk.js gốc). */
const DEFAULT_ENVIRONMENTS = {
  dev: {
    hubUrl: "https://vplay.vn/website-api/api/frontend",
    gameServicesUrl: "https://dev-game-services-api.vplay.vn/api/",
  },
  prod: {
    hubUrl: "https://vplay.vn/website-api/api/frontend",
    gameServicesUrl: "https://game-services-api.vplay.vn/api/",
  },
} as const;

export class VTVLiveWebSDK {
  readonly config: SdkConfig;
  readonly site: SiteModule;
  readonly news: NewsModule;
  readonly slides: SlidesModule;
  readonly ranking: RankingModule;

  constructor(options: SdkOptions) {
    if (!options.appId) throw new ConfigError("appId is required");
    if (!options.clientId) throw new ConfigError("clientId is required");
    if (!options.redirectUri) throw new ConfigError("redirectUri is required");

    const env = options.env || "prod";
    const envConfig = DEFAULT_ENVIRONMENTS[env];
    this.config = {
      appId: options.appId,
      clientId: options.clientId,
      redirectUri: options.redirectUri,
      env,
      hubUrl: options.hubUrl || envConfig.hubUrl,
      gameServicesUrl: options.gameServicesUrl || envConfig.gameServicesUrl,
      language: options.language || "vi",
      debug: options.debug || false,
    };

    const http = new HttpClient(this.config);
    this.site = new SiteModule(this.config, http);
    this.news = new NewsModule(this.config, http);
    this.slides = new SlidesModule(this.config, http);
    this.ranking = new RankingModule(this.config, http);
  }

  static get version(): string {
    return "1.0.0";
  }
}

export * from "./errors.ts";
export type * from "./types.ts";
