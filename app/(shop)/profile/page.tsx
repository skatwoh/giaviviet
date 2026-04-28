'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { User, Package, Settings, LogOut, Loader2, MapPin, Phone, Mail } from 'lucide-react'

export default function ProfilePage() {
  const { user, logout, updateUser, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    } else if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      })
    }
  }, [user, authLoading, router])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    updateUser(formData)
    toast.success('Cập nhật thông tin thành công')
    setIsUpdating(false)
  }

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#00483d]" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-4">
          <Card className="border-none shadow-sm overflow-hidden">
            <div className="bg-[#00483d] h-20" />
            <CardContent className="pt-0 -mt-10 text-center pb-6">
              <div className="relative inline-block">
                <div className="w-20 h-20 rounded-full bg-white p-1 shadow-md">
                  <div className="w-full h-full rounded-full bg-amber-100 flex items-center justify-center text-[#00483d] font-bold text-2xl">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
              <h2 className="mt-4 font-bold text-lg">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              <div className="mt-2 inline-block px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold uppercase rounded border border-amber-100">
                {user.role === 'admin' ? 'Quản trị viên' : 'Khách hàng Thân thiết'}
              </div>
            </CardContent>
          </Card>

          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start text-[#00483d] font-medium" onClick={() => {}}>
              <User className="mr-2 h-4 w-4" />
              Thông tin cá nhân
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-600" onClick={() => {}}>
              <Package className="mr-2 h-4 w-4" />
              Đơn hàng của tôi
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-600" onClick={() => {}}>
              <MapPin className="mr-2 h-4 w-4" />
              Địa chỉ giao hàng
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-600" onClick={() => {}}>
              <Settings className="mr-2 h-4 w-4" />
              Cài đặt tài khoản
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => {
                logout()
                router.push('/')
                toast.info('Đã đăng xuất')
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Đăng xuất
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-auto p-0 mb-6">
              <TabsTrigger
                value="info"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#00483d] data-[state=active]:bg-transparent px-6 py-3"
              >
                Hồ sơ của tôi
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#00483d] data-[state=active]:bg-transparent px-6 py-3"
              >
                Lịch sử mua hàng
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="mt-0">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle>Thông tin cá nhân</CardTitle>
                  <CardDescription>Cập nhật thông tin liên hệ của bạn để việc giao hàng chính xác hơn.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="prof-name">Họ và tên</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="prof-name"
                            className="pl-10"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="prof-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="prof-email"
                            type="email"
                            className="pl-10 bg-gray-50"
                            value={formData.email}
                            disabled
                          />
                        </div>
                        <p className="text-[10px] text-gray-400 italic">* Liên hệ quản trị viên để thay đổi email.</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="prof-phone">Số điện thoại</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="prof-phone"
                            placeholder="09xx xxx xxx"
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Địa chỉ mặc định</Label>
                      <div className="p-4 border rounded-lg bg-gray-50 text-sm text-gray-500 italic">
                        Chưa thiết lập địa chỉ mặc định.
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t">
                      <Button type="submit" className="bg-[#00483d] hover:bg-[#00362e]" disabled={isUpdating}>
                        {isUpdating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Đang lưu...
                          </>
                        ) : 'Lưu thay đổi'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="mt-0">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle>Đơn hàng đã đặt</CardTitle>
                  <CardDescription>Theo dõi trạng thái các đơn hàng bạn đã thực hiện.</CardDescription>
                </CardHeader>
                <CardContent className="h-64 flex flex-col items-center justify-center text-center">
                  <div className="bg-gray-100 p-4 rounded-full mb-4">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-medium text-gray-900">Bạn chưa có đơn hàng nào</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-6">Hãy khám phá các sản phẩm tuyệt vời của chúng tôi.</p>
                  <Button asChild className="bg-[#00483d] hover:bg-[#00362e]">
                    <a href="/products">Mua sắm ngay</a>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
