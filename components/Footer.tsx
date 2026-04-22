import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 font-sans">
      {/* Thank You Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative w-full h-[180px] rounded-sm overflow-hidden bg-brand-green/90">
          <Image
            src="/images/hero-banner.jpg"
            alt="Thank you banner"
            fill
            className="object-cover mix-blend-overlay opacity-50"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm border border-white/30">
                <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-widest">Trân trọng cảm ơn!</h2>
            </div>
            <p className="text-sm md:text-base opacity-90 max-w-2xl">
              Cảm ơn quý Khách đã tin tưởng lựa chọn Hải Trang là nhà cung cấp phân phối của quý Khách!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Bar */}
      <div className="bg-white border-y border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <div className="text-center md:text-left">
            <span className="text-lg font-bold text-gray-800">Liên hệ ĐẶT HÀNG nhận ngay </span>
            <span className="text-lg font-bold text-orange-600 italic uppercase">Ưu đãi!</span>
          </div>
          <div className="flex items-center gap-2 text-brand-green font-bold text-xl">
            <Phone className="w-6 h-6 fill-current" />
            <a href="tel:0945501989">094.550.1989</a>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <MapPin className="w-5 h-5 text-brand-green shrink-0" />
            <span>03 Hàng Khoai, p. Đồng Xuân, Hoàn Kiếm, Hà Nội</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b-2 border-brand-green pb-2 inline-block">Về Hải Trang</h3>
            <p className="text-sm text-gray-600 leading-relaxed text-justify">
              Cửa hàng số 03 Hàng Khoai ra đời từ những năm 60. Hơn 60 năm hoạt động, cửa hàng nay lấy tên là Hải Trang đã phân phối các sản phẩm đa dạng từ nguyên liệu, gia vị, rau củ quả tươi, đồ hộp gia vị cho các nhà hàng trên toàn quốc.
            </p>
            <div className="space-y-1 text-sm text-gray-700 font-medium">
              <p>Hải Trang được điều hành bởi <span className="text-gray-900 font-bold uppercase">Hộ kinh doanh Tạ Minh Hà</span></p>
              <p className="text-xs text-gray-500 font-normal mt-2">
                Theo Giấy Chứng Nhận Đăng Ký Kinh Doanh Số: 01C8019223<br />
                Đăng ký lần đầu ngày 06 tháng 11 năm 2012<br />
                Đăng ký thay đổi lần thứ 2, ngày 29 tháng 11 năm 2019<br />
                Được cấp bởi Phòng Tài Chính - Kế Hoạch UBND Quận Hoàn Kiếm<br />
                MST: 0105981751
              </p>
            </div>
            <div className="pt-4">
              <div className="relative w-40 h-14 bg-[#0a66c2]/0 rounded border border-blue-500 flex items-center justify-center overflow-hidden">
                 <div className="bg-blue-600 text-white p-1 absolute top-0 left-0 right-0 text-[8px] text-center font-bold uppercase">Đã thông báo</div>
                 <div className="flex items-center gap-2 px-2 pt-2">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-blue-600"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    <div className="flex flex-col">
                       <span className="text-blue-800 font-bold text-[10px] leading-tight uppercase">Bộ công thương</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Support Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b-2 border-brand-green pb-2 inline-block">Hỗ trợ khách hàng</h3>
            <ul className="space-y-3">
              {[
                { label: 'Tìm kiếm', href: '/search' },
                { label: 'Giới thiệu', href: '/about' },
                { label: 'Điều khoản dịch vụ', href: '/terms' },
                { label: 'Chính sách bảo mật', href: '/privacy' },
                { label: 'Chính sách giao hàng', href: '/shipping' },
                { label: 'Chính sách đổi trả', href: '/returns' },
                { label: 'Chính sách thanh toán', href: '/payment' },
                { label: 'Liên hệ', href: '/contact' }
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-brand-green transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b-2 border-brand-green pb-2 inline-block">Chăm sóc khách hàng</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 group">
                <div className="p-2.5 bg-gray-100 rounded-full text-gray-600 group-hover:bg-brand-green group-hover:text-white transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xl font-black text-gray-900 tracking-tight">094.550.1989</p>
                  <p className="text-xs text-gray-500">Hotline hỗ trợ 24/7</p>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-2.5 bg-gray-100 rounded-full text-gray-600 group-hover:bg-brand-green group-hover:text-white transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">cuahanghaitrang@gmail.com</p>
                  <p className="text-xs text-gray-500">Email phản hồi</p>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <h3 className="text-lg font-bold text-gray-900 border-b-2 border-brand-green pb-2 inline-block">Theo dõi Hải Trang</h3>
              <div className="flex items-center gap-3">
                {[
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Twitter, label: 'Twitter' },
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Youtube, label: 'Youtube' }
                ].map((social) => (
                  <button key={social.label} className="w-10 h-10 border border-gray-200 rounded flex items-center justify-center text-gray-500 hover:bg-brand-green hover:text-white hover:border-brand-green transition-all">
                    <social.icon className="w-5 h-5" />
                  </button>
                ))}
                <button className="w-10 h-10 border border-gray-200 rounded flex items-center justify-center text-gray-500 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all font-bold">
                  G+
                </button>
              </div>
            </div>
          </div>

          {/* Business Info Column */}
          <div className="space-y-6 bg-gray-50 p-6 rounded-sm border border-gray-100">
             <div className="space-y-4">
                <div>
                   <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Địa chỉ:</p>
                   <p className="text-sm text-gray-800 font-medium">Số 03 Hàng Khoai, Phường Đồng Xuân, Quận Hoàn Kiếm, Hà Nội</p>
                </div>
                <div>
                   <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Điện thoại:</p>
                   <p className="text-sm text-gray-800 font-medium">094.550.1989</p>
                </div>
                <div>
                   <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Email:</p>
                   <p className="text-sm text-gray-800 font-medium">cuahanghaitrang@gmail.com</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-gray-500 font-medium">
            © {new Date().getFullYear()} Cửa hàng Hải Trang. All rights reserved. Thiết kế bởi Hải Trang Team.
          </p>
        </div>
      </div>
    </footer>
  )
}
