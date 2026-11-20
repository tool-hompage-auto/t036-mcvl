/** VTVLive Web SDK — các lớp lỗi (giữ nguyên tên và mã lỗi của sdk.js gốc). */

export class VTVLiveWebError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode?: number,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "VTVLiveWebError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/** API trả về HTTP lỗi hoặc `success: false`. */
export class ApiError extends VTVLiveWebError {
  constructor(
    message: string,
    statusCode?: number,
    code = "API_ERROR",
    details?: unknown,
  ) {
    super(message, code, statusCode, details);
    this.name = "ApiError";
  }
}

/** Không gọi được API (mất mạng, CORS...). */
export class NetworkError extends VTVLiveWebError {
  constructor(message = "Network request failed", details?: unknown) {
    super(message, "NETWORK_ERROR", undefined, details);
    this.name = "NetworkError";
  }
}

/** Thiếu tham số bắt buộc khi khởi tạo SDK. */
export class ConfigError extends VTVLiveWebError {
  constructor(message: string, details?: unknown) {
    super(message, "CONFIG_ERROR", undefined, details);
    this.name = "ConfigError";
  }
}
