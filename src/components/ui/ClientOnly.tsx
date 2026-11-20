"use client";

import { type ReactNode, useSyncExternalStore } from "react";

const subscribeToNothing = () => () => {};

/**
 * UI/ClientOnly — chỉ render `children` trên trình duyệt (không render phía server).
 * Dùng bọc các slider Swiper: thư viện này đọc thời gian và kích thước cửa sổ ngay
 * khi render nên không dựng sẵn được ở server.
 */
export function ClientOnly({ children }: { children: ReactNode }) {
  const isClient = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
  return isClient ? children : null;
}
