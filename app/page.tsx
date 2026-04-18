'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Leaf, Truck, Shield, Clock, Award, MapPin, Phone, Mail } from 'lucide-react'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribing, setSubscribing] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      toast.error('Vui lòng nhập email của bạn')
      return
    }

    setSubscribing(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      toast.success('Cảm ơn! Bạn đã đăng ký thành công.')
      setEmail('')
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setSubscribing(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-8 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="animate-slideUp space-y-8">
            <div>
              <div className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-bold mb-6 animate-fadeIn">
                Hải Trang - Danh mục lớn, giá cả nhỏ
              </div>
              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-600 to-red-700">
                  Hải Trang
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto leading-relaxed">
                Hơn 60 năm đồng hành cùng gian bếp Việt. Chuyên cung cấp sỉ & lẻ gia vị, thực phẩm chất lượng cao.
              </p>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Từ sạp hàng số 3 Hàng Khoai những năm 60, chúng tôi tự hào cung cấp nguồn nguyên liệu tin cậy cho hàng ngàn nhà hàng trên toàn quốc.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/products" className="group">
                <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white text-lg h-14 px-8 group-hover:scale-105 transition-transform duration-300">
                  Khám phá sản phẩm
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-red-600 text-red-600 hover:bg-red-50 text-lg h-14 px-8">
                  Liên hệ chúng tôi
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slideUp">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Tại sao chọn Hải Trang?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Uy tín tạo nên thương hiệu từ những năm 1960 tại số 03 Hàng Khoai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: 'Gia vị 100% nguyên chất',
                description: 'Không có chất phụ gia, không pha trộn. Từ thiên nhiên, đến bàn ăn của bạn.'
              },
              {
                icon: Truck,
                title: 'Giao hàng nhanh chóng',
                description: 'Vận chuyển an toàn đến khắp cả nước trong 3-5 ngày làm việc.'
              },
              {
                icon: Shield,
                title: 'Chất lượng đảm bảo',
                description: 'Kiểm tra kỹ lưỡng, đóng gói cẩn thận, bảo quản tối ưu.'
              },
              {
                icon: Clock,
                title: 'Hỗ trợ 24/7',
                description: 'Đội tế nhân viên sẵn sàng giúp đỡ bạn bất cứ lúc nào.'
              },
              {
                icon: Award,
                title: 'Giá cạnh tranh',
                description: 'Chất lượng cao mà giá không tăng. Mua trực tiếp từ nhà sản xuất.'
              },
              {
                icon: Phone,
                title: 'Tin tưởng của khách hàng',
                description: 'Hàng ngàn khách hàng hài lòng đã chọn tin tưởng chúng tôi.'
              }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="animate-slideUp group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-red-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-red-500 group-hover:to-orange-500 transition-all duration-300">
                    <Icon className="w-7 h-7 text-red-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '1000+', label: 'Khách hàng hài lòng' },
              { number: '500+', label: 'Sản phẩm chất lượng' },
              { number: '5000+', label: 'Đơn hàng thành công' },
              { number: '98%', label: 'Tỉ lệ hài lòng' }
            ].map((stat, index) => (
              <div key={index} className="animate-slideUp" style={{ animationDelay: `${index * 100}ms` }}>
                <p className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</p>
                <p className="text-red-100 text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center animate-slideUp">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Bạn sẵn sàng nấu ăn ngon hơn?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Khám phá bộ sưu tập gia vị cao cấp của chúng tôi ngay hôm nay và biến mỗi bữa ăn thành một kiệt tác.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="group">
              <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white text-lg h-14 px-8 w-full sm:w-auto group-hover:scale-105 transition-transform duration-300">
                Mua ngay
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-2 border-red-600 text-red-600 hover:bg-red-50 text-lg h-14 px-8 w-full sm:w-auto">
                Gọi tư vấn
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-50 to-orange-50 border-y border-gray-200">
        <div className="max-w-2xl mx-auto text-center animate-slideUp">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nhận tin tức khuyến mãi
          </h2>
          <p className="text-gray-600 mb-8">
            Đăng ký để nhận thông tin về sản phẩm mới, khuyến mãi đặc biệt và mẹo nấu ăn từ đội của chúng tôi
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-red-600 transition-colors"
              disabled={subscribing}
            />
            <Button 
              type="submit"
              disabled={subscribing}
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold h-12 px-6 whitespace-nowrap"
            >
              {subscribing ? 'Đang gửi...' : 'Đăng ký'}
            </Button>
          </form>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Phone,
                title: 'Gọi cho chúng tôi',
                content: '094.550.1989',
                subtext: 'Bán hàng: 7:00 - 21:30'
              },
              {
                icon: Mail,
                title: 'Email',
                content: 'cuahanghaitrang@gmail.com',
                subtext: 'Hỗ trợ 24/7'
              },
              {
                icon: MapPin,
                title: 'Địa chỉ',
                content: '03 Hàng Khoai',
                subtext: 'Hoàn Kiếm, Hà Nội'
              }
            ].map((info, index) => {
              const Icon = info.icon
              return (
                <div
                  key={index}
                  className="animate-slideUp text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{info.title}</h3>
                  <p className="font-semibold text-red-600 mb-1">{info.content}</p>
                  <p className="text-sm text-gray-600">{info.subtext}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HT</span>
              </div>
              Hải Trang
            </h3>
            <p className="text-sm text-gray-500">
              Cửa hàng số 03 Hàng Khoai - Chuyên gia vị, thực phẩm cho nhà hàng và đại lý trên toàn quốc.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-white transition-colors">Sản phẩm</Link></li>
              <li><Link href="/orders" className="hover:text-white transition-colors">Tra cứu đơn</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Liên hệ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Chính sách</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Về chúng tôi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Điều khoản dịch vụ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Theo dõi chúng tôi</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">TikTok</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2024 Hải Trang. Tất cả quyền được bảo vệ.</p>
        </div>
      </footer>
    </div>
  )
}
