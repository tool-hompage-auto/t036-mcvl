import {
  HUB_API_URL,
  IS_MOCK_API,
  SDK_APP_ID,
  SDK_CLIENT_ID,
  SDK_DEBUG,
  SDK_ENV,
  SDK_LANGUAGE,
} from "@/config/api.config";
import { VTVLiveWebSDK } from "@/lib/vtvlive-sdk/index";

/**
 * SDK CLIENT — instance VTVLiveWebSDK dùng chung cho toàn site.
 *
 * Thay cho các thunk trong `src/services/index.ts` + Redux store của source gốc.
 * Chỉ gọi ở phía trình duyệt (trong hook / event handler) vì cần `window.location`.
 *
 * CHUYỂN MOCK <-> THẬT:
 *  - mock: trỏ `hubUrl` và `gameServicesUrl` về origin của site, nơi các route
 *    trong src/app/(mock-api) phục vụ đúng đường dẫn của API thật.
 *  - real: không ghi đè, SDK tự dùng host thật theo `SDK_ENV`.
 */
let sdkInstance: VTVLiveWebSDK | null = null;

export function getSdk(): VTVLiveWebSDK {
  if (sdkInstance) return sdkInstance;

  const origin = window.location.origin;
  const mockEndpoints = IS_MOCK_API
    ? { hubUrl: origin, gameServicesUrl: `${origin}/api/` }
    : HUB_API_URL
      ? { hubUrl: `${HUB_API_URL}/api/frontend` }
      : {};

  sdkInstance = new VTVLiveWebSDK({
    appId: SDK_APP_ID,
    clientId: SDK_CLIENT_ID,
    redirectUri: `${origin}/callback`,
    env: SDK_ENV,
    debug: SDK_DEBUG,
    language: SDK_LANGUAGE,
    ...mockEndpoints,
  });
  return sdkInstance;
}
