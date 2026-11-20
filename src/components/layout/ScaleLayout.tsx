"use client";

import { type ReactNode, useEffect, useRef } from "react";

import { DESIGN } from "@/config/site.config";
import { useScrollToOnReady } from "@/hooks/useScrollToOnReady";
import { getDeviceOs } from "@/lib/device";

/**
 * LAYOUT/ScaleLayout — khung bao MỌI nội dung trang, là "hệ đơn vị thiết kế" của site
 * (bản gốc: `components/ScaleLayout.tsx`).
 *
 * Cách hoạt động:
 *   <section h-screen>            cao đúng 1 màn hình
 *     #scaleWrapper               vùng cuộn dọc của trang
 *       #transformWrapper         khung dựng rộng cố định (768 / 1920 / 2560px, đặt bằng CSS)
 *         {children}              nội dung viết bằng px thiết kế
 *
 * JS đặt `transform: scale(chiều rộng màn hình / chiều rộng cơ sở)` cho khung dựng,
 * nên toàn bộ nội dung co giãn đều theo màn hình mà không cần đơn vị vw.
 */

function getScaleBase(viewportWidth: number): number {
  if (viewportWidth <= DESIGN.screenMax.mobile) return DESIGN.scaleBase.mobile;
  if (viewportWidth <= DESIGN.screenMax.desktop) return DESIGN.scaleBase.desktop;
  return DESIGN.scaleBase.wide;
}

export function ScaleLayout({ children }: { children: ReactNode }) {
  const transformWrapperRef = useRef<HTMLDivElement | null>(null);

  // Hỗ trợ anchor (#section-news-list...): vùng cuộn là #scaleWrapper nên phải tự cuộn.
  useScrollToOnReady();

  useEffect(() => {
    const transformWrapper = transformWrapperRef.current;
    if (!transformWrapper) return;

    const applyScale = () => {
      const scale = window.innerWidth / getScaleBase(window.innerWidth);
      transformWrapper.style.transform = `scale(${scale})`;
    };
    applyScale();

    // Điện thoại: chừa thêm khoảng trống cuối trang cho thanh công cụ trình duyệt.
    const deviceOs = getDeviceOs();
    if (deviceOs === "ADR") transformWrapper.classList.add("isADRHome");
    if (deviceOs === "IOS") transformWrapper.classList.add("isIOSHome");

    window.addEventListener("resize", applyScale);
    return () => window.removeEventListener("resize", applyScale);
  }, []);

  return (
    <section data-element="scale-layout" className="h-screen">
      <div id="scaleWrapper">
        <div id="transformWrapper" ref={transformWrapperRef}>
          {children}
        </div>
      </div>
    </section>
  );
}
