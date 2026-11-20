import { ScaleLayout } from "@/components/layout/ScaleLayout";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RankingBannerSection } from "@/components/sections/ranking/RankingBannerSection";
import { RankingSection } from "@/components/sections/ranking/RankingSection";
import { RANKING_PATH } from "@/lib/urls";

/**
 * PAGE: BẢNG XẾP HẠNG — route "/bang-xep-hang" (bản gốc: `page/Rank.tsx`, route `/rank`).
 * Banner + bảng xếp hạng lực chiến (2 tab) + footer, trong ScaleLayout.
 */
export default function RankingPage() {
  return (
    <div data-page="ranking">
      <SiteChrome currentPath={RANKING_PATH} isNavFirst />
      <ScaleLayout>
        <RankingBannerSection />
        <RankingSection />
        <SiteFooter />
      </ScaleLayout>
    </div>
  );
}
