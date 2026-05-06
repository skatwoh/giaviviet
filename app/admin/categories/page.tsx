'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { Trash2, Plus, Edit2, Search } from 'lucide-react'
import { toast } from 'sonner'

interface Product {
  id: number
  category: string
}

interface Category {
  id: string
  name: string
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showCategoryDialog, setShowCategoryDialog] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const [categoryFormData, setCategoryFormData] = useState({ id: '', name: '' })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/products')
        ])
        if (categoriesRes.ok) setCategories(await categoriesRes.json())
        if (productsRes.ok) {
          const data = await productsRes.json()
          setProducts(data.products || [])
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
        toast.error('Không thể tải dữ liệu')
      }
    }
    fetchData()
  }, [])

  const handleCategoryFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCategoryFormData((prev) => ({ ...prev, [name]: value }))
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
    setCategoryFormData({ id: category.id, name: category.name })
    setShowCategoryDialog(true)
  }

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase italic">
            Quản lý <span className="text-[#a08679]">Danh mục</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">Quản lý các nhóm sản phẩm trong cửa hàng Thủy Hương.</p>
        </div>
        <Button onClick={() => {
          setEditingCategory(null)
          setCategoryFormData({ id: '', name: '' })
          setShowCategoryDialog(true)
        }} className="bg-[#a08679] hover:bg-[#8c756a]">
          <Plus className="w-4 h-4 mr-2" /> Thêm danh mục
        </Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Danh sách danh mục</CardTitle>
            <CardDescription>Hiển thị các nhóm sản phẩm đang kinh doanh.</CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 w-4 h-4 text-gray-400" />
            <Input placeholder="Tìm kiếm danh mục..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
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
              {filteredCategories.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="h-32 text-center text-gray-500">Chưa có danh mục nào</TableCell></TableRow>
              ) : (
                filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-mono text-sm">{category.id}</TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell><Badge variant="secondary">{products.filter(p => p.category === category.id).length}</Badge></TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost" onClick={() => handleEditCategory(category)} className="text-[#a08679] hover:bg-gray-50"><Edit2 className="w-4 h-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDeleteCategory(category.id)} className="text-red-600 hover:bg-red-50"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleCategorySubmit}>
            <DialogHeader>
              <DialogTitle>{editingCategory ? 'Cập nhật danh mục' : 'Thêm danh mục mới'}</DialogTitle>
              <DialogDescription>Tạo mã định danh (ID) và tên cho danh mục mới.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="cat-id">Mã danh mục (ID)</Label>
                <Input id="cat-id" name="id" placeholder="ví-du: rau-cu" value={categoryFormData.id} onChange={handleCategoryFormChange} disabled={!!editingCategory} required />
                {!editingCategory && <p className="text-[10px] text-gray-500 italic">* Viết liền không dấu, dùng dấu gạch ngang.</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cat-name">Tên danh mục</Label>
                <Input id="cat-name" name="name" placeholder="Ví dụ: Rau Củ Quả" value={categoryFormData.name} onChange={handleCategoryFormChange} required />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowCategoryDialog(false)}>Hủy</Button>
              <Button type="submit" className="bg-[#a08679] hover:bg-[#8c756a]">{editingCategory ? 'Lưu thay đổi' : 'Thêm danh mục'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
