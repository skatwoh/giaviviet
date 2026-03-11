'use client'

import Link from 'next/link'
import { useCart } from '@/app/context/CartContext'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Menu, Package } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const { items } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const cartCount = items.length

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Gia Vị Việt</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-amber-700 font-medium">
              Sản phẩm
            </Link>
            <Link href="/orders" className="text-gray-700 hover:text-amber-700 font-medium">
              Tra cứu đơn
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-amber-700 font-medium">
              Liên hệ
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-amber-700 font-medium">
              Quản lý
            </Link>
          </nav>

          {/* Cart Button */}
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link
              href="/products"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Sản phẩm
            </Link>
            <Link
              href="/orders"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded flex items-center"
            >
              <Package className="w-4 h-4 mr-2" />
              Tra cứu đơn
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Liên hệ
            </Link>
            <Link
              href="/admin"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Quản lý
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
