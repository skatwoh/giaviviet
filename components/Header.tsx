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
  ChevronUp
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { OrderModal } from './OrderModal'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { CartDropdown } from './CartDropdown'
import { AccountDropdown } from './AccountDropdown'

export function Header() {
  const { items } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [productsExpanded, setProductsExpanded] = useState(true)
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const cartCount = items.length

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data)
        }
      })
      .catch(err => console.error('Error fetching categories:', err))
  }, [])

  return (
    <header className="w-full sticky top-0 z-50 shadow-sm font-sans">
      {/* Main Header */}
      <div className="bg-[#a08679] text-white py-2">
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
            <Link href="/" className="flex-shrink-0 flex items-center gap-1 group">
              <div className="flex items-center">
                <span className="font-black text-xl sm:text-2xl tracking-tight uppercase italic text-white group-hover:text-amber-100 transition-colors">THỦY HƯƠNG</span>
                <div className="ml-1 -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                  <div className="bg-amber-400 p-1 rounded-full">
                    <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 text-[#a08679]" fill="currentColor" />
                  </div>
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
              <AccountDropdown />

              <CartDropdown />

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
      <div className="bg-[#fcfaf9] border-b border-gray-100 py-2.5 hidden md:block overflow-x-auto scrollbar-hide">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
          <Link href="/" className="p-2.5 border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition-all shadow-sm flex-shrink-0 group">
            <Home className="w-5 h-5 text-[#a08679] group-hover:scale-110 transition-transform" />
          </Link>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="px-5 py-2.5 bg-white border border-gray-200 rounded-md text-[13px] font-bold text-gray-600 hover:text-brand-green hover:border-brand-green transition-all whitespace-nowrap shadow-sm hover:shadow-md uppercase tracking-tight"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Overlay (All devices) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-all duration-300" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute left-0 top-0 h-full w-[320px] bg-white shadow-2xl overflow-y-auto flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 bg-[#a08679] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="font-black text-lg tracking-tight uppercase italic">THỦY HƯƠNG</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 py-4">
              <Link
                href="/"
                className="flex items-center gap-4 px-6 py-4 text-sm font-black text-gray-800 hover:bg-gray-50 transition-colors uppercase italic tracking-wide"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="w-1 h-4 bg-[#a08679] rounded-full"></div>
                TRANG CHỦ
              </Link>

              <div className="border-y border-gray-50">
                <button
                  onClick={() => setProductsExpanded(!productsExpanded)}
                  className="w-full flex items-center justify-between px-6 py-4 text-sm font-black text-gray-800 hover:bg-gray-50 transition-colors uppercase italic tracking-wide"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-1 h-4 bg-[#a08679] rounded-full"></div>
                    <span>SẢN PHẨM</span>
                  </div>
                  {productsExpanded ? <ChevronUp className="w-5 h-5 text-[#a08679]" /> : <ChevronDown className="w-5 h-5 text-[#a08679]" />}
                </button>

                <div className={cn("bg-gray-50/50 overflow-hidden transition-all duration-300", productsExpanded ? "max-h-[2000px] opacity-100 pb-4" : "max-h-0 opacity-0")}>
                  <Link
                    href="/products"
                    className="block px-8 py-3 text-sm font-medium text-gray-700 hover:bg-brand-green/5 border-l-4 border-transparent hover:border-brand-green transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Tất cả sản phẩm
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products?category=${cat.id}`}
                      className="block px-8 py-3 text-sm text-gray-600 hover:bg-brand-green/5 border-l-4 border-transparent hover:border-brand-green transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/blog"
                className="flex items-center gap-4 px-6 py-4 text-sm font-black text-gray-800 border-t border-gray-50 hover:bg-gray-50 transition-colors uppercase italic tracking-wide"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="w-1 h-4 bg-[#a08679] rounded-full"></div>
                BLOG
              </Link>

              <Link
                href="/gioi-thieu"
                className="flex items-center gap-4 px-6 py-4 text-sm font-black text-gray-800 border-t border-gray-50 hover:bg-gray-50 transition-colors uppercase italic tracking-wide"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="w-1 h-4 bg-[#a08679] rounded-full"></div>
                GIỚI THIỆU
              </Link>

              <div className="mt-8 pt-8 border-t border-gray-100 px-8 pb-10">
                <span className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">BẠN CẦN HỖ TRỢ?</span>

                <div className="space-y-6">
                  <a href="tel:0368588886" className="flex items-center gap-4 text-gray-700 hover:text-brand-green transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-all">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold tracking-tight">036 85 88886</span>
                  </a>
                  <a href="mailto:giatothuyhuong@gmail.com" className="flex items-center gap-4 text-gray-700 hover:text-brand-green transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold tracking-tight">giatothuyhuong@gmail.com</span>
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
