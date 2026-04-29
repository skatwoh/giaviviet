'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'
import { AdminHeader } from '@/components/AdminHeader'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/login?redirect=/admin')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a08679]"></div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return null // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <AdminHeader />
      <main>
        {children}
      </main>
    </div>
  )
}
