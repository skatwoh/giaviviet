'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Star } from 'lucide-react'
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
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({ id, name, price, image, quantity: 1 })
    toast.success(`Đã thêm ${name} vào giỏ hàng`)
  }

  return (
    <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-100 group flex flex-col bg-white rounded-xl">
      <Link href={`/products/${id}`} className="relative block">
        {/* Image Container */}
        <div className="relative aspect-square w-full bg-gray-50 overflow-hidden p-2">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src = '/images/placeholder.png'
            }}
          />
          {/* Discount Badge (Mock) */}
          <div className="absolute top-2 left-2 bg-brand-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            -15%
          </div>
        </div>
      </Link>

      {/* Content */}
      <CardContent className="p-3 flex-1 flex flex-col">
        <Link href={`/products/${id}`} className="block mb-2">
          <h3 className="font-bold text-gray-800 text-xs md:text-[13px] line-clamp-2 leading-tight min-h-[2.5rem] group-hover:text-brand-red transition-colors">
            {name}
          </h3>
        </Link>

        <div className="mt-auto">
          {/* Rating (Mock) */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-[10px] text-gray-400 font-medium">(24)</span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-sm md:text-base font-bold text-brand-red">
              {formatPrice(price)}
            </span>
            <span className="text-[10px] text-gray-400 line-through">
              {formatPrice(price * 1.15)}
            </span>
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-3 pt-0">
        <Button
          onClick={handleAddToCart}
          size="sm"
          className="w-full bg-brand-red hover:bg-brand-red-dark text-white font-bold text-[11px] h-8 rounded-lg transition-colors flex items-center justify-center gap-1.5"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          MUA NGAY
        </Button>
      </CardFooter>
    </Card>
  )
}
