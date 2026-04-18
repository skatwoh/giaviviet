'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronRight, Phone, MapPin, Search, Star, Zap, TrendingUp, Package, ShieldCheck } from 'lucide-react'
import { useState, useEffect } from 'react'
import { ProductCard } from '@/components/ProductCard'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error("Fetch error:", err)
        setLoading(false)
      })
  }, [])

  const categories = [
    { id: 'gia-vi', name: 'Gia vị các loại' },
    { id: 'rau-cu', name: 'Rau củ quả tươi' },
    { id: 'dau-bo', name: 'Dầu ăn, Bơ' },
    { id: 'do-hop', name: 'Thực phẩm đồ hộp' },
    { id: 'do-kho', name: 'Hàng khô cao cấp' },
    { id: 'bot-nau-an', name: 'Bột nấu ăn' },
    { id: 'mien-banh-da', name: 'Miến, Bánh đa' },
    { id: 'dung-cu-bep', name: 'Dụng cụ nhà bếp' },
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      {/* Main Layout Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Left Column: Sidebar Categories */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-red-700 text-white px-4 py-3 flex items-center gap-2">
                <Package className="w-5 h-5" />
                <h2 className="font-bold text-sm uppercase">Danh mục sản phẩm</h2>
              </div>
              <ul className="divide-y divide-gray-100">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/products?category=${cat.id}`}
                      className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors group"
                    >
                      <span className="font-medium">{cat.name}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-600 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Box */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="font-bold text-red-700 mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                HỖ TRỢ TRỰC TUYẾN
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-bold">BÁN HÀNG</span>
                  <span className="text-lg font-bold text-red-600">094.550.1989</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-bold">EMAIL</span>
                  <span className="text-sm font-medium">cuahanghaitrang@gmail.com</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Column: Hero & Product Sections */}
          <main className="lg:col-span-3 space-y-8">

            {/* Hero Slider Area */}
            <div className="relative aspect-[21/9] w-full bg-gradient-to-r from-red-600 to-orange-600 rounded-lg overflow-hidden shadow-lg flex items-center px-12">
               <div className="relative z-10 max-w-lg text-white space-y-4">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase">Thương hiệu uy tín từ 1960</span>
                  <h1 className="text-4xl md:text-5xl font-black leading-tight italic">HẢI TRANG <br/><span className="text-2xl not-italic font-medium text-red-100">Danh mục lớn, giá cả nhỏ</span></h1>
                  <p className="text-red-50 text-sm md:text-base line-clamp-2">Chuyên cung cấp sỉ và lẻ gia vị, thực phẩm khô cao cấp cho nhà hàng và đại lý trên toàn quốc.</p>
                  <Link href="/products" className="inline-block">
                    <Button size="lg" className="bg-white text-red-700 hover:bg-red-50 font-bold rounded-full shadow-lg">
                      MUA NGAY <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
               </div>
               <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://product.hstatic.net/200000506201/product/bo_lac_dinh_hao_400g_57d7676e6a124c7fba6b0e8b1b1e1b1b_large.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
            </div>

            {/* Product Section 1: Sản phẩm mới */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-red-600 pb-2">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-red-600 fill-red-600" />
                  SẢN PHẨM MỚI
                </h2>
                <Link href="/products" className="text-sm font-bold text-red-600 hover:underline flex items-center">
                  Xem tất cả <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {loading ? (
                  Array(3).fill(0).map((_, i) => <div key={i} className="h-72 bg-white rounded-lg animate-pulse"></div>)
                ) : (
                  products.slice(0, 3).map((product: any) => (
                    <ProductCard key={product.id} {...product} />
                  ))
                )}
              </div>
            </section>

            {/* Product Section 2: Sản phẩm nổi bật */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-red-600 pb-2">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-red-600" />
                  SẢN PHẨM NỔI BẬT
                </h2>
                <Link href="/products" className="text-sm font-bold text-red-600 hover:underline flex items-center">
                  Xem tất cả <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {loading ? (
                  Array(3).fill(0).map((_, i) => <div key={i} className="h-72 bg-white rounded-lg animate-pulse"></div>)
                ) : (
                  products.slice(3, 6).map((product: any) => (
                    <ProductCard key={product.id} {...product} />
                  ))
                )}
              </div>
            </section>

            {/* Why Us / Trust Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: ShieldCheck, title: "Chất lượng cao", desc: "Sản phẩm được kiểm định" },
                  { icon: Package, title: "Đóng gói kỹ", desc: "Giao hàng an toàn" },
                  { icon: Star, title: "Uy tín 60 năm", desc: "Thương hiệu lâu đời" },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg flex items-center gap-4 border border-gray-100 shadow-sm">
                    <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
            </section>

          </main>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4 col-span-1 md:col-span-2">
              <h3 className="text-lg font-black text-red-700 italic">CỬA HÀNG GIA VỊ HẢI TRANG</h3>
              <p className="text-sm text-gray-600 max-w-sm">Hơn 60 năm chuyên cung cấp gia vị, đồ hộp, thực phẩm khô cao cấp. Nơi đặt niềm tin của các nhà hàng, đại lý trên toàn quốc.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                   <MapPin className="w-4 h-4 text-red-600" />
                   <span>Địa chỉ: 03 Hàng Khoai, Hoàn Kiếm, Hà Nội</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                   <Phone className="w-4 h-4 text-red-600" />
                   <span>Điện thoại: 094.550.1989</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase">Thông tin</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/contact" className="hover:text-red-600">Liên hệ</Link></li>
                <li><Link href="/products" className="hover:text-red-600">Sản phẩm</Link></li>
                <li><Link href="/orders" className="hover:text-red-600">Tra cứu đơn hàng</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase">Đăng ký nhận tin</h4>
              <p className="text-xs text-gray-500 mb-4">Nhận thông tin khuyến mãi sớm nhất</p>
              <div className="flex">
                <input type="text" placeholder="Email của bạn" className="bg-gray-50 border border-gray-200 px-3 py-2 text-xs w-full focus:outline-none focus:border-red-600" />
                <Button className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 rounded-none">GỬI</Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
