# 🛒 Gia Vị Việt - E-Commerce Store Features

## Trang Chủ (Home)
- ✅ Banner quảng cáo ấn tượng với hình ảnh spice market
- ✅ Danh sách sản phẩm nổi bật
- ✅ Thông tin về cửa hàng
- ✅ Liên kết nhanh đến các phần khác

## 📦 Danh Sách Sản Phẩm (Products)
- ✅ Hiển thị tất cả sản phẩm trong kho
- ✅ **Lọc theo danh mục**: Gia vị, Gia vị nêm, Dầu
- ✅ **Lọc theo giá**: Min - Max price
- ✅ **Tìm kiếm nhanh**: Tìm sản phẩm theo tên
- ✅ Hỗ trợ responsive trên mobile, tablet, desktop
- ✅ Hiển thị chi tiết: Tên, giá, hình ảnh, kho hàng

## 🔍 Chi Tiết Sản Phẩm (Product Detail)
- ✅ Hình ảnh sản phẩm chất lượng cao
- ✅ Thông tin chi tiết:
  - Tên sản phẩm
  - Giá tiền
  - Xuất xứ
  - Cân nặng/Kích cỡ
  - Tình trạng kho hàng
  - Mô tả chi tiết
- ✅ **Lựa chọn số lượng** với nút +/-
- ✅ **Thêm vào giỏ hàng** với thông báo thành công
- ✅ **Sản phẩm liên quan** - gợi ý các sản phẩm khác
- ✅ **Lợi ích bán hàng**:
  - Giao hàng miễn phí
  - Hoàn trả 30 ngày
  - Bảo hành chất lượng

## 🛒 Giỏ Hàng (Shopping Cart)
- ✅ Xem tất cả sản phẩm đã thêm
- ✅ **Điều chỉnh số lượng** từng sản phẩm
- ✅ **Xóa sản phẩm** khỏi giỏ
- ✅ Tính toán tổng tiền tự động
- ✅ **Lưu trữ persistent** (localStorage)
- ✅ Nút "Tiếp tục mua sắm" 
- ✅ Nút "Tiến tới thanh toán"
- ✅ Thông báo khi giỏ trống

## 💳 Thanh Toán (Checkout)
- ✅ **Thông tin khách hàng**:
  - Họ và tên (bắt buộc)
  - Số điện thoại (bắt buộc)
  - Email (bắt buộc)
- ✅ **Địa chỉ giao hàng**:
  - Địa chỉ chi tiết
  - Quận/Huyện
  - Thành phố
- ✅ **Phương thức thanh toán** (3 lựa chọn):
  - Thanh toán khi nhận hàng (COD)
  - Chuyển khoản ngân hàng
  - Ví điện tử / Momo
- ✅ **Ghi chú đơn hàng** (tùy chọn)
- ✅ **Tóm tắt đơn hàng**:
  - Danh sách sản phẩm
  - Tính toán tạm tính
  - Phí vận chuyển (miễn phí)
  - Tổng cộng
- ✅ **Xác nhận đặt hàng** với validation
- ✅ **Xác nhận thành công** với:
  - Hiển thị mã đơn hàng
  - Thông báo giao hàng
  - Liên kết quay lại mua hàng

## 📋 Tra Cứu Đơn Hàng (Order Tracking)
- ✅ **Tìm kiếm đơn hàng** bằng mã đơn hàng
- ✅ **Hiển thị trạng thái**:
  - Chờ xác nhận (Pending)
  - Đã xác nhận (Confirmed)
  - Đã giao hàng (Delivered)
- ✅ **Timeline trạng thái** với biểu tượng
- ✅ **Thông tin khách hàng** đầy đủ
- ✅ **Chi tiết sản phẩm** và giá tiền
- ✅ **Tính năng quay lại tìm kiếm**

## 📧 Liên Hệ (Contact)
- ✅ **Biểu mẫu liên hệ** đầy đủ:
  - Họ tên
  - Email
  - Số điện thoại
  - Chủ đề
  - Tin nhắn chi tiết
- ✅ Lưu trữ tin nhắn vào hệ thống
- ✅ Thông báo gửi thành công
- ✅ Validation form bắt buộc
- ✅ Hỗ trợ textarea cho tin nhắn dài

## 🔐 Quản Lý Admin (Admin Dashboard)
### Thống kê & KPI
- ✅ **Thẻ thống kê**:
  - Tổng sản phẩm
  - Tổng đơn hàng
  - Tổng tin nhắn
  - Doanh thu
  - Số đơn chờ xử lý

### Quản Lý Sản Phẩm
- ✅ **Danh sách sản phẩm** với:
  - Tên sản phẩm
  - Giá tiền
  - Danh mục
  - Tình trạng kho (cảnh báo nếu <5)
- ✅ **Tìm kiếm sản phẩm** theo tên
- ✅ **Thêm sản phẩm mới**:
  - Tên, giá, danh mục
  - Số lượng kho
  - Cân nặng, Xuất xứ
  - Mô tả chi tiết
  - URL hình ảnh
- ✅ **Chỉnh sửa sản phẩm** (Edit)
- ✅ **Xóa sản phẩm** với xác nhận

### Quản Lý Đơn Hàng
- ✅ **Danh sách đơn hàng**:
  - Mã đơn hàng
  - Ngày tạo
  - Thông tin khách hàng
  - Tổng tiền
  - Danh sách sản phẩm
  - Địa chỉ giao hàng
- ✅ **Cập nhật trạng thái**:
  - Chờ xác nhận → Xác nhận → Đã giao
  - Hủy đơn hàng
- ✅ **Biểu tượng trạng thái** rõ ràng

### Quản Lý Tin Nhắn
- ✅ **Danh sách tin nhắn liên hệ**:
  - Tiêu đề/Chủ đề
  - Thông tin gửi (tên, email, SĐT)
  - Nội dung tin nhắn
  - Thời gian gửi
- ✅ **Xóa tin nhắn**

## 💾 Lưu Trữ Dữ Liệu
- ✅ **JSON-based storage** trong `/public/data/`
  - `products.json` - Danh sách sản phẩm
  - `orders.json` - Lịch sử đơn hàng
  - `messages.json` - Tin nhắn liên hệ
- ✅ **API Routes** để quản lý dữ liệu
  - GET/POST `/api/products`
  - GET/POST `/api/orders`
  - GET/POST `/api/messages`

## 🎨 Thiết Kế & UX
- ✅ **Responsive Design**:
  - Mobile-first approach
  - Tối ưu cho tablet và desktop
  - Menu mobile với hamburger
- ✅ **Màu sắc chuyên nghiệp**:
  - Primary: Amber (#b45309) - Ấm áp
  - Neutral: Gray & White
  - Accent: Green, Blue, Red cho trạng thái
- ✅ **Navigation**:
  - Header cố định (sticky)
  - Breadcrumb trên chi tiết sản phẩm
  - Liên kết nhanh giữa các trang
- ✅ **Card-based Layout** cho sản phẩm
- ✅ **Form Validation** đầy đủ
- ✅ **Loading & Success States**
- ✅ **Empty States** với biểu tượng

## 🔄 Chức Năng Bổ Sung
- ✅ **Giỏ hàng persistent** - Dữ liệu lưu lại khi F5
- ✅ **Cart Counter** trên icon giỏ hàng
- ✅ **Thông báo Toast** khi thêm vào giỏ
- ✅ **Search & Filter** tương tác
- ✅ **Dynamic Pricing** tính toán tự động
- ✅ **Order ID Generation** tự động
- ✅ **Timestamp** cho tất cả dữ liệu

---

## 📱 Các Trang Chính
1. `/` - Trang chủ
2. `/products` - Danh sách sản phẩm
3. `/products/[id]` - Chi tiết sản phẩm
4. `/cart` - Giỏ hàng
5. `/checkout` - Thanh toán
6. `/orders` - Tra cứu đơn hàng
7. `/contact` - Liên hệ
8. `/admin` - Bảng quản lý

---

**Cửa hàng hoàn chỉnh với đầy đủ tính năng e-commerce chuyên nghiệp!** 🎉
