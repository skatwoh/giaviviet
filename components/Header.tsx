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
  ChevronDown
} from 'lucide-react'
import { useState } from 'react'
import { OrderModal } from './OrderModal'
import { Input } from '@/components/ui/input'

export function Header() {
  const { items } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const cartCount = items.length

  const categories = [
    'Điện thoại', 'Laptop', 'Apple', 'Máy tính bảng',
    'Âm thanh', 'Đồng hồ', 'Phụ kiện', 'Thu cũ đổi mới', 'Tin tức'
  ]

  return (
    <header className="w-full sticky top-0 z-50 shadow-sm">
      {/* Top Bar */}
      <div className="bg-brand-red text-white py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-medium">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Xem hệ thống 60 cửa hàng
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              Hotline: 1800.6018 (07:30 - 21:30)
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/news" className="hover:opacity-80 transition-opacity">Tin công nghệ</Link>
            <Link href="/contact" className="hover:opacity-80 transition-opacity">Liên hệ</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            {/* Mobile Menu Trigger */}
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-brand-red rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  D
                </div>
                <div className="hidden sm:block leading-none">
                  <div className="font-bold text-lg text-brand-red tracking-tighter">DI ĐỘNG VIỆT</div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase">Chuyển giao giá trị vượt trội</div>
                </div>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl relative group hidden sm:block">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Bạn cần tìm gì?"
                  className="w-full bg-gray-100 border-none rounded-full pl-10 pr-4 h-10 focus-visible:ring-1 focus-visible:ring-brand-red"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Utility Icons */}
            <div className="flex items-center space-x-1 sm:space-x-3">
              <button
                onClick={() => setOrderModalOpen(true)}
                className="hidden md:flex flex-col items-center justify-center text-gray-600 hover:text-brand-red transition-colors px-2"
              >
                <Package className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] font-bold whitespace-nowrap uppercase">Tra cứu đơn</span>
              </button>

              <Link href="/cart" className="relative p-2 text-gray-600 hover:text-brand-red transition-colors flex flex-col items-center">
                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-brand-red text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold border-2 border-white">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden md:block text-[10px] font-bold mt-0.5 uppercase">Giỏ hàng</span>
              </Link>

              <button className="hidden md:flex flex-col items-center justify-center text-gray-600 hover:text-brand-red transition-colors px-2">
                <User className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] font-bold uppercase">Đăng nhập</span>
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="mt-3 sm:hidden">
            <div className="relative">
              <Input
                type="text"
                placeholder="Bạn cần tìm gì?"
                className="w-full bg-gray-100 border-none rounded-full pl-10 pr-4 h-10"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white border-b border-gray-200 hidden md:block overflow-x-auto scrollbar-hide">
        <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-between">
          <div className="flex items-center space-x-6 h-full">
            {categories.map((cat, i) => (
              <Link
                key={i}
                href="/products"
                className="text-[13px] font-semibold text-gray-800 hover:text-brand-red transition-colors h-full flex items-center border-b-2 border-transparent hover:border-brand-red whitespace-nowrap"
              >
                {cat}
                {['Điện thoại', 'Apple', 'Phụ kiện'].includes(cat) && <ChevronDown className="w-3 h-3 ml-1" />}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute left-0 top-0 h-full w-[280px] bg-white p-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-lg text-brand-red">Danh mục</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="space-y-4">
              {categories.map((cat, i) => (
                <Link
                  key={i}
                  href="/products"
                  className="block py-2 text-gray-700 font-medium border-b border-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat}
                </Link>
              ))}
              <button
                onClick={() => {
                  setOrderModalOpen(true)
                  setMobileMenuOpen(false)
                }}
                className="w-full text-left py-2 text-gray-700 font-medium border-b border-gray-100 flex items-center gap-2"
              >
                <Package className="w-4 h-4" />
                Tra cứu đơn hàng
              </button>
            </nav>
          </div>
        </div>
      )}

      <OrderModal open={orderModalOpen} onOpenChange={setOrderModalOpen} />
    </header>
  )
}
