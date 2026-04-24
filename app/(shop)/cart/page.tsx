'use client'

import { useCart } from '@/app/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, ShieldCheck, Truck } from 'lucide-react'
import { toast } from 'sonner'
import { Separator } from '@/components/ui/separator'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50/50">
        <div className="max-w-md w-full px-6 text-center">
          <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-amber-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Giỏ hàng của bạn trống</h1>
          <p className="text-gray-600 mb-8">
            Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng. Hãy khám phá các sản phẩm chất lượng của chúng tôi nhé!
          </p>
          <Link href="/products">
            <Button className="bg-[#00483d] hover:bg-[#00362e] text-white px-8 h-12 rounded-full font-bold">
              Tiếp tục mua sắm
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-8">
          <Link href="/products" className="text-[#00483d] hover:underline flex items-center gap-1 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Tiếp tục mua sắm
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Giỏ hàng ({items.length} sản phẩm)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-4">
            <Card className="border-none shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-gray-100/50 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <div className="col-span-6">Sản phẩm</div>
                  <div className="col-span-2 text-center">Giá</div>
                  <div className="col-span-2 text-center">Số lượng</div>
                  <div className="col-span-2 text-right">Tổng</div>
                </div>

                <div className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 sm:p-6 items-center">
                      {/* Product Info */}
                      <div className="col-span-1 sm:col-span-6 flex gap-4">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-100 relative">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <Link href={`/products/${item.id}`} className="font-bold text-gray-900 hover:text-[#00483d] transition-colors line-clamp-2">
                            {item.name}
                          </Link>
                          <p className="text-xs text-gray-500 mt-1">Mã SP: #{item.id}</p>
                          <button
                            onClick={() => {
                              removeItem(item.id)
                              toast.success(`Đã xóa ${item.name}`)
                            }}
                            className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1 mt-2 sm:hidden"
                          >
                            <Trash2 className="w-3 h-3" />
                            Xóa
                          </button>
                        </div>
                      </div>

                      {/* Price - Desktop */}
                      <div className="hidden sm:block col-span-2 text-center font-medium">
                        {item.price.toLocaleString('vi-VN')} đ
                      </div>

                      {/* Quantity */}
                      <div className="col-span-1 sm:col-span-2 flex justify-center">
                        <div className="flex items-center border rounded-md h-9">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-full flex items-center justify-center hover:bg-gray-50 text-gray-500"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-10 text-center text-sm border-x h-full focus:outline-none"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-full flex items-center justify-center hover:bg-gray-50 text-gray-500"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Total & Remove - Desktop */}
                      <div className="col-span-1 sm:col-span-2 text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-bold text-[#00483d]">
                            {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                          </span>
                          <button
                            onClick={() => {
                              removeItem(item.id)
                              toast.success(`Đã xóa ${item.name}`)
                            }}
                            className="hidden sm:flex text-gray-400 hover:text-red-500 transition-colors mt-1 items-center gap-1 text-[10px] uppercase font-bold"
                          >
                            <Trash2 className="w-3 h-3" />
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center">
               <button
                  onClick={() => {
                    if (confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')) {
                      clearCart()
                      toast.success('Đã xóa giỏ hàng')
                    }
                  }}
                  className="text-gray-500 hover:text-red-600 text-sm flex items-center gap-2 px-4 py-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Xóa toàn bộ giỏ hàng
                </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-none shadow-sm sticky top-24">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Tóm tắt đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính ({items.reduce((sum, i) => sum + i.quantity, 0)} sản phẩm)</span>
                    <span className="font-medium text-gray-900">{total.toLocaleString('vi-VN')} đ</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển</span>
                    <span className="text-green-600 font-medium text-sm">Tính khi thanh toán</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-end">
                  <span className="font-bold text-lg text-gray-900">Tổng cộng</span>
                  <div className="text-right">
                    <p className="text-2xl font-black text-[#00483d]">{total.toLocaleString('vi-VN')} đ</p>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">Đã bao gồm VAT</p>
                  </div>
                </div>

                <Link href="/checkout" className="block pt-4">
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 h-14 text-lg font-bold text-white shadow-lg shadow-amber-600/20 rounded-xl transition-all hover:scale-[1.02] active:scale-95">
                    TIẾN HÀNH THANH TOÁN
                  </Button>
                </Link>

                <div className="space-y-3 pt-6 border-t border-gray-100 mt-6">
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Cam kết sản phẩm chính hãng, chất lượng 100%</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <Truck className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span>Giao hàng nhanh toàn quốc, đóng gói cẩn thận</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
