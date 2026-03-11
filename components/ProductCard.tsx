'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ProductCardProps {
  id: number
  name: string
  price: number
  image: string
  category: string
}

export function ProductCard({ id, name, price, image, category }: ProductCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <Link href={`/products/${id}`}>
          <div className="relative h-48 w-full bg-gray-200 overflow-hidden rounded-t-lg">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover hover:scale-105 transition-transform"
              onError={(e) => {
                e.currentTarget.src = '/images/placeholder.png'
              }}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-gray-500 mb-2">{category}</p>
        <Link href={`/products/${id}`}>
          <h3 className="font-semibold text-gray-900 hover:text-amber-700 line-clamp-2">
            {name}
          </h3>
        </Link>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2">
        <span className="text-lg font-bold text-amber-700">
          {price.toLocaleString('vi-VN')} đ
        </span>
        <Link href={`/products/${id}`}>
          <Button size="sm" className="bg-amber-700 hover:bg-amber-800">
            Xem chi tiết
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
