import type { RawRankingItem } from "@/lib/vtvlive-sdk/index";

/**
 * MOCK DATA — bảng xếp hạng lực chiến.
 * Khớp body của GET {gameServices}Ranking/GetRanking?gameId=&mode=&scope=
 * (API thật trả thẳng một mảng, KHÔNG có phong bì `{ success, data }`).
 *
 * Dữ liệu được sinh tự động, tất định (tên nhân vật giả, không chứa thông tin người chơi thật).
 */
const MOCK_RANKING_SIZE = 100;

const NAME_PREFIXES = ["Kiếm", "Đạo", "Tiên", "Phượng", "Long", "Hồ Ly", "Ma", "Thanh"];

/** Hậu tố có dấu và ký tự đặc biệt xen kẽ để thấy cách bảng xử lý tên lạ. */
const NAME_SUFFIXES = ["", "Vô Song", "★", "_Đại Đế", "™", "(Bá Chủ)", "♛", "-Hổ Tướng"];

interface RankingSeed {
  /** Lực chiến của hạng 1. */
  topPower: number;
  /** Tên cụm server và số server trong cụm. */
  serverPrefix: string;
  serverCount: number;
}

function buildRanking(seed: RankingSeed): RawRankingItem[] {
  return Array.from({ length: MOCK_RANKING_SIZE }, (_, index) => {
    const rank = index + 1;
    const prefix = NAME_PREFIXES[index % NAME_PREFIXES.length];
    return {
      id: String(100000 + rank),
      name: `${prefix}${String(rank).padStart(3, "0")}${NAME_SUFFIXES[index % NAME_SUFFIXES.length]}`,
      server: `${seed.serverPrefix}-S${1 + ((index * 7) % seed.serverCount)}`,
      // Giảm dần đều ~1.2% mỗi hạng để bảng luôn đúng thứ tự.
      power: Math.round(seed.topPower * Math.pow(0.988, index)),
    };
  });
}

/** scope = "all": BXH toàn server. */
export const MOCK_RANKING_ALL = buildRanking({
  topPower: 1034074508011,
  serverPrefix: "PhượngHoàng",
  serverCount: 47,
});

/** scope = "area": BXH theo cụm server. */
export const MOCK_RANKING_AREA = buildRanking({
  topPower: 126519570,
  serverPrefix: "ThươngThiên",
  serverCount: 28,
});
