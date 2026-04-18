'use client'

import { useCart } from '@/app/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Trash2, Minus, Plus, ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16 animate-slideUp">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Giỏ hàng của bạn trống</h1>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Hãy khám phá các sản phẩm gia vị tuyệt vời của chúng tôi và thêm chúng vào giỏ hàng
            </p>
            <Link href="/products">
              <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold">
                Tiếp tục mua sắm
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-slideUp">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Giỏ hàng của bạn</h1>
          <p className="text-gray-600">Bạn có {items.length} sản phẩm trong giỏ hàng</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <Card key={item.id} className="animate-slideUp shadow-md hover:shadow-lg transition-shadow border-gray-200" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0">
                      <div className="relative w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden group">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = '/images/placeholder.png'
                          }}
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <Link href={`/products/${item.id}`}>
                        <h3 className="font-semibold text-gray-900 hover:text-red-600 transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-red-600 font-bold mt-2">
                        {(item.price / 1000).toFixed(0)}K đ
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-4">
                        <button
                          onClick={() => {
                            updateQuantity(item.id, item.quantity - 1)
                            if (item.quantity - 1 === 0) {
                              toast.success(`Đã xóa ${item.name} khỏi giỏ hàng`)
                            }
                          }}
                          className="p-1 border-2 border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-red-600" />
                        </button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value) || 1)
                          }
                          className="w-12 text-center border-gray-300"
                          min="1"
                        />
                        <button
                          onClick={() => {
                            updateQuantity(item.id, item.quantity + 1)
                            toast.success(`Cập nhật số lượng ${item.name}`)
                          }}
                          className="p-1 border-2 border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal & Remove */}
                    <div className="text-right">
                      <p className="text-gray-600 mb-4">
                        Tổng: <span className="font-bold text-red-600">
                          {(item.price * item.quantity / 1000).toFixed(0)}K đ
                        </span>
                      </p>
                      <button
                        onClick={() => {
                          removeItem(item.id)
                          toast.success(`Đã xóa ${item.name}`)
                        }}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-20 animate-slideInRight shadow-lg border-gray-200">
              <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-gray-200">
                <CardTitle className="text-red-900">Tóm tắt đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="flex justify-between text-gray-600">
                  <span>Tổng sản phẩm:</span>
                  <span className="font-semibold text-gray-900">{items.length} sản phẩm</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tổng số lượng:</span>
                  <span className="font-semibold text-gray-900">{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-4">
                  <div className="flex justify-between text-xl">
                    <span className="font-semibold">Tổng cộng:</span>
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                      {(total / 1000).toFixed(0)}K đ
                    </span>
                  </div>
                </div>
                <Link href="/checkout" className="block">
                  <Button className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 h-11 font-bold text-white transition-all duration-300 hover:scale-105">
                    Tiến hành thanh toán
                  </Button>
                </Link>
                <button
                  onClick={() => {
                    clearCart()
                    toast.success('Đã xóa giỏ hàng')
                  }}
                  className="w-full text-gray-600 hover:text-red-600 hover:bg-red-50 text-sm font-medium py-2 rounded-lg transition-colors"
                >
                  Xóa giỏ hàng
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
