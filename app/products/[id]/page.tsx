'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useCart } from '@/app/context/CartContext'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ShoppingCart, Minus, Plus, Truck, RotateCcw, Shield } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
  origin: string
  weight: string
  stock: number
  rating?: number
  reviews?: number
}

export default function ProductDetailPage() {
  const params = useParams()
  const id = params.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [addedToCart, setAddedToCart] = useState(false)

  const { addItem } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const products = await response.json()

        const found = products.find(
            (p: Product) => p.id === parseInt(id)
        )

        setProduct(found || null)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchProducts()
    }
  }, [id])

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= (product?.stock || 1)) {
      setQuantity(value)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
      })

      toast.success(`Đã thêm ${quantity} ${product.name} vào giỏ hàng!`, {
        description: `Tổng: ${(product.price * quantity).toLocaleString('vi-VN')} đ`,
        duration: 2000,
      })

      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    }
  }

  const relatedProducts = [
    { id: 2, name: 'Tiêu Trắng', category: 'spices' },
    { id: 3, name: 'Thảo Quả', category: 'spices' },
    { id: 5, name: 'Dầu Vừng', category: 'oils' },
  ]

  if (isLoading) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-500">Đang tải...</p>
        </div>
    )
  }

  if (!product) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 text-lg mb-4">Không tìm thấy sản phẩm</p>
            <Link href="/products">
              <Button className="bg-amber-700 hover:bg-amber-800">
                Quay lại danh sách
              </Button>
            </Link>
          </div>
        </div>
    )
  }

  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Breadcrumb */}
          <div className="mb-6 animate-slideUp">
            <Link href="/products" className="text-red-600 hover:text-red-700 font-medium">
              Sản phẩm
            </Link>
            <span className="text-gray-400 mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Product Image */}
            <Card className="animate-slideInLeft shadow-lg">
              <CardContent className="p-0">
                <div className="relative h-96 w-full bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden rounded-t-lg">
                  <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Product Info */}
            <div className="animate-slideInRight">
              <div className="mb-6">
                <p className="text-red-600 font-bold text-sm uppercase tracking-wide mb-2">
                  {product.category === 'gia-vi' && 'Gia vị'}
                  {product.category === 'rau-cu' && 'Rau củ'}
                  {product.category === 'dau-bo' && 'Dầu, Bơ'}
                  {product.category === 'do-hop' && 'Đồ hộp'}
                  {product.category === 'do-kho' && 'Đồ khô'}
                  {product.category === 'bot-nau-an' && 'Bột nấu ăn'}
                  {product.category === 'mien-banh-da' && 'Miến, Bánh đa'}
                  {product.category === 'dung-cu-bep' && 'Dụng cụ bếp'}
                </p>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 mb-6">
                  {(product.price / 1000).toFixed(0)}K đ
                </p>
              </div>

              <Card className="mb-6">
                <CardContent className="pt-6 space-y-4">

                  <div className="flex justify-between">
                    <span className="text-gray-600">Xuất xứ:</span>
                    <span className="font-semibold">{product.origin}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Cân nặng:</span>
                    <span className="font-semibold">{product.weight}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Kho hàng:</span>
                    <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0
                        ? `${product.stock} sản phẩm`
                        : 'Hết hàng'}
                  </span>
                  </div>

                </CardContent>
              </Card>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Mô tả</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-gray-600">Số lượng:</span>

                <div className="flex items-center border rounded">

                  <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="p-2 hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <Input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                          handleQuantityChange(parseInt(e.target.value) || 1)
                      }
                      className="border-0 w-12 text-center"
                  />

                  <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="p-2 hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>

                </div>
              </div>

              {/* Add to Cart */}
              <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full h-12 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold transition-all duration-300 transform hover:scale-105"
              >
                <ShoppingCart className={`w-5 h-5 mr-2 transition-transform ${addedToCart ? 'scale-125' : ''}`} />
                {addedToCart ? 'Đã thêm vào giỏ!' : 'Thêm vào giỏ'}
              </Button>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t mt-6">

                <div className="text-center">
                  <Truck className="w-6 h-6 text-red-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Giao hàng nhanh</p>
                </div>

                <div className="text-center">
                  <RotateCcw className="w-6 h-6 text-red-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Hoàn trả 30 ngày</p>
                </div>

                <div className="text-center">
                  <Shield className="w-6 h-6 text-red-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Bảo hành chất lượng</p>
                </div>

              </div>

            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16 pt-8 border-t">

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Sản phẩm liên quan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((item) => (
                  <Link key={item.id} href={`/products/${item.id}`}>
                    <Card className="hover:shadow-lg cursor-pointer">
                      <CardContent className="p-4">
                        <div className="h-48 bg-gray-200 rounded mb-4 flex items-center justify-center">
                          <span className="text-gray-400">Hình ảnh</span>
                        </div>
                        <h3 className="font-semibold">{item.name}</h3>
                      </CardContent>
                    </Card>
                  </Link>
              ))}
            </div>

          </div>
        </div>
      </div>
  )
}
