import type { NextRequest } from "next/server";

import { MOCK_RANKING_ALL, MOCK_RANKING_AREA } from "@/mocks/data/ranking";
import { gameServicesSuccess } from "@/mocks/mock-response";

/**
 * MOCK  GET /api/Ranking/GetRanking?gameId=&mode=&scope=
 * SDK:  sdk.ranking.getRanking({ mode, scope })
 *   scope = "all"  -> BXH toàn server
 *   scope = "area" -> BXH theo cụm
 */
export async function GET(request: NextRequest): Promise<Response> {
  const scope = request.nextUrl.searchParams.get("scope");
  return gameServicesSuccess(
    scope === "area" ? MOCK_RANKING_AREA : MOCK_RANKING_ALL,
  );
}
