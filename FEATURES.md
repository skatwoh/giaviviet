# ✨ Danh Sách Tính Năng - Thủy Hương Food

Dưới đây là danh sách đầy đủ các tính năng đã được triển khai trong hệ thống.

---

## 👥 1. Tính Năng Khách Hàng (Storefront)

### Trang Chủ
- [x] **Hero Carousel**: Hiển thị các biểu ngữ quảng cáo nổi bật.
- [x] **Hot Daily Sales**: Danh sách sản phẩm đang giảm giá với bộ đếm ngược thời gian thực.
- [x] **Featured Categories**: Truy cập nhanh các nhóm sản phẩm chính.
- [x] **Store Benefits**: Cam kết dịch vụ của cửa hàng.

### Mua Sắm
- [x] **Product Listing**: Xem danh sách toàn bộ sản phẩm với phân trang/lọc.
- [x] **Category Filtering**: Lọc sản phẩm theo danh mục động từ database.
- [x] **Product Detail**: Thông tin chi tiết, xuất xứ, khối lượng và mô tả.
- [x] **Premium Shopping Cart**: Popover giỏ hàng xem nhanh và trang giỏ hàng chi tiết.

### Đặt Hàng & Tra Cứu
- [x] **Checkout Flow**: Điền thông tin giao hàng và chọn phương thức thanh toán.
- [x] **Order Tracking**: Tra cứu trạng thái đơn hàng qua ID.
- [x] **Contact Form**: Gửi tin nhắn liên hệ tới admin.

---

## 🔐 2. Tính Năng Quản Trị (Admin Panel)

### Dashboard Overview
- [x] **KPI Cards**: Thống kê doanh thu, đơn hàng, sản phẩm, tin nhắn.
- [x] **Revenue Charts**: Biểu đồ vùng hiển thị xu hướng doanh thu.
- [x] **Latest Orders**: Danh sách phím tắt xử lý nhanh các đơn hàng mới.

### Quản Lý Modular
- [x] **Product Management**:
    - Thêm/Sửa/Xóa sản phẩm.
    - Thiết lập lịch trình khuyến mãi tự động.
    - Quản lý kho hàng thông minh.
    - Nhập liệu hàng loạt qua CSV/Excel.
- [x] **Category Management**: Quản lý cây danh mục sản phẩm.
- [x] **Unit Management**: Quản lý đơn vị tính tùy chỉnh (túi, quả, thùng...).
- [x] **Order Management**: Quản lý vòng đời đơn hàng.
- [x] **Message Management**: Tiếp nhận và xóa tin nhắn khách hàng.

---

## 💾 3. Đặc Tính Kỹ Thuật

- [x] **Database SQL**: Sử dụng Turso/LibSQL thay thế cho file JSON truyền thống.
- [x] **Atomic Transactions**: Đảm bảo trừ kho chính xác khi tạo đơn hàng.
- [x] **Type Safety**: Toàn bộ codebase được viết bằng TypeScript.
- [x] **Performance**: Server-side pricing calculation và tối ưu font chữ.
- [x] **UI Framework**: Xây dựng trên Shadcn UI và Tailwind CSS v4.
- [x] **Responsive**: Tương thích tốt với mọi kích thước màn hình.
