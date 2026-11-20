import { ApiError, NetworkError } from "./errors.ts";
import type { HubEnvelope, RequestOptions, SdkConfig } from "./types.ts";

/**
 * HTTP client của SDK (port từ `HttpClient` trong sdk.js gốc).
 *
 * Cách dựng URL giữ nguyên bản gốc: `new URL(path, baseUrl)`.
 *  - Hub API dùng path tuyệt đối ("/website-api/api/frontend/...") nên chỉ
 *    phần origin của `hubUrl` có tác dụng.
 *  - Game Services dùng path tương đối ("Ranking/GetRanking") nối vào
 *    `gameServicesUrl` (kết thúc bằng "/api/").
 * Nhờ vậy mock API chỉ cần phục vụ đúng các path đó trên origin của site.
 */
export class HttpClient {
  constructor(private readonly config: SdkConfig) {}

  /** Ghép URL + query string, bỏ qua tham số `undefined`. */
  buildUrl(
    baseUrl: string,
    path: string,
    params?: RequestOptions["params"],
  ): string {
    const url = new URL(path, baseUrl);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) url.searchParams.set(key, String(value));
      });
    }
    return url.toString();
  }

  /** Gọi CMS Hub, trả về nguyên phong bì `{ success, data, ... }`. */
  requestHub<T>(path: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(this.config.hubUrl, path, options);
  }

  /** Gọi Game Services (bảng xếp hạng). */
  requestGameServices<T>(
    path: string,
    options: RequestOptions = {},
  ): Promise<T> {
    return this.request<T>(this.config.gameServicesUrl, path, options);
  }

  /** Gọi CMS Hub và bóc lấy `data`; ném ApiError nếu `success = false`. */
  async hubApi<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const response = await this.requestHub<HubEnvelope<T>>(path, options);
    if (!response.success) {
      throw new ApiError(
        response.messages || "API request failed",
        response.statusCode,
        "API_ERROR",
      );
    }
    return response.data;
  }

  /** Request HTTP chung cho mọi host. */
  private async request<T>(
    baseUrl: string,
    path: string,
    options: RequestOptions,
  ): Promise<T> {
    const { method = "GET", headers = {}, body, params } = options;
    const url = this.buildUrl(baseUrl, path, params);
    const requestHeaders: Record<string, string> = {
      Accept: "application/json",
      "X-Core-Api-Version": "v1",
      ...headers,
    };
    if (body && method !== "GET") {
      requestHeaders["Content-Type"] = "application/json";
    }
    this.log(`${method} ${url}`, { headers: requestHeaders, body });

    try {
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
        credentials: "same-origin",
      });
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson ? await response.json() : await response.text();
      this.log(`Response ${response.status}:`, data);

      if (!response.ok) {
        throw new ApiError(
          `API request failed: ${response.statusText}`,
          response.status,
          "API_ERROR",
          data,
        );
      }
      return data as T;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new NetworkError("Network request failed", error);
      }
      throw new NetworkError("Unexpected error during request", error);
    }
  }

  private log(message: string, payload: unknown): void {
    if (this.config.debug) console.log(`[VTVLive SDK] ${message}`, payload);
  }
}
