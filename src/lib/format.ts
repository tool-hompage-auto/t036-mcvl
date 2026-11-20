/**
 * FORMAT — hàm định dạng hiển thị (port 1:1 từ script inline của bản gốc).
 */

/** Mốc phân biệt timestamp giây / mili-giây: 01/01/2100 tính theo giây. */
const MAX_SECONDS_TIMESTAMP = 4102444800;

const pad2 = (value: number): string => `0${value}`.slice(-2);

/**
 * Định dạng ngày giờ thành "dd-MM-yyyy HH:mm" theo giờ máy người dùng.
 * Nhận: timestamp (giây hoặc mili-giây, dạng số hoặc chuỗi số) hoặc chuỗi ngày.
 * Chuỗi không parse được thì trả lại nguyên văn; rỗng thì trả "".
 */
export function formatDate(
  value: string | number | null | undefined,
): string {
  if (!value) return "";

  let date: Date;
  if (typeof value === "number" || /^\d+$/.test(value)) {
    let timestamp = typeof value === "number" ? value : parseInt(value, 10);
    if (timestamp < MAX_SECONDS_TIMESTAMP) timestamp *= 1000;
    date = new Date(timestamp);
  } else {
    date = new Date(value);
  }
  if (Number.isNaN(date.getTime())) return String(value);

  const day = pad2(date.getDate());
  const month = pad2(date.getMonth() + 1);
  const hours = pad2(date.getHours());
  const minutes = pad2(date.getMinutes());
  return `${day}-${month}-${date.getFullYear()} ${hours}:${minutes}`;
}
