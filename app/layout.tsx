import type { Metadata } from 'next'
import { Be_Vietnam_Pro, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/app/context/CartContext'
import { AuthProvider } from '@/app/context/AuthContext'
import { Toaster } from 'sonner'
import './globals.css'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-be-vietnam-pro",
});
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Thủy Hương - Nhà phân phối gia vị Việt',
  description: 'Thủy Hương chuyên cung cấp sỉ và lẻ các loại gia vị, thực phẩm khô chất lượng cao.',
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
      <body className={`${beVietnamPro.variable} font-sans antialiased`}>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
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
