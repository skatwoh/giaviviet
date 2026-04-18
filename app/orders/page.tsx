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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 md:py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Tra cứu đơn hàng</h1>
          <p className="text-gray-600">Nhập mã đơn hàng để xem tình trạng giao hàng</p>
        </div>

        {/* Search Form */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="pt-8 pb-8">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-4" />
                <input
                  type="text"
                  placeholder="Nhập mã đơn hàng của bạn"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-base"
                />
              </div>
              <Button 
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 h-12 text-white font-medium px-6 sm:px-8 sm:w-auto"
              >
                {loading ? 'Đang tìm...' : 'Tìm kiếm'}
              </Button>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                <p className="text-red-800 font-medium">Không tìm thấy đơn hàng</p>
                <p className="text-red-600 text-sm mt-1">Vui lòng kiểm tra lại mã đơn hàng</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Details */}
        {order && (
          <div className="space-y-6">
            {/* Order Header */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl md:text-3xl">Đơn hàng #{order.id}</CardTitle>
                    <p className="text-sm text-gray-600 mt-3 font-mono bg-gray-100 px-3 py-1.5 rounded w-fit">
                      {new Date(order.createdAt).toLocaleString('vi-VN')}
                    </p>
                  </div>
                  <div className={`px-4 py-2.5 rounded-lg font-bold text-sm inline-block ${getStatusColor(order.status)}`}>
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
                        <p className="text-sm text-gray-600">Cảm ơn bạn đã mua hàng từ Hải Trang!</p>
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
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Chi tiết sản phẩm</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600 mt-1">Số lượng: <span className="font-medium text-gray-900">{item.quantity}</span></p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-600 text-lg">
                          {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                        </p>
                        <p className="text-xs text-gray-500">
                          {(item.price / 1000).toFixed(0)}K × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-gray-200 mt-6 pt-6 bg-gradient-to-r from-red-50 to-orange-50 -mx-6 px-6 py-4 rounded-b-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-gray-900">Tổng cộng:</span>
                    <div className="text-right">
                      <span className="font-bold text-red-600 text-2xl block">
                        {(order.total / 1000).toFixed(0)}K đ
                      </span>
                      <span className="text-xs text-gray-600 mt-1">
                        {order.total.toLocaleString('vi-VN')} đ
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link href="/products" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-medium h-11">
                  Tiếp tục mua sắm
                </Button>
              </Link>
              <Button 
                variant="outline"
                onClick={() => {
                  setOrder(null)
                  setOrderId('')
                }}
                className="flex-1 border-red-300 text-red-600 hover:bg-red-50 h-11 font-medium"
              >
                Tìm kiếm đơn hàng khác
              </Button>
            </div>
          </div>
        )}

        {!order && !error && (
          <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-white">
            <CardContent className="pt-16 pb-16 text-center">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nhập mã đơn hàng</h3>
              <p className="text-gray-600">
                Bạn có thể tìm thấy mã đơn hàng trong email xác nhận hoặc tin nhắn từ Hải Trang
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
