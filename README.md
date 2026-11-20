# T029 — Phượng Hoàng Tru Tiên (template Next.js + Tailwind)

Bản chuẩn hoá của site <https://phuonghoangtrutien.vplay.vn/>, dựng lại 1:1 (kể cả responsive)
từ source gốc Vite + React + Redux, dùng làm **template cho AI** sinh site game mới.
Theo quy chuẩn chung của workspace: [../STANDARD.md](../STANDARD.md).

- **Stack**: Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript · Swiper 11
- **Dữ liệu**: gọi qua SDK, mặc định trả **mock** nên chạy độc lập
- **Source gốc**: `../_sources/t029-home-page` (chỉ để đối chiếu). T037 phát triển từ cùng source này; template T037 được dựng trước và là khung tham chiếu của T029.

## Chạy

```powershell
npm install
npm run dev        # http://localhost:3007 (mock API)
npm run build      # build production
npm run lint       # eslint
npm run typecheck  # tsc (cần type do Next sinh: chạy `npx next typegen` trước trên bản clone sạch)
npm test           # unit test cho lib và mock (node --test)
```

## Trang

| Route | File | Bản gốc |
|---|---|---|
| `/` | `src/app/page.tsx` | `page/Home.tsx` |
| `/tin-tuc` | `src/app/tin-tuc/page.tsx` | `page/Tintuc.tsx` + `tintuc/Contents.tsx` |
| `/tin-tuc/danh-muc/{slug-chuyên-mục}` | `src/app/tin-tuc/danh-muc/[category]/page.tsx` | (tab chuyên mục của `Contents.tsx`) |
| `/tin-tuc/{slug-bài}` | `src/app/tin-tuc/[slug]/page.tsx` | `tintuc/Detail.tsx` |
| `/bang-xep-hang` | `src/app/bang-xep-hang/page.tsx` | `page/Rank.tsx` (route gốc `/rank`) |

Phân trang: `?page=N` (trang 1 không ghi, 8 tin mỗi trang). Slug chuyên mục mock: `tin-tuc-13`, `tan-thu`, `su-kien-7`.
Mỗi trang gồm: `SiteChrome` (header + menu mobile, side menu, nút BXH, nhãn 18+ — nằm ngoài khung scale) và `ScaleLayout`
chứa banner (`hero` / `news-banner` / `ranking-banner`), nội dung trang, `SiteFooter` (dải `footer-nav` + footer Vplay).
Trang chủ có section `announcement` (banner-slider, khung tải game, tab tin, 4 nút nhanh, gallery-slider coverflow).

**Không nằm trong template**: các trang landing `/choigame1..5` (`LandingH5`), popup trailer `VideoTrailer` (bản gốc tắt),
đăng nhập OIDC (`Callback`, `AuthProvider`), `DynamicMetadata`.

## Chuyển mock sang API thật

Chỉ đổi cấu hình, không sửa code:

1. Copy `.env.example` thành `.env.local` (chỉ để đối chiếu với live, không dùng khi giao template).
2. Đặt `NEXT_PUBLIC_API_MODE=real` (`GAMEHUBID=35` là ID game T029).
3. Khởi động lại `npm run dev` / build lại.

```
Component -> hook useAsyncData -> getSdk()            src/lib/sdk-client.ts
          -> VTVLiveWebSDK (site/news/slides/ranking)  src/lib/vtvlive-sdk
          -> fetch()
               mock: tới chính origin của site  -> src/app/(mock-api)/**/route.ts
               real: tới host thật của VTVLive   (vplay.vn, game-services-api.vplay.vn)
```

Source gốc gọi API bằng axios + Redux thunk (`src/services/index.ts`); template gom các lời gọi đó vào SDK, giữ nguyên endpoint và tham số.

| Lời gọi SDK | Endpoint | Mock data |
|---|---|---|
| `sdk.site.getConfig()` | `GET /website-api/api/frontend/config` | `src/mocks/data/site-config.ts` |
| `sdk.news.getHomeCategories()` | `GET /website-api/api/frontend/home-categories` | `categories.ts` + `posts.ts` |
| `sdk.news.getPosts()` | `GET /website-api/api/frontend/posts` | `src/mocks/data/posts.ts` |
| `sdk.news.getPost(slugOrId)` | `GET /website-api/api/frontend/posts/{slugOrId}` | `posts.ts` + `post-content.ts` |
| `sdk.slides.getSlides()` | `GET /website-api/api/frontend/slides` | `src/mocks/data/slides.ts` |
| `sdk.ranking.getRanking({ mode, scope })` | `GET /api/Ranking/GetRanking` | `src/mocks/data/ranking.ts` |

Khi `API_MODE=real`, mọi route mock trả 404. Tham số route mock: `posts` nhận `category_id`, `limit` (mặc định 100),
`page`; `GetRanking` nhận `scope` (`all` | `area`). Dữ liệu mock (theo STANDARD 4.1): mỗi chuyên mục ≥ 24 bài
(5 bài thật của live + bài sinh tất định, nhãn HOT/NEW/không nhãn, có tiêu đề dài), mỗi tab BXH 100 dòng với id duy nhất;
`src/mocks/mock-data.test.ts` kiểm tra. Template chỉ chạy mock (`.env` và `.env.example` đều `NEXT_PUBLIC_API_MODE=mock`); khi chạy mock,
request ra ngoài chỉ gồm font Google (do next/font tải lúc build/dev), video hero và 5 ảnh gallery trên CDN `website-assets-cdn.vtvlive.vn`,
script/ảnh footer Vplay, và link ngoài.

## Cấu trúc thư mục

```
src/
├── app/                      Route (trang) + globals.css + route mock API
│   ├── page.tsx              Trang chủ
│   ├── tin-tuc/              Danh sách tin, danh-muc/[category], chi tiết tin ([slug])
│   ├── bang-xep-hang/        Trang bảng xếp hạng
│   └── (mock-api)/           Route handler giả lập API thật
├── components/
│   ├── layout/               SiteChrome, MobileNavigation, SideMenu, SectionNav, LogoAge, FooterNav, SiteFooter, ScaleLayout, NewsPageFrame
│   ├── sections/home/        HeroSection, announcement/ (section + 5 block)
│   ├── sections/news/        NewsBannerSection, NewsListSection, NewsDetailSection, NewsContentShell
│   ├── sections/ranking/     RankingBannerSection, RankingSection, RankingTableBlock
│   └── ui/                   SiteLink, ShineImage, ClientOnly, Pagination
├── config/                   api.config.ts (kết nối dữ liệu) · site.config.ts (thông tin site)
├── content/                  Nội dung tĩnh: menu mobile (+ icon), dải footer-nav, 5 ảnh gallery
├── hooks/                    useAsyncData, useViewport, useScrollToOnReady
├── lib/                      vtvlive-sdk, sdk-client, format, urls, device, sanitize-html
├── mocks/                    Dữ liệu mock + hàm truy vấn + helper tạo Response
├── providers/                SiteConfigProvider (link động từ API config)
└── styles/                   cms-content.css · scale-layout.css · gallery-slider.css
public/assets/                Ảnh — đã đổi tên theo quy ước (docs/ASSET-MAP.md)
docs/                         NAMING.md (quy ước) · ASSET-MAP.md (ánh xạ asset gốc -> mới)
```

## Hệ đơn vị thiết kế (đọc trước khi sửa giao diện)

Site dựng nội dung bằng **px trên một khung rộng cố định** rồi phóng/thu cả khung bằng `transform: scale()`
(`components/layout/ScaleLayout.tsx`, CSS ở `src/styles/scale-layout.css`):

| Màn hình | Khung dựng | Tỉ lệ scale |
|---|---|---|
| ≤ 768px | 768px | `vw / 768` |
| 769px – 1920px | 1920px | `vw / 1920` |
| > 1920px | 2560px | `vw / 2560` |

- `--spacing: 1px`: trong ScaleLayout class đọc thẳng ra px thiết kế (`w-500` = 500px). **Khác bản gốc**: bản gốc dùng thang
  mặc định của Tailwind (1 đơn vị = 4px, `w-125`); mọi số trong class đã nhân 4 khi port.
- Cỡ chữ: `fs-18` = 18px, chiều cao dòng `lh-28` (thay `text-lg` = 18px/28px).
- Variant: `mb` (≤ 768px) · `pc` (≥ 769px) · `wide` (≥ 1921px, chưa dùng) · `header-compact` (≥ 640px, logo header mobile thu nhỏ).
  Utility `float-scale` thu nhỏ side menu và nút BXH theo mốc 769px (0.65) và 1024px trở lên (0.85; bản gốc khai báo `xl:scale-100` ở 1920px nhưng live không áp dụng được nên giữ 0.85).
- Trang cuộn trong `#scaleWrapper`, không cuộn trên `body`.
- Thành phần **ngoài** ScaleLayout (`SiteChrome`: header mobile, menu trượt, side menu, nút BXH, nhãn 18+) dùng px thật như bản gốc.

Chi tiết quy ước: [docs/NAMING.md](docs/NAMING.md).

## Dùng làm template cho game khác

1. Copy cả thư mục này sang thư mục site mới (mỗi site một thư mục riêng).
2. `.env`: đổi `GAMEHUBID`, `NEXT_PUBLIC_SDK_CLIENT_ID`, `APP_URL`, GTM.
3. `src/config/site.config.ts`: tên game, meta SEO, video hero, giấy phép footer.
4. `src/content/*`: menu, dải footer, ảnh gallery.
5. `public/assets/**`: thay ảnh **giữ nguyên tên file và kích thước** thì không phải sửa code.
6. `src/mocks/data/*`: dữ liệu demo.

## Khác biệt có chủ đích so với bản gốc

- **Tab chuyên mục trang tin**: bản gốc đổi tab bằng state Redux (URL không đổi); template dùng link tới `/tin-tuc/danh-muc/{slug}` (theo quy chuẩn), giao diện giữ nguyên. Breadcrumb ở chi tiết trỏ về chuyên mục của bài (bản gốc trỏ `/tintuc`).
- **Route**: `/tintuc` → `/tin-tuc`, `/rank` → `/bang-xep-hang`; không redirect từ route cũ. Link "BXH" ở menu mobile và nút nổi trỏ tới `/bang-xep-hang`.
- Nút "play" vô hình (button trống, không có hành vi) trên banner không được port; popup `VideoTrailer` (bản gốc đã tắt) bỏ.
- HTML bài viết được làm sạch bằng DOMPurify; link từ API config bị chặn nếu là `javascript:`/`data:`.
- Bỏ Redux, axios, react-router, dayjs, js-cookie, md5: dữ liệu đi qua SDK + hook `useAsyncData`; ngày giờ định dạng bằng `lib/format.ts` (`dd-MM-yyyy HH:mm`, cùng kết quả).
- Các slider Swiper chỉ render trên trình duyệt (`ClientOnly`); `BannerSliderBlock` gọi `swiper.update()` khi khung đổi kích thước (phòng ngừa, không làm lệch hiển thị).
- Bảng xếp hạng: key hàng theo hạng (vị trí), vì `id` nhân vật có thể trùng; khi đổi tab, bảng trống trong lúc chờ dữ liệu mới (bản gốc giữ bảng cũ tới khi có dữ liệu).
- GTM tắt mặc định ở chế độ mock; font Inter nạp bằng `next/font` (gọi thẳng tên font để không chèn font dự phòng).

## Khác quy chuẩn chung

- **Có trang `/bang-xep-hang`** (STANDARD mục 1 cho phép khi site có trang riêng) với `data-page="ranking"`, section `ranking`, thêm tên `ranking-banner` (Phụ lục A).
- **`SectionNav`** là nút nổi dẫn sang trang `/bang-xep-hang` (không nhảy section); `SideMenu` và `SectionNav` hiện ở **mọi** trang (không chỉ trang chủ).
- **`SiteChrome`** gom các lớp cố định lặp ở từng page; `isNavFirst` giữ đúng thứ tự DOM của bản gốc.
- **Không có** `TopNav`, `SectionNav` kiểu chấm/mũi tên, `VideoModal`, `characters`, `features`: site không có các khối này.
- Block `gallery-slider` dùng cho slider coverflow 5 ảnh gắn cứng trên CDN (không phải ảnh từ API).
- Ảnh nền desktop của section `announcement` và các trang tin dùng chung một file (`common/bg-news.png`).
- `ScaleLayout` dùng khung cơ sở 1920 (bản gốc `vw / 1920`), khác T037 (1912).

## Lưu ý bảo mật về source gốc

Source gốc đọc `VITE_APP_CLIENT_SECRET` (OIDC) từ `.env` trong `utils/constant.ts` và gửi trong `getCallBack`
(`services/index.ts`) — secret nằm trong bundle phía trình duyệt. Template **không chép** secret hay luồng đăng nhập;
`NEXT_PUBLIC_SDK_CLIENT_ID` là client id công khai. Nên báo đội phụ trách xoay secret của T029 nếu từng bị lộ.
