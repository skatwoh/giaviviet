'use client'

import Link from 'next/link'
import { LayoutDashboard, Home, LogOut, Bell, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-xl text-amber-700">
            <LayoutDashboard className="h-6 w-6" />
            <span className="hidden sm:inline-block">Hải Trang Admin</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" target="_blank">
            <Button variant="ghost" size="sm" className="hidden sm:flex gap-2">
              <Home className="h-4 w-4" />
              Xem trang chủ
            </Button>
          </Link>

          <div className="flex items-center gap-2 border-l pl-4 ml-2">
            <Button variant="ghost" size="icon" className="text-gray-500">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-xs border border-amber-200">
              AD
            </div>
            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline-block">Đăng xuất</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
