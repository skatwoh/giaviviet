'use client'

import Link from 'next/link'
import { useCart } from '@/app/context/CartContext'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Menu, X, Package } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const { items } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const cartCount = items.length

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-lg">GV</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-gray-900">Gia Vị Việt</span>
              <span className="text-xs text-gray-500 font-medium">Gia vị chất lượng cao</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            <Link href="/products" className="px-4 py-2 text-gray-700 hover:text-violet-600 font-medium text-sm transition-colors rounded-lg hover:bg-violet-50">
              Sản phẩm
            </Link>
            <Link href="/orders" className="px-4 py-2 text-gray-700 hover:text-violet-600 font-medium text-sm transition-colors rounded-lg hover:bg-violet-50 flex items-center gap-1">
              <Package className="w-4 h-4" />
              Tra cứu đơn
            </Link>
            <Link href="/contact" className="px-4 py-2 text-gray-700 hover:text-violet-600 font-medium text-sm transition-colors rounded-lg hover:bg-violet-50">
              Liên hệ
            </Link>
          </nav>

          {/* Cart Button */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative text-gray-700 hover:text-violet-600 hover:bg-violet-50">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-violet-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-1 border-t border-gray-200 pt-4">
            <Link
              href="/products"
              className="block px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 rounded-lg transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sản phẩm
            </Link>
            <Link
              href="/orders"
              className="block px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 rounded-lg transition-colors font-medium flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Package className="w-4 h-4" />
              Tra cứu đơn
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 rounded-lg transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Liên hệ
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
