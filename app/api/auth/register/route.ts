import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const filePath = join(process.cwd(), 'public/data/users.json')

function readUsers() {
  if (!existsSync(filePath)) return { users: [] }
  const fileContent = readFileSync(filePath, 'utf-8')
  return JSON.parse(fileContent)
}

function writeUsers(data: any) {
  writeFileSync(filePath, JSON.stringify(data, null, 2))
}

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    const data = readUsers()

    if (data.users.find((u: any) => u.email === email)) {
      return NextResponse.json({ error: 'Email đã được sử dụng' }, { status: 400 })
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In a real app, hash this!
      role: 'user',
      createdAt: new Date().toISOString()
    }

    data.users.push(newUser)
    writeUsers(data)

    const { password: _, ...userWithoutPassword } = newUser
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Lỗi đăng ký' }, { status: 500 })
  }
}
