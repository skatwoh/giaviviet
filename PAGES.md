# 📄 Danh Sách Tất Cả Các Trang

## 🏠 Trang Chủ (Home)
**URL**: `/`

### Nội dung:
```
┌─────────────────────────────────────┐
│  [G] Gia Vị Việt  Sản phẩm  Quản lý │ ← Header
├─────────────────────────────────────┤
│                                       │
│     HERO BANNER - SPICE MARKET       │
│     (Hình ảnh chất lượng cao)        │
│                                       │
│     Giới thiệu cửa hàng              │
│     - Hơn 10 năm kinh nghiệm         │
│     - Gia vị chất lượng cao          │
│     - Giao hàng miễn phí             │
│                                       │
│     Sản phẩm nổi bật:                │
│     ┌─────┐  ┌─────┐  ┌─────┐       │
│     │ Sp1 │  │ Sp2 │  │ Sp3 │       │
│     └─────┘  └─────┘  └─────┘       │
│                                       │
│  [Xem tất cả sản phẩm] [Liên hệ]   │
│                                       │
└─────────────────────────────────────┘
```

---

## 🛍️ Danh Sách Sản Phẩm (Products)
**URL**: `/products`

### Nội dung:
```
┌─────────────────────────────────────┐
│  [G] Gia Vị Việt  Sản phẩm  Quản lý │ 
├─────────────────────────────────────┤
│ Danh Sách Sản Phẩm                   │
├──────────────────┬──────────────────┤
│ BỘLỌC:          │ SẢN PHẨM:        │
│ ☐ Gia vị        │ ┌──────┬──────┐  │
│ ☐ Gia vị nêm    │ │  Sp1 │  Sp2 │  │
│ ☐ Dầu           │ └──────┴──────┘  │
│                 │ ┌──────┬──────┐  │
│ Giá từ __ đến __│ │  Sp3 │  Sp4 │  │
│                 │ └──────┴──────┘  │
│ 🔍 Tìm kiếm...│ ┌──────┬──────┐  │
│                 │ │  Sp5 │  Sp6 │  │
│                 │ └──────┴──────┘  │
│                 │                  │
└──────────────────┴──────────────────┘
```

---

## 🔍 Chi Tiết Sản Phẩm (Product Detail)
**URL**: `/products/[id]`

### Nội dung:
```
┌─────────────────────────────────────┐
│ Sản phẩm / Tiêu Đen Hạt             │
├─────────────────────────────────────┤
│ ┌──────────────┐  │ TIÊU ĐEN HẠT   │
│ │              │  │ Gia vị         │
│ │ HÌNH ẢNH     │  │ 45,000 đ       │
│ │              │  │                │
│ │              │  │ Xuất xứ:       │
│ │              │  │ Việt Nam       │
│ │              │  │                │
│ │              │  │ Cân nặng:      │
│ └──────────────┘  │ 250g           │
│                   │                │
│ 🚚 Giao miễn phí  │ Kho: 50 sản    │
│ 🔄 Hoàn 30 ngày   │                │
│ 🛡️ Bảo hành      │ Số lượng:      │
│                   │ [-] 1 [+]      │
│ Mô tả:            │                │
│ Tiêu đen hạt      │ [Thêm vào giỏ]│
│ nguyên chất...    │                │
│                   │                │
│ Sản phẩm liên quan│
│ ┌──────┐ ┌──────┐│
│ │Tiêu T│ │Saffr││
│ └──────┘ └──────┘│
└─────────────────────────────────────┘
```

---

## 🛒 Giỏ Hàng (Shopping Cart)
**URL**: `/cart`

### Nội dung:
```
┌─────────────────────────────────────┐
│  Giỏ Hàng Của Bạn                   │
├──────────────────┬──────────────────┤
│ SẢN PHẨM:        │ TỔNG HỢP:       │
│                  │                  │
│ ☑ Tiêu Đen Hạt │ Tạm tính:        │
│   250g x 2       │ 90,000 đ         │
│   45,000 đ       │                  │
│   [-] 2 [+] [X] │ Phí vận chuyển:  │
│                  │ Miễn phí         │
│ ☑ Dâu Tằm Hạt  │                  │
│   100g x 1       │ TỔNG CỘNG:       │
│   75,000 đ       │ 165,000 đ        │
│   [-] 1 [+] [X] │                  │
│                  │ [Tiếp tục mua]  │
│ ☑ Saffron        │ [Thanh toán]    │
│   1g x 1         │                  │
│   120,000 đ      │                  │
│   [-] 1 [+] [X] │                  │
│                  │                  │
└──────────────────┴──────────────────┘
```

---

## 💳 Thanh Toán (Checkout)
**URL**: `/checkout`

### Nội dung:
```
┌──────────────────────────────────────────┐
│ THANH TOÁN                               │
├──────────────────────┬──────────────────┤
│ THÔNG TIN KHÁCH:     │ TÓM TẮT ĐH:     │
│ Họ tên*              │                  │
│ [________________]   │ Tiêu Đen 2 x 90k│
│                      │ Dâu Tằm 1 x 75k │
│ SĐT*                 │ Saffron 1 x 120k│
│ [________________]   │                  │
│                      │ Tạm tính: 285k  │
│ Email*               │ Vận chuyển: 0k  │
│ [________________]   │ ────────────────│
│                      │ TỔNG: 285,000 đ │
│ ĐỊA CHỈ:             │                  │
│ Địa chỉ*             │                  │
│ [________________]   │                  │
│                      │                  │
│ Quận/Huyện*          │                  │
│ [________________]   │                  │
│                      │                  │
│ Thành phố*           │                  │
│ [________________]   │                  │
│                      │                  │
│ THANH TOÁN:          │                  │
│ ◉ COD               │                  │
│ ○ Chuyển khoản       │                  │
│ ○ Ví điện tử         │                  │
│                      │                  │
│ GHI CHÚ:             │                  │
│ [___________]        │                  │
│                      │                  │
│ [XÁC NHẬN ĐẶT HÀNG]  │                  │
│                      │                  │
└──────────────────────┴──────────────────┘
```

---

## ✅ Xác Nhận Đặt Hàng (Order Confirmation)
**URL**: `/checkout` (success page)

### Nội dung:
```
┌─────────────────────────────────────┐
│                                       │
│          ✓ ĐẶT HÀNG THÀNH CÔNG      │
│                                       │
│    Cảm ơn bạn đã mua hàng             │
│                                       │
│    Mã đơn hàng:                       │
│    ĐH1234567890                      │
│                                       │
│    📧 Xác nhận đã gửi email           │
│    📞 Liên hệ trong 2 giờ             │
│    🚚 Giao dự kiến 3-5 ngày          │
│                                       │
│    [Về trang chủ] [Tiếp tục mua]   │
│                                       │
│    Chuyển hướng trong 3 giây...       │
│                                       │
└─────────────────────────────────────┘
```

---

## 📦 Tra Cứu Đơn Hàng (Order Tracking)
**URL**: `/orders`

### Nội dung:
```
┌──────────────────────────────────────┐
│ TRA CỨU ĐƠN HÀNG                     │
├──────────────────────────────────────┤
│ [Nhập mã đơn hàng] [Tìm kiếm]       │
├──────────────────────────────────────┤
│ ĐƠN HÀNG #1234567890                 │
│ Ngày: 12/03/2026 10:30               │
│                                       │
│ TRẠNG THÁI:  [Đã xác nhận] 🔵        │
│                                       │
│ TIMELINE:                             │
│ ✓ Đơn được nhận (10/03)              │
│ ⊙ Đã xác nhận (11/03)                │
│   Đang chuẩn bị giao                  │
│ ◯ Đã giao hàng (?)                    │
│                                       │
│ KHÁCH HÀNG:          │ ĐỊA CHỈ:      │
│ Nguyễn Văn A         │ 123 Nguyễn...  │
│ 0901234567           │ Quận 1         │
│ example@mail.com     │ TP. HCM        │
│                      │                │
│ CHI TIẾT SẢN PHẨM:                   │
│ Tiêu Đen 2 x 45k = 90k               │
│ Dâu Tằm 1 x 75k = 75k                │
│ ─────────────────────                │
│ TỔNG: 165,000 đ                      │
│                                       │
│ [Tiếp tục mua] [Tìm đơn khác]       │
│                                       │
└──────────────────────────────────────┘
```

---

## 📧 Liên Hệ (Contact)
**URL**: `/contact`

### Nội dung:
```
┌──────────────────────────────────────┐
│ LIÊN HỆ VỚI CHÚNG TÔI                │
├──────────────────────────────────────┤
│                                       │
│ Họ tên *                              │
│ [____________________]                │
│                                       │
│ Email *                               │
│ [____________________]                │
│                                       │
│ Số điện thoại                         │
│ [____________________]                │
│                                       │
│ Chủ đề *                              │
│ [____________________]                │
│                                       │
│ Tin nhắn *                            │
│ [_______________________]             │
│ [_______________________]             │
│ [_______________________]             │
│                                       │
│ [Gửi tin nhắn]                       │
│                                       │
│ Chúng tôi sẽ liên hệ sớm nhất         │
│                                       │
└──────────────────────────────────────┘
```

---

## 🔐 Bảng Quản Lý (Admin Dashboard)
**URL**: `/admin`

### Phần Thống Kê:
```
┌──────────────────────────────────────┐
│ BẢNG QUẢN LÝ                         │
├──────────────────────────────────────┤
│                                       │
│ ┌────────┐ ┌────────┐ ┌────────┐    │
│ │Sản phẩm│ │Đơn hàng│ │Tin nhắn│    │
│ │   12   │ │   45   │ │   8    │    │
│ └────────┘ └────────┘ └────────┘    │
│                                       │
│ ┌────────┐ ┌────────┐                │
│ │Doanh thu│ │Chờ XN  │                │
│ │ 12.5M đ│ │   5    │                │
│ └────────┘ └────────┘                │
│                                       │
├──────────────────────────────────────┤
│ [SẢN PHẨM] [ĐƠN HÀNG] [TIN NHẮN]    │
│                                       │
└──────────────────────────────────────┘
```

### Tab 1: Quản Lý Sản Phẩm
```
┌──────────────────────────────────────┐
│ QUẢN LÝ SẢN PHẨM                     │
│ 🔍 [Tìm sản phẩm...]  [+ Thêm]      │
├──────────────────────────────────────┤
│                                       │
│ ✓ Tiêu Đen Hạt                       │
│   45,000 đ | Kho: 50                │
│   [✎ Edit] [🗑️ Xóa]                 │
│                                       │
│ ✓ Hạt Tiêu Trắng                     │
│   55,000 đ | Kho: 35                │
│   [✎ Edit] [🗑️ Xóa]                 │
│                                       │
│ ✓ Saffron Cao Cấp                    │
│   120,000 đ | Kho: 20 ⚠️ (<5)       │
│   [✎ Edit] [🗑️ Xóa]                 │
│                                       │
│ ✓ Dâu Tằm Hạt                        │
│   75,000 đ | Kho: 40                │
│   [✎ Edit] [🗑️ Xóa]                 │
│                                       │
└──────────────────────────────────────┘
```

### Tab 2: Quản Lý Đơn Hàng
```
┌──────────────────────────────────────┐
│ QUẢN LÝ ĐƠN HÀNG                     │
├──────────────────────────────────────┤
│                                       │
│ #1234567890  │ Nguyễn Văn A         │
│ 12/03 10:30  │ 0901234567           │
│ 🟡 Chờ XN    │ 165,000 đ            │
│ Sản phẩm:                            │
│ - Tiêu Đen 2x, Dâu Tằm 1x           │
│ [Xác nhận] [Hủy]                    │
│                                       │
│ #1234567889  │ Trần Thị B           │
│ 11/03 14:20  │ 0912345678           │
│ 🔵 Đã XN     │ 240,000 đ            │
│ Sản phẩm:                            │
│ - Saffron 2x, Quế 1x                │
│ [Xác nhận giao]                     │
│                                       │
│ #1234567888  │ Phạm Văn C           │
│ 10/03 09:15  │ 0923456789           │
│ 🟢 Đã giao   │ 95,000 đ             │
│ Sản phẩm:                            │
│ - Tiêu Đen 1x                       │
│                                       │
└──────────────────────────────────────┘
```

### Tab 3: Quản Lý Tin Nhắn
```
┌──────────────────────────────────────┐
│ QUẢN LÝ TIN NHẮN                     │
├──────────────────────────────────────┤
│                                       │
│ "Hỏi giá saffron"                    │
│ Từ: Dũng Trần (dung@mail.com)       │
│ SĐT: 0901234567                      │
│ 12/03 15:30                          │
│ ┌────────────────────────────────┐   │
│ │ Chào, tôi muốn hỏi giá        │   │
│ │ saffron Iran có khuyến mãi     │   │
│ │ không?                         │   │
│ └────────────────────────────────┘   │
│ [🗑️ Xóa]                            │
│                                       │
│ "Cần giao nhanh"                     │
│ Từ: Hồng Phạm (hong@mail.com)       │
│ SĐT: 0912345678                      │
│ 11/03 10:45                          │
│ ┌────────────────────────────────┐   │
│ │ Tôi cần giao hàng cho hôm nay  │   │
│ │ có thể không? Sẽ trả tiền      │   │
│ │ thêm cho phí giao nhanh.       │   │
│ └────────────────────────────────┘   │
│ [🗑️ Xóa]                            │
│                                       │
└──────────────────────────────────────┘
```

---

## 📱 Responsive Breakpoints

### Mobile (320px - 640px)
- Single column layout
- Hamburger menu
- Touch-friendly buttons (48px minimum)
- Stack form fields vertically

### Tablet (641px - 1024px)
- 2-3 column grid
- Desktop navigation
- Wider product cards

### Desktop (1025px+)
- Full featured layout
- Multiple columns
- Sidebar filters
- Large images

---

## 🔗 Điều Hướng

```
HOME (/)
├─→ PRODUCTS (/products)
│   └─→ PRODUCT DETAIL (/products/[id])
│       └─→ ADD TO CART
│           └─→ CART (/cart)
│               └─→ CHECKOUT (/checkout)
│                   └─→ CONFIRMATION
│                       └─→ ORDER TRACKING (/orders)
│
├─→ CONTACT (/contact)
│   └─→ SEND MESSAGE
│
└─→ ADMIN (/admin)
    ├─→ MANAGE PRODUCTS
    ├─→ MANAGE ORDERS
    └─→ MANAGE MESSAGES
```

---

**Tất cả trang đều responsive và tối ưu hóa trên desktop, tablet & mobile! 📱💻🖥️**
