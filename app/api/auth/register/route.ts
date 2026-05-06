import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    // Check if user already exists
    const checkRes = await db.execute({
      sql: 'SELECT id FROM users WHERE email = ?',
      args: [email]
    })

    if (checkRes.rows.length > 0) {
      return NextResponse.json({ error: 'Email đã được sử dụng' }, { status: 400 })
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // Note: Still using plaintext as per original implementation
      role: 'user',
      createdAt: new Date().toISOString(),
    }

    await db.execute({
      sql: 'INSERT INTO users (id, name, email, password, role, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
      args: [newUser.id, newUser.name, newUser.email, newUser.password, newUser.role, newUser.createdAt]
    })

    const { password: _, ...userWithoutPassword } = newUser
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Đã xảy ra lỗi' }, { status: 500 })
  }
}
