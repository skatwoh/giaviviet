'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-react'
import { toast } from 'sonner'

interface Order {
  id: number
  customer: {
    customerName: string
    phoneNumber: string
    email: string
    address: string
    city: string
    district: string
  }
  items: Array<{ name: string; quantity: number; price: number }>
  total: number
  createdAt: string
  status: string
}

function AdminOrdersContent() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || ''

  const [orders, setOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState(initialSearch)

  useEffect(() => {
    setSearchTerm(initialSearch)
  }, [initialSearch])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders')
        if (res.ok) setOrders(await res.json())
      } catch (error) {
        console.error('Error fetching orders:', error)
        toast.error('Không thể tải dữ liệu đơn hàng')
      }
    }
    fetchOrders()
  }, [])

  const handleOrderStatusChange = async (orderId: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)))
        toast.success('Cập nhật trạng thái đơn hàng thành công')
      }
    } catch (error) {
      console.error('Error updating order:', error)
      toast.error('Lỗi khi cập nhật đơn hàng')
    }
  }

  const filteredOrders = orders.filter((o) =>
    o.customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.id.toString().includes(searchTerm)
  )

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase italic">
          Quản lý <span className="text-[#a08679]">Đơn hàng</span>
        </h1>
        <p className="text-gray-500 font-medium mt-1">Theo dõi và cập nhật trạng thái đơn hàng từ khách hàng.</p>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Danh sách đơn hàng</CardTitle>
            <CardDescription>Hiển thị các đơn hàng gần đây.</CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 w-4 h-4 text-gray-400" />
            <Input placeholder="Tìm mã đơn hoặc tên khách..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đơn</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Ngày đặt</TableHead>
                <TableHead>Tổng tiền</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="h-32 text-center text-gray-500">Chưa có đơn hàng nào</TableCell></TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-xs font-bold">#{order.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{order.customer.customerName}</span>
                        <span className="text-xs text-gray-500">{order.customer.phoneNumber}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</TableCell>
                    <TableCell className="font-semibold text-[#a08679]">{order.total.toLocaleString('vi-VN')} đ</TableCell>
                    <TableCell>
                      <Badge className={
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        order.status === 'confirmed' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-800 border-red-200' :
                        'bg-green-100 text-green-800 border-green-200'
                      }>
                        {order.status === 'pending' ? 'Chờ xác nhận' : order.status === 'confirmed' ? 'Đã xác nhận' : order.status === 'cancelled' ? 'Đã hủy' : 'Đã giao'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {order.status === 'pending' && (
                          <><Button size="sm" onClick={() => handleOrderStatusChange(order.id, 'confirmed')} className="bg-blue-600 hover:bg-blue-700 h-8">Xác nhận</Button>
                          <Button size="sm" variant="outline" onClick={() => handleOrderStatusChange(order.id, 'cancelled')} className="h-8">Hủy</Button></>
                        )}
                        {order.status === 'confirmed' && (
                          <Button size="sm" onClick={() => handleOrderStatusChange(order.id, 'delivered')} className="bg-green-600 hover:bg-green-700 h-8">Giao hàng</Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AdminOrdersPage() {
  return (
    <Suspense fallback={
      <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a08679]"></div>
      </div>
    }>
      <AdminOrdersContent />
    </Suspense>
  )
}
