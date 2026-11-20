import type { RawSiteConfig } from "@/lib/vtvlive-sdk/index";

/**
 * MOCK DATA — cấu hình site.
 * Khớp `data` của GET /website-api/api/frontend/config?game_id=&language_name=
 *
 * Đây là nguồn của mọi link động trên site (fanpage, nạp, tải game...) và logo / ảnh QR.
 * Ảnh trỏ về file local để site không phụ thuộc CDN. Giá trị lấy từ API thật của game
 * (link công khai), bỏ tham số theo dõi `fbclid`.
 */
export const MOCK_SITE_CONFIG: RawSiteConfig = {
  site_name: "Phượng Hoàng Tru Tiên",
  site_logo_url: "/assets/images/mock/config/site-logo.png",
  home_meta_title: "Phượng Hoàng Tru Tiên",
  home_meta_desc: "Phượng Hoàng Tru Tiên - Nhập Vai Huyền Thoại Tái Sinh",
  home_meta_keywords: "tru,tien,phuong,hoang,tien,hiep,mmo,idle,tu,tiên,nhập,vai,giang,ho,afk,cày,chay",
  share_title: "Phượng Hoàng Tru Tiên - Nhập Vai Huyền Thoại Tái Sinh",
  share_desc: "Phượng Hoàng Tru Tiên - Nhập Vai Huyền Thoại Tái Sinh",
  share_thumb: "Vplay",
  ga_code: "",
  google_site_verification: "",
  fb_page_id: "",
  fb_page_link: "https://www.facebook.com/phuonghoangtrutien/",
  fb_group_link: "https://www.facebook.com/groups/phuonghoangtrutien.vplay/",
  page_event_url: "",
  page_support_url: "https://hotrovplay.onlive.vn",
  page_payment_url: "https://nap.onlive.vn",
  page_giftcode_url: "https://giftcode.onlive.vn",
  intro_youtube_embed_link: "https://youtube.com/%40phuonghoangtrutien-vplay",
  download_ios_link: "https://phuonghoangtt.vplay.vn/riA8/trangchu",
  download_android_link: "https://phuonghoangtt.vplay.vn/riA8/trangchu",
  download_apk_link: "http://download.vplay.vn/phuonghoangtrutien/PhuongHoangTruTien08272026.apk",
  download_pc_link: "https://phuonghoangtt.vplay.vn/riA8/trangchu",
  qrcode_img_link: "/assets/images/mock/config/img-qrcode.png",
  custom_config: "",
  fp_page_link: "https://www.facebook.com/share/p/18vKjbHoA7/",
  landing_early_vote: "https://www.facebook.com/share/p/1BWFccECaV/",
  landing_early_like: "https://www.facebook.com/phuonghoangtrutien/posts/pfbid0S53MfC9VKVBKJq7Zh6bMsRKez44rrsZTC1EJTBPeg6iByBwnXvjtPG4EEJgiU3cul",
  landing_early_share: "https://www.facebook.com/phuonghoangtrutien/posts/pfbid0W2VUvzqyprvQAUmptMaBfKU2BXkNSzQtirbcrz5QAiM9nVGhfzNgXZ3tvyLVMu7fl",
  landing_early_join: "https://www.facebook.com/phuonghoangtrutien/posts/pfbid02HhGp3GYgfQeAfNrYTfQjCVqpDyASoauDHceMt4ZfatfiC1g8eSsdkEpdrRV4zzjrl",
  tiktok_link: "https://tiktok.com/@phuonghoangtrutienvplay",
  landingvip_download_link: "https://phuonghoangtrutien.onelink.me/riA8/LANDINGVIP",
  user_server_area: "3601-3801",
};
