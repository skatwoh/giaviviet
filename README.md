# 🌶️ Gia Vị Việt - Vietnamese Spices E-Commerce Store

**Complete e-commerce solution for selling Vietnamese spices and condiments online.**

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)

---

## ✨ Features

### 👥 Customer Features
- ✅ **Browse Products** - Danh sách sản phẩm gia vị đa dạng
- ✅ **Smart Search & Filter** - Tìm kiếm theo tên, danh mục, giá
- ✅ **Product Details** - Xem chi tiết sản phẩm, xuất xứ, cân nặng
- ✅ **Shopping Cart** - Giỏ hàng persistent (lưu lại khi F5)
- ✅ **Checkout** - Thanh toán đầy đủ với 3 phương thức
- ✅ **Order Tracking** - Tra cứu đơn hàng theo mã
- ✅ **Contact Form** - Liên hệ cửa hàng trực tiếp
- ✅ **Responsive Design** - Tối ưu mobile, tablet, desktop

### 🔐 Admin Features
- ✅ **Dashboard** - Thống kê KPI: sản phẩm, đơn hàng, tin nhắn, doanh thu
- ✅ **Product Management** - Thêm/sửa/xóa sản phẩm
- ✅ **Order Management** - Xem đơn hàng, cập nhật trạng thái
- ✅ **Message Management** - Xem tin nhắn từ khách hàng
- ✅ **Search & Filter** - Tìm kiếm nhanh sản phẩm
- ✅ **Inventory Tracking** - Cảnh báo khi kho < 5 sản phẩm

### 💾 Technical Features
- ✅ **JSON Storage** - Dữ liệu lưu trong file JSON
- ✅ **API Routes** - Next.js API routes untuk CRUD operations
- ✅ **State Management** - React Context API cho cart
- ✅ **Form Validation** - Validation đầy đủ trên form
- ✅ **Error Handling** - Xử lý lỗi toàn diện
- ✅ **Type Safety** - TypeScript throughout

---

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/gia-vi-viet.git
cd gia-vi-viet

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Access the Application

- **Homepage**: http://localhost:3000
- **Products**: http://localhost:3000/products
- **Admin**: http://localhost:3000/admin

---

## 📁 Project Structure

```
gia-vi-viet/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Homepage
│   ├── context/
│   │   └── CartContext.tsx        # Cart state
│   ├── api/                       # API routes
│   │   ├── products/route.ts
│   │   ├── orders/route.ts
│   │   └── messages/route.ts
│   ├── products/                  # Product pages
│   │   ├── page.tsx               # Listing
│   │   └── [id]/page.tsx          # Detail
│   ├── cart/page.tsx              # Cart page
│   ├── checkout/page.tsx          # Checkout
│   ├── orders/page.tsx            # Order tracking
│   ├── contact/page.tsx           # Contact form
│   └── admin/page.tsx             # Admin dashboard
├── components/
│   ├── Header.tsx                 # Navigation
│   ├── ProductCard.tsx            # Product card
│   ├── ProductFilters.tsx         # Search/filter
│   └── ui/                        # shadcn/ui components
├── public/
│   ├── data/                      # JSON data files
│   │   ├── products.json
│   │   ├── orders.json
│   │   └── messages.json
│   └── images/                    # Product images
├── package.json
├── tsconfig.json
├── next.config.mjs
└── README.md
```

---

## 🛠 Technology Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - Component library
- **lucide-react** - Icons

### Backend
- **Next.js API Routes** - Serverless backend
- **Node.js fs** - File system operations
- **JSON** - Data storage

### Tools
- **pnpm** - Package manager
- **VS Code** - Code editor

---

## 📊 Data Structure

### Products
```json
{
  "id": 1,
  "name": "Tiêu Đen Hạt",
  "category": "spices",
  "price": 45000,
  "image": "/images/pepper-black.jpg",
  "description": "...",
  "origin": "Việt Nam",
  "weight": "250g",
  "stock": 50
}
```

### Orders
```json
{
  "id": 1234567890,
  "items": [...],
  "total": 165000,
  "customer": {...},
  "paymentMethod": "cash",
  "status": "pending",
  "createdAt": "2026-03-12T10:30:00Z"
}
```

### Messages
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "0901234567",
  "subject": "Question about saffron",
  "message": "...",
  "createdAt": "2026-03-12T15:30:00Z"
}
```

---

## 🎯 Pages & URLs

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Landing page |
| Products | `/products` | Product listing |
| Product Detail | `/products/[id]` | Single product |
| Shopping Cart | `/cart` | View cart |
| Checkout | `/checkout` | Payment |
| Order Tracking | `/orders` | Track order |
| Contact | `/contact` | Contact form |
| Admin | `/admin` | Admin dashboard |

---

## 🎨 Design System

### Colors
- **Primary**: Amber (#b45309) - Warm, inviting
- **Neutrals**: Gray shades, white, black
- **Status**: Green (success), Blue (info), Red (error), Yellow (warning)

### Typography
- **Headlines**: Bold, clear (24px-32px)
- **Body**: Readable (14px-16px)
- **Line Height**: 1.4-1.6

### Layout
- **Flexbox** for most layouts
- **CSS Grid** for complex sections
- **Mobile-first** responsive approach

---

## 💳 Payment Methods

The checkout supports 3 payment methods:
1. **Thanh toán khi nhận hàng (COD)** - Cash on delivery
2. **Chuyển khoản ngân hàng** - Bank transfer
3. **Ví điện tử/Momo** - E-wallet

*(Currently orders are saved without actual payment processing)*

---

## 📱 Responsive Design

Fully responsive on all devices:
- **Mobile** (320px - 640px)
- **Tablet** (641px - 1024px)
- **Desktop** (1025px+)

---

## 🔒 Security Considerations

### Current Implementation
- ✅ Client-side form validation
- ✅ Required field validation
- ✅ Email format validation

### Recommended for Production
- [ ] Add authentication/login
- [ ] Password protection for admin
- [ ] HTTPS only
- [ ] Input sanitization
- [ ] Rate limiting on APIs
- [ ] CORS configuration
- [ ] Environment variables for secrets

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Push to GitHub
git push origin main

# Connect to Vercel
# https://vercel.com/new

# Vercel will auto-detect Next.js and deploy
```

### Environment Variables

No environment variables currently required for basic setup.

For production with real database:
```env
DATABASE_URL=your_database_url
PAYMENT_API_KEY=your_payment_key
```

---

## 📚 Documentation

- **[FEATURES.md](./FEATURES.md)** - Complete feature list
- **[GUIDE.md](./GUIDE.md)** - User guide for customers & admins
- **[PAGES.md](./PAGES.md)** - Page descriptions & layouts
- **[IMPLEMENTATION.md](./IMPLEMENTATION.md)** - Technical details

---

## 🔄 Future Enhancements

### Phase 2: Database
- Replace JSON with PostgreSQL/MySQL
- User accounts & authentication
- Order history per user
- Wishlist feature

### Phase 3: E-Commerce
- Payment gateway (Stripe, MoMo, PayPal)
- Inventory management
- Promotion/discount codes
- Product reviews & ratings

### Phase 4: Features
- Email notifications
- SMS order tracking
- Multi-language support
- Analytics dashboard
- Email marketing

### Phase 5: Performance
- Image optimization
- Caching strategy
- CDN integration
- Search indexing

---

## 🐛 Known Limitations

1. **Data Persistence**: Data stored in JSON files (not suitable for high-traffic production)
2. **No Authentication**: Admin dashboard has no password protection
3. **No Real Payments**: Orders are created but no actual payment processing
4. **No Email Notifications**: Contact form submissions not emailed
5. **Limited Scalability**: JSON file system won't handle thousands of orders

---

## 📞 Support & Contribution

### Report Issues
Create an issue with:
- Description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser/device information

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License - Feel free to use for personal and commercial projects.

---

## 👥 Team

Created as a complete e-commerce solution for Vietnamese spice merchants.

---

## 🙏 Credits

- **shadcn/ui** - Component library
- **Tailwind CSS** - Utility-first CSS
- **Lucide Icons** - Icon set
- **Next.js** - React framework
- **Vercel** - Deployment platform

---

## 📊 Project Stats

- **Pages**: 8
- **Components**: 20+
- **API Routes**: 3
- **Product Samples**: 12
- **Features**: 50+
- **Code**: 3000+ lines

---

## ✅ Checklist for Going Live

- [ ] Update product images with real photos
- [ ] Add real product data
- [ ] Implement authentication for admin
- [ ] Add payment gateway integration
- [ ] Set up email notifications
- [ ] Add error tracking (Sentry)
- [ ] Configure analytics
- [ ] Test on all browsers
- [ ] Test on all devices
- [ ] Set up SSL certificate
- [ ] Configure domain name
- [ ] Set up backups
- [ ] Create privacy policy
- [ ] Create terms of service

---

**Ready to launch your spice business online! 🚀**

For questions or support, please contact support@giaviviet.com
