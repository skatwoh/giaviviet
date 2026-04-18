'use client'

import { useState } from 'react'
import { useCart } from '@/app/context/CartContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { CheckCircle, DollarSign, Smartphone, Banknote, Heart } from 'lucide-react'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'bank' | 'mobile'>('cash')
  const [orderId, setOrderId] = useState('')
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    district: '',
    notes: '',
  })

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">Giỏ hàng của bạn trống rỗng</p>
            <Link href="/products">
              <Button className="bg-amber-700 hover:bg-amber-800">Quay lại danh sách</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const orderData = {
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total,
        customer: formData,
        paymentMethod: paymentMethod,
        status: 'pending',
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        const result = await response.json()
        setOrderId(result.id || `ĐH${Date.now()}`)
        setOrderPlaced(true)
        clearCart()
        setTimeout(() => {
          router.push('/')
        }, 3000)
      }
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Lỗi khi đặt hàng. Vui lòng thử lại.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-gray-50 flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-lg">
          {/* Success Card */}
          <Card className="border-0 shadow-2xl">
            <CardContent className="pt-12 text-center space-y-8">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse"></div>
                  <CheckCircle className="w-20 h-20 text-green-500 relative z-10" />
                </div>
              </div>

              {/* Success Message */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Đặt hàng thành công!</h2>
                <p className="text-gray-600 text-lg">Cảm ơn bạn đã tin tưởng Hải Trang</p>
              </div>

              {/* Order ID - PROMINENT */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6 space-y-2">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">Mã đơn hàng</p>
                <p className="text-4xl font-bold text-red-700 font-mono break-all">{orderId}</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(orderId)
                    alert('Đã sao chép mã đơn hàng!')
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-medium mt-3 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors inline-block"
                >
                  Sao chép mã
                </button>
              </div>

              {/* Important Information */}
              <div className="space-y-4 bg-blue-50 border border-blue-200 rounded-lg p-5">
                <div className="flex gap-3">
                  <div className="text-2xl flex-shrink-0">📧</div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 text-sm">Xác nhận qua email</p>
                    <p className="text-xs text-gray-600">Hóa đơn và thông tin giao hàng đã gửi đến email</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="text-2xl flex-shrink-0">📞</div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 text-sm">Chúng tôi sẽ liên hệ</p>
                    <p className="text-xs text-gray-600">Trong vòng 2 giờ để xác nhận đơn hàng</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="text-2xl flex-shrink-0">🚚</div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 text-sm">Giao hàng dự kiến</p>
                    <p className="text-xs text-gray-600">3-5 ngày làm việc tùy vị trí</p>
                  </div>
                </div>
              </div>

              {/* How to Track */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Cách tra cứu đơn hàng:</span> Sử dụng mã đơn hàng ở trên tại trang{' '}
                  <Link href="/orders" className="text-red-600 hover:text-red-700 font-medium hover:underline">
                    Tra cứu đơn hàng
                  </Link>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <Link href="/orders" className="col-span-2 md:col-span-1">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium h-11">
                    Tra cứu đơn
                  </Button>
                </Link>
                <Link href="/products" className="col-span-2 md:col-span-1">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium h-11">
                    Tiếp tục mua
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-gray-500">Chuyển hướng trang chủ trong 3 giây...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Thanh toán</h1>
        <p className="text-gray-600 mb-8">Hoàn tất đơn hàng của bạn</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin khách hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Họ và tên *
                    </label>
                    <Input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      required
                      placeholder="Nhập họ và tên"
                      className="border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại *
                    </label>
                    <Input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      placeholder="Nhập số điện thoại"
                      className="border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Nhập email"
                      className="border-gray-300"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Địa chỉ giao hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Địa chỉ chi tiết *
                    </label>
                    <Input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="Nhập địa chỉ"
                      className="border-gray-300"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Thành phố *
                      </label>
                      <Input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        placeholder="Thành phố"
                        className="border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quận/Huyện *
                      </label>
                      <Input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        required
                        placeholder="Quận/Huyện"
                        className="border-gray-300"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Phương thức thanh toán</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'cash' 
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300 hover:border-red-200'
                  }`}
                    onClick={() => setPaymentMethod('cash')}>
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                      className="w-4 h-4 accent-red-600 mr-3"
                    />
                    <Banknote className="w-5 h-5 text-red-600 mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900">Thanh toán khi nhận hàng</p>
                      <p className="text-sm text-gray-600">COD - An toàn và tiện lợi</p>
                    </div>
                  </label>

                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'bank'
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300 hover:border-red-200'
                  }`}
                    onClick={() => setPaymentMethod('bank')}>
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === 'bank'}
                      onChange={() => setPaymentMethod('bank')}
                      className="w-4 h-4 accent-red-600 mr-3"
                    />
                    <DollarSign className="w-5 h-5 text-red-600 mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900">Chuyển khoản ngân hàng</p>
                      <p className="text-sm text-gray-600">Chuyển khoản trước giao hàng</p>
                    </div>
                  </label>

                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'mobile'
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300 hover:border-red-200'
                  }`}
                    onClick={() => setPaymentMethod('mobile')}>
                    <input
                      type="radio"
                      name="payment"
                      value="mobile"
                      checked={paymentMethod === 'mobile'}
                      onChange={() => setPaymentMethod('mobile')}
                      className="w-4 h-4 accent-red-600 mr-3"
                    />
                    <Smartphone className="w-5 h-5 text-red-600 mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900">Ví điện tử/Momo</p>
                      <p className="text-sm text-gray-600">Thanh toán qua ứng dụng</p>
                    </div>
                  </label>
                </CardContent>
              </Card>

              {/* Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Ghi chú đơn hàng</CardTitle>
                </CardHeader>
                <CardContent>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Ghi chú (tùy chọn)"
                    rows={4}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </CardContent>
              </Card>

              <Button
                type="submit"
                disabled={isSubmitting || !formData.customerName || !formData.phoneNumber || !formData.email}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 h-12 font-semibold text-white"
              >
                {isSubmitting ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Tóm tắt đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-semibold">
                        {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="font-semibold">{total.toLocaleString('vi-VN')} đ</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span className="font-semibold">Miễn phí</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="font-bold text-gray-900">Tổng cộng:</span>
                    <span className="font-bold text-amber-700 text-lg">
                      {total.toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
