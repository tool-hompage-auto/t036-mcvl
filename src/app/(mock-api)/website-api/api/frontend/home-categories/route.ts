import { findHomeCategories } from "@/mocks/mock-db";
import { hubSuccess } from "@/mocks/mock-response";

/**
 * MOCK  GET /website-api/api/frontend/home-categories?game_id=&language_name=
 * SDK:  sdk.news.getHomeCategories()
 */
export async function GET(): Promise<Response> {
  return hubSuccess(findHomeCategories());
}
