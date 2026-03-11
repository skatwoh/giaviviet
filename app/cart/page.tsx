'use client'

import { useCart } from '@/app/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Trash2, Minus, Plus } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Giỏ hàng của bạn</h1>
            <p className="text-gray-500 text-lg mb-8">Giỏ hàng của bạn trống rỗng</p>
            <Link href="/products">
              <Button className="bg-amber-700 hover:bg-amber-800">Tiếp tục mua sắm</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Giỏ hàng của bạn</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0">
                      <div className="relative w-full h-full bg-gray-200 rounded">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.src = '/images/placeholder.png'
                          }}
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <Link href={`/products/${item.id}`}>
                        <h3 className="font-semibold text-gray-900 hover:text-amber-700">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-amber-700 font-bold mt-2">
                        {item.price.toLocaleString('vi-VN')} đ
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-4">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 border border-gray-300 rounded hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
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
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 border border-gray-300 rounded hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal & Remove */}
                    <div className="text-right">
                      <p className="text-gray-600 mb-4">
                        Tổng: <span className="font-bold text-gray-900">
                          {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                        </span>
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
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
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Tóm tắt đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Tổng sản phẩm:</span>
                  <span className="font-semibold">{items.length} sản phẩm</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tổng số lượng:</span>
                  <span className="font-semibold">{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Tổng cộng:</span>
                    <span className="font-bold text-amber-700">
                      {total.toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                </div>
                <Link href="/checkout" className="block">
                  <Button className="w-full bg-amber-700 hover:bg-amber-800 h-10">
                    Tiến hành thanh toán
                  </Button>
                </Link>
                <button
                  onClick={() => clearCart()}
                  className="w-full text-gray-600 hover:text-gray-900 text-sm"
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
