'use client'

import Link from 'next/link'
import Image from 'next/image'
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
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    setMounted(true)
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.products || []))

    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data || []))
  }, [])

  const [timeLeft, setTimeLeft] = useState<{h: number, m: number, s: number} | null>(null)

  useEffect(() => {
    const saleProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price)

    if (saleProducts.length === 0) {
      setTimeLeft(null)
      return
    }

    // Find the soonest sale end date among active sales
    const activeSales = saleProducts
      .filter(p => p.saleEnd)
      .map(p => new Date(p.saleEnd).getTime())
      .sort((a, b) => a - b)

    if (activeSales.length === 0) {
      setTimeLeft(null)
      return
    }

    const targetTime = activeSales[0]

    const updateTimer = () => {
      const now = new Date().getTime()
      const difference = targetTime - now

      if (difference <= 0) {
        setTimeLeft({ h: 0, m: 0, s: 0 })
        // Refresh products to update prices automatically when sale ends
        fetch('/api/products')
          .then(res => res.json())
          .then(data => setProducts(data.products || []))
        return false
      } else {
        const h = Math.floor(difference / (1000 * 60 * 60))
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const s = Math.floor((difference % (1000 * 60)) / 1000)
        setTimeLeft({ h, m, s })
        return true
      }
    }

    // Initial update
    const isActive = updateTimer()
    if (!isActive) return

    const timer = setInterval(() => {
      const stillActive = updateTimer()
      if (!stillActive) clearInterval(timer)
    }, 1000)

    return () => clearInterval(timer)
  }, [products])

  if (!mounted) return null

  const banners = [
    {
      image: '/images/hero-banner.jpg',
      title: 'Nguyên Liệu Nhà Hàng',
      subtitle: 'Cung cấp số lượng lớn, giá sỉ tốt nhất thị trường',
      cta: 'Mua ngay'
    },
    {
      image: '/images/hero-banner.jpg',
      title: 'Đồ Khô Hạng Nhất',
      subtitle: 'Hương vị truyền thống, chất lượng đảm bảo vệ sinh an toàn thực phẩm',
      cta: 'Xem bộ sưu tập'
    }
  ]

  // Show only categories that have products
  const activeCategories = categories.filter(cat =>
    products.some(p => p.category === cat.id)
  )

  const saleProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price)

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* Banner Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 py-6">
          <Carousel className="w-full overflow-hidden group rounded-xl shadow-sm">
            <CarouselContent>
              {banners.map((banner, i) => (
                <CarouselItem key={i}>
                  <div className="relative aspect-[25/9] w-full bg-[#f8fcfb] overflow-hidden">
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      fill
                      className="object-cover opacity-90"
                    />
                    {/* Gradient Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent flex items-center px-8 md:px-20">
                      <div className="max-w-xl text-white">
                        <span className="inline-block px-3 py-1 bg-amber-500 text-black text-[10px] font-bold uppercase tracking-widest mb-4 rounded-sm">
                          Thủy Hương Food
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black leading-tight uppercase italic tracking-tight">
                          {banner.title}
                        </h2>
                        <p className="text-gray-100 mt-4 text-sm md:text-lg max-w-md font-medium">
                          {banner.subtitle}
                        </p>
                        <div className="mt-8 flex gap-4">
                          <Link
                            href="/products"
                            className="bg-brand-green hover:bg-[#00382f] text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-brand-green/20"
                          >
                            {banner.cta}
                          </Link>
                          <Link
                            href="/contact"
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-3 rounded-full font-bold transition-all"
                          >
                            Liên hệ tư vấn
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-6 h-12 w-12 bg-white/20 hover:bg-white border-none text-white hover:text-brand-green opacity-0 group-hover:opacity-100 transition-all" />
            <CarouselNext className="right-6 h-12 w-12 bg-white/20 hover:bg-white border-none text-white hover:text-brand-green opacity-0 group-hover:opacity-100 transition-all" />
          </Carousel>
        </div>
      </section>

      {/* Featured Categories Quick Nav */}
      <section className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase italic">Danh mục nổi bật</h2>
            <div className="h-1 w-20 bg-brand-green mt-1"></div>
          </div>
          <Link href="/products" className="text-brand-green font-bold text-sm hover:underline">
            Xem tất cả danh mục →
          </Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.slice(0, 8).map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.id}`}
              className="group flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-brand-green hover:shadow-md transition-all text-center"
            >
              <div className="w-16 h-16 rounded-full bg-brand-green/5 flex items-center justify-center group-hover:bg-brand-green transition-colors duration-300">
                <span className="text-brand-green font-bold text-xl group-hover:text-white uppercase">
                  {cat.name.charAt(0)}
                </span>
              </div>
              <span className="text-xs font-bold text-gray-700 group-hover:text-brand-green transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Daily Sale Section */}
      {saleProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-16">
          <div className="bg-white rounded-2xl border-2 border-red-500 overflow-hidden shadow-xl">
            <div className="bg-red-500 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white text-red-600 p-2 rounded-lg animate-pulse">
                  <svg className="w-6 h-6 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-white uppercase italic tracking-wider">Khuyến Mãi Hot Trong Ngày</h2>
                  <p className="text-red-100 text-xs font-bold uppercase tracking-widest">Số lượng có hạn • Giá tốt mỗi ngày</p>
                </div>
              </div>
              {timeLeft && (
                <div className="flex items-center gap-2 text-white font-bold">
                  <span className="text-xs md:text-sm whitespace-nowrap">Kết thúc sau:</span>
                  <div className="flex gap-1">
                    <span className="bg-black/20 px-1.5 md:px-2 py-0.5 md:py-1 rounded min-w-[2rem] text-center text-sm md:text-base">
                      {timeLeft.h.toString().padStart(2, '0')}
                    </span>
                    <span className="self-center">:</span>
                    <span className="bg-black/20 px-1.5 md:px-2 py-0.5 md:py-1 rounded min-w-[2rem] text-center text-sm md:text-base">
                      {timeLeft.m.toString().padStart(2, '0')}
                    </span>
                    <span className="self-center">:</span>
                    <span className="bg-black/20 px-1.5 md:px-2 py-0.5 md:py-1 rounded min-w-[2rem] text-center text-sm md:text-base">
                      {timeLeft.s.toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {saleProducts.slice(0, 5).map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    image={product.image}
                    category={categories.find(c => c.id === product.category)?.name || ''}
                    stock={product.stock}
                    unit={product.unit}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Store Benefits */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 flex-shrink-0 bg-amber-50 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm uppercase">Chất Lượng Hạng Nhất</h4>
              <p className="text-xs text-gray-500 mt-1">Nguồn gốc rõ ràng, đạt chuẩn ATVSTP</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 flex-shrink-0 bg-blue-50 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm uppercase">Giao Hàng Siêu Tốc</h4>
              <p className="text-xs text-gray-500 mt-1">Nội thành trong vòng 2h-4h</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 flex-shrink-0 bg-green-50 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm uppercase">Giá Sỉ Tốt Nhất</h4>
              <p className="text-xs text-gray-500 mt-1">Tiết kiệm chi phí cho nhà hàng của bạn</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Sections (Dynamic) */}
      {activeCategories.map((cat) => (
        <section key={cat.id} className="max-w-7xl mx-auto px-4 mt-16">
          <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-brand-green rounded-full"></div>
              <h2 className="text-2xl font-black text-gray-900 uppercase italic tracking-tight">
                {cat.name}
              </h2>
            </div>
            <Link
              href={`/products?category=${cat.id}`}
              className="text-xs font-black text-brand-green uppercase tracking-wider hover:translate-x-1 transition-transform inline-flex items-center gap-2"
            >
              Xem tất cả <span className="text-lg">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {products
              .filter(p => p.category === cat.id)
              .slice(0, 6)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.image}
                  category={cat.name}
                  stock={product.stock}
                  unit={product.unit}
                />
              ))}
          </div>
        </section>
      ))}

      {/* Newsletter / CTA Section */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <div className="bg-brand-green rounded-3xl p-8 md:p-16 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic">Bạn cần tìm nguồn hàng sỉ?</h2>
            <p className="text-green-100 mt-4 text-lg">
              Liên hệ ngay với Nhà Phân Phối Thủy Hương để nhận bảng giá sỉ tốt nhất dành cho nhà hàng, khách sạn và đại lý.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-amber-500 hover:bg-amber-600 text-black px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl"
              >
                Nhận Báo Giá Sỉ
              </Link>
              <a
                href="tel:0368588886"
                className="bg-white hover:bg-gray-100 text-brand-green px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM19 12h2c0-4.8-4-8.8-8.8-8.8v2c3.7 0 6.8 3 6.8 6.8z"/><path d="M13 8.8h2c0-2.1-1.7-3.8-3.8-3.8v2c1 0 1.8.8 1.8 1.8z"/></svg>
                036 85 88886
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
