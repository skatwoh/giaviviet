'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2, Plus, Edit2, Package, ShoppingBag, MessageSquare, TrendingUp, Search, CheckCircle, Clock } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  category: string
  stock: number
  weight: string
  origin: string
  description: string
  image: string
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
  const [orders, setOrders] = useState<Order[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    category: 'spices',
    stock: 0,
    weight: '',
    origin: '',
    description: '',
    image: '',
  })

  const categoryMap: Record<string, string> = {
    spices: 'Gia vị',
    condiments: 'Gia vị nêm',
    oils: 'Dầu',
  }

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, ordersRes, messagesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/orders'),
          fetch('/api/messages'),
        ])

        if (productsRes.ok) {
          const data = await productsRes.json()
          setProducts(data.products || [])
        }
        if (ordersRes.ok) setOrders(await ordersRes.json())
        if (messagesRes.ok) setMessages(await messagesRes.json())
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleProductFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }))
  }

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingProduct) {
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingProduct.id, ...formData }),
        })
        if (res.ok) {
          const updated = await res.json()
          setProducts(products.map((p) => (p.id === editingProduct.id ? updated : p)))
        }
      } else {
        const newProduct = { id: Date.now(), ...formData }
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProduct),
        })
        if (res.ok) {
          const created = await res.json()
          setProducts([...products, created])
        }
      }
    } catch (error) {
      console.error('Error saving product:', error)
    }

    setFormData({
      name: '',
      price: 0,
      category: 'spices',
      stock: 0,
      weight: '',
      origin: '',
      description: '',
      image: '',
    })
    setShowProductForm(false)
    setEditingProduct(null)
  }

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id))
      }
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock,
      weight: product.weight,
      origin: product.origin,
      description: product.description,
      image: product.image,
    })
    setShowProductForm(true)
  }

  const handleOrderStatusChange = async (orderId: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)))
      }
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }

  const handleDeleteMessage = async (messageId: number) => {
    if (!confirm('Xóa tin nhắn này?')) return

    try {
      const res = await fetch(`/api/messages/${messageId}`, { method: 'DELETE' })
      if (res.ok) {
        setMessages(messages.filter((m) => m.id !== messageId))
      }
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  // Calculate statistics
  const stats = {
    totalProducts: products.length,
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Bảng quản lý</h1>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Sản phẩm</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                  </div>
                  <Package className="w-8 h-8 text-amber-700" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Đơn hàng</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                  </div>
                  <ShoppingBag className="w-8 h-8 text-amber-700" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Tin nhắn</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalMessages}</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-amber-700" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Doanh thu</p>
                    <p className="text-lg font-bold text-amber-700">
                      {(stats.totalRevenue / 1000000).toFixed(1)}M đ
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-amber-700" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Chờ xử lý</p>
                    <p className="text-2xl font-bold text-red-600">{stats.pendingOrders}</p>
                  </div>
                  <Clock className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="products" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">
              <Package className="w-4 h-4 mr-2" />
              Sản phẩm
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Đơn hàng
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="w-4 h-4 mr-2" />
              Tin nhắn
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-1 w-full">
                    <CardTitle>Quản lý sản phẩm ({filteredProducts.length})</CardTitle>
                    <div className="mt-4 flex items-center border border-gray-300 rounded-lg">
                      <Search className="w-5 h-5 text-gray-400 ml-3" />
                      <input
                        type="text"
                        placeholder="Tìm sản phẩm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 px-3 py-2 border-0 outline-none"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      setEditingProduct(null)
                      setFormData({
                        name: '',
                        price: 0,
                        category: 'spices',
                        stock: 0,
                        weight: '',
                        origin: '',
                        description: '',
                        image: '',
                      })
                      setShowProductForm(!showProductForm)
                    }}
                    className="bg-amber-700 hover:bg-amber-800 whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm sản phẩm
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showProductForm && (
                  <form
                    onSubmit={handleProductSubmit}
                    className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        name="name"
                        placeholder="Tên sản phẩm"
                        value={formData.name}
                        onChange={handleProductFormChange}
                        required
                      />
                      <Input
                        type="number"
                        name="price"
                        placeholder="Giá"
                        value={formData.price}
                        onChange={handleProductFormChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleProductFormChange}
                        className="border border-gray-300 rounded-md px-3 py-2"
                      >
                        <option value="spices">Gia vị</option>
                        <option value="condiments">Gia vị nêm</option>
                        <option value="oils">Dầu</option>
                      </select>
                      <Input
                        type="number"
                        name="stock"
                        placeholder="Số lượng kho"
                        value={formData.stock}
                        onChange={handleProductFormChange}
                        required
                      />
                      <Input
                        type="text"
                        name="weight"
                        placeholder="Cân nặng"
                        value={formData.weight}
                        onChange={handleProductFormChange}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        name="origin"
                        placeholder="Xuất xứ"
                        value={formData.origin}
                        onChange={handleProductFormChange}
                      />
                      <Input
                        type="text"
                        name="image"
                        placeholder="URL hình ảnh"
                        value={formData.image}
                        onChange={handleProductFormChange}
                      />
                    </div>
                    <textarea
                      name="description"
                      placeholder="Mô tả sản phẩm"
                      value={formData.description}
                      onChange={handleProductFormChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                    <div className="flex space-x-2">
                      <Button type="submit" className="bg-amber-700 hover:bg-amber-800">
                        {editingProduct ? 'Cập nhật' : 'Thêm mới'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowProductForm(false)}
                      >
                        Hủy
                      </Button>
                    </div>
                  </form>
                )}

                <div className="space-y-2">
                  {filteredProducts.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Không có sản phẩm nào</p>
                  ) : (
                    filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {product.price.toLocaleString('vi-VN')} đ | Danh mục:{' '}
                            {categoryMap[product.category] ?? product.category}
                          </p>
                          <p className="text-sm text-gray-600">
                            Kho:{' '}
                            {product.stock > 5 ? (
                              <span className="text-green-600">✓ {product.stock}</span>
                            ) : (
                              <span className="text-red-600">⚠ {product.stock}</span>
                            )}
                          </p>
                        </div>
                        <div className="flex space-x-2 mt-3 sm:mt-0">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditProduct(product)}
                            className="text-amber-700 hover:bg-amber-50"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Quản lý đơn hàng ({orders.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Chưa có đơn hàng nào</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="p-4 border border-gray-200 rounded-lg hover:border-amber-300 transition"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-gray-500 uppercase">Mã đơn hàng</p>
                            <p className="font-bold text-gray-900">#{order.id}</p>
                            <p className="text-xs text-gray-600 mt-1">
                              {new Date(order.createdAt).toLocaleString('vi-VN')}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase">Khách hàng</p>
                            <p className="font-semibold text-gray-900">
                              {order.customer.customerName}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              {order.customer.phoneNumber}
                            </p>
                          </div>
                          <div className="flex flex-col justify-between">
                            <div>
                              <p className="text-xs text-gray-500 uppercase">Tổng tiền</p>
                              <p className="text-lg font-bold text-amber-700">
                                {order.total.toLocaleString('vi-VN')} đ
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded mb-3">
                          <p className="text-sm font-semibold text-gray-900 mb-2">
                            Địa chỉ giao hàng:
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.customer.address}, {order.customer.district},{' '}
                            {order.customer.city}
                          </p>
                          <p className="text-sm text-gray-600 mt-2">
                            <strong>Sản phẩm:</strong>{' '}
                            {order.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div className="flex gap-2 items-center">
                            {order.status === 'pending' && (
                              <Clock className="w-5 h-5 text-yellow-600" />
                            )}
                            {(order.status === 'confirmed' || order.status === 'delivered') && (
                              <CheckCircle
                                className={`w-5 h-5 ${
                                  order.status === 'delivered'
                                    ? 'text-green-600'
                                    : 'text-blue-600'
                                }`}
                              />
                            )}
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                order.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : order.status === 'confirmed'
                                  ? 'bg-blue-100 text-blue-800'
                                  : order.status === 'cancelled'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {order.status === 'pending'
                                ? 'Chờ xác nhận'
                                : order.status === 'confirmed'
                                ? 'Đã xác nhận'
                                : order.status === 'cancelled'
                                ? 'Đã hủy'
                                : 'Đã giao'}
                            </span>
                          </div>

                          <div className="flex gap-2 w-full sm:w-auto">
                            {order.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleOrderStatusChange(order.id, 'confirmed')}
                                  className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none"
                                >
                                  Xác nhận
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleOrderStatusChange(order.id, 'cancelled')}
                                  className="flex-1 sm:flex-none"
                                >
                                  Hủy
                                </Button>
                              </>
                            )}
                            {order.status === 'confirmed' && (
                              <Button
                                size="sm"
                                onClick={() => handleOrderStatusChange(order.id, 'delivered')}
                                className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none"
                              >
                                Xác nhận giao
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Tin nhắn liên hệ ({messages.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Chưa có tin nhắn nào</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className="p-4 border border-gray-200 rounded-lg hover:border-amber-300 transition"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 text-lg">{message.subject}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              <strong>Từ:</strong> {message.name} ({message.email})
                            </p>
                            {message.phone && (
                              <p className="text-sm text-gray-600">
                                <strong>Điện thoại:</strong> {message.phone}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">
                              {new Date(message.createdAt).toLocaleString('vi-VN')}
                            </p>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg mb-3 border-l-4 border-amber-700">
                          <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                        </div>

                        <div className="flex justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteMessage(message.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Xóa
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}