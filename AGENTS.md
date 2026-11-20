<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Ghi chú riêng của project (đọc trước khi sửa)

- Quy chuẩn chung của mọi site (route, section, block, asset, CSS, SDK): `../STANDARD.md` — nguồn đúng duy nhất.
- Tổng quan, cách chạy, cách chuyển mock sang API thật: `README.md`.
- Bảng ánh xạ tên riêng của site (tên cũ → tên chuẩn): `docs/NAMING.md`. Ánh xạ asset gốc sang asset mới: `docs/ASSET-MAP.md`.
- Hệ đơn vị: nội dung nằm trong `ScaleLayout` (khung 768 / 1920 / 2560px được scale theo màn hình). `--spacing: 1px` (số trong class = px thiết kế, cỡ chữ `fs-*`, dòng `lh-*`), khai báo ở `src/app/globals.css`. Bản gốc dùng thang 4px của Tailwind nên số class đã nhân 4. Không đổi `--spacing`, không dùng vw cho nội dung trong ScaleLayout.
- Thành phần ngoài ScaleLayout (`SiteChrome`) dùng px thật; side menu và nút BXH thu nhỏ bằng `float-scale`.
- Trang cuộn trong `#scaleWrapper`, không phải `window`: dùng `scrollIntoView`, không dùng `window.scrollTo`.
- Mọi dữ liệu động đi qua `getSdk()` (`src/lib/sdk-client.ts`); không gọi `fetch` trực tiếp trong component.
- Thêm endpoint: thêm hàm vào `src/lib/vtvlive-sdk/modules.ts` và route mock cùng đường dẫn trong `src/app/(mock-api)`.
- Slider dùng Swiper và phải bọc trong `ClientOnly`.
- Kiểm tra trước khi xong việc: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.
