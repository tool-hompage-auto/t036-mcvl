import { IS_MOCK_API } from "@/config/api.config";

/**
 * MOCK RESPONSE — tạo Response cho các route mock, đúng định dạng API thật.
 * Khi site chạy API thật (API_MODE=real) mọi route mock đều trả 404.
 */

const MOCK_DISABLED_BODY = {
  success: false,
  messages: "Mock API is disabled (NEXT_PUBLIC_API_MODE=real)",
  statusCode: 404,
  data: null,
};

function mockDisabled(): Response {
  return Response.json(MOCK_DISABLED_BODY, { status: 404 });
}

/** Phản hồi thành công của Hub API: `{ success, messages, statusCode, data }`. */
export function hubSuccess<T>(data: T): Response {
  if (!IS_MOCK_API) return mockDisabled();
  return Response.json({ success: true, messages: "ok", statusCode: 200, data });
}

/** Phản hồi "không tìm thấy" của Hub API. */
export function hubNotFound(message: string): Response {
  if (!IS_MOCK_API) return mockDisabled();
  return Response.json(
    { success: false, messages: message, statusCode: 404, data: null },
    { status: 404 },
  );
}

/** Phản hồi của Game Services: trả thẳng dữ liệu, không có phong bì. */
export function gameServicesSuccess<T>(data: T): Response {
  if (!IS_MOCK_API) return mockDisabled();
  return Response.json(data);
}

/** Đọc query số nguyên; trả `undefined` nếu thiếu hoặc không hợp lệ. */
export function readIntParam(
  searchParams: URLSearchParams,
  name: string,
): number | undefined {
  const raw = searchParams.get(name);
  if (raw === null || !/^\d+$/.test(raw)) return undefined;
  return Number(raw);
}
