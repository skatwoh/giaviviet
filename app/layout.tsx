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
  title: 'Hải Trang - Gia vị & Thực phẩm chất lượng cao',
  description: 'Hải Trang - Chuyên cung cấp sỉ và lẻ các loại gia vị, đồ hộp, rau củ quả tươi cho nhà hàng và gia đình với hơn 60 năm kinh nghiệm.',
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
