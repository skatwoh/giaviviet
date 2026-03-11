# 📖 Hướng Dẫn Sử Dụng Gia Vị Việt

## 🏪 Dành Cho Khách Hàng

### 1️⃣ Mua Sắm Sản Phẩm

#### Bước 1: Xem Danh Sách Sản Phẩm
- Nhấp vào **"Sản phẩm"** trên menu
- Hoặc vào URL: `/products`

#### Bước 2: Lọc & Tìm Kiếm
- **Lọc theo danh mục**: Gia vị, Gia vị nêm, Dầu
- **Lọc theo giá**: Chọn khoảng giá min - max
- **Tìm kiếm**: Nhập tên sản phẩm vào ô tìm kiếm
- Kết quả sẽ cập nhật tự động

#### Bước 3: Xem Chi Tiết Sản Phẩm
- Nhấp vào sản phẩm bất kỳ
- Xem đầy đủ thông tin:
  - Hình ảnh chất lượng
  - Giá tiền
  - Xuất xứ
  - Cân nặng/Kích cỡ
  - Tình trạng kho hàng
  - Mô tả chi tiết
  - Sản phẩm liên quan

#### Bước 4: Thêm Vào Giỏ Hàng
- Điều chỉnh **số lượng** bằng nút +/-
- Nhấp **"Thêm vào giỏ"**
- Sẽ thấy thông báo "Đã thêm vào giỏ!"
- Số lượng hiển thị trên icon giỏ hàng

### 2️⃣ Quản Lý Giỏ Hàng

#### Xem Giỏ Hàng
- Nhấp vào icon **giỏ hàng** trên header
- Hoặc vào URL: `/cart`

#### Thay Đổi Số Lượng
- Dùng nút **+ / -** cạnh mỗi sản phẩm
- Hoặc nhập trực tiếp số lượng

#### Xóa Sản Phẩm
- Nhấp nút **X** hoặc **Xóa** bên cạnh sản phẩm

#### Tính Toán Tự Động
- Tổng tiền sẽ tính lại tự động
- Không có phí vận chuyển (miễn phí)

### 3️⃣ Thanh Toán

#### Vào Trang Thanh Toán
- Nhấp **"Tiến tới thanh toán"** từ giỏ hàng
- Hoặc vào URL: `/checkout`

#### Điền Thông Tin
**Thông tin khách hàng (bắt buộc)**
- Họ và tên
- Số điện thoại
- Email

**Địa chỉ giao hàng (bắt buộc)**
- Địa chỉ chi tiết (nhà/số)
- Quận/Huyện
- Thành phố

#### Chọn Phương Thức Thanh Toán
- **Thanh toán khi nhận hàng (COD)** - Trả tiền khi nhận
- **Chuyển khoản ngân hàng** - Chuyển trước giao
- **Ví điện tử/Momo** - Trả qua app

#### Thêm Ghi Chú (Tùy Chọn)
- Nhập ghi chú cho shop (vị trí giao, yêu cầu đặc biệt...)

#### Xác Nhận Đặt Hàng
- Kiểm tra **tóm tắt đơn hàng** bên phải
- Nhấp **"Xác nhận đặt hàng"**
- Nếu đầy đủ thông tin, đơn sẽ được tạo
- Sẽ thấy màn hình **xác nhận thành công** với mã đơn hàng

### 4️⃣ Tra Cứu Đơn Hàng

#### Vào Trang Tra Cứu
- Nhấp **"Tra cứu đơn"** trên menu header
- Hoặc vào URL: `/orders`

#### Tìm Kiếm Đơn Hàng
- Nhập **mã đơn hàng** (số trong thông báo xác nhận)
- Nhấp **"Tìm kiếm"**

#### Xem Thông Tin Đơn Hàng
- **Trạng thái giao hàng**:
  - 🟡 Chờ xác nhận
  - 🔵 Đã xác nhận - đang chuẩn bị giao
  - 🟢 Đã giao hàng
- **Thông tin khách hàng** - tên, SĐT, email
- **Địa chỉ giao hàng** - nơi sẽ nhận hàng
- **Chi tiết sản phẩm** - danh sách, số lượng, giá

### 5️⃣ Liên Hệ Cửa Hàng

#### Gửi Tin Nhắn Liên Hệ
- Nhấp **"Liên hệ"** trên menu
- Hoặc vào URL: `/contact`

#### Điền Biểu Mẫu
- **Họ tên** (bắt buộc)
- **Email** (bắt buộc)
- **Số điện thoại** (tùy chọn)
- **Chủ đề** (bắt buộc)
- **Tin nhắn** chi tiết (bắt buộc)

#### Gửi & Xác Nhận
- Nhấp **"Gửi tin nhắn"**
- Thấy thông báo thành công
- Shop sẽ liên hệ lại qua email hoặc SĐT

---

## 🔐 Dành Cho Quản Lý Cửa Hàng (Admin)

### ⚙️ Truy Cập Admin Dashboard
- Nhấp **"Quản lý"** trên menu
- Hoặc vào URL: `/admin`
- Sẽ thấy bảng quản lý với 3 tab chính

### 📊 Tab 1: Thống Kê Chung
Hiển thị 5 thẻ KPI:
- **Sản phẩm**: Tổng số sản phẩm trong kho
- **Đơn hàng**: Tổng số đơn hàng đã nhập
- **Tin nhắn**: Số tin nhắn liên hệ nhận được
- **Doanh thu**: Tổng tiền bán được (M đ)
- **Chờ xử lý**: Số đơn hàng chưa xác nhận

### 📦 Tab 2: Quản Lý Sản Phẩm

#### Xem Danh Sách Sản Phẩm
- Hiển thị tất cả sản phẩm
- Cho biết: Tên, giá, danh mục, số lượng kho
- ⚠️ Cảnh báo nếu kho < 5 sản phẩm (màu đỏ)

#### Tìm Kiếm Sản Phẩm
- Nhập tên sản phẩm vào ô tìm kiếm
- Kết quả lọc hiển thị ngay

#### Thêm Sản Phẩm Mới
1. Nhấp **"+ Thêm sản phẩm"**
2. Điền thông tin:
   - **Tên sản phẩm** (bắt buộc)
   - **Giá** (bắt buộc)
   - **Danh mục**: Chọn Gia vị / Gia vị nêm / Dầu
   - **Số lượng kho** (bắt buộc)
   - **Cân nặng** (VD: "250g", "100g")
   - **Xuất xứ** (VD: "Việt Nam", "Iran")
   - **URL Hình ảnh** (link ảnh)
   - **Mô tả chi tiết**
3. Nhấp **"Thêm mới"**
4. Sản phẩm sẽ xuất hiện trong danh sách

#### Chỉnh Sửa Sản Phẩm
1. Tìm sản phẩm cần sửa
2. Nhấp nút **✏️ (Edit)**
3. Thay đổi thông tin cần thiết
4. Nhấp **"Cập nhật"**

#### Xóa Sản Phẩm
1. Tìm sản phẩm cần xóa
2. Nhấp nút **🗑️ (Xóa)**
3. Xác nhận xóa trong hộp thoại

### 🛒 Tab 3: Quản Lý Đơn Hàng

#### Xem Danh Sách Đơn Hàng
- Mã đơn hàng
- Ngày tạo
- Tên khách hàng & SĐT
- Tổng tiền
- Danh sách sản phẩm
- Địa chỉ giao hàng

#### Cập Nhật Trạng Thái Đơn Hàng

**Trạng thái: Chờ xác nhận (🟡)**
- Nhấp **"Xác nhận"** để chuyển sang xác nhận
- Nhấp **"Hủy"** để hủy đơn

**Trạng thái: Đã xác nhận (🔵)**
- Nhấp **"Xác nhận giao"** để báo đã giao hàng
- Sau đó chuyển sang trạng thái Đã giao (🟢)

**Trạng thái: Đã giao (🟢)**
- Đơn hàng hoàn tất, khách hàng đã nhận

#### Quy Trình Công Việc
1. Khách hàng đặt hàng → Tạo đơn (Chờ xác nhận)
2. Shop xác nhận → Đã xác nhận
3. Shop giao hàng → Đã giao
4. Khách hàng nhận hàng → Hoàn tất

### 💬 Tab 4: Quản Lý Tin Nhắn

#### Xem Tin Nhắn Liên Hệ
- Chủ đề/Tiêu đề
- Thông tin gửi: Tên, email, SĐT
- Nội dung tin nhắn đầy đủ
- Thời gian gửi

#### Xóa Tin Nhắn
1. Tìm tin nhắn cần xóa
2. Nhấp **"🗑️ Xóa"**
3. Xác nhận xóa

---

## 💡 Mẹo & Lưu Ý

### 🔄 Dữ Liệu Lưu Trữ
- **Giỏ hàng**: Tự động lưu trong `localStorage` (F5 không mất)
- **Sản phẩm, đơn hàng, tin nhắn**: Lưu trong file JSON
- Dữ liệu tồn tại miễn là không xóa file

### 🚀 Tối Ưu Hóa
- **Mobile responsive**: Xem được trên điện thoại
- **Search & Filter nhanh**: Tìm kiếm real-time
- **Validation form**: Không thể gửi form trống
- **Thông báo rõ ràng**: Biết ngay kết quả từng hành động

### 🎨 Giao Diện
- **Màu sắc**: Amber (#b45309) - Ấm áp, thân thiện
- **Typography**: Rõ ràng, dễ đọc
- **Icon**: Trực quan, dễ hiểu

### 📱 Responsive
- **Desktop**: Bố cục 2-3 cột, đầy đủ thông tin
- **Tablet**: Bố cục tối ưu cho màn hình trung bình
- **Mobile**: Single column, menu hamburger

---

## 🔗 Các URL Quan Trọng

| Chức Năng | URL |
|-----------|-----|
| Trang chủ | `/` |
| Danh sách sản phẩm | `/products` |
| Chi tiết sản phẩm | `/products/[id]` |
| Giỏ hàng | `/cart` |
| Thanh toán | `/checkout` |
| Tra cứu đơn hàng | `/orders` |
| Liên hệ | `/contact` |
| Quản lý admin | `/admin` |

---

## ❓ Câu Hỏi Thường Gặp

**Q: Làm cách nào để tìm mã đơn hàng?**
A: Mã đơn hàng sẽ hiển thị trên màn xác nhận sau khi thanh toán. Bạn cũng có thể xem trên trang `/orders`.

**Q: Có thể thay đổi đơn hàng sau khi đặt không?**
A: Liên hệ shop ngay lập tức qua trang Liên hệ hoặc gọi SĐT để thay đổi.

**Q: Giỏ hàng có bị mất khi tắt trình duyệt không?**
A: Không, giỏ hàng sẽ được lưu lại khi bạn quay lại.

**Q: Giao hàng mất bao lâu?**
A: Thông thường 3-5 ngày, shop sẽ liên hệ để xác nhận địa chỉ.

---

**Cảm ơn bạn đã chọn Gia Vị Việt! 🙏**
