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
  unit: string
}

interface Unit {
  id: string
  name: string
}

export default function AdminUnitsPage() {
  const [units, setUnits] = useState<Unit[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showUnitDialog, setShowUnitDialog] = useState(false)
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null)
  const [unitFormData, setUnitFormData] = useState({ name: '' })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [unitsRes, productsRes] = await Promise.all([
          fetch('/api/units'),
          fetch('/api/products')
        ])
        if (unitsRes.ok) setUnits(await unitsRes.json())
        if (productsRes.ok) {
          const data = await productsRes.json()
          setProducts(data.products || [])
        }
      } catch (error) {
        console.error('Error fetching units:', error)
        toast.error('Không thể tải dữ liệu')
      }
    }
    fetchData()
  }, [])

  const handleUnitFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUnitFormData((prev) => ({ ...prev, [name]: value }))
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
    setUnitFormData({ name: unit.name })
    setShowUnitDialog(true)
  }

  const filteredUnits = units.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase italic">
            Quản lý <span className="text-[#a08679]">Đơn vị tính</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">Quản lý các đơn vị tính sản phẩm (túi, quả, thùng...).</p>
        </div>
        <Button onClick={() => {
          setEditingUnit(null)
          setUnitFormData({ name: '' })
          setShowUnitDialog(true)
        }} className="bg-[#a08679] hover:bg-[#8c756a]">
          <Plus className="w-4 h-4 mr-2" /> Thêm đơn vị
        </Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Danh sách đơn vị</CardTitle>
            <CardDescription>Hiển thị các đơn vị tính đang sử dụng.</CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 w-4 h-4 text-gray-400" />
            <Input placeholder="Tìm kiếm đơn vị..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
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
              {filteredUnits.length === 0 ? (
                <TableRow><TableCell colSpan={3} className="h-32 text-center text-gray-500">Chưa có đơn vị nào</TableCell></TableRow>
              ) : (
                filteredUnits.map((unit) => (
                  <TableRow key={unit.id}>
                    <TableCell className="font-medium">{unit.name}</TableCell>
                    <TableCell><Badge variant="secondary">{products.filter(p => p.unit === unit.name).length}</Badge></TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost" onClick={() => handleEditUnit(unit)} className="text-[#a08679] hover:bg-gray-50"><Edit2 className="w-4 h-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDeleteUnit(unit.id)} className="text-red-600 hover:bg-red-50"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showUnitDialog} onOpenChange={setShowUnitDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleUnitSubmit}>
            <DialogHeader>
              <DialogTitle>{editingUnit ? 'Cập nhật đơn vị' : 'Thêm đơn vị mới'}</DialogTitle>
              <DialogDescription>Tên đơn vị tính (ví dụ: Túi, Thùng, Hộp).</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="unit-name">Tên đơn vị</Label>
                <Input id="unit-name" name="name" placeholder="Ví dụ: Thùng" value={unitFormData.name} onChange={handleUnitFormChange} required />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowUnitDialog(false)}>Hủy</Button>
              <Button type="submit" className="bg-[#a08679] hover:bg-[#8c756a]">{editingUnit ? 'Lưu thay đổi' : 'Thêm đơn vị'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
