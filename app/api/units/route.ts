import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const res = await db.execute('SELECT * FROM units')
    return NextResponse.json(res.rows)
  } catch (error) {
    console.error('Error fetching units:', error)
    return NextResponse.json({ error: 'Failed to fetch units' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const id = body.id || Date.now().toString()
    await db.execute({
      sql: 'INSERT INTO units (id, name) VALUES (?, ?)',
      args: [id, body.name]
    })
    return NextResponse.json({ id, name: body.name })
  } catch (error) {
    console.error('Error adding unit:', error)
    return NextResponse.json({ error: 'Failed to add unit' }, { status: 500 })
  }
}
