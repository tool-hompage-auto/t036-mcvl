/**
 * UI/ShineImage — ảnh có vệt sáng lướt qua (dùng cho logo game).
 * Bản gốc đặt 2 thẻ <img> chồng nhau: ảnh thật + bản sao mang class hiệu ứng
 * (`.animation-laluot`, ở template là `shine-overlay animate-shine`).
 * Thẻ cha phải có `position: relative`.
 */
interface ShineImageProps {
  src: string;
  alt: string;
  /** Class kích thước, áp cho cả ảnh thật lẫn lớp hiệu ứng. */
  className: string;
  /** Kích thước thuộc tính HTML (nếu bản gốc có khai báo). */
  width?: number;
  height?: number;
  /** Tải ảnh trễ. */
  isLazy?: boolean;
}

export function ShineImage({
  src,
  alt,
  className,
  width,
  height,
  isLazy = false,
}: ShineImageProps) {
  const loading = isLazy ? "lazy" : undefined;
  return (
    <>
      <img
        className={className}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
      />
      <img
        aria-hidden="true"
        className={`${className} shine-overlay animate-shine`}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
      />
    </>
  );
}
