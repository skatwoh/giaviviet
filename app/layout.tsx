import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/app/context/CartContext'
import { Header } from '@/components/Header'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Gia Vị Việt - Gia vị chất lượng cao',
  description: 'Cửa hàng gia vị Việt Nam chất lượng cao, bao gồm tiêu, saffron, dầu mầm mè và nhiều sản phẩm khác',
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
        <Analytics />
      </body>
    </html>
  )
}
