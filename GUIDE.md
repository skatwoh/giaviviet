# 📖 Hướng Dẫn Sử Dụng - Thủy Hương Food

Tài liệu hướng dẫn dành cho cả Khách hàng và Quản trị viên hệ thống.

---

## 🛍️ Dành Cho Khách Hàng

### 1. Tìm kiếm và Lọc sản phẩm
- Sử dụng thanh tìm kiếm ở đầu trang để tìm sản phẩm theo tên.
- Chọn danh mục ở menu Header hoặc Sidebar để xem các nhóm sản phẩm tương ứng.
- **Lưu ý**: Các sản phẩm có biểu tượng 🏷️ là đang trong chương trình khuyến mãi.

### 2. Giỏ hàng và Thanh toán
- Thêm sản phẩm vào giỏ hàng từ trang danh sách hoặc trang chi tiết.
- Truy cập biểu tượng giỏ hàng để cập nhật số lượng.
- Tại trang Checkout, điền đầy đủ thông tin giao hàng và chọn phương thức thanh toán.

### 3. Tra cứu đơn hàng
- Sau khi đặt hàng, hãy lưu lại **Mã đơn hàng**.
- Truy cập trang "Tra cứu đơn hàng" để xem trạng thái hiện tại (Đang chờ, Đã xác nhận, v.v.).

---

## 🛠️ Dành Cho Quản Trị Viên (Admin)

Truy cập: `/admin` (Yêu cầu đăng nhập tài khoản admin).

### 1. Dashboard (Tổng quan)
- Xem biểu đồ xu hướng doanh thu 7 ngày gần nhất.
- Theo dõi các đơn hàng mới nhất cần xử lý.
- Thống kê nhanh tổng số sản phẩm và tin nhắn.

### 2. Quản lý Sản phẩm (Modular)
- **Thêm sản phẩm**: Điền đầy đủ thông tin, chọn Danh mục và Đơn vị tính từ danh sách có sẵn.
- **Cài đặt Sale tự động**:
    - Nhập `Giá khuyến mãi`.
    - Chọn `Thời điểm bắt đầu` và `Kết thúc`.
    - Hệ thống sẽ tự động hiển thị giá sale trên Storefront khi đến giờ.
- **Nhập/Xuất Excel**: Sử dụng nút "Nhập Excel" để thêm hàng loạt sản phẩm từ file CSV mẫu.

### 3. Quản lý Danh mục & Đơn vị tính
- Luôn tạo Danh mục và Đơn vị tính trước khi thêm sản phẩm mới.
- Đơn vị tính linh hoạt như: *Gói, Hộp, Chai, Thùng 24 lon...*

### 4. Xử lý Đơn hàng
- Đơn hàng mới sẽ ở trạng thái **Chờ xác nhận**.
- Sau khi gọi điện xác nhận với khách, hãy bấm nút **Xác nhận**.
- Khi bắt đầu giao hàng, cập nhật trạng thái sang **Giao hàng**.

---

## ❓ Câu Hỏi Thường Gặp (FAQ)

**Q: Tại sao sản phẩm đã cài giá sale nhưng không hiển thị trên web?**
A: Hãy kiểm tra lại cột `Thời điểm bắt đầu`. Giá sale chỉ hiển thị nếu thời gian hiện tại nằm trong khoảng Start và End.

**Q: Tôi có thể xóa danh mục đang có sản phẩm không?**
A: Có thể, nhưng sản phẩm thuộc danh mục đó sẽ bị mất phân loại. Bạn nên cập nhật lại danh mục cho sản phẩm trước khi xóa.

**Q: Database bị lỗi thì xử lý thế nào?**
A: Hãy chạy lại script `pnpm exec tsx scripts/setup-db.ts` để đảm bảo cấu trúc bảng chính xác.
