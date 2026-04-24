'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '@/app/context/CartContext'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export function CartDropdown() {
  const { items, removeFromCart, updateQuantity } = useCart()

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartCount = items.length

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative flex flex-col items-center justify-center hover:opacity-80 transition-opacity outline-none">
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium mt-1">Giỏ hàng</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 shadow-xl border-gray-100" align="end">
        <div className="p-4 bg-gray-50/50">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Giỏ hàng của tôi</h3>
            <span className="text-xs text-gray-500">{cartCount} sản phẩm</span>
          </div>
        </div>

        <Separator />

        {items.length === 0 ? (
          <div className="p-8 text-center">
            <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <ShoppingCart className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">Giỏ hàng của bạn đang trống</p>
            <Button asChild variant="link" className="mt-2 text-[#00483d]">
              <Link href="/products">Tiếp tục mua sắm</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[300px]">
              <div className="p-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded border border-gray-100 overflow-hidden flex-shrink-0 bg-gray-50">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate mb-1">
                        {item.name}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border rounded-md h-7">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="px-1 hover:text-[#00483d]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-1 hover:text-[#00483d]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-[#00483d]">
                          {(item.price * item.quantity).toLocaleString()}đ
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors self-start pt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t bg-gray-50/30">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600 font-medium">Tổng tiền:</span>
                <span className="text-base font-bold text-red-600">
                  {subtotal.toLocaleString()}đ
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/cart">Xem giỏ hàng</Link>
                </Button>
                <Button asChild size="sm" className="w-full bg-[#00483d] hover:bg-[#00362e]">
                  <Link href="/checkout">Thanh toán</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}
