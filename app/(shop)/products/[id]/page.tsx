'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useCart } from '@/app/context/CartContext'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  Shield,
  Share2,
  Heart,
  ChevronLeft,
  Star
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Separator } from '@/components/ui/separator'

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
}

interface Category {
  id: string
  name: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const id = params.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [addedToCart, setAddedToCart] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const { addItem } = useCart()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories')
        ])

        const productsData = await productsRes.json()
        const allProducts = productsData.products || []

        if (categoriesRes.ok) {
          setCategories(await categoriesRes.json())
        }

        const found = allProducts.find(
            (p: Product) => p.id === parseInt(id)
        )

        if (found) {
          setProduct(found)
          // Find related products (same category, excluding current)
          const related = allProducts
            .filter((p: Product) => p.category === found.category && p.id !== found.id)
            .slice(0, 4)
          setRelatedProducts(related)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchData()
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

  const getCategoryName = (catId: string) => {
    return categories.find(c => c.id === catId)?.name || catId
  }

  if (isLoading) {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#00483d] border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 font-medium">Đang tải thông tin sản phẩm...</p>
          </div>
        </div>
    )
  }

  if (!product) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center p-8 bg-white rounded-2xl shadow-sm border">
            <p className="text-gray-500 text-lg mb-6">Xin lỗi, sản phẩm này không tồn tại hoặc đã ngừng kinh doanh.</p>
            <Link href="/products">
              <Button className="bg-[#00483d] hover:bg-[#00362d] px-8">
                Quay lại cửa hàng
              </Button>
            </Link>
          </div>
        </div>
    )
  }

  return (
      <div className="min-h-screen bg-white pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">

          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between mb-8">
            <nav className="flex items-center text-sm">
              <Link href="/" className="text-gray-500 hover:text-[#00483d] transition-colors">Trang chủ</Link>
              <ChevronLeft className="w-4 h-4 mx-2 text-gray-400 rotate-180" />
              <Link href="/products" className="text-gray-500 hover:text-[#00483d] transition-colors">Sản phẩm</Link>
              <ChevronLeft className="w-4 h-4 mx-2 text-gray-400 rotate-180" />
              <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
            </nav>
            <Link href="/products">
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#00483d]">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Quay lại
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12">

            {/* Product Image Section */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-square w-full bg-gray-100 rounded-2xl overflow-hidden border">
                <Image
                    src={product.image || '/images/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                />
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-4 right-4 rounded-full shadow-md bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square relative rounded-xl overflow-hidden border bg-gray-50 cursor-pointer hover:border-[#00483d] transition-all">
                    <Image
                      src={product.image || '/images/placeholder.jpg'}
                      alt={`${product.name} preview ${i}`}
                      fill
                      className="object-cover opacity-60 hover:opacity-100"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Content Section */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none px-3">
                    {getCategoryName(product.category)}
                  </Badge>
                  <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
                    <Star className="w-4 h-4 fill-current" />
                    <span>4.9 (120+ nhận xét)</span>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
                  {product.name}
                </h1>

                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-4xl font-extrabold text-[#00483d]">
                    {product.price.toLocaleString('vi-VN')}đ
                  </span>
                  {product.price > 100000 && (
                    <span className="text-xl text-gray-400 line-through">
                      {(product.price * 1.2).toLocaleString('vi-VN')}đ
                    </span>
                  )}
                </div>

                <Separator className="my-6" />

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between py-1">
                    <span className="text-gray-500 font-medium">Xuất xứ</span>
                    <span className="text-gray-900 font-semibold">{product.origin}</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-gray-500 font-medium">Khối lượng</span>
                    <span className="text-gray-900 font-semibold">{product.weight}</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-gray-500 font-medium">Tình trạng</span>
                    <Badge variant={product.stock > 0 ? "outline" : "destructive"} className={product.stock > 0 ? "text-green-600 border-green-200 bg-green-50" : ""}>
                      {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : 'Hết hàng'}
                    </Badge>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Mô tả sản phẩm</h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {product.description}
                  </p>
                </div>

                {/* Purchase Section */}
                <div className="bg-gray-50 p-6 rounded-2xl border mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-gray-900">Chọn số lượng:</span>
                    <div className="flex items-center bg-white border rounded-lg overflow-hidden h-10 shadow-sm">
                      <button
                          onClick={() => handleQuantityChange(quantity - 1)}
                          className="px-3 hover:bg-gray-100 transition-colors border-r"
                          disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <Input
                          type="number"
                          value={quantity}
                          readOnly
                          className="border-0 w-12 text-center font-bold text-[#00483d] focus-visible:ring-0"
                      />
                      <button
                          onClick={() => handleQuantityChange(quantity + 1)}
                          className="px-3 hover:bg-gray-100 transition-colors border-l"
                          disabled={quantity >= product.stock}
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    <Button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className="sm:col-span-4 h-12 bg-[#00483d] hover:bg-[#00362d] text-white font-bold text-lg shadow-lg shadow-green-900/10 active:scale-95 transition-all"
                    >
                      <ShoppingCart className="w-5 h-5 mr-3" />
                      {addedToCart ? 'Đã thêm thành công!' : 'Thêm vào giỏ hàng'}
                    </Button>
                    <Button variant="outline" className="h-12 border-gray-300 hover:border-[#00483d] hover:text-[#00483d]">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-2 py-6 border-t border-gray-100">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-[#00483d]" />
                  </div>
                  <p className="text-[11px] font-bold text-gray-700 uppercase">Giao nhanh 2h</p>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                    <RotateCcw className="w-5 h-5 text-[#00483d]" />
                  </div>
                  <p className="text-[11px] font-bold text-gray-700 uppercase">Đổi trả 7 ngày</p>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#00483d]" />
                  </div>
                  <p className="text-[11px] font-bold text-gray-700 uppercase">100% Chính hãng</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Sản phẩm cùng loại
                </h2>
                <Link href={`/products?category=${product.category}`} className="text-[#00483d] font-bold hover:underline">
                  Xem tất cả
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {relatedProducts.map((item) => (
                    <Link key={item.id} href={`/products/${item.id}`} className="group">
                      <Card className="h-full border-none shadow-none group-hover:shadow-xl transition-all duration-300 overflow-hidden bg-gray-50">
                        <div className="aspect-[4/5] relative overflow-hidden bg-gray-200">
                          <Image
                            src={item.image || '/images/placeholder.jpg'}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <CardContent className="p-4 bg-white">
                          <h3 className="font-bold text-gray-900 group-hover:text-[#00483d] transition-colors truncate mb-1">
                            {item.name}
                          </h3>
                          <p className="text-[#00483d] font-extrabold">
                            {item.price.toLocaleString('vi-VN')}đ
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter / CTA */}
          <div className="mt-20 bg-[#00483d] rounded-3xl p-8 sm:p-12 text-center text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full -ml-32 -mb-32 blur-3xl" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-4xl font-bold mb-4">Tham gia cùng gia đình Hải Trang</h2>
              <p className="text-white/80 mb-8">Đăng ký nhận tin để không bỏ lỡ các ưu đãi đặc biệt và mẹo nấu ăn hữu ích hàng tuần.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input placeholder="Địa chỉ email của bạn" className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12 rounded-xl focus:bg-white/20" />
                <Button className="bg-amber-500 hover:bg-amber-600 text-[#00483d] font-bold px-8 h-12 rounded-xl">Đăng ký ngay</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
