'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart, ArrowRight } from 'lucide-react'

interface ProductCardProps {
  id: number
  name: string
  price: number
  image: string
  category: string
}

export function ProductCard({ id, name, price, image, category }: ProductCardProps) {
  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      'gia-vi': 'Gia vị',
      'rau-cu': 'Rau củ',
      'dau-bo': 'Dầu, Bơ',
      'do-hop': 'Đồ hộp',
      'do-kho': 'Đồ khô',
      'bot-nau-an': 'Bột nấu ăn',
      'mien-banh-da': 'Miến, Bánh đa',
      'dung-cu-bep': 'Dụng cụ bếp'
    }
    return labels[cat] || cat
  }

  return (
    <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-200 group">
      {/* Image Container */}
      <div className="relative h-56 w-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <Link href={`/products/${id}`}>
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src = '/images/placeholder.png'
            }}
          />
        </Link>
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full">
            {getCategoryLabel(category)}
          </span>
        </div>
      </div>

      {/* Content */}
      <CardContent className="pt-4 pb-3">
        <Link href={`/products/${id}`} className="group/link">
          <h3 className="font-semibold text-gray-900 hover:text-red-600 line-clamp-2 group-hover/link:text-red-600 transition-colors text-sm md:text-base">
            {name}
          </h3>
        </Link>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex flex-col gap-3 pt-2 pb-4">
        <div className="w-full flex items-baseline gap-1">
          <span className="text-2xl md:text-xl font-bold text-red-600">
            {(price / 1000).toFixed(0)}K
          </span>
          <span className="text-xs text-gray-500">đ</span>
        </div>
        <Link href={`/products/${id}`} className="w-full">
          <Button 
            size="sm" 
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-medium group/btn"
          >
            <ArrowRight className="w-4 h-4 mr-1 group-hover/btn:translate-x-1 transition-transform" />
            Xem chi tiết
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
