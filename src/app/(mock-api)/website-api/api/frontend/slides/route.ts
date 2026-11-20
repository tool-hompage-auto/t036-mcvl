import { MOCK_SLIDES } from "@/mocks/data/slides";
import { hubSuccess } from "@/mocks/mock-response";

/**
 * MOCK  GET /website-api/api/frontend/slides?game_id=
 * SDK:  sdk.slides.getSlides()
 */
export async function GET(): Promise<Response> {
  return hubSuccess(MOCK_SLIDES);
}
