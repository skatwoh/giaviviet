'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Truck, Shield, Award } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-700 to-amber-800 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Gia Vị Việt - Hương vị Việt Nam Nguyên Chất
            </h1>
            <p className="text-lg text-amber-50 mb-8">
              Khám phá bộ sưu tập gia vị chất lượng cao từ Việt Nam. Từ tiêu đen hạt đến saffron cao cấp, 
              tất cả những gì bạn cần để nấu những món ăn tuyệt vời.
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50 font-bold">
                Khám phá sản phẩm
              </Button>
            </Link>
          </div>
          <div className="relative h-96 bg-amber-600 rounded-lg overflow-hidden">
            <Image
              src="/images/hero-banner.jpg"
              alt="Gia vị Việt"
              fill
              className="object-cover"
              onError={(e) => {
                e.currentTarget.src = '/images/placeholder.png'
              }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Tại sao chọn Gia Vị Việt?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="border-0 shadow-md">
              <CardContent className="pt-6 text-center">
                <Award className="w-12 h-12 text-amber-700 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Chất lượng cao</h3>
                <p className="text-gray-600 text-sm">
                  Tất cả sản phẩm được chọn lọc kỹ lưỡng để đảm bảo chất lượng tốt nhất
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="pt-6 text-center">
                <Truck className="w-12 h-12 text-amber-700 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Giao hàng nhanh</h3>
                <p className="text-gray-600 text-sm">
                  Giao hàng nhanh chóng đến tận nơi với chi phí hợp lý
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="pt-6 text-center">
                <Shield className="w-12 h-12 text-amber-700 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Bảo đảm an toàn</h3>
                <p className="text-gray-600 text-sm">
                  Tất cả sản phẩm đều qua kiểm định chất lượng nghiêm ngặt
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="pt-6 text-center">
                <Star className="w-12 h-12 text-amber-700 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Giá cạnh tranh</h3>
                <p className="text-gray-600 text-sm">
                  Mua trực tiếp từ nhà sản xuất với giá tốt nhất
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Sản phẩm nổi bật</h2>
            <Link href="/products">
              <Button variant="outline" className="border-amber-700 text-amber-700 hover:bg-amber-50">
                Xem tất cả
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Tiêu Đen Hạt', price: '45,000 đ', image: '/images/pepper-black.jpg' },
              { name: 'Saffron Cao Cấp', price: '120,000 đ', image: '/images/saffron.jpg' },
              { name: 'Dâu Tằm Hạt', price: '75,000 đ', image: '/images/cardamom.jpg' },
              { name: 'Dầu Mầm Mè', price: '125,000 đ', image: '/images/sesame-oil.jpg' },
            ].map((product) => (
              <Card key={product.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative h-48 w-full bg-gray-200 overflow-hidden rounded-t-lg">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                      onError={(e) => {
                        e.currentTarget.src = '/images/placeholder.png'
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-lg font-bold text-amber-700 mb-3">{product.price}</p>
                    <Link href="/products">
                      <Button size="sm" className="w-full bg-amber-700 hover:bg-amber-800">
                        Xem chi tiết
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-amber-700 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Nhận tin tức khuyến mãi</h2>
          <p className="mb-6 text-amber-50">
            Đăng ký nhận bản tin của chúng tôi để cập nhật những sản phẩm mới và khuyến mãi đặc biệt
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-4 py-2 rounded-md text-gray-900"
            />
            <Button className="bg-white text-amber-700 hover:bg-amber-50 font-semibold">
              Đăng ký
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">Gia Vị Việt</h3>
            <p className="text-sm">Cung cấp gia vị chất lượng cao cho các gia đình Việt Nam</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-white">Sản phẩm</Link></li>
              <li><Link href="/contact" className="hover:text-white">Liên hệ</Link></li>
              <li><Link href="/admin" className="hover:text-white">Quản lý</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Chính sách</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Về chúng tôi</a></li>
              <li><a href="#" className="hover:text-white">Điều khoản dịch vụ</a></li>
              <li><a href="#" className="hover:text-white">Chính sách bảo mật</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-sm">
              <li>Điện thoại: +84 123 456 789</li>
              <li>Email: info@giaviviet.com</li>
              <li>Địa chỉ: 123 Trần Hưng Đạo, Hà Nội</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; 2024 Gia Vị Việt. Tất cả quyền được bảo vệ.</p>
        </div>
      </footer>
    </div>
  )
}
