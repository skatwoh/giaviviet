'use client'

import * as React from 'react'
import {
  LayoutDashboard,
  Package,
  Layers,
  Hash,
  ShoppingBag,
  MessageSquare,
  Home,
  LogOut,
  ChevronRight,
  User
} from 'lucide-react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/app/context/AuthContext'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function AdminSidebar() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab') || 'overview'

  const navMain = [
    {
      title: "Tổng quan",
      url: "/admin?tab=overview",
      icon: LayoutDashboard,
      isActive: currentTab === "overview",
    },
    {
      title: "Sản phẩm",
      url: "/admin?tab=products",
      icon: Package,
      isActive: currentTab === "products",
    },
    {
      title: "Danh mục",
      url: "/admin?tab=categories",
      icon: Layers,
      isActive: currentTab === "categories",
    },
    {
      title: "Đơn vị tính",
      url: "/admin?tab=units",
      icon: Hash,
      isActive: currentTab === "units",
    },
    {
      title: "Đơn hàng",
      url: "/admin?tab=orders",
      icon: ShoppingBag,
      isActive: currentTab === "orders",
    },
    {
      title: "Tin nhắn",
      url: "/admin?tab=messages",
      icon: MessageSquare,
      isActive: currentTab === "messages",
    },
  ]

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200">
      <SidebarHeader className="h-16 flex items-center px-4 border-b">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#a08679] text-white">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-black text-sm uppercase italic tracking-tighter">Thủy Hương</span>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Management</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="px-2 py-4">
          {navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={item.isActive}
                tooltip={item.title}
                className={`h-10 transition-all ${item.isActive ? 'bg-[#a08679]/10 text-[#a08679]' : 'hover:bg-gray-100'}`}
              >
                <Link href={item.url} className="flex items-center gap-3">
                  <item.icon className={`h-5 w-5 ${item.isActive ? 'text-[#a08679]' : 'text-gray-500'}`} />
                  <span className="font-bold text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <SidebarSeparator />

        <div className="px-4 py-4">
           <SidebarMenu>
             <SidebarMenuItem>
               <SidebarMenuButton asChild className="h-10 text-gray-500 hover:text-brand-green">
                 <Link href="/" target="_blank" className="flex items-center gap-3">
                   <Home className="h-5 w-5" />
                   <span className="font-bold text-sm">Xem Storefront</span>
                 </Link>
               </SidebarMenuButton>
             </SidebarMenuItem>
           </SidebarMenu>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-gray-100">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg bg-[#a08679] text-white font-bold">AD</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                <span className="truncate font-black uppercase text-xs italic">Admin</span>
                <span className="truncate text-[10px] text-gray-500 font-bold uppercase tracking-widest">{user?.email}</span>
              </div>
              <ChevronRight className="ml-auto h-4 w-4 text-gray-400" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg bg-[#a08679] text-white">AD</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-black uppercase text-xs italic">Admin System</span>
                  <span className="truncate text-[10px] text-gray-500 font-bold uppercase tracking-widest">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <User className="h-4 w-4" />
              Tài khoản
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="gap-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
              <LogOut className="h-4 w-4" />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
