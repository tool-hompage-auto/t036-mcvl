import { LogoAge } from "./LogoAge";
import { MobileNavigation } from "./MobileNavigation";
import { SectionNav } from "./SectionNav";
import { SideMenu } from "./SideMenu";

/**
 * LAYOUT/SiteChrome — các lớp cố định nằm NGOÀI ScaleLayout, có mặt ở mọi trang
 * (bản gốc: bộ `HeaderHome` + `FloatHome` + `Logo18` + `FloatBxh` lặp lại trong từng page):
 *   mobile-header + mobile-menu (mobile) · side-menu, section-nav (desktop) · logo-age.
 * `isNavFirst`: thứ tự DOM của nút BXH (bản gốc: trang chủ đặt nút BXH cuối, các trang còn lại đặt ngay sau header).
 */
export function SiteChrome({ currentPath, isNavFirst = false }: { currentPath: string; isNavFirst?: boolean }) {
  return (
    <>
      <MobileNavigation currentPath={currentPath} />
      {isNavFirst && <SectionNav />}
      <SideMenu />
      {!isNavFirst && <LogoAge />}
      {isNavFirst && <LogoAge />}
      {!isNavFirst && <SectionNav />}
    </>
  );
}
