'use client'

import Link from 'next/link'
import { useCart } from '@/app/context/CartContext'
import { Button } from '@/components/ui/button'
import {
  ShoppingCart,
  Menu,
  X,
  Package,
  Search,
  Phone,
  MapPin,
  User,
  ChevronDown,
  Mail,
  Home,
  ChevronUp,
  Plus,
  Minus,
  Trash2
} from 'lucide-react'
import { useState } from 'react'
import { OrderModal } from './OrderModal'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverAnchor,
} from "@/components/ui/popover"
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export function Header() {
  const { items, updateQuantity, removeItem, total } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [productsExpanded, setProductsExpanded] = useState(true)
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const cartCount = items.length

  const categories = [
    { name: 'Rau Củ Quả', href: '/products?category=rau-cu' },
    { name: 'Gia Vị Các Loại', href: '/products?category=gia-vi' },
    { name: 'Dầu, Bơ', href: '/products?category=dau-bo' },
    { name: 'Đồ Hộp', href: '/products?category=do-hop' },
    { name: 'Đồ Khô', href: '/products?category=do-kho' },
    { name: 'Bột Nấu Ăn', href: '/products?category=bot-nau-an' },
    { name: 'Miến, Bánh Đa', href: '/products?category=mien-banh-da' },
    { name: 'Dụng Cụ Bếp', href: '/products?category=dung-cu-bep' }
  ]

  return (
    <header className="w-full sticky top-0 z-50 shadow-sm font-sans">
      {/* Main Header */}
      <div className="bg-[#00483d] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Menu Trigger (All devices) */}
            <button
              className="flex flex-col items-center justify-center text-white group hover:opacity-80 transition-opacity"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              <span className="text-[10px] font-bold mt-0.5">MENU</span>
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-1">
              <div className="flex items-center">
                <span className="font-bold text-xl sm:text-2xl tracking-tight">HẢI TRANG</span>
                <div className="ml-0.5">
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" fill="white" />
                </div>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-md relative group">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full bg-white text-gray-800 rounded-sm pl-3 sm:pl-4 pr-10 h-9 sm:h-10 text-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
                />
                <button className="absolute right-0 top-0 h-9 sm:h-10 px-2 sm:px-3 flex items-center justify-center text-gray-400">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Utility Icons */}
            <div className="hidden lg:flex items-center space-x-6">
              <button className="flex flex-col items-center justify-center hover:opacity-80 transition-opacity">
                <User className="w-6 h-6" />
                <span className="text-[11px] font-medium mt-1">Tài khoản</span>
              </button>

              {/* Cart Dropdown */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="relative flex flex-col items-center justify-center hover:opacity-80 transition-opacity focus:outline-none">
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
                <PopoverContent className="w-96 p-0" align="end" sideOffset={10}>
                  <PopoverPrimitive.Arrow className="fill-white" width={20} height={10} />
                  <div className="p-4 bg-white rounded-md">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900 uppercase tracking-wider text-center flex-1">
                        GIỎ HÀNG
                      </h3>
                    </div>
                    <Separator className="mb-4" />

                    {items.length === 0 ? (
                      <div className="py-8 text-center text-gray-500">
                        <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-20" />
                        <p>Giỏ hàng của bạn đang trống</p>
                      </div>
                    ) : (
                      <>
                        <ScrollArea className="h-[300px] pr-4">
                          <div className="space-y-4">
                            {items.map((item) => (
                              <div key={item.id} className="flex gap-4">
                                <div className="h-16 w-16 rounded border overflow-hidden flex-shrink-0">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                  <div>
                                    <div className="flex justify-between items-start gap-2">
                                      <h4 className="text-sm font-bold text-gray-800 leading-tight line-clamp-2">
                                        {item.name}
                                      </h4>
                                      <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                    </div>
                                    <p className="text-[10px] text-gray-500 mt-1 uppercase">Đơn vị: chiếc</p>
                                  </div>

                                  <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center border rounded-sm">
                                      <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="p-1 hover:bg-gray-100 transition-colors"
                                      >
                                        <Minus className="w-3 h-3" />
                                      </button>
                                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                                      <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="p-1 hover:bg-gray-100 transition-colors"
                                      >
                                        <Plus className="w-3 h-3" />
                                      </button>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">
                                      {item.price.toLocaleString('vi-VN')}đ
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>

                        <Separator className="my-4" />

                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-bold text-gray-600 uppercase">TỔNG TIỀN:</span>
                          <span className="text-lg font-bold text-red-600">
                            {total.toLocaleString('vi-VN')}đ
                          </span>
                        </div>

                        <Link href="/cart" className="block">
                          <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12 rounded-sm uppercase tracking-wide">
                            XEM GIỎ HÀNG
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </PopoverContent>
              </Popover>

              <div className="flex items-center gap-1 border border-white/30 px-2 py-1 rounded-sm">
                <span className="text-xl">🇻🇳</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            {/* Mobile Cart Icon (shown on sm and md, hidden on lg where the utility icons are) */}
            <Link href="/cart" className="lg:hidden relative flex flex-col items-center justify-center">
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-[#f8f8f8] border-b border-gray-200 py-2 hidden md:block overflow-x-auto scrollbar-hide">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-2">
          <Link href="/" className="p-2 border border-gray-300 rounded-sm bg-white hover:bg-gray-50 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00483d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </Link>
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={cat.href}
              className="px-4 py-2 bg-white border border-gray-300 rounded-sm text-[13px] font-medium text-gray-700 hover:text-brand-green hover:border-brand-green transition-all whitespace-nowrap min-w-[120px] text-center shadow-sm"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Menu Overlay (All devices) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute left-0 top-0 h-full w-[300px] bg-white shadow-2xl overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="inline-block p-1">
                <Home className="w-6 h-6 text-gray-700" />
              </Link>
            </div>

            <nav className="py-2">
              <Link
                href="/"
                className="block px-6 py-4 text-sm font-bold text-gray-800 hover:bg-gray-50 uppercase"
                onClick={() => setMobileMenuOpen(false)}
              >
                TRANG CHỦ
              </Link>

              <div className="border-t border-gray-50">
                <button
                  onClick={() => setProductsExpanded(!productsExpanded)}
                  className="w-full flex items-center justify-between px-6 py-4 text-sm font-bold text-gray-800 hover:bg-gray-50 uppercase"
                >
                  <span>SẢN PHẨM</span>
                  {productsExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>

                <div className={cn("bg-white overflow-hidden transition-all duration-300", productsExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0")}>
                  <Link
                    href="/products"
                    className="block px-8 py-3 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Xem tất cả &quot;Sản phẩm&quot;
                  </Link>
                  {categories.map((cat, i) => (
                    <Link
                      key={i}
                      href={cat.href}
                      className="block px-8 py-3 text-sm text-gray-600 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/blog"
                className="block px-6 py-4 text-sm font-bold text-gray-800 border-t border-gray-50 hover:bg-gray-50 uppercase"
                onClick={() => setMobileMenuOpen(false)}
              >
                BLOG
              </Link>

              <Link
                href="/gioi-thieu"
                className="block px-6 py-4 text-sm font-bold text-gray-800 border-t border-gray-50 hover:bg-gray-50 uppercase"
                onClick={() => setMobileMenuOpen(false)}
              >
                GIỚI THIỆU
              </Link>

              <div className="mt-4 pt-4 border-t border-gray-100 px-6">
                <span className="block text-xs font-bold text-gray-400 uppercase mb-4">BẠN CẦN HỖ TRỢ?</span>

                <div className="space-y-4">
                  <a href="tel:0945501989" className="flex items-center gap-3 text-gray-700 hover:text-brand-green">
                    <Phone className="w-5 h-5" />
                    <span className="text-sm font-medium">094.550.1989</span>
                  </a>
                  <a href="mailto:cuahanghaitrang@gmail.com" className="flex items-center gap-3 text-gray-700 hover:text-brand-green">
                    <Mail className="w-5 h-5" />
                    <span className="text-sm font-medium">cuahanghaitrang@gmail.com</span>
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}

      <OrderModal open={orderModalOpen} onOpenChange={setOrderModalOpen} />
    </header>
  )
}
