import type { NextRequest } from "next/server";

import { findPostDetail } from "@/mocks/mock-db";
import { hubNotFound, hubSuccess } from "@/mocks/mock-response";

/**
 * MOCK  GET /website-api/api/frontend/posts/{slugOrId}?game_id=
 * SDK:  sdk.news.getPost(slugOrId)
 */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slugOrId: string }> },
): Promise<Response> {
  const { slugOrId } = await context.params;
  const post = findPostDetail(slugOrId);
  return post ? hubSuccess(post) : hubNotFound("Post not found");
}
