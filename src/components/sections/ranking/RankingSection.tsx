"use client";

import { useState } from "react";

import { RANKING_MODE } from "@/config/api.config";
import { useAsyncData } from "@/hooks/useAsyncData";
import { useViewport } from "@/hooks/useViewport";
import { getSdk } from "@/lib/sdk-client";

import { RankingTableBlock } from "./RankingTableBlock";

/**
 * SECTION/RANKING/RankingSection — trang bảng xếp hạng (bản gốc: `components/home/Rank.tsx`, `id="rank"`).
 * Route: /bang-xep-hang (bản gốc: /rank).
 *
 * Block:
 *   - ranking-tabs : 2 tab ảnh "BXH All Server" (scope all) và "BXH Cụm Server" (scope area); tab chưa chọn mờ đi
 *   - ranking-board: khung ảnh (chỉ desktop) bao bảng
 *   - ranking-table: bảng xếp hạng cuộn dọc (RankingTableBlock)
 * Desktop (> 768px) và mobile (<= 768px) là hai bố cục riêng, chọn bằng useViewport (như bản gốc).
 *
 * Dữ liệu: sdk.ranking.getRanking({ mode: "user", scope }) — nạp khi mở trang và mỗi lần đổi tab.
 */

const ASSET_DIR = "/assets/images/ranking";

const TABS = [
  { scope: "all", image: "btn-tab-all.png", name: "BXH All Server" },
  { scope: "area", image: "btn-tab-area.png", name: "BXH Cụm Server" },
] as const;

export function RankingSection() {
  const { isDesktop } = useViewport();
  const [activeTab, setActiveTab] = useState(0);

  const { data } = useAsyncData(`ranking:${TABS[activeTab].scope}`, () =>
    getSdk().ranking.getRanking({ mode: RANKING_MODE, scope: TABS[activeTab].scope }),
  );
  const entries = data ?? [];

  const tabs = (
    <div
      data-block="ranking-tabs"
      className={`relative z-10 flex ${isDesktop ? "gap-24" : "gap-16"}`}
    >
      {TABS.map((tab, index) => (
        <div
          key={tab.scope}
          className={`relative flex cursor-pointer flex-col items-center ${
            activeTab === index ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => setActiveTab(index)}
        >
          <img data-edit-id="ranking-section.data-image" data-edit-mode="scale" data-edit-source="api"
            src={`${ASSET_DIR}/${tab.image}`}
            className={`object-contain ${isDesktop ? "w-360" : "w-320"} ${
              isDesktop && activeTab !== index ? "opacity-50" : ""
            }`}
            alt={tab.name}
          />
        </div>
      ))}
    </div>
  );

  return (
    <section id="section-ranking" data-section="ranking" className="relative">
      <picture>
        <source media="(max-width: 768px)" srcSet={`${ASSET_DIR}/bg-ranking--mb.png`} />
        <source media="(min-width: 769px)" srcSet={`${ASSET_DIR}/bg-ranking.png`} />
        <img data-edit-id="ranking-section.bg-ranking--mb" data-edit-mode="scale" src={`${ASSET_DIR}/bg-ranking.png`} className="w-full object-contain" alt="banner" />
      </picture>

      {isDesktop ? (
        <>
          <div data-edit-id="ranking-section.title-ranking" className="absolute top-40 left-1/2 z-10 -translate-x-1/2">
            <img
              data-element="section-title"
              src={`${ASSET_DIR}/title-ranking.png`}
              className="aspect-467/82 w-full object-contain"
              alt=""
            />
          </div>
          <div className="absolute top-120 flex w-full items-center justify-center">
            <img data-edit-id="ranking-section.frame-ranking-board"
              data-block="ranking-board"
              src={`${ASSET_DIR}/frame-ranking-board.png`}
              className="absolute -top-75 h-837 w-1205"
              alt=""
            />
            <div className="relative top-35 -left-16 flex h-650 w-852 flex-col items-center justify-center">
              {tabs}
              <div className="scrollbar-ranking mt-20 h-837 w-936 overflow-auto px-12">
                <RankingTableBlock entries={entries} variant="desktop" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div data-edit-id="ranking-section.title-ranking--mb" className="absolute top-40 left-1/2 z-10 -translate-x-1/2">
            <img
              data-element="section-title"
              src={`${ASSET_DIR}/title-ranking--mb.png`}
              className="aspect-467/82 w-full object-contain"
              alt=""
            />
          </div>
          <div className="absolute top-120 flex w-full flex-col items-center justify-center">
            {tabs}
            <div className="relative top-30 flex h-full w-[98%] flex-col items-center justify-center">
              <div className="scrollbar-ranking h-850 w-full overflow-auto px-12">
                <RankingTableBlock entries={entries} variant="mobile" />
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
