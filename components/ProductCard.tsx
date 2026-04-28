'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'
import { toast } from 'sonner'
import { useCart } from '@/app/context/CartContext'

interface ProductCardProps {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  stock?: number
}

export function ProductCard({ id, name, price, originalPrice, image, category, stock = 1 }: ProductCardProps) {
  const { addItem } = useCart()

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat('vi-VN', {
      maximumFractionDigits: 0
    }).format(p).replace(/,/g, '.') + '₫'
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({ id, name, price, image, quantity: 1 })
    toast.success(`Đã thêm ${name} vào giỏ hàng`)
  }

  const hasDiscount = originalPrice && originalPrice > price
  const discount = hasDiscount ? Math.round((1 - price / originalPrice) * 100) : 0

  return (
    <Card className="h-full overflow-hidden hover:shadow-2xl hover:shadow-brand-green/10 transition-all duration-500 border border-gray-100 group flex flex-col bg-white rounded-2xl">
      <Link href={`/products/${id}`} className="relative block overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-square w-full bg-white p-4">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = '/images/placeholder.png'
            }}
          />

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
              <div className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
                <span className="uppercase">SALE</span>
              </div>
              <div className="bg-amber-500 text-black text-[11px] font-black px-2 py-0.5 rounded-full shadow-lg text-center">
                -{discount}%
              </div>
            </div>
          )}

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-brand-green/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
             <span className="text-white font-bold text-xs uppercase tracking-widest bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
               Xem chi tiết
             </span>
          </div>

          {/* Brand Indicator */}
          <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center p-1 border border-gray-50 transform translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
             <div className="text-[7px] font-black text-brand-green leading-[1] text-center italic">HẢI<br/>TRANG</div>
          </div>
        </div>
      </Link>

      {/* Content */}
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-brand-green font-black uppercase tracking-widest bg-brand-green/5 px-2 py-0.5 rounded">
            {category || 'Hải Trang'}
          </span>
          {stock > 0 ? (
             <span className="text-[9px] text-green-600 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Sẵn hàng
             </span>
          ) : (
             <span className="text-[9px] text-red-500 font-bold">Hết hàng</span>
          )}
        </div>

        <Link href={`/products/${id}`} className="block mb-3">
          <h3 className="font-bold text-gray-800 text-sm md:text-base line-clamp-2 leading-tight min-h-[2.5rem] group-hover:text-brand-green transition-colors decoration-brand-green/30 decoration-2 underline-offset-4 group-hover:underline">
            {name}
          </h3>
        </Link>

        <div className="mt-auto">
          <div className="flex items-end gap-2">
            <span className="text-lg font-black text-brand-green">
              {formatPrice(price)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through mb-0.5 font-medium">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          size="sm"
          className="w-full bg-brand-green hover:bg-[#00362d] text-white font-bold text-xs h-10 rounded-xl transition-all duration-300 shadow-lg shadow-brand-green/10 hover:shadow-brand-green/20 flex items-center justify-center gap-2 uppercase tracking-wider"
        >
          <ShoppingBag className="w-4 h-4" />
          Thêm vào giỏ
        </Button>
      </CardFooter>
    </Card>
  )
}
