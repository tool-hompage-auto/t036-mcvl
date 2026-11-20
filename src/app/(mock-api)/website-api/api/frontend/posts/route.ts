import type { NextRequest } from "next/server";

import { findPosts } from "@/mocks/mock-db";
import { hubSuccess, readIntParam } from "@/mocks/mock-response";

/**
 * MOCK  GET /website-api/api/frontend/posts?game_id=&limit=&category_id=&page=
 * SDK:  sdk.news.getPosts({ categoryId, limit })
 */
export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = request.nextUrl;
  const categoryId = readIntParam(searchParams, "category_id");
  const limit = readIntParam(searchParams, "limit");
  const page = readIntParam(searchParams, "page");
  return hubSuccess(findPosts({ categoryId, limit, page }));
}
