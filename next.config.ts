import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ba biến cấu hình triển khai (.env) dùng được cả ở code chạy trên trình duyệt: Next ghi giá trị vào bản build.
  env: {
    GAMEHUBID: process.env.GAMEHUBID ?? "",
    APP_URL: process.env.APP_URL ?? "",
    HUB_API_URL: process.env.HUB_API_URL ?? "",
  },
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
