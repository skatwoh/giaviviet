'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import { toast } from 'sonner'

interface OrderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface Order {
  id: string
  total: number
  status: string
  createdAt: string
  items: Array<{ name: string; quantity: number; price: number }>
}

export function OrderModal({ open, onOpenChange }: OrderModalProps) {
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!orderId.trim()) {
      toast.error('Vui lòng nhập mã đơn hàng')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/orders?id=${orderId}`)
      if (!response.ok) {
        throw new Error('Không tìm thấy đơn hàng')
      }
      const data = await response.json()
      setOrder(data)
      toast.success('Tìm thấy đơn hàng!')
    } catch (err) {
      setError('Không tìm thấy đơn hàng. Vui lòng kiểm tra lại mã.')
      toast.error('Không tìm thấy đơn hàng')
      setOrder(null)
    } finally {
      setLoading(false)
    }
  }

  const getStatusText = (status: string) => {
    const statuses: Record<string, string> = {
      pending: 'Chờ xác nhận',
      confirmed: 'Đã xác nhận',
      shipped: 'Đang vận chuyển',
      delivered: 'Đã giao',
      cancelled: 'Đã hủy',
    }
    return statuses[status] || status
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
      confirmed: 'bg-blue-50 text-blue-700 border border-blue-200',
      shipped: 'bg-red-50 text-red-700 border border-red-200',
      delivered: 'bg-green-50 text-green-700 border border-green-200',
      cancelled: 'bg-red-50 text-red-700 border border-red-200',
    }
    return colors[status] || 'bg-gray-50 text-gray-700'
  }

  const handleClose = () => {
    setOrder(null)
    setOrderId('')
    setError('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md animate-scaleIn">
        <DialogHeader>
          <DialogTitle className="text-2xl">Đơn hàng của tôi</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Nhập mã đơn hàng"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="pl-10 h-10"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
          >
            {loading ? 'Đang tìm...' : 'Tìm kiếm'}
          </Button>
        </form>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm animate-slideUp">
            {error}
          </div>
        )}

        {order && (
          <div className="space-y-4 animate-slideUp">
            <div className="border-t pt-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-600 font-medium">Mã đơn hàng</p>
                  <p className="font-bold text-lg text-red-600">{order.id}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div>
                  <p className="text-xs text-gray-600 font-medium">Ngày đặt</p>
                  <p className="font-medium">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Tổng tiền</p>
                  <p className="font-bold text-red-600">
                    {(order.total / 1000).toFixed(0)}K đ
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 max-h-32 overflow-y-auto">
                <p className="text-xs font-bold text-gray-700 mb-2">Sản phẩm:</p>
                <div className="space-y-1">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="text-xs text-gray-600 flex justify-between">
                      <span>{item.name} x{item.quantity}</span>
                      <span className="font-medium">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button
              onClick={handleClose}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Đóng
            </Button>
          </div>
        )}

        {!order && !error && (
          <div className="text-center py-8 text-gray-600 text-sm">
            <p className="text-4xl mb-2">📦</p>
            <p>Nhập mã đơn hàng để xem chi tiết</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
