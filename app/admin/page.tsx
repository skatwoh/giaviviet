'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Package,
  ShoppingBag,
  MessageSquare,
  Clock,
  DollarSign,
  LayoutGrid,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  MoreVertical,
} from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'

interface Order {
  id: number
  customer: { customerName: string }
  total: number
  createdAt: string
  status: string
}

export default function AdminDashboardPage() {
  const [productsCount, setProductsCount] = useState(0)
  const [categoriesCount, setCategoriesCount] = useState(0)
  const [orders, setOrders] = useState<Order[]>([])
  const [messagesCount, setMessagesCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes, ordersRes, messagesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories'),
          fetch('/api/orders'),
          fetch('/api/messages'),
        ])
        if (productsRes.ok) {
          const data = await productsRes.json()
          setProductsCount(data.products?.length || 0)
        }
        if (categoriesRes.ok) setCategoriesCount((await categoriesRes.json()).length)
        if (ordersRes.ok) setOrders(await ordersRes.json())
        if (messagesRes.ok) setMessagesCount((await messagesRes.json()).length)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        toast.error('Không thể tải dữ liệu dashboard')
      }
    }
    fetchData()
  }, [])

  const totalRevenue = orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.total, 0)
  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length

  const chartData = orders.reduce((acc: any[], order) => {
    const dateObj = new Date(order.createdAt)
    const date = dateObj.toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' })
    const timestamp = dateObj.getTime()
    const existing = acc.find(item => item.date === date)
    if (existing) { existing.revenue += order.total; existing.orders += 1 }
    else { acc.push({ date, revenue: order.total, orders: 1, timestamp }) }
    return acc
  }, []).sort((a, b) => a.timestamp - b.timestamp).slice(-7)

  const displayChartData = chartData.length > 0 ? chartData : [
    { date: '01/05', revenue: 450000, orders: 3 },
    { date: '02/05', revenue: 820000, orders: 5 },
    { date: '03/05', revenue: 310000, orders: 2 },
    { date: '04/05', revenue: 950000, orders: 6 },
    { date: '05/05', revenue: 1200000, orders: 8 },
    { date: '06/05', revenue: 600000, orders: 4 },
    { date: '07/05', revenue: 1500000, orders: 9 },
  ]

  const stats = [
    { label: 'Sản phẩm', value: productsCount, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+12%', isUp: true },
    { label: 'Danh mục', value: categoriesCount, icon: LayoutGrid, color: 'text-orange-600', bg: 'bg-orange-50', trend: 'Ổn định', isUp: true },
    { label: 'Đơn hàng', value: orders.length, icon: ShoppingBag, color: 'text-[#a08679]', bg: 'bg-amber-50', trend: '+5%', isUp: true },
    { label: 'Tin nhắn', value: messagesCount, icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50', trend: '-2%', isUp: false },
    { label: 'Doanh thu', value: `${(totalRevenue / 1000000).toFixed(1)}M đ`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+18%', isUp: true },
    { label: 'Chờ xử lý', value: pendingOrdersCount, icon: Clock, color: 'text-red-600', bg: 'bg-red-50', trend: 'Khẩn cấp', isUp: false },
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase italic">Dashboard <span className="text-[#a08679]">Overview</span></h1>
        <p className="text-gray-500 font-medium mt-1">Hệ thống quản lý kinh doanh Thủy Hương Food.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm overflow-hidden hover:shadow-md transition-all group">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bg} ${stat.color} p-2.5 rounded-xl group-hover:scale-110 transition-transform`}><stat.icon className="w-5 h-5" /></div>
                <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter ${stat.isUp ? 'text-emerald-600' : 'text-red-600'}`}>
                  {stat.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />} {stat.trend}
                </div>
              </div>
              <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p><p className="text-2xl font-black mt-1 text-gray-900 italic">{stat.value}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 bg-white pb-4">
            <div><CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">Xu hướng doanh thu</CardTitle><CardDescription className="text-lg font-bold text-gray-900">Thống kê 7 ngày gần nhất</CardDescription></div>
            <div className="flex items-center gap-2"><Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest">Tuần này</Button><Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="w-4 h-4" /></Button></div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={displayChartData}>
                  <defs><linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#a08679" stopOpacity={0.3}/><stop offset="95%" stopColor="#a08679" stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" /><XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }} dy={10} /><YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }} tickFormatter={(v) => `${v / 1000}k`} />
                  <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#a08679" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader className="border-b border-gray-50 bg-white pb-4"><CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">Đơn hàng mới nhất</CardTitle></CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-50">
              {orders.slice(0, 5).map((order) => (
                <Link
                  key={order.id}
                  href={`/admin/orders?search=${order.id}`}
                  className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center text-[#a08679] font-bold text-xs border border-amber-100 group-hover:bg-[#a08679] group-hover:text-white transition-colors">
                      {order.customer.customerName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 group-hover:text-[#a08679] transition-colors">{order.customer.customerName}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">#{order.id} • {new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-[#a08679]">{order.total.toLocaleString('vi-VN')} đ</p>
                    <Badge variant="outline" className="text-[8px] py-0 h-4 uppercase tracking-tighter font-black">
                      {order.status}
                    </Badge>
                  </div>
                </Link>
              ))}
              {orders.length === 0 && <div className="p-8 text-center text-gray-400 text-xs font-bold uppercase tracking-widest italic">Chưa có đơn hàng nào</div>}
            </div>
            <div className="p-4 border-t border-gray-50"><Link href="/admin/orders"><Button variant="ghost" className="w-full text-xs font-black uppercase tracking-widest text-[#a08679] hover:bg-amber-50">Xem tất cả đơn hàng <ArrowRight className="w-3 h-3 ml-2" /></Button></Link></div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
