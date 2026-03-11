'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, CheckCircle, Clock, Truck, Package } from 'lucide-react'
import Link from 'next/link'

export default function OrdersPage() {
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderId.trim()) return

    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/orders')
      const orders = await response.json()
      const found = orders.find((o: any) => o.id === parseInt(orderId) || o.id.toString() === orderId)
      
      if (found) {
        setOrder(found)
      } else {
        setError('Không tìm thấy đơn hàng')
        setOrder(null)
      }
    } catch (err) {
      setError('Lỗi khi tìm kiếm')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'pending': return <Clock className="w-6 h-6 text-yellow-600" />
      case 'confirmed': return <CheckCircle className="w-6 h-6 text-blue-600" />
      case 'delivered': return <CheckCircle className="w-6 h-6 text-green-600" />
      default: return <Package className="w-6 h-6 text-gray-600" />
    }
  }

  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending': return 'Chờ xác nhận'
      case 'confirmed': return 'Đã xác nhận - Đang chuẩn bị giao'
      case 'delivered': return 'Đã giao hàng'
      case 'cancelled': return 'Đã hủy'
      default: return 'Không xác định'
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tra cứu đơn hàng</h1>

        {/* Search Form */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Nhập mã đơn hàng (VD: 1234567890)"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              </div>
              <Button 
                type="submit"
                disabled={loading}
                className="bg-amber-700 hover:bg-amber-800 h-12"
              >
                {loading ? 'Đang tìm kiếm...' : 'Tìm kiếm'}
              </Button>
            </form>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Details */}
        {order && (
          <div className="space-y-6">
            {/* Order Header */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Đơn hàng #{order.id}</CardTitle>
                    <p className="text-sm text-gray-600 mt-2">
                      {new Date(order.createdAt).toLocaleString('vi-VN')}
                    </p>
                  </div>
                  <div className={`px-4 py-2 rounded-lg font-semibold ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Order Status Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Trạng thái giao hàng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Step 1: Pending */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        order.status !== 'pending' ? 'bg-green-100' : 'bg-yellow-100'
                      }`}>
                        {order.status !== 'pending' ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <Clock className="w-6 h-6 text-yellow-600" />
                        )}
                      </div>
                      {order.status !== 'pending' && order.status !== 'cancelled' && (
                        <div className="w-1 h-8 bg-green-300 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="font-semibold text-gray-900">Đơn hàng của bạn đã được nhận</p>
                      <p className="text-sm text-gray-600">Chúng tôi sẽ xác nhận sớm nhất</p>
                    </div>
                  </div>

                  {/* Step 2: Confirmed */}
                  {order.status !== 'pending' && order.status !== 'cancelled' && (
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          order.status !== 'confirmed' ? 'bg-green-100' : 'bg-blue-100'
                        }`}>
                          {order.status !== 'confirmed' ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          ) : (
                            <Clock className="w-6 h-6 text-blue-600" />
                          )}
                        </div>
                        {order.status !== 'confirmed' && (
                          <div className="w-1 h-8 bg-green-300 mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="font-semibold text-gray-900">Đơn hàng đã được xác nhận</p>
                        <p className="text-sm text-gray-600">Chúng tôi đang chuẩn bị hàng để giao cho bạn</p>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Delivered */}
                  {order.status === 'delivered' && (
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100">
                          <Truck className="w-6 h-6 text-green-600" />
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="font-semibold text-gray-900">Đơn hàng đã được giao</p>
                        <p className="text-sm text-gray-600">Cảm ơn bạn đã mua hàng từ Gia Vị Việt!</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Customer & Delivery Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin khách hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Họ và tên</p>
                    <p className="font-semibold text-gray-900">{order.customer.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Số điện thoại</p>
                    <p className="font-semibold text-gray-900">{order.customer.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900">{order.customer.email}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Địa chỉ giao hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Địa chỉ</p>
                    <p className="font-semibold text-gray-900">{order.customer.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Quận/Huyện</p>
                    <p className="font-semibold text-gray-900">{order.customer.district}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Thành phố</p>
                    <p className="font-semibold text-gray-900">{order.customer.city}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Chi tiết sản phẩm</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-amber-700">
                        {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-bold text-gray-900">Tổng cộng:</span>
                    <span className="font-bold text-amber-700 text-xl">
                      {order.total.toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Back Button */}
            <div className="flex gap-3">
              <Link href="/products" className="flex-1">
                <Button className="w-full bg-amber-700 hover:bg-amber-800">
                  Tiếp tục mua sắm
                </Button>
              </Link>
              <Button 
                variant="outline"
                onClick={() => {
                  setOrder(null)
                  setOrderId('')
                }}
                className="flex-1"
              >
                Tìm kiếm đơn hàng khác
              </Button>
            </div>
          </div>
        )}

        {!order && !error && (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                Nhập mã đơn hàng để tra cứu thông tin giao hàng
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
