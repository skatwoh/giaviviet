'use client'

import Link from 'next/link'
import { useCart } from '@/app/context/CartContext'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Menu, X, Package, Search, Phone, MapPin, Mail } from 'lucide-react'
import { useState } from 'react'
import { OrderModal } from './OrderModal'
import { Input } from '@/components/ui/input'

export function Header() {
  const { items } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const cartCount = items.length

  return (
    <header className="bg-white sticky top-0 z-40">
      {/* Tier 1: Top Bar */}
      <div className="bg-red-700 text-white text-xs py-2 px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span className="font-medium">Hotline: 094.550.1989</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Địa chỉ: 03 Hàng Khoai, Hoàn Kiếm, Hà Nội</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/contact" className="hover:underline">Liên hệ</Link>
            <button onClick={() => setOrderModalOpen(true)} className="hover:underline">Kiểm tra đơn hàng</button>
          </div>
        </div>
      </div>

      {/* Tier 2: Main Header (Logo, Search, Cart) */}
      <div className="border-b border-gray-100 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group shrink-0">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-xl">HT</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-xl text-red-700 tracking-tight leading-none mb-1">HẢI TRANG</span>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Gia vị & Thực phẩm sạch</span>
            </div>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl relative group">
            <Input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full pl-4 pr-12 h-11 border-2 border-red-600 focus:ring-0 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button size="icon" className="absolute right-1 top-1 h-9 w-9 rounded-full bg-red-600 hover:bg-red-700">
              <Search className="w-4 h-4 text-white" />
            </Button>
          </div>

          {/* Cart & Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden lg:flex items-center gap-2 text-red-600 mr-4">
              <div className="w-10 h-10 border-2 border-red-100 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-bold leading-none">HỖ TRỢ 24/7</span>
                <span className="text-sm font-bold leading-none mt-1">094.550.1989</span>
              </div>
            </div>

            <Link href="/cart">
              <Button variant="ghost" className="relative h-11 px-4 hover:bg-red-50 text-gray-700 hover:text-red-700 border border-gray-100 md:border-none">
                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold border-2 border-white">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:block ml-2 font-bold text-sm">GIỎ HÀNG</span>
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Tier 3: Navigation Bar (Desktop) */}
      <nav className="bg-white border-b border-gray-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-1 h-12">
            <Link href="/" className="px-5 h-full flex items-center text-red-700 font-bold text-sm hover:bg-red-50 transition-colors border-b-2 border-red-600">
              TRANG CHỦ
            </Link>
            <Link href="/products" className="px-5 h-full flex items-center text-gray-700 font-bold text-sm hover:bg-red-50 hover:text-red-700 transition-colors">
              SẢN PHẨM
            </Link>
            <Link href="/contact" className="px-5 h-full flex items-center text-gray-700 font-bold text-sm hover:bg-red-50 hover:text-red-700 transition-colors">
              LIÊN HỆ
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-b border-gray-200 pb-6 animate-fadeIn">
          <div className="px-4 pt-4 pb-2">
            <div className="relative mb-4">
              <Input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full pl-4 pr-12 h-10 border-red-600 focus:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-red-600" />
            </div>
            <div className="space-y-1">
              <Link
                href="/"
                className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors font-bold border-b border-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                TRANG CHỦ
              </Link>
              <Link
                href="/products"
                className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors font-bold border-b border-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                SẢN PHẨM
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors font-bold border-b border-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                LIÊN HỆ
              </Link>
              <button
                onClick={() => {
                  setOrderModalOpen(true)
                  setMobileMenuOpen(false)
                }}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors font-bold flex items-center gap-2"
              >
                <Package className="w-5 h-5" />
                ĐƠN HÀNG CỦA TÔI
              </button>
            </div>

            <div className="mt-6 p-4 bg-red-50 rounded-xl">
              <div className="flex items-center gap-3 text-red-700 mb-3">
                <Phone className="w-5 h-5" />
                <span className="font-bold">094.550.1989</span>
              </div>
              <div className="flex items-center gap-3 text-red-700">
                <MapPin className="w-5 h-5" />
                <span className="text-xs font-medium">03 Hàng Khoai, Hoàn Kiếm, Hà Nội</span>
              </div>
            </div>
          </div>
        </nav>
      )}

      <OrderModal open={orderModalOpen} onOpenChange={setOrderModalOpen} />
    </header>
  )
}
