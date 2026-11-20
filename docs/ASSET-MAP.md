# Bảng ánh xạ asset: source gốc -> template

Cột trái là đường dẫn trong repo gốc (`_sources/t029-home-page/public/assets/...`, viết tắt `…/`), cột phải là đường dẫn
trong template (`public/assets/images/...`, viết tắt `…/`). Chỉ các file mà trang chủ, trang tin, chi tiết tin và
trang bảng xếp hạng thực sự dùng mới được chép sang. Quy ước đặt tên: xem [NAMING.md](NAMING.md).

| File gốc | File trong template |
|---|---|
| `public/favicon/favicon.ico` | `public/favicon.ico` |
| `public/favicon/apple-touch-icon.png` | `public/favicon.png` |
| `…/header/logo-game.png` (trùng `home/news/1920/icon-app.png`) | `…/common/logo-game.png` |
| `…/home/banner/1920/logo-18.png` | `…/common/logo-age.png` |
| `…/home/news/1920/banner.png` (trùng `tintuc/1920/banner_trang2.png`) | `…/common/bg-news.png` |
| `…/header/btn-download.png` | `…/layout/mobile-header/btn-download.png` |
| `…/float-home/float-right.png` | `…/layout/side-menu/bg-side-menu.png` |
| `…/float-home/btn-store.png` | `…/layout/side-menu/btn-appstore.png` |
| `…/float-home/btn-ggplay.png` | `…/layout/side-menu/btn-googleplay.png` |
| `…/float-home/btn-apk.png` | `…/layout/side-menu/btn-apk.png` |
| `…/float-home/btn-pc.png` | `…/layout/side-menu/btn-pc.png` |
| `…/float-home/btn-fanpage.png` | `…/layout/side-menu/btn-fanpage.png` |
| `…/float-home/btn-group.png` | `…/layout/side-menu/btn-group.png` |
| `…/float-home/nap.png` | `…/layout/side-menu/btn-payment.png` |
| `…/float-home/btn-bxh.png` | `…/layout/section-nav/btn-ranking.png` |
| `…/home/banner/768/banner.jpg` | `…/home/hero/bg-hero--mb.jpg` |
| `…/home/banner/logo-game.png` | `…/home/hero/logo-game.png` |
| `…/home/news/768/banner.png` | `…/home/announcement/bg-announcement--mb.png` |
| `…/home/news/1920/frame.png` | `…/home/announcement/frame-announcement.png` |
| `…/home/news/1920/frame-middle.png` | `…/home/announcement/frame-download.png` |
| `…/home/news/1920/frame-right.png` | `…/home/announcement/frame-news-tabs.png` |
| `…/home/news/768/frame-right.png` | `…/home/announcement/frame-news-tabs--mb.png` |
| `…/home/news/1920/ios.png` · `android.png` · `apk.png` · `pc.png` | `…/home/announcement/btn-ios.png` · `btn-android.png` · `btn-apk.png` · `btn-pc.png` |
| `…/home/news/1920/btn-nap.png` · `btn-giftcode.png` · `btn-fanpage.png` · `btn-cskh.png` | `…/home/announcement/btn-payment.png` · `btn-giftcode.png` · `btn-fanpage.png` · `btn-support.png` |
| `…/home/news/768/btn-nap.png` · `btn-giftcode.png` · `btn-fanpage.png` · `btn-cskh.png` | `…/home/announcement/btn-payment--mb.png` · `btn-giftcode--mb.png` · `btn-fanpage--mb.png` · `btn-support--mb.png` |
| `…/home/news/1920/btn-prev.png` · `btn-next.png` | `…/home/announcement/btn-slider-prev.png` · `btn-slider-next.png` |
| `…/tintuc/768/banner_trang2.png` | `…/news/bg-news--mb.png` |
| `…/tintuc/1920/frame-tab-content.png` · `768/…` | `…/news/frame-news-list.png` · `frame-news-list--mb.png` |
| `…/tintuc/1920/frame-tab-detail.png` · `768/…` | `…/news/frame-news-detail.png` · `frame-news-detail--mb.png` |
| `…/tintuc/1920/chevrons-left.png` · `chevrons-right.png` | `…/news/icon-chevron-left.png` · `icon-chevron-right.png` |
| `…/rank/1920/bg-rank.png` · `768/bg-rank.png` | `…/ranking/bg-ranking.png` · `bg-ranking--mb.png` |
| `…/rank/1920/title-rank.png` · `768/title-rank.png` | `…/ranking/title-ranking.png` · `title-ranking--mb.png` |
| `…/home/rank/1920/bg-rank.png` | `…/ranking/frame-ranking-board.png` |
| `…/home/rank/all.png` · `custom.png` | `…/ranking/btn-tab-all.png` · `btn-tab-area.png` |
| `…/home/rank/top1.png` · `top2.png` · `top3.png` | `…/ranking/icon-rank-1.png` · `icon-rank-2.png` · `icon-rank-3.png` |

## Asset chỉ dùng cho dữ liệu mock (`…/mock/`)

Tải một lần từ API/CDN thật của game để mock giống live; không có trong source gốc.

| Nguồn | File trong template |
|---|---|
| ảnh 3 slide của `GET /slides` | `…/mock/slides/slide-01.png` · `slide-02.png` · `slide-03.png` |
| `site_logo_url` của `GET /config` | `…/mock/config/site-logo.png` |
| `qrcode_img_link` của `GET /config` | `…/mock/config/img-qrcode.png` |
| (bản sao slide, ảnh trong nội dung bài mock) | `…/mock/posts/post-cover-01.png` · `02` · `03` |

## Không chép sang

`home/banner/1920/banner.png`, `text-game.png`, `768/text-game.png`, `home/footer/1920/logo.png`, `home/news/1920/slide.png`, `note.png`,
`float-home/float-bg.png`, `qr-code.png`, `tintuc/apple-touch-icon.png`, `public/favicon/*` (ngoài hai file trên), `vite.svg` — không được component nào dùng.

## Giữ nguyên trên CDN

Video nền hero (`website_assets/t029/homepage/homepage.mp4`), 5 ảnh gallery (`website_assets/t029/slide-1..5.jpg`),
ảnh chia sẻ (`homepage/poster.png`) — như bản gốc.
