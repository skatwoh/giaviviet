'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, LogOut, Package, Settings, LogIn, UserPlus, LayoutDashboard } from 'lucide-react'
import { useAuth } from '@/app/context/AuthContext'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'

export function AccountDropdown() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
    )
  }

  if (!user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex flex-col items-center justify-center hover:opacity-80 transition-opacity outline-none">
            <User className="w-6 h-6" />
            <span className="text-[11px] font-medium mt-1">Tài khoản</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Chào mừng quý khách!</p>
              <p className="text-xs leading-none text-muted-foreground">
                Đăng nhập để nhận nhiều ưu đãi
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/login" className="cursor-pointer">
              <LogIn className="mr-2 h-4 w-4" />
              <span>Đăng nhập</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/register" className="cursor-pointer">
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Đăng ký tài khoản</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex flex-col items-center justify-center hover:opacity-80 transition-opacity outline-none">
          <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-[#a08679] font-bold text-[10px] border border-amber-200">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <span className="text-[11px] font-medium mt-1 truncate max-w-[60px]">
            {user.name.split(' ').pop()}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Hồ sơ cá nhân</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile?tab=orders" className="cursor-pointer">
              <Package className="mr-2 h-4 w-4" />
              <span>Đơn hàng của tôi</span>
            </Link>
          </DropdownMenuItem>
          {user.role === 'admin' && (
            <DropdownMenuItem asChild>
              <Link href="/admin" className="cursor-pointer text-amber-700">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Quản trị hệ thống</span>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link href="/profile?tab=settings" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Cài đặt</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 focus:text-red-600 cursor-pointer"
          onClick={() => {
            logout()
            router.push('/')
            toast.info('Đã đăng xuất')
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
