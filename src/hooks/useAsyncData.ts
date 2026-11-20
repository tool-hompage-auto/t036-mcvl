"use client";

import { useEffect, useEffectEvent, useState } from "react";

export type AsyncStatus = "loading" | "success" | "error";

export interface AsyncState<T> {
  status: AsyncStatus;
  /** Có giá trị khi status = "success". */
  data: T | null;
}

interface SettledState<T> extends AsyncState<T> {
  /** Khoá của lần nạp đã hoàn tất, dùng để nhận biết dữ liệu cũ. */
  key: string;
}

/**
 * Nạp dữ liệu bất đồng bộ ở phía trình duyệt (thay cho các hàm
 * `async function load...()` + jQuery render của bản gốc).
 *
 * @param key    Khoá định danh lần nạp. Đổi khoá => nạp lại. `null` => chưa nạp (giữ "loading").
 * @param loader Hàm gọi SDK, ví dụ `() => getSdk().news.getPosts({...})`.
 *
 * Lỗi được ghi ra console và trả về status "error" để component tự hiển thị thông báo.
 */
export function useAsyncData<T>(
  key: string | null,
  loader: () => Promise<T>,
): AsyncState<T> {
  const [settled, setSettled] = useState<SettledState<T> | null>(null);
  const runLoader = useEffectEvent(loader);

  useEffect(() => {
    if (key === null) return;
    let isCancelled = false;

    runLoader()
      .then((data) => {
        if (!isCancelled) setSettled({ key, status: "success", data });
      })
      .catch((error: unknown) => {
        console.error(`[useAsyncData] Lỗi nạp dữ liệu "${key}":`, error);
        if (!isCancelled) setSettled({ key, status: "error", data: null });
      });

    return () => {
      isCancelled = true;
    };
  }, [key]);

  if (settled && settled.key === key) {
    return { status: settled.status, data: settled.data };
  }
  return { status: "loading", data: null };
}
