/**
 * LAYOUT/LogoAge — nhãn 18+ nổi, dính mép trái (bản gốc: `layout/Logo18.tsx`).
 * Mobile: nằm dưới header (top 120px, thu nhỏ 0.6); desktop: top 40px, kích thước thật.
 * Nằm NGOÀI ScaleLayout.
 */
export function LogoAge() {
  return (
    <section data-edit-id="logo-age.common.logo-age"
      data-block="logo-age"
      className="fixed top-120 left-30 z-50 origin-top-left scale-[0.6] pc:top-40 pc:left-0 pc:scale-100"
    >
      <picture>
        <img src="/assets/images/common/logo-age.png" alt="logo-18" />
      </picture>
    </section>
  );
}
