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
  image: string
  category: string
}

export function ProductCard({ id, name, price, image, category }: ProductCardProps) {
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

  const discount = 15 // Mock discount

  return (
    <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-200 group flex flex-col bg-white rounded-none">
      <Link href={`/products/${id}`} className="relative block">
        {/* Image Container */}
        <div className="relative aspect-square w-full bg-white overflow-hidden p-2">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src = '/images/placeholder.png'
            }}
          />
          {/* Discount Badge */}
          <div className="absolute top-0 left-0 bg-red-600 text-white text-[11px] font-bold px-1.5 py-0.5">
            -{discount}%
          </div>
          {/* Brand Logo Overlay (Hải Trang) */}
          <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[#00483d]/10 flex items-center justify-center p-1">
             <div className="text-[6px] font-bold text-[#00483d] leading-[1] text-center">HẢI<br/>TRANG</div>
          </div>
        </div>
      </Link>

      {/* Content */}
      <CardContent className="p-3 flex-1 flex flex-col">
        <div className="text-[10px] text-gray-400 uppercase font-medium mb-1">
          {category === 'spices' ? 'HẢI TRANG' : 'THƯƠNG HIỆU'}
        </div>
        <Link href={`/products/${id}`} className="block mb-2">
          <h3 className="font-bold text-gray-800 text-xs md:text-[13px] line-clamp-2 leading-tight min-h-[2.5rem] group-hover:text-brand-green transition-colors">
            {name}
          </h3>
        </Link>

        <div className="mt-auto">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900">
              {formatPrice(price)}
            </span>
            <span className="text-[11px] text-gray-400 line-through">
              {formatPrice(Math.round(price / (1 - discount / 100)))}
            </span>
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-3 pt-0">
        <Button
          onClick={handleAddToCart}
          size="sm"
          variant="outline"
          className="w-full border-[#00483d] text-[#00483d] hover:bg-[#00483d] hover:text-white font-bold text-[11px] h-8 rounded-sm transition-all flex items-center justify-center gap-1.5 uppercase"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          CHỌN MUA
        </Button>
      </CardFooter>
    </Card>
  )
}
