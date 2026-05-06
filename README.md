# 🌶️ Thủy Hương Food - Tinh Hoa Gia Vị Việt

**Hệ thống thương mại điện tử chuyên cung cấp gia vị và thực phẩm sạch cao cấp.**

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)
![Turso](https://img.shields.io/badge/Turso-LibSQL-000000?style=flat-square&logo=sqlite)

---

## ✨ Tính năng nổi bật

### 👥 Dành cho Khách hàng
- ✅ **Trang chủ chuyên nghiệp** - Banner quảng bá, danh mục nổi bật và mục Khuyến mãi Hot.
- ✅ **Hệ thống Sale tự động** - Countdown đếm ngược thời gian khuyến mãi theo thời gian thực.
- ✅ **Tìm kiếm & Lọc thông minh** - Tìm kiếm theo tên, phân loại theo danh mục.
- ✅ **Giỏ hàng & Thanh toán** - Quy trình checkout chuyên nghiệp, lưu giỏ hàng tự động.
- ✅ **Tra cứu đơn hàng** - Khách hàng có thể kiểm tra trạng thái đơn hàng của mình.

### 🔐 Dành cho Quản trị viên (Admin)
- ✅ **Dashboard Overview** - Thống kê KPI: doanh thu, đơn hàng, sản phẩm, tin nhắn qua biểu đồ.
- ✅ **Quản lý Sản phẩm Modular** - Thiết lập giá sale theo ngày, quản lý kho, khối lượng, xuất xứ.
- ✅ **Quản lý Danh mục & Đơn vị** - Linh hoạt tùy chỉnh các nhóm sản phẩm và đơn vị tính (túi, thùng, kg).
- ✅ **Hệ thống Đơn hàng** - Tiếp nhận và cập nhật trạng thái giao hàng.
- ✅ **Hộp thư Liên hệ** - Quản lý phản hồi từ khách hàng tập trung.

### 💾 Đặc tính Kỹ thuật
- ✅ **Database SQL (Turso)** - Sử dụng LibSQL cho tốc độ cao và tính nhất quán dữ liệu.
- ✅ **API Route & Transaction** - Xử lý đơn hàng an toàn với giao dịch SQL (Atomic orders).
- ✅ **UI/UX Cao cấp** - Sử dụng Shadcn UI, Radix UI và font Be Vietnam Pro tối ưu tiếng Việt.
- ✅ **Responsive** - Hoạt động hoàn hảo trên Mobile và Desktop.

---

## 🚀 Hướng dẫn cài đặt

### 1. Yêu cầu hệ thống
- Node.js 18+
- pnpm (khuyên dùng)

### 2. Cài đặt chi tiết

```bash
# Clone repository
git clone https://github.com/yourusername/thuy-huong-food.git
cd thuy-huong-food

# Cài đặt thư viện
pnpm install

# Cấu hình môi trường (Tạo file .env)
# Mặc định hệ thống sẽ dùng SQLite file (local.db) nếu không có env
echo "TURSO_DATABASE_URL=file:local.db" > .env

# Khởi tạo Database và Migrations
pnpm exec tsx scripts/setup-db.ts
pnpm exec tsx scripts/migrate-data.ts

# Chạy server phát triển
pnpm dev
```

### 3. Tài khoản Admin mặc định
- **Email**: `admin@thuyhuong.com`
- **Password**: `admin`

---

## 📁 Cấu trúc thư mục chính

```
thuy-huong-food/
├── app/
│   ├── (shop)/                # Các trang bán hàng (Home, Products, Cart...)
│   ├── (auth)/                # Đăng nhập & Đăng ký
│   ├── admin/                 # Hệ thống quản trị (Modular routes)
│   └── api/                   # API backend (LibSQL integration)
├── components/
│   ├── ui/                    # Thư viện UI core (Shadcn)
│   ├── AdminSidebar.tsx       # Menu quản trị
│   └── ProductCard.tsx        # Hiển thị sản phẩm
├── lib/
│   └── db.ts                  # Cấu hình kết nối Turso/LibSQL
├── scripts/
│   ├── setup-db.ts            # Script tạo bảng SQL
│   └── migrate-data.ts        # Script chuyển đổi dữ liệu từ JSON sang SQL
└── public/
    └── images/                # Kho ảnh sản phẩm
```

---

## 🛠 Công nghệ sử dụng

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS v4.
- **Backend**: Next.js API Routes, LibSQL (@libsql/client).
- **Database**: Turso (SQLite in the cloud) hoặc Local SQLite.
- **Thư viện chính**: Shadcn UI, Recharts (biểu đồ), Sonner (thông báo), Lucide Icons.

---

## 📊 Cấu trúc Database

Hệ thống sử dụng các bảng chính:
- `products`: Lưu thông tin sản phẩm và lịch trình sale.
- `categories`: Phân loại sản phẩm.
- `units`: Đơn vị tính tùy chỉnh.
- `orders`: Đơn hàng và chi tiết khách hàng.
- `messages`: Tin nhắn liên hệ.
- `users`: Tài khoản khách hàng và admin.

Chi tiết xem tại: **[DATABASE.md](./DATABASE.md)**

---

## 🔒 Bảo mật & Triển khai

- **Môi trường**: Luôn sử dụng `.env` để bảo mật `TURSO_AUTH_TOKEN`.
- **Triển khai Vercel**: Kết nối repository, thêm Env variables và chạy scripts khởi tạo database trước khi live.

---

## 📚 Tài liệu bổ sung

- **[DATABASE.md](./DATABASE.md)** - Chi tiết cấu trúc dữ liệu và SQL.
- **[FEATURES.md](./FEATURES.md)** - Danh sách tính năng chi tiết.
- **[GUIDE.md](./GUIDE.md)** - Hướng dẫn sử dụng cho người dùng.

---

**Sẵn sàng đưa gia vị Việt vươn xa! 🚀**
Hỗ trợ kỹ thuật: giatothuyhuong@gmail.com
