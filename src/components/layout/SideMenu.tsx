"use client";

import { ShineImage } from "@/components/ui/ShineImage";
import { SiteLink, type SiteLinkKey } from "@/components/ui/SiteLink";
import { toSafeUrl } from "@/lib/urls";
import { useSiteConfig } from "@/providers/SiteConfigProvider";

/**
 * LAYOUT/SideMenu — bảng nổi cố định bên phải, CHỈ desktop (>= 769px), có ở mọi trang.
 * Bản gốc: `layout/FloatHome.tsx`.
 *
 * Nằm NGOÀI ScaleLayout: dựng bằng px thật rồi thu nhỏ theo từng mốc màn hình
 * bằng class `float-scale` (globals.css).
 *
 * Element (từ trên xuống): ảnh QR (từ API config), 4 nút tải (iOS, Android, APK, PC),
 * fanpage, group, nút Nạp có vệt sáng.
 */

const ASSET_DIR = "/assets/images/layout/side-menu";
/** Ảnh dùng khi API config chưa có `qrcode_img_link`. */
const FALLBACK_QR = "/assets/images/common/logo-game.png";

interface SideMenuButton {
  linkKey: SiteLinkKey;
  image: string;
  width: number;
  height: number;
  /** Class của thẻ <a> (khoảng cách riêng từng nút). */
  className: string;
  hasComingSoonAlert?: boolean;
  isNewTab?: boolean;
}

const BUTTONS: SideMenuButton[] = [
  { linkKey: "downloadIosLink", image: "btn-appstore.png", width: 122, height: 38, className: "relative right-px mt-4", hasComingSoonAlert: true, isNewTab: true },
  { linkKey: "downloadAndroidLink", image: "btn-googleplay.png", width: 123, height: 38, className: "relative right-px", hasComingSoonAlert: true, isNewTab: true },
  { linkKey: "downloadApkLink", image: "btn-apk.png", width: 123, height: 38, className: "relative right-px", hasComingSoonAlert: true, isNewTab: true },
  { linkKey: "downloadPcLink", image: "btn-pc.png", width: 123, height: 38, className: "relative right-px", hasComingSoonAlert: true, isNewTab: true },
  { linkKey: "fbPageLink", image: "btn-fanpage.png", width: 124, height: 39, className: "relative right-px mt-10" },
  { linkKey: "fbGroupLink", image: "btn-group.png", width: 124, height: 39, className: "relative right-px mt-4", isNewTab: true },
];

export function SideMenu() {
  const config = useSiteConfig();
  const qrImage = config?.qrcodeImgLink ? toSafeUrl(config.qrcodeImgLink) : FALLBACK_QR;

  return (
    <aside data-edit-id="side-menu.bg-side-menu"
      data-block="side-menu"
      className="float-scale fixed top-1/2 right-0 z-20 hidden origin-top-right -translate-y-1/2 pc:block"
    >
      <div className="relative right-4 w-max">
        {/* Khung nền quyết định kích thước bảng */}
        <img
          className="relative z-20 aspect-168/743 object-contain"
          src={`${ASSET_DIR}/bg-side-menu.png`}
          width={168}
          height={743}
          alt=""
        />

        <div data-edit-id="side-menu.btn-payment" className="absolute top-100 left-[50%] z-20 flex h-full w-full -translate-x-1/2 flex-col items-center gap-y-8">
          <img data-edit-id="side-menu.data-qr-image" data-edit-mode="scale" data-edit-source="api"
            className="relative aspect-100/100 object-contain"
            src={qrImage}
            width={100}
            height={100}
            alt="QR"
          />

          {BUTTONS.map((button) => (
            <SiteLink
              key={button.image}
              linkKey={button.linkKey}
              hasComingSoonAlert={button.hasComingSoonAlert}
              target={button.isNewTab ? "_blank" : undefined}
              className={button.className}
            >
              <img data-edit-id="side-menu.data-image" data-edit-mode="scale" data-edit-source="api"
                className="object-contain"
                style={{ aspectRatio: `${button.width}/${button.height}` }}
                src={`${ASSET_DIR}/${button.image}`}
                width={button.width}
                height={button.height}
                alt=""
              />
            </SiteLink>
          ))}

          <SiteLink linkKey="pagePaymentUrl" target="_blank" className="relative mt-8">
            <ShineImage
              className="aspect-150/49 object-contain"
              src={`${ASSET_DIR}/btn-payment.png`}
              width={150}
              height={49}
              alt=""
            />
          </SiteLink>
        </div>
      </div>
    </aside>
  );
}
