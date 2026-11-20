"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

import { ShineImage } from "@/components/ui/ShineImage";
import { SiteLink, type SiteLinkKey } from "@/components/ui/SiteLink";
import { SITE } from "@/config/site.config";
import { MOBILE_MENU_ITEMS, type MobileMenuItem } from "@/content/navigation";
import { MENU_ICONS } from "@/content/mobile-menu-icons";
import { getDeviceOs } from "@/lib/device";
import { HOME_PATH } from "@/lib/urls";

/**
 * LAYOUT/MobileNavigation — thanh header + menu trượt, CHỈ hiện ở mobile (< 769px).
 * Bản gốc: `layout/HeaderHome.tsx`.
 *
 * Nằm NGOÀI ScaleLayout nên kích thước là px thật (không phải px thiết kế).
 *
 * Block:
 *   - mobile-header: logo game, tên game, nút tải (link theo thiết bị), nút mở menu
 *   - mobile-menu  : lớp phủ mờ + bảng menu trượt từ phải
 */

const LOGO_SRC = "/assets/images/common/logo-game.png";

const MENU_LINK_CLASS = "flex gap-8 border-b border-b-[#818181] py-24";

/** Link tải game theo hệ điều hành: Android -> Google Play, iOS -> App Store, còn lại -> APK. */
function useDownloadLinkKey(): SiteLinkKey {
  const deviceOs = useSyncExternalStore(
    () => () => {},
    getDeviceOs,
    () => "PC" as const,
  );
  if (deviceOs === "ADR") return "downloadAndroidLink";
  if (deviceOs === "IOS") return "downloadIosLink";
  return "downloadApkLink";
}

interface MobileNavigationProps {
  /** Đường dẫn trang đang hiển thị (vd: HOME_PATH), dùng để tô màu mục menu tương ứng. */
  currentPath: string;
}

export function MobileNavigation({ currentPath }: MobileNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const downloadLinkKey = useDownloadLinkKey();
  const toggleMenu = () => setIsMenuOpen((isOpen) => !isOpen);

  return (
    <>
      {/* ===== Block: mobile-header ===== */}
      <section data-block="mobile-header" className="block h-120 bg-crimson pc:hidden">
        <div className="mx-auto flex h-full max-w-644 items-center justify-between gap-x-4 px-20">
          <div className="flex items-center gap-12">
            <Link href={HOME_PATH} className="relative">
              <ShineImage
                className="aspect-96/96 h-96 w-96 object-contain header-compact:h-70 header-compact:w-70"
                src={LOGO_SRC}
                alt="Icon logo"
              />
            </Link>
            <h1 className="inline-block w-110 fs-16 text-white">{SITE.name}</h1>
          </div>

          <div className="flex items-center gap-x-8">
            <SiteLink
              linkKey={downloadLinkKey}
              hasComingSoonAlert
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-block w-135"
            >
              <img data-edit-id="mobile-navigation.mobile-header.btn-download" data-edit-mode="scale"
                className="aspect-220/70"
                src="/assets/images/layout/mobile-header/btn-download.png"
                alt="download"
              />
            </SiteLink>

            <button
              type="button"
              aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
              className={`btn-mobile-menu aspect-35/26 ${isMenuOpen ? "active" : ""}`}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </section>

      {/* ===== Block: mobile-menu ===== */}
      {/* Lớp phủ mờ: bấm để đóng */}
      <div
        data-element="mobile-menu-overlay"
        onClick={toggleMenu}
        className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      <section data-edit-id="mobile-navigation.data-logo-src" data-edit-source="api"
        data-block="mobile-menu"
        className={`fixed top-0 right-0 z-40 h-full w-[70%] overflow-y-auto bg-[#000000E5] px-24 transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="absolute top-20 right-20" onClick={toggleMenu}>
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
            <path
              d="M21.5 1.5L1.5 21.5M1.5 1.5L21.5 21.5"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="mt-60 flex flex-col fs-24 lh-32 font-semibold tracking-wider text-white">
          <div className="mx-auto flex">
            <img
              className="aspect-120/120 h-120 w-120 object-contain"
              src={LOGO_SRC}
              alt="Logo"
            />
          </div>

          {MOBILE_MENU_ITEMS.map((item) => (
            <MobileMenuLink
              key={item.label}
              item={item}
              isActive={item.activePath === currentPath}
            />
          ))}
        </div>
      </section>
    </>
  );
}

/** Element: một dòng trong menu mobile (icon SVG + nhãn). */
function MobileMenuLink({
  item,
  isActive,
}: {
  item: MobileMenuItem;
  isActive: boolean;
}) {
  const icon = MENU_ICONS[item.icon];
  const className = `${MENU_LINK_CLASS} ${item.isIconCentered ? "items-center" : ""}`;
  const content = (
    <>
      <svg width={icon.width} height={icon.height} viewBox={icon.viewBox} fill="none">
        {icon.paths.map((path) => (
          <path key={path} d={path} fill={isActive ? "#faea05" : "white"} />
        ))}
      </svg>
      <span className={isActive ? "text-gold" : undefined}>{item.label}</span>
    </>
  );

  if (item.linkKey) {
    return (
      <SiteLink linkKey={item.linkKey} className={className}>
        {content}
      </SiteLink>
    );
  }
  return (
    <Link href={item.href ?? HOME_PATH} className={className}>
      {content}
    </Link>
  );
}
