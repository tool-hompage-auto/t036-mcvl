/**
 * DEVICE — nhận diện hệ điều hành của thiết bị (port từ `getDevice()` trong
 * `src/utils/base.ts` của source gốc). Chỉ gọi ở phía trình duyệt.
 */

export type DeviceOs = "IOS" | "ADR" | "WP" | "PC";

export function getDeviceOs(): DeviceOs {
  const userAgent = navigator.userAgent || navigator.vendor;

  if (/windows phone/i.test(userAgent)) return "WP";
  if (/android/i.test(userAgent)) return "ADR";

  const isIos = /iPad|iPhone|iPod/.test(userAgent);
  // iPadOS 13+ tự nhận là Mac; phân biệt bằng số điểm chạm.
  const isIpadOs13Plus =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  if (isIos || isIpadOs13Plus) return "IOS";

  return "PC";
}
