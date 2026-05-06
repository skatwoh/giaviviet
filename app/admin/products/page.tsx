'use client'

import { useState, useEffect, useRef } from 'react'
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
import {
  Trash2,
  Plus,
  Edit2,
  Package,
  Search,
  Clock,
  DollarSign,
  Download,
  Upload,
  TrendingDown
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface Product {
  id: number
  name: string
  regularPrice: number
  salePrice: number | null
  saleStart: string | null
  saleEnd: string | null
  price?: number
  originalPrice?: number
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

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [units, setUnits] = useState<Unit[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showProductDialog, setShowProductDialog] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes, unitsRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories'),
          fetch('/api/units'),
        ])

        if (productsRes.ok) {
          const data = await productsRes.json()
          setProducts(data.products || [])
        }
        if (categoriesRes.ok) setCategories(await categoriesRes.json())
        if (unitsRes.ok) setUnits(await unitsRes.json())
      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error('Không thể tải dữ liệu')
      }
    }
    fetchData()
  }, [])

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
        const values: string[] = []
        let current = ''
        let inQuotes = false
        for (let char of lines[i]) {
          if (char === '"') inQuotes = !inQuotes
          else if (char === ',' && !inQuotes) { values.push(current.trim()); current = '' }
          else current += char
        }
        values.push(current.trim())
        const productData: any = { id: Date.now() + i }
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
        } catch (err) { console.error('Error importing product:', err) }
      }
      toast.success(`Đã nhập thành công ${importCount} sản phẩm`)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
    reader.readAsText(file)
  }

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryName = (id: string) => {
    return categories.find(c => c.id === id)?.name || id
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase italic">
            Quản lý <span className="text-[#a08679]">Sản phẩm</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">Danh sách sản phẩm kinh doanh tại Thủy Hương Food.</p>
        </div>
        <div className="flex items-center gap-2">
          <input type="file" accept=".csv" className="hidden" ref={fileInputRef} onChange={handleImportExcel} />
          <Button variant="outline" onClick={handleDownloadTemplate} className="hidden sm:flex">
            <Download className="w-4 h-4 mr-2" /> Tải mẫu
          </Button>
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            <Upload className="w-4 h-4 mr-2" /> Nhập Excel
          </Button>
          <Button onClick={() => {
            setEditingProduct(null)
            setProductFormData({
              name: '', regularPrice: 0, salePrice: 0, saleStart: '', saleEnd: '',
              category: categories[0]?.id || '', stock: 0, unit: '', weight: '',
              origin: '', description: '', image: '',
            })
            setShowProductDialog(true)
          }} className="bg-[#a08679] hover:bg-[#8c756a]">
            <Plus className="w-4 h-4 mr-2" /> Sản phẩm mới
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Danh sách sản phẩm</CardTitle>
            <CardDescription>Hiển thị {filteredProducts.length} sản phẩm hiện có trong kho.</CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 w-4 h-4 text-gray-400" />
            <Input placeholder="Tìm kiếm sản phẩm..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 pt-0">
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
                <TableRow><TableCell colSpan={6} className="h-32 text-center text-gray-500">Không tìm thấy sản phẩm nào</TableCell></TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100 border">
                        {product.image ? <img src={product.image} alt={product.name} className="h-full w-full object-cover" /> : <Package className="h-full w-full p-2 text-gray-400" />}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">{product.name}</TableCell>
                    <TableCell><Badge variant="outline" className="bg-gray-50">{getCategoryName(product.category)}</Badge></TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        {product.salePrice && product.salePrice < product.regularPrice ? (
                          <>
                            <span className="font-bold text-red-600">{product.salePrice.toLocaleString('vi-VN')} đ</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400 line-through">{product.regularPrice.toLocaleString('vi-VN')} đ</span>
                              <Badge className="bg-red-50 text-red-600 border-red-100 text-[10px] px-1 py-0 h-4">-{Math.round((1 - product.salePrice / product.regularPrice) * 100)}%</Badge>
                            </div>
                          </>
                        ) : (<span className="font-bold text-gray-900">{product.regularPrice.toLocaleString('vi-VN')} đ</span>)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'}`} />
                        <Badge variant="outline" className={cn("text-[10px] font-black uppercase tracking-tighter px-2 py-0 h-5", product.stock > 10 ? "text-emerald-600 bg-emerald-50 border-emerald-100" : product.stock > 0 ? "text-amber-600 bg-amber-50 border-amber-100" : "text-red-600 bg-red-50 border-red-100")}>
                          {product.stock > 0 ? `${product.stock} ${product.unit}` : "Hết hàng"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost" onClick={() => handleEditProduct(product)} className="text-[#a08679] hover:bg-gray-50"><Edit2 className="w-4 h-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:bg-red-50"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Product Form Dialog */}
      <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl">
          <form onSubmit={handleProductSubmit} className="flex flex-col h-full">
            <div className="bg-[#a08679] p-6 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black uppercase italic tracking-tight flex items-center gap-3">
                  <Package className="w-6 h-6" /> {editingProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}
                </DialogTitle>
                <DialogDescription className="text-white/70 font-medium italic">Thông tin sản phẩm giúp khách hàng hiểu rõ hơn về chất lượng tinh hoa ẩm thực.</DialogDescription>
              </DialogHeader>
            </div>
            <div className="p-8 space-y-10">
              <section className="space-y-6">
                <div className="flex items-center gap-4"><span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 text-xs font-black">01</span><h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Thông tin cơ bản</h3><div className="flex-1 h-[1px] bg-gray-100"></div></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-2"><Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tên sản phẩm</Label><Input id="name" name="name" placeholder="Ví dụ: Nước mắm Hưng Thịnh" value={productFormData.name} onChange={handleProductFormChange} className="h-11 font-bold border-gray-200 focus-visible:ring-[#a08679] rounded-xl" required /></div>
                  <div className="grid gap-2"><Label htmlFor="category" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Danh mục</Label><select id="category" name="category" value={productFormData.category} onChange={handleProductFormChange} className="flex h-11 w-full items-center justify-between rounded-xl border border-gray-200 bg-background px-3 py-2 text-sm font-bold ring-offset-background focus:outline-none focus:ring-1 focus:ring-[#a08679] transition-all">
                    {categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
                  </select></div>
                </div>
              </section>
              <section className="space-y-6">
                <div className="flex items-center gap-4"><span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 text-xs font-black">02</span><h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Giá & Khuyến mãi</h3><div className="flex-1 h-[1px] bg-gray-100"></div></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="grid gap-2"><Label htmlFor="regularPrice" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Giá bán gốc (đ)</Label><div className="relative"><DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" /><Input id="regularPrice" type="number" name="regularPrice" placeholder="0" value={productFormData.regularPrice} onChange={handleProductFormChange} className="h-11 pl-10 font-black text-lg border-gray-200 focus-visible:ring-[#a08679] rounded-xl" required /></div></div>
                  <div className="grid gap-2 bg-amber-50/50 p-4 rounded-2xl border border-amber-100"><Label htmlFor="salePrice" className="text-[10px] font-black uppercase tracking-widest text-amber-600">Giá khuyến mãi (đ)</Label><div className="relative"><TrendingDown className="absolute left-3.5 top-3.5 w-4 h-4 text-amber-500" /><Input id="salePrice" type="number" name="salePrice" placeholder="Không có" value={productFormData.salePrice || ''} onChange={handleProductFormChange} className="h-11 pl-10 font-black text-lg bg-white border-amber-200 focus-visible:ring-amber-500 rounded-xl" /></div></div>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-2"><Label htmlFor="saleStart" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Thời điểm bắt đầu sale</Label><Input id="saleStart" type="datetime-local" name="saleStart" value={productFormData.saleStart} onChange={handleProductFormChange} className="h-11 font-bold border-gray-200 rounded-xl" /></div>
                  <div className="grid gap-2"><Label htmlFor="saleEnd" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Thời điểm kết thúc sale</Label><Input id="saleEnd" type="datetime-local" name="saleEnd" value={productFormData.saleEnd} onChange={handleProductFormChange} className="h-11 font-bold border-gray-200 rounded-xl" /></div>
                  <p className="md:col-span-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider italic flex items-center gap-2"><Clock className="w-3 h-3" /> Hệ thống tự động chuyển giá dựa trên thời gian thực.</p>
                </div>
              </section>
              <section className="space-y-6">
                <div className="flex items-center gap-4"><span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-50 text-purple-600 text-xs font-black">03</span><h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Kho & Logistics</h3><div className="flex-1 h-[1px] bg-gray-100"></div></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="grid gap-2"><Label htmlFor="stock" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Số lượng kho</Label><Input id="stock" type="number" name="stock" placeholder="0" value={productFormData.stock} onChange={handleProductFormChange} className="h-11 font-black border-gray-200 rounded-xl" required /></div>
                  <div className="grid gap-2"><Label htmlFor="unit" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Đơn vị tính</Label><select id="unit" name="unit" value={productFormData.unit} onChange={handleProductFormChange} className="h-11 rounded-xl border border-gray-200 font-bold text-sm px-3 focus:ring-1 focus:ring-[#a08679] transition-all" required>
                    <option value="">Chọn đơn vị</option>
                    {units.map((u) => (<option key={u.id} value={u.name}>{u.name}</option>))}
                  </select></div>
                  <div className="grid gap-2"><Label htmlFor="weight" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Khối lượng</Label><Input id="weight" name="weight" placeholder="500g" value={productFormData.weight} onChange={handleProductFormChange} className="h-11 font-bold border-gray-200 rounded-xl" /></div>
                  <div className="grid gap-2"><Label htmlFor="origin" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Xuất xứ</Label><Input id="origin" name="origin" placeholder="Việt Nam" value={productFormData.origin} onChange={handleProductFormChange} className="h-11 font-bold border-gray-200 rounded-xl" /></div>
                </div>
              </section>
              <section className="space-y-6">
                <div className="flex items-center gap-4"><span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 text-orange-600 text-xs font-black">04</span><h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Mô tả & Hình ảnh</h3><div className="flex-1 h-[1px] bg-gray-100"></div></div>
                <div className="grid gap-6">
                  <div className="grid gap-2"><Label htmlFor="image" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Đường dẫn hình ảnh (URL)</Label><Input id="image" name="image" placeholder="https://..." value={productFormData.image} onChange={handleProductFormChange} className="h-11 font-medium border-gray-200 rounded-xl" /></div>
                  <div className="grid gap-2"><Label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Mô tả chi tiết</Label><Textarea id="description" name="description" placeholder="Kể câu chuyện về sản phẩm này..." value={productFormData.description} onChange={handleProductFormChange} rows={5} className="rounded-2xl border-gray-200 focus:ring-[#a08679] font-medium leading-relaxed" /></div>
                </div>
              </section>
            </div>
            <div className="bg-gray-50 p-6 flex items-center justify-end gap-4 border-t border-gray-100">
              <Button type="button" variant="ghost" onClick={() => setShowProductDialog(false)} className="text-gray-500 font-bold hover:bg-gray-100 rounded-xl h-12 px-8">Hủy bỏ</Button>
              <Button type="submit" className="bg-[#a08679] hover:bg-[#8c756a] text-white font-black uppercase tracking-widest shadow-lg shadow-amber-900/20 rounded-xl h-12 px-10">{editingProduct ? 'Lưu thay đổi' : 'Tạo sản phẩm ngay'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
