'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface Message {
  id: number
  name: string
  email: string
  phone: string
  subject: string
  message: string
  createdAt: string
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/messages')
        if (res.ok) setMessages(await res.json())
      } catch (error) {
        console.error('Error fetching messages:', error)
        toast.error('Không thể tải dữ liệu tin nhắn')
      }
    }
    fetchMessages()
  }, [])

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

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase italic">
          Quản lý <span className="text-[#a08679]">Tin nhắn</span>
        </h1>
        <p className="text-gray-500 font-medium mt-1">Hộp thư hỗ trợ và liên hệ từ khách hàng.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {messages.length === 0 ? (
          <Card className="border-none shadow-sm"><CardContent className="h-32 flex items-center justify-center text-gray-500">Chưa có tin nhắn nào</CardContent></Card>
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
                        <span><strong>Người gửi:</strong> {message.name}</span>
                        <span><strong>Email:</strong> {message.email}</span>
                        {message.phone && <span><strong>SĐT:</strong> {message.phone}</span>}
                      </div>
                    </div>
                    <div className="text-sm text-gray-400 font-medium">{new Date(message.createdAt).toLocaleString('vi-VN')}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700 whitespace-pre-wrap leading-relaxed">{message.message}</div>
                  <div className="flex justify-end mt-4">
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteMessage(message.id)} className="text-red-600 hover:bg-red-50"><Trash2 className="w-4 h-4 mr-2" /> Xóa tin nhắn</Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
