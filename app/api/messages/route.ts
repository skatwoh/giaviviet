import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const res = await db.execute('SELECT * FROM messages')
    return NextResponse.json(res.rows)
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const id = body.id || Date.now()
    const createdAt = new Date().toISOString()
    
    await db.execute({
      sql: 'INSERT INTO messages (id, name, email, phone, subject, message, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
      args: [id, body.name, body.email, body.phone, body.subject, body.message, createdAt]
    })
    return NextResponse.json({ id, ...body, createdAt })
  } catch (error) {
    console.error('Error adding message:', error)
    return NextResponse.json({ error: 'Failed to add message' }, { status: 500 })
  }
}
