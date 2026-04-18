'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  ChevronRight,
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  Tablet,
  Accessibility,
  Zap,
  Gift
} from 'lucide-react'
import { useState, useEffect } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { ProductCard } from '@/components/ProductCard'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    setMounted(true)
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.products || []))
  }, [])

  if (!mounted) return null

  const mainBanners = [
    { image: '/images/hero-banner.jpg', title: 'Siêu sale cuối tháng' },
    { image: '/images/hero-banner.jpg', title: 'iPhone 15 Pro Max giá tốt' },
    { image: '/images/hero-banner.jpg', title: 'Phụ kiện giảm đến 50%' }
  ]

  const sideBanners = [
    { image: '/images/hero-banner.jpg', title: 'Thu cũ đổi mới' },
    { image: '/images/hero-banner.jpg', title: 'Trả góp 0%' }
  ]

  const categories = [
    { icon: Smartphone, label: 'Điện thoại' },
    { icon: Tablet, label: 'Máy tính bảng' },
    { icon: Laptop, label: 'Laptop' },
    { icon: Watch, label: 'Đồng hồ' },
    { icon: Headphones, label: 'Âm thanh' },
    { icon: Accessibility, label: 'Phụ kiện' },
    { icon: Zap, label: 'Máy cũ giá rẻ' },
    { icon: Gift, label: 'Khuyến mãi' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Section */}
      <section className="bg-white py-4 shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

            {/* Left Sidebar Menu */}
            <div className="hidden lg:block lg:col-span-3 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              <nav className="flex flex-col h-full bg-white">
                {categories.map((cat, i) => (
                  <Link
                    key={i}
                    href="/products"
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-red-50 hover:text-brand-red transition-colors text-[13px] font-medium border-b border-gray-50 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <cat.icon className="w-4 h-4" />
                      {cat.label}
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Middle Carousel */}
            <div className="lg:col-span-6">
              <Carousel className="w-full rounded-xl overflow-hidden shadow-md group">
                <CarouselContent>
                  {mainBanners.map((banner, i) => (
                    <CarouselItem key={i}>
                      <div className="relative aspect-[16/9] w-full bg-gray-200">
                        <Image
                          src={banner.image}
                          alt={banner.title}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/public/placeholder.jpg'
                          }}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Carousel>
            </div>

            {/* Right Static Banners */}
            <div className="hidden lg:flex lg:col-span-3 flex-col gap-3">
              {sideBanners.map((banner, i) => (
                <div key={i} className="relative flex-1 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products / New Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-brand-red rounded-full"></div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 uppercase tracking-tight">
              Sản phẩm mới
            </h2>
          </div>
          <Link href="/products" className="text-sm font-bold text-brand-red hover:underline flex items-center gap-1">
            Xem tất cả
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {products.slice(0, 10).map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              category={product.category}
            />
          ))}
        </div>
      </section>

      {/* Promotions Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { bg: 'bg-red-50', text: 'text-red-700', label: 'Flash Sale', sub: 'Giảm giá cực sốc' },
            { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Xả kho', sub: 'Hàng xịn giá hời' },
            { bg: 'bg-green-50', text: 'text-green-700', label: 'Mới về', sub: 'Hàng nóng hổi' },
            { bg: 'bg-purple-50', text: 'text-purple-700', label: 'Đặc quyền', sub: 'Dành riêng cho bạn' }
          ].map((item, i) => (
            <div key={i} className={`${item.bg} p-4 rounded-xl border border-gray-100 flex items-center justify-between group cursor-pointer hover:shadow-md transition-shadow`}>
              <div>
                <div className={`font-bold ${item.text}`}>{item.label}</div>
                <div className="text-xs text-gray-500 font-medium">{item.sub}</div>
              </div>
              <div className={`w-8 h-8 rounded-full ${item.bg.replace('50', '100')} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <ChevronRight className={`w-4 h-4 ${item.text}`} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
