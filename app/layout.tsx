import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/app/context/CartContext'
import { Header } from '@/components/Header'
import { Toaster } from 'sonner'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Cửa hàng Hải Trang - Gia vị và thực phẩm sạch',
  description: 'Cửa hàng Hải Trang chuyên cung cấp các loại gia vị, dầu ăn, thực phẩm khô và dụng cụ bếp chất lượng cao.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className="font-sans antialiased">
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
        <Toaster
          position="top-right"
          richColors
          closeButton
          theme="light"
        />
        <Analytics />
      </body>
    </html>
  )
}
