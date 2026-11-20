import type { RankingEntry } from "@/lib/vtvlive-sdk/index";

/**
 * BLOCK/ranking/RankingTableBlock — bảng xếp hạng lực chiến (bản gốc: bảng trong `components/home/Rank.tsx`).
 * 4 cột: Hạng · Tên nhân vật · Server · Lực chiến. Top 1-3 hiện ảnh huy hiệu thay cho số.
 *
 * Hai biến thể:
 *   - desktop: bảng đặt lên khung ảnh, chữ đen, tiêu đề cột kẻ chân
 *   - mobile : bảng nền trắng, hàng tiêu đề xanh lục chữ trắng
 * Key hàng = hạng (vị trí), vì `id` nhân vật có thể trùng giữa các hàng.
 */

const ASSET_DIR = "/assets/images/ranking";

const COLUMNS = [
  { label: "Hạng", widthClass: "w-[10%]" },
  { label: "Tên nhân vật", widthClass: "w-[40%]" },
  { label: "Server", widthClass: "w-[25%]" },
  { label: "Lực chiến", widthClass: "" },
] as const;

interface RankingTableBlockProps {
  entries: RankingEntry[];
  variant: "desktop" | "mobile";
}

export function RankingTableBlock({ entries, variant }: RankingTableBlockProps) {
  const isDesktop = variant === "desktop";

  return (
    <table
      data-block="ranking-table"
      className={`h-full w-full border-collapse ${isDesktop ? "" : "bg-white"}`}
    >
      <thead className={isDesktop ? "" : "bg-[#148D6F]"}>
        <tr className={isDesktop ? "border-b border-b-[#00000080]" : ""}>
          {COLUMNS.map((column) => (
            <th
              key={column.label}
              className={`text-center fs-24 ${column.widthClass} ${
                isDesktop ? "p-7 text-black" : "p-12 text-white"
              }`}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, index) => (
          <tr key={index} className="border-b border-b-[#0000001A]">
            <td className="w-[10%] text-center">
              {index <= 2 ? (
                <img data-edit-id="ranking-table-block.data-asset-dir" data-edit-mode="scale" data-edit-source="api"
                  src={`${ASSET_DIR}/icon-rank-${index + 1}.png`}
                  alt="title"
                  className="mx-auto h-39 w-50"
                />
              ) : (
                <span className={isDesktop ? "fs-18" : "fs-20"}>{index + 1}</span>
              )}
            </td>
            <td className="w-[40%] p-20 text-center fs-20 text-black">{entry.name}</td>
            <td className="w-[25%] p-20 text-center fs-20 text-black">{entry.server}</td>
            <td className="p-20 text-center fs-20 text-black">
              {(entry.power ?? 0).toLocaleString("vi-VN")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
