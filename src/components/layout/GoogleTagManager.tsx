import Script from "next/script";

import { GTM_ID } from "@/config/site.config";

/**
 * LAYOUT/GoogleTagManager — nhúng GTM (bản gốc: đoạn script trong `_Head.cshtml`).
 * Không render gì khi NEXT_PUBLIC_GTM_ID để trống (mặc định ở chế độ mock).
 */
export function GoogleTagManager() {
  // Chỉ chấp nhận đúng định dạng ID của GTM trước khi chèn vào script.
  if (!/^GTM-[A-Z0-9]+$/.test(GTM_ID)) return null;

  return (
    <>
      <Script id="gtm-init" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}
