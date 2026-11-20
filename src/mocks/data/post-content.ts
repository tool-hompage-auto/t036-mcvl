/**
 * MOCK DATA — nội dung HTML của bài viết (trường `content`).
 *
 * API thật trả HTML do CKEditor 5 sinh ra: <p>, <ul>, <figure class="image">...
 * Mock dùng chung một mẫu cho mọi bài, chỉ thay tiêu đề. Ảnh trong bài xoay vòng
 * ảnh có sẵn ở public/assets/images/mock/posts (không thêm ảnh mới).
 */
const POST_COVER_COUNT = 3;

export function buildMockPostContent(title: string, postId: number): string {
  const cover = `/assets/images/mock/posts/post-cover-0${(postId % POST_COVER_COUNT) + 1}.png`;
  return `
<p><strong>${title}</strong></p>
<p>Đây là nội dung mẫu (mock) dùng để kiểm tra giao diện trang chi tiết tin tức. Khi kết nối API thật, phần này được thay bằng nội dung biên tập trên CMS.</p>
<figure class="image"><img src="${cover}" alt="${title}"></figure>
<h3>Phúc lợi dành cho tân thủ</h3>
<p>Đạo hữu thân mến,</p>
<p>Phượng Hoàng Tru Tiên chính thức ra mắt với hàng loạt phúc lợi dành cho tân thủ:</p>
<ul>
  <li>Đăng nhập nhận quà mỗi ngày</li>
  <li>Tặng thú cưỡi ngay ngày đầu</li>
  <li>Quà đua top lực chiến toàn server</li>
</ul>
<p>Chi tiết xem tại <a href="/tin-tuc">trang tin tức</a>.</p>
<h3>Lưu ý quan trọng</h3>
<p><strong>Lưu ý</strong></p>
<ul>
  <li>Phần thưởng được gửi qua thư trong game.</li>
  <li>Mỗi tài khoản chỉ nhận một lần.</li>
</ul>
<p>Chúc đạo hữu tu tiên vui vẻ!</p>
`.trim();
}
