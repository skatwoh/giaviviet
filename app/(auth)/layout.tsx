import Link from 'next/link'
import { ArrowLeft, ShoppingBag } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Simplified Header for Auth Pages */}
      <header className="w-full h-16 border-b bg-white flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-[#00483d]">
          <ShoppingBag className="h-6 w-6" />
          <span>Hải Trang</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#00483d] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại trang chủ
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>

      <footer className="py-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Cửa hàng Hải Trang. All rights reserved.
      </footer>
    </div>
  )
}
