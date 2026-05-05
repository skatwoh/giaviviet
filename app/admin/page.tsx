'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Trash2,
  Plus,
  Edit2,
  Package,
  ShoppingBag,
  MessageSquare,
  Search,
  Clock,
  DollarSign,
  Download,
  Upload,
  LayoutGrid,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  MoreVertical,
  Filter
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts'

interface Product {
  id: number
  name: string
  regularPrice: number
  salePrice: number | null
  saleStart: string | null
  saleEnd: string | null
  price?: number // Effective price from API
  originalPrice?: number // Effective original price from API
  category: string
  stock: number
  unit: string
  weight: string
  origin: string
  description: string
  image: string
}

interface Category {
  id: string
  name: string
}

interface Unit {
  id: string
  name: string
}

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

interface Message {
  id: number
  name: string
  email: string
  phone: string
  subject: string
  message: string
  createdAt: string
}

function AdminDashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'overview'

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [units, setUnits] = useState<Unit[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [messages, setMessages] = useState<Message[]>([])

  const [showProductDialog, setShowProductDialog] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const [showCategoryDialog, setShowCategoryDialog] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const [showUnitDialog, setShowUnitDialog] = useState(false)
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null)

  const [searchTerm, setSearchTerm] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleTabChange = (value: string) => {
    router.push(`/admin?tab=${value}`)
  }

  const [productFormData, setProductFormData] = useState({
    name: '',
    regularPrice: 0,
    salePrice: 0,
    saleStart: '',
    saleEnd: '',
    category: '',
    stock: 0,
    unit: '',
    weight: '',
    origin: '',
    description: '',
    image: '',
  })

  const [categoryFormData, setCategoryFormData] = useState({
    id: '',
    name: '',
  })

  const [unitFormData, setUnitFormData] = useState({
    name: '',
  })

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes, unitsRes, ordersRes, messagesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories'),
          fetch('/api/units'),
          fetch('/api/orders'),
          fetch('/api/messages'),
        ])

        if (productsRes.ok) {
          const data = await productsRes.json()
          setProducts(data.products || [])
        }
        if (categoriesRes.ok) {
          setCategories(await categoriesRes.json())
        }
        if (unitsRes.ok) {
          setUnits(await unitsRes.json())
        }
        if (ordersRes.ok) setOrders(await ordersRes.json())
        if (messagesRes.ok) setMessages(await messagesRes.json())
      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error('Không thể tải dữ liệu')
      }
    }

    fetchData()
  }, [])

  // Product Handlers
  const handleProductFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setProductFormData((prev) => ({
      ...prev,
      [name]: name === 'regularPrice' || name === 'salePrice' || name === 'stock' ? Number(value) : value,
    }))
  }

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formattedData = {
      ...productFormData,
      saleStart: productFormData.saleStart ? new Date(productFormData.saleStart).toISOString() : null,
      saleEnd: productFormData.saleEnd ? new Date(productFormData.saleEnd).toISOString() : null,
    }

    try {
      if (editingProduct) {
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingProduct.id, ...formattedData }),
        })
        if (res.ok) {
          const updated = await res.json()
          setProducts(products.map((p) => (p.id === editingProduct.id ? updated : p)))
          toast.success('Cập nhật sản phẩm thành công')
        }
      } else {
        const newProduct = { id: Date.now(), ...formattedData }
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProduct),
        })
        if (res.ok) {
          const created = await res.json()
          setProducts([...products, created])
          toast.success('Thêm sản phẩm mới thành công')
        }
      }
    } catch (error) {
      console.error('Error saving product:', error)
      toast.error('Lỗi khi lưu sản phẩm')
    }

    setShowProductDialog(false)
    setEditingProduct(null)
  }

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id))
        toast.success('Xóa sản phẩm thành công')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error('Lỗi khi xóa sản phẩm')
    }
  }

  const toLocalISO = (dateStr: string | null) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    const tzOffset = date.getTimezoneOffset() * 60000
    const localDate = new Date(date.getTime() - tzOffset)
    return localDate.toISOString().slice(0, 16)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setProductFormData({
      name: product.name,
      regularPrice: product.regularPrice,
      salePrice: product.salePrice || 0,
      saleStart: toLocalISO(product.saleStart),
      saleEnd: toLocalISO(product.saleEnd),
      category: product.category,
      stock: product.stock,
      unit: product.unit || '',
      weight: product.weight,
      origin: product.origin,
      description: product.description,
      image: product.image,
    })
    setShowProductDialog(true)
  }

  // Category Handlers
  const handleCategoryFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCategoryFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingCategory) {
        const res = await fetch(`/api/categories/${editingCategory.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(categoryFormData),
        })
        if (res.ok) {
          const updated = await res.json()
          setCategories(categories.map((c) => (c.id === editingCategory.id ? updated : c)))
          toast.success('Cập nhật danh mục thành công')
        }
      } else {
        const res = await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(categoryFormData),
        })
        if (res.ok) {
          const created = await res.json()
          setCategories([...categories, created])
          toast.success('Thêm danh mục mới thành công')
        } else {
          const error = await res.json()
          toast.error(error.error || 'Lỗi khi thêm danh mục')
          return
        }
      }
    } catch (error) {
      console.error('Error saving category:', error)
      toast.error('Lỗi khi lưu danh mục')
    }

    setShowCategoryDialog(false)
    setEditingCategory(null)
  }

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa danh mục này? Điều này có thể ảnh hưởng đến sản phẩm thuộc danh mục này.')) return

    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setCategories(categories.filter((c) => c.id !== id))
        toast.success('Xóa danh mục thành công')
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      toast.error('Lỗi khi xóa danh mục')
    }
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setCategoryFormData({
      id: category.id,
      name: category.name,
    })
    setShowCategoryDialog(true)
  }

  // Unit Handlers
  const handleUnitFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUnitFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUnitSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingUnit) {
        const res = await fetch(`/api/units/${editingUnit.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(unitFormData),
        })
        if (res.ok) {
          const updated = await res.json()
          setUnits(units.map((u) => (u.id === editingUnit.id ? updated : u)))
          toast.success('Cập nhật đơn vị thành công')
        }
      } else {
        const res = await fetch('/api/units', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(unitFormData),
        })
        if (res.ok) {
          const created = await res.json()
          setUnits([...units, created])
          toast.success('Thêm đơn vị mới thành công')
        } else {
          const error = await res.json()
          toast.error(error.error || 'Lỗi khi thêm đơn vị')
          return
        }
      }
    } catch (error) {
      console.error('Error saving unit:', error)
      toast.error('Lỗi khi lưu đơn vị')
    }

    setShowUnitDialog(false)
    setEditingUnit(null)
  }

  const handleDeleteUnit = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa đơn vị này?')) return

    try {
      const res = await fetch(`/api/units/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setUnits(units.filter((u) => u.id !== id))
        toast.success('Xóa đơn vị thành công')
      }
    } catch (error) {
      console.error('Error deleting unit:', error)
      toast.error('Lỗi khi xóa đơn vị')
    }
  }

  const handleEditUnit = (unit: Unit) => {
    setEditingUnit(unit)
    setUnitFormData({
      name: unit.name,
    })
    setShowUnitDialog(true)
  }

  // Order Handlers
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

  // Message Handlers
  const handleDeleteMessage = async (messageId: number) => {
    if (!confirm('Xóa tin nhắn này?')) return

    try {
      const res = await fetch(`/api/messages/${messageId}`, { method: 'DELETE' })
      if (res.ok) {
        setMessages(messages.filter((m) => m.id !== messageId))
        toast.success('Xóa tin nhắn thành công')
      }
    } catch (error) {
      console.error('Error deleting message:', error)
      toast.error('Lỗi khi xóa tin nhắn')
    }
  }

  // CSV Handlers
  const handleDownloadTemplate = () => {
    const headers = ['name', 'regularPrice', 'salePrice', 'saleStart', 'saleEnd', 'category', 'stock', 'unit', 'weight', 'origin', 'description', 'image']
    const csvContent = headers.join(',') + '\n' +
      'Sản phẩm mẫu 1,60000,50000,2024-01-01T00:00,2024-12-31T23:59,gia-vi,10,Túi,500g,Việt Nam,Mô tả mẫu 1,https://example.com/image1.jpg\n' +
      'Sản phẩm mẫu 2,120000,,,,dau-bo,5,Thùng,1L,Thái Lan,Mô tả mẫu 2,https://example.com/image2.jpg'

    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', 'template_san_pham.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Đã tải xuống template mẫu')
  }

  const handleImportExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (event) => {
      const text = event.target?.result as string
      const lines = text.split('\n')
      const headers = lines[0].split(',').map(h => h.trim())

      let importCount = 0

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue

        // Simple CSV parser that handles quotes
        const values: string[] = []
        let current = ''
        let inQuotes = false
        for (let char of lines[i]) {
          if (char === '"') inQuotes = !inQuotes
          else if (char === ',' && !inQuotes) {
            values.push(current.trim())
            current = ''
          } else current += char
        }
        values.push(current.trim())

        const productData: any = {
          id: Date.now() + i // Generate a unique-ish ID for the batch
        }
        headers.forEach((header, index) => {
          let value: any = values[index]?.replace(/^"|"$/g, '')
          if (header === 'regularPrice' || header === 'salePrice' || header === 'stock') {
            value = value ? Number(value) : (header === 'salePrice' ? undefined : 0)
          }
          productData[header] = value
        })

        try {
          const res = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
          })
          if (res.ok) {
            const created = await res.json()
            setProducts(prev => [...prev, created])
            importCount++
          }
        } catch (err) {
          console.error('Error importing product:', err)
        }
      }
      toast.success(`Đã nhập thành công ${importCount} sản phẩm`)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
    reader.readAsText(file)
  }

  // Calculate statistics
  const stats = {
    totalProducts: products.length,
    totalCategories: categories.length,
    totalOrders: orders.length,
    totalMessages: messages.length,
    totalRevenue: orders
        .filter((o) => o.status !== 'cancelled')
        .reduce((sum, order) => sum + order.total, 0),
    pendingOrders: orders.filter((o) => o.status === 'pending').length,
  }

  // Prepare chart data
  const chartData = orders.reduce((acc: any[], order) => {
    const dateObj = new Date(order.createdAt)
    const date = dateObj.toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' })
    const timestamp = dateObj.getTime()

    const existing = acc.find(item => item.date === date)
    if (existing) {
      existing.revenue += order.total
      existing.orders += 1
    } else {
      acc.push({ date, revenue: order.total, orders: 1, timestamp })
    }
    return acc
  }, []).sort((a, b) => a.timestamp - b.timestamp).slice(-7)

  // If no data, provide dummy data for visual demonstration
  const displayChartData = chartData.length > 0 ? chartData : [
    { date: '01/05', revenue: 450000, orders: 3 },
    { date: '02/05', revenue: 820000, orders: 5 },
    { date: '03/05', revenue: 310000, orders: 2 },
    { date: '04/05', revenue: 950000, orders: 6 },
    { date: '05/05', revenue: 1200000, orders: 8 },
    { date: '06/05', revenue: 600000, orders: 4 },
    { date: '07/05', revenue: 1500000, orders: 9 },
  ]

  // Filter products based on search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryName = (id: string) => {
    return categories.find(c => c.id === id)?.name || id
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase italic">
            Dashboard <span className="text-[#a08679]">Overview</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">Hệ thống quản lý kinh doanh Thủy Hương Food.</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept=".csv"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImportExcel}
          />
          <Button variant="outline" onClick={handleDownloadTemplate} className="hidden sm:flex">
            <Download className="w-4 h-4 mr-2" />
            Tải mẫu
          </Button>
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            <Upload className="w-4 h-4 mr-2" />
            Nhập Excel
          </Button>
          <Button
            onClick={() => {
              setEditingProduct(null)
              setProductFormData({
                name: '',
                regularPrice: 0,
                salePrice: 0,
                saleStart: '',
                saleEnd: '',
                category: categories[0]?.id || '',
                stock: 0,
                unit: '',
                weight: '',
                origin: '',
                description: '',
                image: '',
              })
              setShowProductDialog(true)
            }}
            className="bg-[#a08679] hover:bg-[#8c756a]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Sản phẩm mới
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <TabsList className="bg-white border p-1 h-12 w-fit overflow-x-auto">
            <TabsTrigger value="overview" className="px-4 h-10 data-[state=active]:bg-gray-50 data-[state=active]:text-[#a08679]">
              <LayoutGrid className="w-4 h-4 mr-2" />
              Tổng quan
            </TabsTrigger>
            <TabsTrigger value="products" className="px-4 h-10 data-[state=active]:bg-gray-50 data-[state=active]:text-[#a08679]">
              <Package className="w-4 h-4 mr-2" />
              Sản phẩm
            </TabsTrigger>
            <TabsTrigger value="categories" className="px-4 h-10 data-[state=active]:bg-gray-50 data-[state=active]:text-[#a08679]">
              <LayoutGrid className="w-4 h-4 mr-2" />
              Danh mục
            </TabsTrigger>
            <TabsTrigger value="units" className="px-4 h-10 data-[state=active]:bg-gray-50 data-[state=active]:text-[#a08679]">
              <Clock className="w-4 h-4 mr-2" />
              Đơn vị
            </TabsTrigger>
            <TabsTrigger value="orders" className="px-4 h-10 data-[state=active]:bg-gray-50 data-[state=active]:text-[#a08679]">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Đơn hàng
            </TabsTrigger>
            <TabsTrigger value="messages" className="px-4 h-10 data-[state=active]:bg-gray-50 data-[state=active]:text-[#a08679]">
              <MessageSquare className="w-4 h-4 mr-2" />
              Tin nhắn
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center relative w-full sm:w-64">
            <Search className="absolute left-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8 outline-none">
          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {[
              { label: 'Sản phẩm', value: stats.totalProducts, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+12%', isUp: true },
              { label: 'Danh mục', value: stats.totalCategories, icon: LayoutGrid, color: 'text-orange-600', bg: 'bg-orange-50', trend: 'Ổn định', isUp: true },
              { label: 'Đơn hàng', value: stats.totalOrders, icon: ShoppingBag, color: 'text-[#a08679]', bg: 'bg-amber-50', trend: '+5%', isUp: true },
              { label: 'Tin nhắn', value: stats.totalMessages, icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50', trend: '-2%', isUp: false },
              { label: 'Doanh thu', value: `${(stats.totalRevenue / 1000000).toFixed(1)}M đ`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+18%', isUp: true },
              { label: 'Chờ xử lý', value: stats.pendingOrders, icon: Clock, color: 'text-red-600', bg: 'bg-red-50', trend: 'Khẩn cấp', isUp: false },
            ].map((stat, i) => (
              <Card key={i} className="border-none shadow-sm overflow-hidden hover:shadow-md transition-all group">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.bg} ${stat.color} p-2.5 rounded-xl group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter ${stat.isUp ? 'text-emerald-600' : 'text-red-600'}`}>
                      {stat.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {stat.trend}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
                    <p className="text-2xl font-black mt-1 text-gray-900 italic">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border-none shadow-sm overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 bg-white pb-4">
                <div>
                  <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">Xu hướng doanh thu</CardTitle>
                  <CardDescription className="text-lg font-bold text-gray-900">Thống kê 7 ngày gần nhất</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest">Tuần này</Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="w-4 h-4" /></Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={displayChartData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a08679" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#a08679" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                      <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }}
                        dy={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }}
                        tickFormatter={(value) => `${value / 1000}k`}
                      />
                      <RechartsTooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#a08679"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm overflow-hidden">
              <CardHeader className="border-b border-gray-50 bg-white pb-4">
                <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">Đơn hàng mới nhất</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-50">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center text-[#a08679] font-bold text-xs border border-amber-100">
                          {order.customer.customerName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{order.customer.customerName}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">#{order.id} • {new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-[#a08679]">{order.total.toLocaleString('vi-VN')} đ</p>
                        <Badge variant="outline" className="text-[8px] py-0 h-4 uppercase tracking-tighter font-black">
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {orders.length === 0 && (
                    <div className="p-8 text-center text-gray-400 text-xs font-bold uppercase tracking-widest italic">
                      Chưa có đơn hàng nào
                    </div>
                  )}
                </div>
                <div className="p-4 border-t border-gray-50">
                  <Button variant="ghost" className="w-full text-xs font-black uppercase tracking-widest text-[#a08679] hover:bg-amber-50" onClick={() => handleTabChange('orders')}>
                    Xem tất cả đơn hàng <ArrowRight className="w-3 h-3 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Danh sách sản phẩm</CardTitle>
                  <CardDescription>Hiển thị {filteredProducts.length} sản phẩm hiện có trong kho.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 sm:p-6 pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Hình ảnh</TableHead>
                    <TableHead>Tên sản phẩm</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Giá</TableHead>
                    <TableHead>Kho</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center text-gray-500">
                        Không tìm thấy sản phẩm nào
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100 border">
                            {product.image ? (
                              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                            ) : (
                              <Package className="h-full w-full p-2 text-gray-400" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-gray-900">{product.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-gray-50">
                            {getCategoryName(product.category)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            {product.salePrice && product.salePrice < product.regularPrice ? (
                              <>
                                <span className="font-bold text-red-600">{product.salePrice.toLocaleString('vi-VN')} đ</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-400 line-through">
                                    {product.regularPrice.toLocaleString('vi-VN')} đ
                                  </span>
                                  <Badge className="bg-red-50 text-red-600 border-red-100 text-[10px] px-1 py-0 h-4">
                                    -{Math.round((1 - product.salePrice / product.regularPrice) * 100)}%
                                  </Badge>
                                </div>
                              </>
                            ) : (
                              <span className="font-bold text-gray-900">{product.regularPrice.toLocaleString('vi-VN')} đ</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={`h-2 w-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'}`} />
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-[10px] font-black uppercase tracking-tighter px-2 py-0 h-5",
                                product.stock > 10 ? "text-emerald-600 bg-emerald-50 border-emerald-100" :
                                product.stock > 0 ? "text-amber-600 bg-amber-50 border-amber-100" :
                                "text-red-600 bg-red-50 border-red-100"
                              )}
                            >
                              {product.stock > 0 ? `${product.stock} ${product.unit}` : "Hết hàng"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleEditProduct(product)}
                              className="text-[#a08679] hover:bg-gray-50"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories">
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Danh sách danh mục</CardTitle>
                <CardDescription>Quản lý các nhóm sản phẩm trong cửa hàng.</CardDescription>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  setEditingCategory(null)
                  setCategoryFormData({ id: '', name: '' })
                  setShowCategoryDialog(true)
                }}
                className="bg-[#a08679] hover:bg-[#8c756a]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm danh mục
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã danh mục (ID)</TableHead>
                    <TableHead>Tên danh mục</TableHead>
                    <TableHead>Số sản phẩm</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-32 text-center text-gray-500">
                        Chưa có danh mục nào
                      </TableCell>
                    </TableRow>
                  ) : (
                    categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-mono text-sm">{category.id}</TableCell>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {products.filter(p => p.category === category.id).length}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleEditCategory(category)}
                              className="text-[#a08679] hover:bg-gray-50"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleDeleteCategory(category.id)}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Units Tab */}
        <TabsContent value="units">
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Danh sách đơn vị</CardTitle>
                <CardDescription>Quản lý các đơn vị tính sản phẩm (túi, quả, thùng...).</CardDescription>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  setEditingUnit(null)
                  setUnitFormData({ name: '' })
                  setShowUnitDialog(true)
                }}
                className="bg-[#a08679] hover:bg-[#8c756a]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm đơn vị
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên đơn vị</TableHead>
                    <TableHead>Số sản phẩm</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {units.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="h-32 text-center text-gray-500">
                        Chưa có đơn vị nào
                      </TableCell>
                    </TableRow>
                  ) : (
                    units.map((unit) => (
                      <TableRow key={unit.id}>
                        <TableCell className="font-medium">{unit.name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {products.filter(p => p.unit === unit.name).length}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleEditUnit(unit)}
                              className="text-[#a08679] hover:bg-gray-50"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleDeleteUnit(unit.id)}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Quản lý đơn hàng</CardTitle>
              <CardDescription>Theo dõi và cập nhật trạng thái đơn hàng từ khách hàng.</CardDescription>
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
                  {orders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center text-gray-500">
                        Chưa có đơn hàng nào
                      </TableCell>
                    </TableRow>
                  ) : (
                    orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-xs font-bold">#{order.id}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900">{order.customer.customerName}</span>
                            <span className="text-xs text-gray-500">{order.customer.phoneNumber}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                        </TableCell>
                        <TableCell className="font-semibold text-[#a08679]">
                          {order.total.toLocaleString('vi-VN')} đ
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              order.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800 border-yellow-200 shadow-none'
                                : order.status === 'confirmed'
                                ? 'bg-blue-100 text-blue-800 border-blue-200 shadow-none'
                                : order.status === 'cancelled'
                                ? 'bg-red-100 text-red-800 border-red-200 shadow-none'
                                : 'bg-green-100 text-green-800 border-green-200 shadow-none'
                            }
                          >
                            {order.status === 'pending'
                              ? 'Chờ xác nhận'
                              : order.status === 'confirmed'
                              ? 'Đã xác nhận'
                              : order.status === 'cancelled'
                              ? 'Đã hủy'
                              : 'Đã giao'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {order.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleOrderStatusChange(order.id, 'confirmed')}
                                  className="bg-blue-600 hover:bg-blue-700 h-8"
                                >
                                  Xác nhận
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleOrderStatusChange(order.id, 'cancelled')}
                                  className="h-8"
                                >
                                  Hủy
                                </Button>
                              </>
                            )}
                            {order.status === 'confirmed' && (
                              <Button
                                size="sm"
                                onClick={() => handleOrderStatusChange(order.id, 'delivered')}
                                className="bg-green-600 hover:bg-green-700 h-8"
                              >
                                Giao hàng
                              </Button>
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
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages">
          <div className="grid grid-cols-1 gap-4">
            {messages.length === 0 ? (
              <Card className="border-none shadow-sm">
                <CardContent className="h-32 flex items-center justify-center text-gray-500">
                  Chưa có tin nhắn nào
                </CardContent>
              </Card>
            ) : (
              messages.map((message) => (
                <Card key={message.id} className="border-none shadow-sm overflow-hidden">
                  <div className="flex items-start">
                    <div className="w-1 bg-[#a08679] self-stretch" />
                    <CardContent className="p-6 w-full">
                      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{message.subject}</h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <strong>Người gửi:</strong> {message.name}
                            </span>
                            <span className="flex items-center gap-1">
                              <strong>Email:</strong> {message.email}
                            </span>
                            {message.phone && (
                              <span className="flex items-center gap-1">
                                <strong>SĐT:</strong> {message.phone}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-sm text-gray-400 font-medium">
                          {new Date(message.createdAt).toLocaleString('vi-VN')}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {message.message}
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteMessage(message.id)}
                          className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Xóa tin nhắn
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Product Form Dialog */}
      <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
          <form onSubmit={handleProductSubmit} className="flex flex-col h-full">
            <div className="bg-[#a08679] p-6 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black uppercase italic tracking-tight flex items-center gap-3">
                  <Package className="w-6 h-6" />
                  {editingProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}
                </DialogTitle>
                <DialogDescription className="text-white/70 font-medium italic">
                  Thông tin sản phẩm giúp khách hàng hiểu rõ hơn về chất lượng tinh hoa ẩm thực.
                </DialogDescription>
              </DialogHeader>
            </div>

            <div className="p-8 space-y-10">
              {/* Identity Section */}
              <section className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 text-xs font-black">01</span>
                  <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Thông tin cơ bản</h3>
                  <div className="flex-1 h-[1px] bg-gray-100"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tên sản phẩm</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Ví dụ: Nước mắm Hưng Thịnh"
                      value={productFormData.name}
                      onChange={handleProductFormChange}
                      className="h-11 font-bold border-gray-200 focus-visible:ring-[#a08679] rounded-xl"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Danh mục</Label>
                    <select
                      id="category"
                      name="category"
                      value={productFormData.category}
                      onChange={handleProductFormChange}
                      className="flex h-11 w-full items-center justify-between rounded-xl border border-gray-200 bg-background px-3 py-2 text-sm font-bold ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[#a08679] disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              {/* Pricing Section */}
              <section className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 text-xs font-black">02</span>
                  <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Giá & Khuyến mãi</h3>
                  <div className="flex-1 h-[1px] bg-gray-100"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="grid gap-2">
                    <Label htmlFor="regularPrice" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Giá bán gốc (đ)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                      <Input
                        id="regularPrice"
                        type="number"
                        name="regularPrice"
                        placeholder="0"
                        value={productFormData.regularPrice}
                        onChange={handleProductFormChange}
                        className="h-11 pl-10 font-black text-lg border-gray-200 focus-visible:ring-[#a08679] rounded-xl"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-2 bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
                    <Label htmlFor="salePrice" className="text-[10px] font-black uppercase tracking-widest text-amber-600">Giá khuyến mãi (đ)</Label>
                    <div className="relative">
                      <TrendingDown className="absolute left-3.5 top-3.5 w-4 h-4 text-amber-500" />
                      <Input
                        id="salePrice"
                        type="number"
                        name="salePrice"
                        placeholder="Không có"
                        value={productFormData.salePrice || ''}
                        onChange={handleProductFormChange}
                        className="h-11 pl-10 font-black text-lg bg-white border-amber-200 focus-visible:ring-amber-500 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="saleStart" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Thời điểm bắt đầu sale</Label>
                    <Input
                      id="saleStart"
                      type="datetime-local"
                      name="saleStart"
                      value={productFormData.saleStart}
                      onChange={handleProductFormChange}
                      className="h-11 font-bold border-gray-200 rounded-xl"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="saleEnd" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Thời điểm kết thúc sale</Label>
                    <Input
                      id="saleEnd"
                      type="datetime-local"
                      name="saleEnd"
                      value={productFormData.saleEnd}
                      onChange={handleProductFormChange}
                      className="h-11 font-bold border-gray-200 rounded-xl"
                    />
                  </div>
                  <p className="md:col-span-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider italic flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    Hệ thống tự động chuyển giá dựa trên thời gian thực.
                  </p>
                </div>
              </section>

              {/* Inventory & Logistics Section */}
              <section className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-50 text-purple-600 text-xs font-black">03</span>
                  <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Kho & Logistics</h3>
                  <div className="flex-1 h-[1px] bg-gray-100"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="stock" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Số lượng kho</Label>
                    <Input
                      id="stock"
                      type="number"
                      name="stock"
                      placeholder="0"
                      value={productFormData.stock}
                      onChange={handleProductFormChange}
                      className="h-11 font-black border-gray-200 rounded-xl"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="unit" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Đơn vị tính</Label>
                    <select
                      id="unit"
                      name="unit"
                      value={productFormData.unit}
                      onChange={handleProductFormChange}
                      className="h-11 rounded-xl border border-gray-200 font-bold text-sm px-3 focus:ring-1 focus:ring-[#a08679] transition-all"
                      required
                    >
                      <option value="">Chọn đơn vị</option>
                      {units.map((u) => (
                        <option key={u.id} value={u.name}>
                          {u.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="weight" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Khối lượng</Label>
                    <Input
                      id="weight"
                      name="weight"
                      placeholder="500g"
                      value={productFormData.weight}
                      onChange={handleProductFormChange}
                      className="h-11 font-bold border-gray-200 rounded-xl"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="origin" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Xuất xứ</Label>
                    <Input
                      id="origin"
                      name="origin"
                      placeholder="Việt Nam"
                      value={productFormData.origin}
                      onChange={handleProductFormChange}
                      className="h-11 font-bold border-gray-200 rounded-xl"
                    />
                  </div>
                </div>
              </section>

              {/* Description Section */}
              <section className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 text-orange-600 text-xs font-black">04</span>
                  <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Mô tả & Hình ảnh</h3>
                  <div className="flex-1 h-[1px] bg-gray-100"></div>
                </div>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="image" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Đường dẫn hình ảnh (URL)</Label>
                    <Input
                      id="image"
                      name="image"
                      placeholder="https://..."
                      value={productFormData.image}
                      onChange={handleProductFormChange}
                      className="h-11 font-medium border-gray-200 rounded-xl"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Mô tả chi tiết</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Kể câu chuyện về sản phẩm này..."
                      value={productFormData.description}
                      onChange={handleProductFormChange}
                      rows={5}
                      className="rounded-2xl border-gray-200 focus:ring-[#a08679] font-medium leading-relaxed"
                    />
                  </div>
                </div>
              </section>
            </div>

            <div className="bg-gray-50 p-6 flex items-center justify-end gap-4 border-t border-gray-100">
              <Button type="button" variant="ghost" onClick={() => setShowProductDialog(false)} className="text-gray-500 font-bold hover:bg-gray-100 rounded-xl h-12 px-8">
                Hủy bỏ
              </Button>
              <Button type="submit" className="bg-[#a08679] hover:bg-[#8c756a] text-white font-black uppercase tracking-widest shadow-lg shadow-amber-900/20 rounded-xl h-12 px-10">
                {editingProduct ? 'Lưu thay đổi' : 'Tạo sản phẩm ngay'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Unit Form Dialog */}
      <Dialog open={showUnitDialog} onOpenChange={setShowUnitDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleUnitSubmit}>
            <DialogHeader>
              <DialogTitle>{editingUnit ? 'Cập nhật đơn vị' : 'Thêm đơn vị mới'}</DialogTitle>
              <DialogDescription>
                Tên đơn vị tính (ví dụ: Túi, Thùng, Hộp).
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="unit-name">Tên đơn vị</Label>
                <Input
                  id="unit-name"
                  name="name"
                  placeholder="Ví dụ: Thùng"
                  value={unitFormData.name}
                  onChange={handleUnitFormChange}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowUnitDialog(false)}>
                Hủy
              </Button>
              <Button type="submit" className="bg-[#a08679] hover:bg-[#8c756a]">
                {editingUnit ? 'Lưu thay đổi' : 'Thêm đơn vị'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Category Form Dialog */}
      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleCategorySubmit}>
            <DialogHeader>
              <DialogTitle>{editingCategory ? 'Cập nhật danh mục' : 'Thêm danh mục mới'}</DialogTitle>
              <DialogDescription>
                Tạo mã định danh (ID) và tên cho danh mục mới.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="cat-id">Mã danh mục (ID)</Label>
                <Input
                  id="cat-id"
                  name="id"
                  placeholder="ví-du: rau-cu"
                  value={categoryFormData.id}
                  onChange={handleCategoryFormChange}
                  disabled={!!editingCategory}
                  required
                />
                {!editingCategory && <p className="text-[10px] text-gray-500 italic">* Viết liền không dấu, dùng dấu gạch ngang.</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cat-name">Tên danh mục</Label>
                <Input
                  id="cat-name"
                  name="name"
                  placeholder="Ví dụ: Rau Củ Quả"
                  value={categoryFormData.name}
                  onChange={handleCategoryFormChange}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowCategoryDialog(false)}>
                Hủy
              </Button>
              <Button type="submit" className="bg-[#a08679] hover:bg-[#8c756a]">
                {editingCategory ? 'Lưu thay đổi' : 'Thêm danh mục'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function AdminPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a08679]"></div>
      </div>
    }>
      <AdminDashboardContent />
    </Suspense>
  )
}
