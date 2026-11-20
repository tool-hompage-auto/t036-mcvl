"use client";

import { useEffect } from "react";

/** Khoảng nghỉ giữa các lần kiểm tra chiều cao trang (ms). */
const RETRY_DELAY_MS = 150;
/** Số lần thử tối đa trước khi cuộn dù trang chưa ổn định. */
const MAX_ATTEMPTS = 20;

/**
 * Cuộn tới phần tử có id trùng với hash trên URL (vd: /tin-tuc#section-news-list) sau khi
 * trang đã ổn định chiều cao (ảnh nền tải xong). Port từ effect trong
 * `page/Tintuc.tsx` và `components/tintuc/Detail.tsx` của source gốc.
 *
 * Vùng cuộn của site là #scaleWrapper (không phải window), nên dùng scrollIntoView.
 */
export function useScrollToOnReady(): void {
  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) return;

    let attempts = 0;
    let lastContentHeight = -1;
    let timeoutId: number | undefined;

    const scrollToTarget = () => {
      const target = document.getElementById(targetId);
      if (target) {
        const scrollRoot =
          target.closest<HTMLElement>("#scaleWrapper") ?? document.documentElement;
        const height = scrollRoot.scrollHeight;
        if (height === lastContentHeight || attempts >= MAX_ATTEMPTS) {
          target.scrollIntoView({ behavior: "smooth" });
          return;
        }
        lastContentHeight = height;
      }
      attempts += 1;
      timeoutId = window.setTimeout(scrollToTarget, RETRY_DELAY_MS);
    };

    scrollToTarget();
    return () => window.clearTimeout(timeoutId);
  }, []);
}
