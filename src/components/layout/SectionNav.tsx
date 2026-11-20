import Link from "next/link";

import { RANKING_PATH } from "@/lib/urls";

/**
 * LAYOUT/SectionNav — nút nổi cố định góc dưới trái, CHỈ desktop (>= 769px), có ở mọi trang.
 * Bản gốc: `layout/FloatBxh.tsx` (nút "BXH" dẫn tới trang bảng xếp hạng `/rank`).
 *
 * Nằm NGOÀI ScaleLayout: px thật, thu nhỏ theo mốc màn hình bằng `float-scale`.
 */
export function SectionNav() {
  return (
    <section data-edit-id="section-nav.btn-ranking"
      data-block="section-nav"
      className="float-scale fixed top-[80%] left-20 z-20 hidden origin-bottom-left -translate-y-1/2 pc:block"
    >
      <Link className="relative w-max" href={RANKING_PATH}>
        <img
          className="relative z-20 aspect-159/224 object-contain"
          src="/assets/images/layout/section-nav/btn-ranking.png"
          width={159}
          height={224}
          alt="Bxh"
        />
      </Link>
    </section>
  );
}
