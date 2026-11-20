import { SiteLink, type SiteLinkKey } from "@/components/ui/SiteLink";

/**
 * BLOCK/announcement/QuickLinksBlock — 4 nút nhanh: Nạp · Giftcode · Fanpage · CSKH
 * (bản gốc: `news/NewsActionButtons.tsx`). Link lấy từ API config.
 * Desktop: một hàng ngang (ảnh 325px); mobile: lưới 2 hàng, ảnh dãn theo ô.
 */

const ASSET_DIR = "/assets/images/home/announcement";

const BUTTONS: ReadonlyArray<{ linkKey: SiteLinkKey; image: string; alt: string }> = [
  { linkKey: "pagePaymentUrl", image: "btn-payment", alt: "Nạp" },
  { linkKey: "pageGiftcodeUrl", image: "btn-giftcode", alt: "Giftcode" },
  { linkKey: "fbPageLink", image: "btn-fanpage", alt: "Fanpage" },
  { linkKey: "pageSupportUrl", image: "btn-support", alt: "CSKH" },
];

export function QuickLinksBlock({ variant }: { variant: "desktop" | "mobile" }) {
  if (variant === "desktop") {
    return (
      <div data-block="quick-links" className="relative flex items-center gap-48">
        {BUTTONS.map((button) => (
          <SiteLink
            key={button.image}
            linkKey={button.linkKey}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img data-edit-id="quick-links-block.data-image" data-edit-mode="scale" data-edit-source="api"
              className="aspect-325/160 min-w-325 object-contain"
              src={`${ASSET_DIR}/${button.image}.png`}
              alt={button.alt}
              loading="lazy"
            />
          </SiteLink>
        ))}
      </div>
    );
  }

  return (
    <div
      data-block="quick-links"
      className="mx-64 flex flex-wrap items-center justify-between *:mb-8"
    >
      {BUTTONS.map((button) => (
        <SiteLink
          key={button.image}
          linkKey={button.linkKey}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img data-edit-id="quick-links-block.data-image~2" data-edit-mode="scale" data-edit-source="api"
            className="aspect-316/155 w-full object-contain"
            src={`${ASSET_DIR}/${button.image}--mb.png`}
            alt={button.alt}
            loading="lazy"
          />
        </SiteLink>
      ))}
    </div>
  );
}
