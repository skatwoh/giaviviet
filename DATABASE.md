# 🗄️ Database Documentation - Thủy Hương Food

Dự án sử dụng **Turso (LibSQL)** - một phiên bản phân tán của SQLite, mang lại hiệu suất cực cao và khả năng mở rộng tốt cho các ứng dụng Next.js.

---

## 🛠️ Cấu hình (Environment Variables)

Hệ thống tự động nhận diện môi trường qua các biến sau trong file `.env`:

```env
# Kết nối Cloud (Turso)
TURSO_DATABASE_URL=libsql://your-db-name.turso.io
TURSO_AUTH_TOKEN=your-auth-token

# HOẶC Kết nối Local (SQLite file)
TURSO_DATABASE_URL=file:local.db
```

---

## 📋 Sơ đồ các bảng (Schema)

### 1. Bảng `products` (Sản phẩm)
Lưu trữ thông tin chi tiết sản phẩm và cấu hình giá sale tự động.
| Cột | Kiểu dữ liệu | Mô tả |
|-----|-----------|-------|
| `id` | INTEGER (PK) | Mã định danh duy nhất |
| `name` | TEXT | Tên sản phẩm |
| `category` | TEXT (FK) | Liên kết tới `categories.id` |
| `regularPrice` | REAL | Giá bán gốc |
| `salePrice` | REAL (Null) | Giá khuyến mãi |
| `saleStart` | TEXT (Null) | Thời gian bắt đầu sale (ISO String) |
| `saleEnd` | TEXT (Null) | Thời gian kết thúc sale (ISO String) |
| `stock` | INTEGER | Số lượng tồn kho |
| `unit` | TEXT (FK) | Đơn vị tính (liên kết tới `units.name`) |
| `weight` | TEXT | Khối lượng (VD: 500g) |
| `origin` | TEXT | Xuất xứ |
| `description` | TEXT | Mô tả chi tiết |
| `image` | TEXT | URL hình ảnh |

### 2. Bảng `orders` (Đơn hàng)
Sử dụng schema phẳng để tối ưu truy vấn nhanh.
| Cột | Kiểu dữ liệu | Mô tả |
|-----|-----------|-------|
| `id` | INTEGER (PK) | Mã đơn hàng |
| `customerName` | TEXT | Tên khách hàng |
| `phoneNumber` | TEXT | Số điện thoại |
| `email` | TEXT | Email liên hệ |
| `address` | TEXT | Địa chỉ giao hàng |
| `items` | TEXT (JSON) | Danh sách sản phẩm dạng JSON string |
| `total` | REAL | Tổng tiền đơn hàng |
| `status` | TEXT | Trạng thái (pending, confirmed, delivered, cancelled) |
| `createdAt` | TEXT | Ngày tạo đơn |

### 3. Bảng `categories` & `units`
Quản lý các thuộc tính phân loại.
- **Categories**: `id` (Mã slug), `name` (Tên hiển thị).
- **Units**: `id` (UUID), `name` (Tên đơn vị: Túi, Thùng...).

---

## 🚀 Scripts Quản trị

Chúng tôi cung cấp các công cụ dòng lệnh để quản lý dữ liệu dễ dàng:

### Khởi tạo bảng
Tạo toàn bộ cấu trúc bảng cần thiết nếu chưa tồn tại.
```bash
pnpm exec tsx scripts/setup-db.ts
```

### Chuyển đổi dữ liệu (Migration)
Đọc dữ liệu từ các file JSON cũ trong `public/data/` và đưa vào SQL database.
```bash
pnpm exec tsx scripts/migrate-data.ts
```

---

## 🔐 Tính toàn vẹn dữ liệu

- **Transactions**: Khi tạo đơn hàng, hệ thống sử dụng SQL Transaction để đảm bảo:
    1. Tạo bản ghi `orders` thành công.
    2. Trừ `stock` trong bảng `products` tương ứng.
    => Nếu một trong hai bước lỗi, toàn bộ tiến trình sẽ bị hủy bỏ (Rollback).
- **Auto-Pricing**: API sản phẩm tự động tính toán giá hiện tại dựa trên cột `saleStart` và `saleEnd` so với thời gian thực của server.

---

## 🔍 Truy vấn dữ liệu thủ công

Bạn có thể sử dụng Turso CLI hoặc các phần mềm quản lý SQLite (như DB Browser for SQLite) để mở file `local.db`.

```sql
-- Ví dụ: Kiểm tra các sản phẩm đang trong thời gian sale
SELECT name, salePrice
FROM products
WHERE saleStart <= datetime('now')
AND saleEnd >= datetime('now');
```
