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

  useEffect(() => {
    setMounted(true)
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.products || []))
  }, [])

  if (!mounted) return null

  const banners = [
    { image: '/images/hero-banner.jpg', title: 'Banner 1' },
    { image: '/images/hero-banner.jpg', title: 'Banner 2' }
  ]

  const productSections = [
    { id: 'gia-vi', title: 'Gia Vị Các Loại', category: 'gia-vi' },
    { id: 'dau-bo', title: 'Dầu, Bơ', category: 'dau-bo' },
    { id: 'do-kho', title: 'Đồ Khô', category: 'do-kho' }
  ]

  return (
    <div className="min-h-screen bg-white pb-12 font-sans">
      {/* Banner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Carousel className="w-full overflow-hidden group">
          <CarouselContent>
            {banners.map((banner, i) => (
              <CarouselItem key={i}>
                <div className="relative aspect-[21/9] w-full bg-gray-100 rounded-sm overflow-hidden border border-gray-200">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    className="object-cover"
                  />
                  {/* Mock content for banner to look like image */}
                  <div className="absolute inset-0 bg-white/40 flex items-center px-12">
                    <div className="max-w-md">
                       <h2 className="text-3xl font-bold text-brand-green leading-tight">NHIỀU MẶT HÀNG THIẾT YẾU KHÁC</h2>
                       <p className="text-gray-700 mt-2">Tất cả phục vụ cho nhà hàng, đại lý thực phẩm chế biến số lượng lớn</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Carousel>
      </section>

      {/* Product Sections */}
      {productSections.map((section) => (
        <section key={section.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-[#00483d] text-white py-3 px-4 rounded-full text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest">
              {section.title}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {products
              .filter(p => p.category === section.category)
              .map((product) => (
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

          <div className="mt-10 flex justify-center">
            <Link
              href={`/products?category=${section.id}`}
              className="px-10 py-2.5 border border-[#00483d] text-[#00483d] rounded-sm hover:bg-[#00483d] hover:text-white transition-all text-sm font-bold uppercase"
            >
              Xem thêm sản phẩm {section.title.toLowerCase()}
            </Link>
          </div>
        </section>
      ))}
    </div>
  )
}
