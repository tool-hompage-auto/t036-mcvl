import { MOCK_SITE_CONFIG } from "@/mocks/data/site-config";
import { hubSuccess } from "@/mocks/mock-response";

/**
 * MOCK  GET /website-api/api/frontend/config?game_id=
 * SDK:  sdk.site.getConfig()
 */
export async function GET(): Promise<Response> {
  return hubSuccess(MOCK_SITE_CONFIG);
}
