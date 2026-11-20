/**
 * UI/Pagination — phân trang dạng ô vuông (bản gốc: `components/Pagination.tsx`).
 * Block `pagination`. Element: nút lùi, các nút số trang (trang hiện tại nền đỏ), nút tiến.
 * Bấm lùi ở trang đầu / tiến ở trang cuối không có tác dụng (do `onPageChange` tự chặn).
 */
const ASSET_DIR = "/assets/images/news";

const CELL_CLASS =
  "relative flex h-50 w-50 items-center justify-center border border-[#81818133]";
const CHEVRON_CLASS = "h-16 w-16 object-contain";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav data-block="pagination" aria-label="Page navigation">
      <ul className="flex items-center gap-8">
        <li>
          <button
            type="button"
            aria-label="Trang trước"
            onClick={() => onPageChange(currentPage - 1)}
            className={`${CELL_CLASS} transition-colors`}
          >
            <img data-edit-id="pagination.icon-chevron-left" data-edit-mode="scale" src={`${ASSET_DIR}/icon-chevron-left.png`} className={CHEVRON_CLASS} alt="" />
          </button>
        </li>

        {pages.map((page) => {
          const isCurrent = currentPage === page;
          return (
            <li key={page}>
              <button
                type="button"
                aria-current={isCurrent ? "page" : undefined}
                onClick={() => onPageChange(page)}
                className={`${CELL_CLASS} ${isCurrent ? "bg-link-hover" : "bg-white"}`}
              >
                <span className={`fs-18 lh-28 ${isCurrent ? "text-white" : "text-muted"}`}>
                  {page}
                </span>
              </button>
            </li>
          );
        })}

        <li>
          <button
            type="button"
            aria-label="Trang sau"
            onClick={() => onPageChange(currentPage + 1)}
            className={`${CELL_CLASS} transition-colors`}
          >
            <img data-edit-id="pagination.icon-chevron-right" data-edit-mode="scale" src={`${ASSET_DIR}/icon-chevron-right.png`} className={CHEVRON_CLASS} alt="" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
