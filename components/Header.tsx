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
            {/* Mobile Menu Trigger */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="flex items-center">
                <span className="font-bold text-2xl tracking-tight">HẢI TRANG</span>
                <div className="ml-1 mt-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15 8H21L16.5 12L18 18L12 14.5L6 18L7.5 12L3 8H9L12 2Z" fill="white" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl relative group hidden sm:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full bg-white text-gray-800 rounded-sm pl-4 pr-10 h-10 focus:outline-none focus:ring-1 focus:ring-brand-green"
                />
                <button className="absolute right-0 top-0 h-10 px-3 flex items-center justify-center text-gray-400">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Utility Icons */}
            <div className="flex items-center space-x-6">
              <button className="hidden md:flex flex-col items-center justify-center hover:opacity-80 transition-opacity">
                <User className="w-6 h-6" />
                <span className="text-[11px] font-medium mt-1">Tài khoản</span>
              </button>

              <Link href="/cart" className="relative flex flex-col items-center justify-center hover:opacity-80 transition-opacity">
                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                  {cartCount === 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                      0
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-medium mt-1">Giỏ hàng</span>
              </Link>

              <div className="hidden md:flex items-center gap-1 border border-white/30 px-2 py-1 rounded-sm">
                <span className="text-xl">🇻🇳</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
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

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute left-0 top-0 h-full w-[280px] bg-white p-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-lg text-brand-green">Danh mục</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="space-y-4">
              {categories.map((cat, i) => (
                <Link
                  key={i}
                  href={cat.href}
                  className="block py-2 text-gray-700 font-medium border-b border-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      <OrderModal open={orderModalOpen} onOpenChange={setOrderModalOpen} />
    </header>
  )
}
