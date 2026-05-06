'use client'

import Link from 'next/link'
import { Home, LogOut, Bell, Settings, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/app/context/AuthContext'
import { useRouter } from 'next/navigation'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'

export function AdminHeader() {
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 flex-1">
          <SidebarTrigger className="-ml-1 h-8 w-8 text-[#a08679]" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="relative max-w-md w-full hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="search"
              placeholder="Tìm kiếm hệ thống..."
              className="w-full bg-gray-50 rounded-lg pl-9 pr-4 py-2 text-sm border-none focus:ring-1 focus:ring-[#a08679] transition-all"
            />
          </div>
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
            <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center text-[#a08679] font-bold text-xs border border-gray-200">
              AD
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline-block">Đăng xuất</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
