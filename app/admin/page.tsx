'use client'

import { useState, useEffect, useRef } from 'react'
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
} from 'lucide-react'
import { toast } from 'sonner'

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

export default function AdminPage() {
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

  // Filter products based on search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryName = (id: string) => {
    return categories.find(c => c.id === id)?.name || id
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Tổng quan</h1>
          <p className="text-gray-500">Quản lý cửa hàng, sản phẩm và đơn hàng của bạn.</p>
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

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {[
          { label: 'Sản phẩm', value: stats.totalProducts, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Danh mục', value: stats.totalCategories, icon: LayoutGrid, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Đơn hàng', value: stats.totalOrders, icon: ShoppingBag, color: 'text-[#a08679]', bg: 'bg-amber-50' },
          { label: 'Tin nhắn', value: stats.totalMessages, icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Doanh thu', value: `${(stats.totalRevenue / 1000000).toFixed(1)}M đ`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Chờ xử lý', value: stats.pendingOrders, icon: Clock, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <TabsList className="bg-white border p-1 h-12 w-fit">
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
                            <span className={`h-2 w-2 rounded-full ${product.stock > 5 ? 'bg-green-500' : 'bg-red-500'}`} />
                            <span className={product.stock > 5 ? 'text-gray-700' : 'text-red-600 font-medium'}>
                              {product.stock} sản phẩm
                            </span>
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
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleProductSubmit}>
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}</DialogTitle>
              <DialogDescription>
                Điền thông tin chi tiết của sản phẩm vào form bên dưới.
              </DialogDescription>
            </DialogHeader>

            <Separator className="my-4" />

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Tên sản phẩm</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Ví dụ: Nước mắm Hưng Thịnh"
                    value={productFormData.name}
                    onChange={handleProductFormChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="regularPrice">Giá bán thường (đ)</Label>
                  <Input
                    id="regularPrice"
                    type="number"
                    name="regularPrice"
                    placeholder="0"
                    value={productFormData.regularPrice}
                    onChange={handleProductFormChange}
                    required
                  />
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <h4 className="text-sm font-bold text-amber-900 mb-3 uppercase tracking-wider">Cài đặt khuyến mãi (Tự động)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="salePrice">Giá khuyến mãi (đ)</Label>
                    <Input
                      id="salePrice"
                      type="number"
                      name="salePrice"
                      placeholder="Không có"
                      value={productFormData.salePrice || ''}
                      onChange={handleProductFormChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="saleStart">Ngày bắt đầu</Label>
                    <Input
                      id="saleStart"
                      type="datetime-local"
                      name="saleStart"
                      value={productFormData.saleStart}
                      onChange={handleProductFormChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="saleEnd">Ngày kết thúc</Label>
                    <Input
                      id="saleEnd"
                      type="datetime-local"
                      name="saleEnd"
                      value={productFormData.saleEnd}
                      onChange={handleProductFormChange}
                    />
                  </div>
                </div>
                <p className="text-[10px] text-amber-700 mt-2 italic">
                  * Sản phẩm sẽ tự động giảm giá khi đến thời gian và về giá cũ khi hết hạn.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Danh mục</Label>
                  <select
                    id="category"
                    name="category"
                    value={productFormData.category}
                    onChange={handleProductFormChange}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock">Số lượng kho</Label>
                  <Input
                    id="stock"
                    type="number"
                    name="stock"
                    placeholder="0"
                    value={productFormData.stock}
                    onChange={handleProductFormChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="unit">Đơn vị tính</Label>
                  <select
                    id="unit"
                    name="unit"
                    value={productFormData.unit}
                    onChange={handleProductFormChange}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                  <Label htmlFor="weight">Khối lượng</Label>
                  <Input
                    id="weight"
                    name="weight"
                    placeholder="Ví dụ: 500ml, 1kg"
                    value={productFormData.weight}
                    onChange={handleProductFormChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="origin">Xuất xứ</Label>
                  <Input
                    id="origin"
                    name="origin"
                    placeholder="Ví dụ: Việt Nam"
                    value={productFormData.origin}
                    onChange={handleProductFormChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">URL Hình ảnh</Label>
                  <Input
                    id="image"
                    name="image"
                    placeholder="https://..."
                    value={productFormData.image}
                    onChange={handleProductFormChange}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Mô tả sản phẩm</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Nhập mô tả chi tiết sản phẩm..."
                  value={productFormData.description}
                  onChange={handleProductFormChange}
                  rows={4}
                />
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button type="button" variant="outline" onClick={() => setShowProductDialog(false)}>
                Hủy bỏ
              </Button>
              <Button type="submit" className="bg-[#a08679] hover:bg-[#8c756a]">
                {editingProduct ? 'Lưu thay đổi' : 'Thêm sản phẩm'}
              </Button>
            </DialogFooter>
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
