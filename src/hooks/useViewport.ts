"use client";

import { useSyncExternalStore } from "react";

/**
 * Mốc chuyển giữa bố cục mobile và desktop của site (px).
 * <= 768: mobile (khung thiết kế 768) | > 768: desktop (khung thiết kế 1920).
 */
export const MOBILE_MAX_WIDTH = 768;

function subscribeToResize(onChange: () => void): () => void {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

export interface Viewport {
  /** Chiều rộng cửa sổ (px). */
  width: number;
  /** true khi đang ở bố cục desktop (rộng hơn 768px). */
  isDesktop: boolean;
}

/**
 * Chiều rộng cửa sổ hiện tại và chế độ mobile/desktop (bản gốc: hook `useResize`).
 * Width = 0 khi render phía server và ở lần render đầu trên trình duyệt; khi đó các
 * section coi như mobile, đúng như bản gốc (state khởi tạo = 0).
 */
export function useViewport(): Viewport {
  const width = useSyncExternalStore(
    subscribeToResize,
    () => window.innerWidth,
    () => 0,
  );
  return { width, isDesktop: width > MOBILE_MAX_WIDTH };
}

/**
 * Theo dõi một media query (bản gốc: hook `useMediaQuery`).
 * Trả `false` khi render phía server.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", onChange);
      return () => mediaQueryList.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
